import { describe, it, expect } from "vitest";
import {
  generateMaze,
  GRID_ROWS,
  GRID_COLS,
} from "../../../core/maze/generator";
import type { MazeGraph, Cell } from "../../../core/maze/types";

function bfsPath(graph: MazeGraph): Cell[] | null {
  const key = (c: Cell) => `${c.row},${c.col}`;
  const visited = new Set<string>();
  const queue: Array<{ cell: Cell; path: Cell[] }> = [
    { cell: graph.entry, path: [graph.entry] },
  ];
  while (queue.length) {
    const { cell, path } = queue.shift()!;
    const k = key(cell);
    if (visited.has(k)) continue;
    visited.add(k);
    if (cell.row === graph.exit.row && cell.col === graph.exit.col) return path;
    for (const [dr, dc] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ] as [number, number][]) {
      const next = { row: cell.row + dr, col: cell.col + dc };
      if (
        next.row < 0 ||
        next.row >= graph.rows ||
        next.col < 0 ||
        next.col >= graph.cols
      )
        continue;
      if (!visited.has(key(next)) && graph.hasPassage(cell, next)) {
        queue.push({ cell: next, path: [...path, next] });
      }
    }
  }
  return null;
}

function countDCBoundaryCrossings(graph: MazeGraph): number {
  let count = 0;
  for (let r = 0; r < GRID_ROWS; r++) {
    if (graph.hasPassage({ row: r, col: 4 }, { row: r, col: 5 })) count++;
  }
  return count;
}

describe("generateMaze", () => {
  it("is deterministic — same seed produces identical passage structure", () => {
    const g1 = generateMaze("labyrinth");
    const g2 = generateMaze("labyrinth");
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS - 1; c++) {
        expect(g1.hasPassage({ row: r, col: c }, { row: r, col: c + 1 })).toBe(
          g2.hasPassage({ row: r, col: c }, { row: r, col: c + 1 }),
        );
      }
    }
  });

  it("different seeds produce different mazes", () => {
    const g1 = generateMaze("seed-alpha");
    const g2 = generateMaze("seed-beta");
    let differences = 0;
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS - 1; c++) {
        const a = { row: r, col: c },
          b = { row: r, col: c + 1 };
        if (g1.hasPassage(a, b) !== g2.hasPassage(a, b)) differences++;
      }
    }
    expect(differences).toBeGreaterThan(0);
  });

  it("is solvable — BFS finds a path from entry to exit", () => {
    const graph = generateMaze("daedalus");
    const path = bfsPath(graph);
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThan(0);
  });

  it("entry is at right wall row 1 (C top arm)", () => {
    const graph = generateMaze("any");
    expect(graph.entry).toEqual({ row: 1, col: 9 });
  });

  it("exit is at right wall row 9 (C bottom arm)", () => {
    const graph = generateMaze("any");
    expect(graph.exit).toEqual({ row: 9, col: 9 });
  });

  it("D-C boundary has at most 2 crossings", () => {
    for (const seed of ["alpha", "beta", "gamma", "delta", "epsilon"]) {
      const graph = generateMaze(seed);
      expect(countDCBoundaryCrossings(graph)).toBeLessThanOrEqual(2);
    }
  });

  it("reports correct grid dimensions", () => {
    const graph = generateMaze("size-check");
    expect(graph.rows).toBe(GRID_ROWS);
    expect(graph.cols).toBe(GRID_COLS);
  });
});
