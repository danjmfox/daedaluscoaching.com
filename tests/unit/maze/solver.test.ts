import { describe, it, expect } from "vitest";
import { generateMaze } from "../../../core/maze/generator";
import { solveMaze } from "../../../core/maze/solver";
import type { Cell } from "../../../core/maze/types";

const VISIBLE_ROWS_ABOVE = [0, 1, 2];
const VISIBLE_ROWS_BELOW = [8, 9];
const SPINE_COL = 0;

function isVisible(cell: Cell): boolean {
  return (
    VISIBLE_ROWS_ABOVE.includes(cell.row) ||
    VISIBLE_ROWS_BELOW.includes(cell.row) ||
    cell.col === SPINE_COL
  );
}

function isAdjacent(a: Cell, b: Cell): boolean {
  const dr = Math.abs(a.row - b.row);
  const dc = Math.abs(a.col - b.col);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

function pathIsValid(cells: Cell[]): boolean {
  for (let i = 1; i < cells.length; i++) {
    if (!isAdjacent(cells[i - 1], cells[i])) return false;
  }
  return true;
}

describe("solveMaze", () => {
  const graph = generateMaze("coaching");
  const path = solveMaze(graph);

  it("solution starts at entry and ends at exit", () => {
    expect(path.solution[0]).toEqual(graph.entry);
    expect(path.solution[path.solution.length - 1]).toEqual(graph.exit);
  });

  it("solution is a valid sequence of adjacent cells", () => {
    expect(pathIsValid(path.solution)).toBe(true);
  });

  it("returns exactly 2 backtrack excursions", () => {
    expect(path.backtracks).toHaveLength(2);
  });

  it("each backtrack is at least 2 steps (≥3 cells including origin)", () => {
    for (const bt of path.backtracks) {
      expect(bt.path.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("each backtrack originates from a visible-zone cell", () => {
    for (const bt of path.backtracks) {
      expect(isVisible(bt.origin)).toBe(true);
    }
  });

  it("backtrack paths are valid sequences of adjacent cells", () => {
    for (const bt of path.backtracks) {
      expect(pathIsValid([bt.origin, ...bt.path])).toBe(true);
    }
  });

  it("strokeDashTotal is positive and matches pixel distance", () => {
    expect(path.strokeDashTotal).toBeGreaterThan(0);
    // Entry segment (from right wall to first cell) = 20px, rest = 40px each
    const minExpected = path.solution.length * 40;
    expect(path.strokeDashTotal).toBeGreaterThanOrEqual(minExpected);
  });

  it("is deterministic — same seed produces same path", () => {
    const g2 = generateMaze("coaching");
    const p2 = solveMaze(g2);
    expect(p2.solution).toEqual(path.solution);
    expect(p2.strokeDashTotal).toBe(path.strokeDashTotal);
  });
});
