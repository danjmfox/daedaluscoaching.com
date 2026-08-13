import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  generateMaze,
  GRID_ROWS,
  GRID_COLS,
} from "../../../core/maze/generator";
import { solveMaze } from "../../../core/maze/solver";
import { hashString, mulberry32 } from "../../../core/maze/prng";
import { advanceThread, solveFromHead } from "../../../core/maze/mutate";
import { jsHeadPlayback } from "../../../composables/playback/jsHeadPlayback";
import type { MazeGraph, ThreadState } from "../../../core/maze/types";

function countPassages(g: MazeGraph): number {
  let n = 0;
  for (let r = 0; r < GRID_ROWS; r++)
    for (let c = 0; c < GRID_COLS; c++) {
      if (
        c < GRID_COLS - 1 &&
        g.hasPassage({ row: r, col: c }, { row: r, col: c + 1 })
      )
        n++;
      if (
        r < GRID_ROWS - 1 &&
        g.hasPassage({ row: r, col: c }, { row: r + 1, col: c })
      )
        n++;
    }
  return n;
}

describe("jsHeadPlayback — walking skeleton", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("drives the thread so it evolves over time while the head stays connected to the exit", () => {
    const graph = generateMaze("23fc3a");
    const initial: ThreadState = {
      graph,
      path: solveMaze(graph).solution,
      headIndex: 0,
    };
    const rng = mulberry32(hashString("skeleton"));
    const frames: ThreadState[] = [];

    const handle = jsHeadPlayback({
      initial,
      step: (s) => advanceThread(s, rng),
      onFrame: (s) => frames.push(s),
      stepIntervalMs: 600,
    });

    vi.advanceTimersByTime(600 * (initial.path.length + 4));
    handle.stop();

    // many frames emitted and the head walked across the maze
    expect(frames.length).toBeGreaterThan(3);
    expect(frames[frames.length - 1].headIndex).toBeGreaterThan(0);
    // structure evolved: at least one edge flipped state during playback (rotation
    // moves a wall — a passage appears somewhere it wasn't, ADR-008)
    const last = frames[frames.length - 1].graph;
    const edges = (g: MazeGraph): boolean[] => {
      const flags: boolean[] = [];
      for (let r = 0; r < GRID_ROWS; r++)
        for (let c = 0; c < GRID_COLS; c++) {
          if (c < GRID_COLS - 1)
            flags.push(
              g.hasPassage({ row: r, col: c }, { row: r, col: c + 1 }),
            );
          if (r < GRID_ROWS - 1)
            flags.push(
              g.hasPassage({ row: r, col: c }, { row: r + 1, col: c }),
            );
        }
      return flags;
    };
    expect(edges(last)).not.toEqual(edges(initial.graph));
    // …while wall count is conserved: rotation moves a wall, never deletes one (ADR-008)
    expect(countPassages(last)).toBe(countPassages(initial.graph));
    // never disconnected: every frame's head can still reach the exit
    for (const f of frames) {
      expect(
        solveFromHead(f.graph, f.path[f.headIndex]).length,
      ).toBeGreaterThan(0);
    }
  });
});
