import { describe, it, expect } from "vitest";
import { generateMaze } from "../../../core/maze/generator";
import { solveMaze } from "../../../core/maze/solver";
import { hashString, mulberry32 } from "../../../core/maze/prng";
import {
  solveFromHead,
  mutateAhead,
  advanceThread,
} from "../../../core/maze/mutate";
import type { ThreadState } from "../../../core/maze/types";

const key = (c: { row: number; col: number }) => `${c.row},${c.col}`;

describe("solveFromHead", () => {
  it("returns the suffix of the full solution when starting from a mid-route cell", () => {
    const graph = generateMaze("23fc3a");
    const solution = solveMaze(graph).solution;
    const k = Math.floor(solution.length / 2);

    expect(solveFromHead(graph, solution[k])).toEqual(solution.slice(k));
  });
});

describe("mutateAhead", () => {
  it("rotates a wall ahead of the head into a free perpendicular edge, keeping the head connected", () => {
    const graph = generateMaze("23fc3a");
    const solution = solveMaze(graph).solution;
    const headIndex = 1;
    const rng = mulberry32(hashString("mutate-test"));

    const { graph: next, rotation } = mutateAhead(
      graph,
      solution,
      headIndex,
      rng,
    );

    expect(rotation).not.toBeNull();
    // the opened edge was a wall, and is a passage after
    expect(graph.hasPassage(rotation!.open.a, rotation!.open.b)).toBe(false);
    expect(next.hasPassage(rotation!.open.a, rotation!.open.b)).toBe(true);
    // walls rotate INTO passages, not other walls: the closed edge was a passage before, a wall after
    expect(graph.hasPassage(rotation!.close.a, rotation!.close.b)).toBe(true);
    expect(next.hasPassage(rotation!.close.a, rotation!.close.b)).toBe(false);
    // the opened wall touches a cell in the 2-5-ahead frontier window
    const frontier = new Set(
      solution.slice(headIndex + 2, headIndex + 6).map(key),
    );
    expect(
      frontier.has(key(rotation!.open.a)) ||
        frontier.has(key(rotation!.open.b)),
    ).toBe(true);
    // the head can still reach the exit
    expect(solveFromHead(next, solution[headIndex]).length).toBeGreaterThan(0);
  });
});

describe("advanceThread", () => {
  it("advances the head by one, preserves the behind-head prefix, and stays connected", () => {
    const graph = generateMaze("23fc3a");
    const initial: ThreadState = {
      graph,
      path: solveMaze(graph).solution,
      headIndex: 0,
    };
    const rng = mulberry32(hashString("adv"));

    const next = advanceThread(initial, rng);

    expect(next.headIndex).toBe(1);
    // keep-behind: the drawn prefix up to the new head is untouched
    expect(next.path.slice(0, next.headIndex)).toEqual(
      initial.path.slice(0, next.headIndex),
    );
    // head still reaches exit, and the path still ends at the exit
    expect(
      solveFromHead(next.graph, next.path[next.headIndex]).length,
    ).toBeGreaterThan(0);
    expect(key(next.path[next.path.length - 1])).toBe(key(graph.exit));
  });
});

describe("living maze — past-route invariant (US-LM-001)", () => {
  const neighbours = (
    c: { row: number; col: number },
    rows: number,
    cols: number,
  ) => {
    const out: { row: number; col: number }[] = [];
    if (c.row > 0) out.push({ row: c.row - 1, col: c.col });
    if (c.row < rows - 1) out.push({ row: c.row + 1, col: c.col });
    if (c.col > 0) out.push({ row: c.row, col: c.col - 1 });
    if (c.col < cols - 1) out.push({ row: c.row, col: c.col + 1 });
    return out;
  };

  it("never changes a passage incident to a travelled cell (at/behind the head)", () => {
    const seed = "23fc3a";
    const graph0 = generateMaze(seed);
    let state: ThreadState = {
      graph: graph0,
      path: solveMaze(graph0).solution,
      headIndex: 0,
    };
    const rng = mulberry32(hashString(`${seed}:live`));

    for (let tick = 0; tick < 500; tick++) {
      const prev = state;
      const next = advanceThread(prev, rng);
      const travelled = prev.path.slice(0, prev.headIndex + 1); // frozen: at/behind the head
      for (const c of travelled) {
        for (const n of neighbours(c, prev.graph.rows, prev.graph.cols)) {
          expect(next.graph.hasPassage(c, n)).toBe(prev.graph.hasPassage(c, n));
        }
      }
      if (next === prev) break; // head reached exit
      state = next;
    }
  });

  // counts internal walls (adjacent cell pairs with no passage between them)
  const countWalls = (g: {
    rows: number;
    cols: number;
    hasPassage: (
      a: { row: number; col: number },
      b: { row: number; col: number },
    ) => boolean;
  }) => {
    let n = 0;
    for (let r = 0; r < g.rows; r++) {
      for (let c = 0; c < g.cols; c++) {
        if (
          r + 1 < g.rows &&
          !g.hasPassage({ row: r, col: c }, { row: r + 1, col: c })
        )
          n++;
        if (
          c + 1 < g.cols &&
          !g.hasPassage({ row: r, col: c }, { row: r, col: c + 1 })
        )
          n++;
      }
    }
    return n;
  };

  it("conserves the maze wall count each tick (walls rotate, never just delete)", () => {
    const seed = "23fc3a";
    const graph0 = generateMaze(seed);
    let state: ThreadState = {
      graph: graph0,
      path: solveMaze(graph0).solution,
      headIndex: 0,
    };
    const rng = mulberry32(hashString(`${seed}:live`));

    for (let tick = 0; tick < 500; tick++) {
      const prev = state;
      const next = advanceThread(prev, rng);
      // a mutation moves a wall (open one edge, close another) — total walls unchanged
      expect(countWalls(next.graph)).toBe(countWalls(prev.graph));
      if (next === prev) break; // head reached exit
      state = next;
    }
  });
});

describe("living maze — liveliness (US-LM-002 AC3, retargeted)", () => {
  it("moves a wall on roughly a quarter of ticks (seed 23fc3a, ≥1000 ticks)", () => {
    const seed = "23fc3a";
    const graph0 = generateMaze(seed);
    let state: ThreadState = {
      graph: graph0,
      path: solveMaze(graph0).solution,
      headIndex: 0,
    };
    const rng = mulberry32(hashString(`${seed}:live`));

    let ticks = 0;
    let visibleChanges = 0;
    // KPI method: measure over ≥1000 ticks of the running engine, restarting on
    // completion exactly as the shell does (useLivingMaze) — a head that reaches
    // the exit after ~10 ticks is otherwise far too small a sample.
    for (let tick = 0; tick < 1000; tick++) {
      const prev = state;
      const next = advanceThread(prev, rng);
      if (next === prev) {
        const fresh = generateMaze(seed);
        state = { graph: fresh, path: solveMaze(fresh).solution, headIndex: 0 };
        continue;
      }
      ticks++;
      // a visible change = a wall actually moved this tick (non-null rotation)
      if (next.lastRotation != null) visibleChanges++;
      state = next;
    }

    const liveliness = visibleChanges / ticks;
    // Owner retarget 2026-08-07: ADR-008's ≥60% read as frantic on the real logo,
    // and a wall flipping every tick trapped the head in a two-cell cycle.
    expect(liveliness).toBeGreaterThan(0.15);
    expect(liveliness).toBeLessThan(0.35);
  });
});
