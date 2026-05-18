import type { MazeGraph, Cell } from "./types";
import { hashString, mulberry32 } from "./prng";

export const CELL_SIZE = 40;
export const GRID_ROWS = 10;
export const GRID_COLS = 10;

const ENTRY: Cell = { row: 1, col: 9 };
const EXIT: Cell = { row: 9, col: 9 };
const DC_BOUNDARY_MAX_CROSSINGS = 2;

function passageKey(a: Cell, b: Cell): string {
  if (a.row < b.row || (a.row === b.row && a.col < b.col)) {
    return `r${a.row}c${a.col}-r${b.row}c${b.col}`;
  }
  return `r${b.row}c${b.col}-r${a.row}c${a.col}`;
}

function cellNeighbours(cell: Cell, rows: number, cols: number): Cell[] {
  const result: Cell[] = [];
  if (cell.row > 0) result.push({ row: cell.row - 1, col: cell.col });
  if (cell.row < rows - 1) result.push({ row: cell.row + 1, col: cell.col });
  if (cell.col > 0) result.push({ row: cell.row, col: cell.col - 1 });
  if (cell.col < cols - 1) result.push({ row: cell.row, col: cell.col + 1 });
  return result;
}

function shuffled<T>(items: T[], rng: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function carvePassages(
  current: Cell,
  visited: Set<string>,
  passages: Set<string>,
  rng: () => number,
): void {
  const cellKey = `${current.row},${current.col}`;
  visited.add(cellKey);

  for (const neighbour of shuffled(
    cellNeighbours(current, GRID_ROWS, GRID_COLS),
    rng,
  )) {
    const neighbourKey = `${neighbour.row},${neighbour.col}`;
    if (!visited.has(neighbourKey)) {
      passages.add(passageKey(current, neighbour));
      carvePassages(neighbour, visited, passages, rng);
    }
  }
}

function bfsReachable(
  start: Cell,
  passages: Set<string>,
): Set<string> {
  const reachable = new Set<string>();
  const queue: Cell[] = [start];
  const startKey = `${start.row},${start.col}`;
  reachable.add(startKey);

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const neighbour of cellNeighbours(current, GRID_ROWS, GRID_COLS)) {
      const neighbourKey = `${neighbour.row},${neighbour.col}`;
      if (!reachable.has(neighbourKey) && passages.has(passageKey(current, neighbour))) {
        reachable.add(neighbourKey);
        queue.push(neighbour);
      }
    }
  }
  return reachable;
}

function collectDCCrossingRows(passages: Set<string>): number[] {
  const rows: number[] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    if (passages.has(passageKey({ row: r, col: 4 }, { row: r, col: 5 }))) {
      rows.push(r);
    }
  }
  return rows;
}

function enforceDCBoundaryConstraint(passages: Set<string>): void {
  const crossingRows = collectDCCrossingRows(passages);
  if (crossingRows.length <= DC_BOUNDARY_MAX_CROSSINGS) return;

  // Try removing crossings one at a time, keeping connectivity, until at most 2 remain.
  // Remove crossings furthest from entry/exit first.
  const entryRow = ENTRY.row;
  const exitRow = EXIT.row;

  const sortedByDistance = [...crossingRows].sort((a, b) => {
    const distA = Math.min(Math.abs(a - entryRow), Math.abs(a - exitRow));
    const distB = Math.min(Math.abs(b - entryRow), Math.abs(b - exitRow));
    // Sort descending so we try removing furthest-from-endpoints first
    return distB - distA;
  });

  for (const r of sortedByDistance) {
    const currentCrossings = collectDCCrossingRows(passages);
    if (currentCrossings.length <= DC_BOUNDARY_MAX_CROSSINGS) break;

    const key = passageKey({ row: r, col: 4 }, { row: r, col: 5 });
    passages.delete(key);

    // Check if entry can still reach exit after removal
    const reachableFromEntry = bfsReachable(ENTRY, passages);
    const exitKey = `${EXIT.row},${EXIT.col}`;
    if (!reachableFromEntry.has(exitKey)) {
      // Restore: this crossing is essential for connectivity
      passages.add(key);
    }
  }
}

function buildMazeGraph(passages: Set<string>): MazeGraph {
  return {
    rows: GRID_ROWS,
    cols: GRID_COLS,
    entry: ENTRY,
    exit: EXIT,
    hasPassage(a: Cell, b: Cell): boolean {
      return passages.has(passageKey(a, b));
    },
  };
}

export function generateMaze(seed: string): MazeGraph {
  const rng = mulberry32(hashString(seed));
  const visited = new Set<string>();
  const passages = new Set<string>();

  carvePassages({ row: 0, col: 0 }, visited, passages, rng);
  enforceDCBoundaryConstraint(passages);

  return buildMazeGraph(passages);
}
