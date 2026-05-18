import type { MazeGraph, Cell, BacktrackExcursion, ThreadPath } from "./types";

const CELL_SIZE = 40;
const ENTRY_WALL_SEGMENT = 20;

const VISIBLE_ROWS = new Set([0, 1, 2, 8, 9]);
const SPINE_COL = 0;

function cellKey(cell: Cell): string {
  return `${cell.row},${cell.col}`;
}

function isVisibleZone(cell: Cell): boolean {
  return VISIBLE_ROWS.has(cell.row) || cell.col === SPINE_COL;
}

function orthogonalNeighbours(cell: Cell, rows: number, cols: number): Cell[] {
  const neighbours: Cell[] = [];
  if (cell.row > 0) neighbours.push({ row: cell.row - 1, col: cell.col });
  if (cell.row < rows - 1) neighbours.push({ row: cell.row + 1, col: cell.col });
  if (cell.col > 0) neighbours.push({ row: cell.row, col: cell.col - 1 });
  if (cell.col < cols - 1) neighbours.push({ row: cell.row, col: cell.col + 1 });
  return neighbours;
}

function passableNeighbours(cell: Cell, graph: MazeGraph): Cell[] {
  return orthogonalNeighbours(cell, graph.rows, graph.cols).filter((n) =>
    graph.hasPassage(cell, n),
  );
}

function bfsShortestPath(graph: MazeGraph): Cell[] {
  const visited = new Map<string, Cell | null>();
  const queue: Cell[] = [graph.entry];
  visited.set(cellKey(graph.entry), null);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (cellKey(current) === cellKey(graph.exit)) {
      return reconstructPath(visited, graph.exit);
    }
    for (const neighbour of passableNeighbours(current, graph)) {
      const key = cellKey(neighbour);
      if (!visited.has(key)) {
        visited.set(key, current);
        queue.push(neighbour);
      }
    }
  }
  return [];
}

function reconstructPath(cameFrom: Map<string, Cell | null>, end: Cell): Cell[] {
  const path: Cell[] = [];
  let current: Cell | null = end;
  while (current !== null) {
    path.unshift(current);
    current = cameFrom.get(cellKey(current)) ?? null;
  }
  return path;
}

function dfsBranchFromOrigin(
  origin: Cell,
  graph: MazeGraph,
  solutionKeys: Set<string>,
): Cell[] | null {
  // DFS to find a dead-end branch from origin that:
  // - stays off the solution path
  // - has at least 2 steps (path.length >= 2)
  const stack: Array<{ cell: Cell; path: Cell[] }> = [{ cell: origin, path: [] }];
  const visited = new Set<string>([cellKey(origin)]);

  let longestDeadEnd: Cell[] | null = null;

  while (stack.length > 0) {
    const { cell, path } = stack.pop()!;
    const neighbours = passableNeighbours(cell, graph).filter(
      (n) => !solutionKeys.has(cellKey(n)) && !visited.has(cellKey(n)),
    );

    if (neighbours.length === 0) {
      // Dead end — record if path is long enough
      if (path.length >= 2) {
        if (longestDeadEnd === null || path.length > longestDeadEnd.length) {
          longestDeadEnd = path;
        }
      }
    } else {
      for (const n of neighbours) {
        const nKey = cellKey(n);
        visited.add(nKey);
        stack.push({ cell: n, path: [...path, n] });
      }
    }
  }

  return longestDeadEnd;
}

function pickVisibleZoneOrigins(
  solution: Cell[],
  solutionKeys: Set<string>,
  graph: MazeGraph,
): BacktrackExcursion[] {
  const backtracks: BacktrackExcursion[] = [];
  const usedOriginKeys = new Set<string>();

  // First pass: prefer visible-zone cells
  for (const cell of solution) {
    if (backtracks.length >= 2) break;
    const key = cellKey(cell);
    if (!isVisibleZone(cell) || usedOriginKeys.has(key)) continue;

    const branch = dfsBranchFromOrigin(cell, graph, solutionKeys);
    if (branch !== null) {
      backtracks.push({ origin: cell, path: branch });
      usedOriginKeys.add(key);
    }
  }

  // Fallback: if we don't have 2 yet, try any solution cell
  if (backtracks.length < 2) {
    for (const cell of solution) {
      if (backtracks.length >= 2) break;
      const key = cellKey(cell);
      if (usedOriginKeys.has(key)) continue;

      const branch = dfsBranchFromOrigin(cell, graph, solutionKeys);
      if (branch !== null) {
        backtracks.push({ origin: cell, path: branch });
        usedOriginKeys.add(key);
      }
    }
  }

  return backtracks;
}

function computeStrokeDashTotal(
  solution: Cell[],
  backtracks: BacktrackExcursion[],
): number {
  const solutionSegments = solution.length - 1;
  const backtrackSegments = backtracks.reduce((sum, bt) => sum + bt.path.length, 0);
  return (solutionSegments + backtrackSegments) * CELL_SIZE + ENTRY_WALL_SEGMENT;
}

export function solveMaze(graph: MazeGraph): ThreadPath {
  const solution = bfsShortestPath(graph);

  const solutionKeys = new Set(solution.map(cellKey));

  const backtracks = pickVisibleZoneOrigins(solution, solutionKeys, graph);

  if (backtracks.length < 2) {
    throw new Error(
      `solveMaze: could not find 2 backtrack excursions (found ${backtracks.length})`,
    );
  }

  const strokeDashTotal = computeStrokeDashTotal(solution, backtracks);

  return {
    solution,
    backtracks: [backtracks[0], backtracks[1]],
    strokeDashTotal,
  };
}
