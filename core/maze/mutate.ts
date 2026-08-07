import type { MazeGraph, Cell, ThreadState, WallEdge, Vertex, WallRotation } from "./types";

export interface RotationResult {
  readonly graph: MazeGraph;
  readonly rotation: WallRotation | null;
}

const FRONTIER_MIN = 2;
const FRONTIER_MAX = 5;

function cellKey(c: Cell): string {
  return `${c.row},${c.col}`;
}

function edgeKey(a: Cell, b: Cell): string {
  return cellKey(a) < cellKey(b)
    ? `${cellKey(a)}|${cellKey(b)}`
    : `${cellKey(b)}|${cellKey(a)}`;
}

function orthogonalNeighbours(cell: Cell, rows: number, cols: number): Cell[] {
  const result: Cell[] = [];
  if (cell.row > 0) result.push({ row: cell.row - 1, col: cell.col });
  if (cell.row < rows - 1) result.push({ row: cell.row + 1, col: cell.col });
  if (cell.col > 0) result.push({ row: cell.row, col: cell.col - 1 });
  if (cell.col < cols - 1) result.push({ row: cell.row, col: cell.col + 1 });
  return result;
}

/**
 * Snapshot every present passage of `graph` into a flat Set of edge keys.
 * Probing each interior edge once gives a representation whose `hasPassage` is
 * O(1) — avoiding the O(nesting-depth) cost of chained closure wrappers when a
 * graph is mutated thousands of times over a full playback run.
 */
function passageSet(graph: MazeGraph): Set<string> {
  const passages = new Set<string>();
  for (let r = 0; r < graph.rows; r++) {
    for (let c = 0; c < graph.cols; c++) {
      const cell: Cell = { row: r, col: c };
      if (r + 1 < graph.rows) {
        const down: Cell = { row: r + 1, col: c };
        if (graph.hasPassage(cell, down)) passages.add(edgeKey(cell, down));
      }
      if (c + 1 < graph.cols) {
        const right: Cell = { row: r, col: c + 1 };
        if (graph.hasPassage(cell, right)) passages.add(edgeKey(cell, right));
      }
    }
  }
  return passages;
}

/** Build a flat MazeGraph closing over a passage Set — O(1) hasPassage. */
function buildGraph(rows: number, cols: number, entry: Cell, exit: Cell, passages: Set<string>): MazeGraph {
  return {
    rows,
    cols,
    entry,
    exit,
    hasPassage(a: Cell, b: Cell): boolean {
      return passages.has(edgeKey(a, b));
    },
  };
}

/**
 * Apply a rotation to a flat passage Set: open `rot.open` (add the passage) and
 * close `rot.close` (remove the passage). Returns a new Set — `base` is left
 * unmodified, keeping the function pure.
 */
function applyRotationToSet(base: Set<string>, rot: WallRotation): Set<string> {
  const next = new Set(base);
  next.add(edgeKey(rot.open.a, rot.open.b));
  next.delete(edgeKey(rot.close.a, rot.close.b));
  return next;
}

// ── Wall ↔ lattice geometry (ADR-008) ────────────────────────────────────────

/** The two lattice-vertex endpoints of the wall between two adjacent cells. */
function wallVertices(edge: WallEdge): [Vertex, Vertex] {
  const { a, b } = edge;
  if (a.row !== b.row) {
    // horizontal wall on vertex-row max(rows), spanning column a.col
    const vr = Math.max(a.row, b.row);
    return [{ vr, vc: a.col }, { vr, vc: a.col + 1 }];
  }
  // vertical wall on vertex-col max(cols), spanning row a.row
  const vc = Math.max(a.col, b.col);
  return [{ vr: a.row, vc }, { vr: a.row + 1, vc }];
}

/** The interior wall (cell pair) a unit lattice edge represents; null at the border. */
function latticeEdgeToWall(p: Vertex, q: Vertex, rows: number, cols: number): WallEdge | null {
  if (p.vr === q.vr) {
    // horizontal lattice edge on vertex-row vr: separates cell (vr-1,c) and (vr,c)
    const vr = p.vr;
    const c = Math.min(p.vc, q.vc);
    if (vr < 1 || vr > rows - 1 || c < 0 || c > cols - 1) return null;
    return { a: { row: vr - 1, col: c }, b: { row: vr, col: c } };
  }
  // vertical lattice edge on vertex-col vc: separates cell (r,vc-1) and (r,vc)
  const vc = p.vc;
  const r = Math.min(p.vr, q.vr);
  if (vc < 1 || vc > cols - 1 || r < 0 || r > rows - 1) return null;
  return { a: { row: r, col: vc - 1 }, b: { row: r, col: vc } };
}

/**
 * Every way `wall` can rotate ~90° about one of its endpoints onto a perpendicular
 * edge that is currently free (a passage — no wall there). Conserves wall count.
 */
function rotationTargets(graph: MazeGraph, wall: WallEdge): WallRotation[] {
  const [v1, v2] = wallVertices(wall);
  const { rows, cols } = graph;
  const out: WallRotation[] = [];

  for (const pivot of [v1, v2]) {
    const other = pivot === v1 ? v2 : v1;
    const horizontal = pivot.vr === other.vr; // wall runs horizontally
    const perps: Vertex[] = horizontal
      ? [{ vr: 1, vc: 0 }, { vr: -1, vc: 0 }]
      : [{ vr: 0, vc: 1 }, { vr: 0, vc: -1 }];

    for (const d of perps) {
      const tip: Vertex = { vr: pivot.vr + d.vr, vc: pivot.vc + d.vc };
      if (tip.vr < 0 || tip.vr > rows || tip.vc < 0 || tip.vc > cols) continue;
      const target = latticeEdgeToWall(pivot, tip, rows, cols);
      if (!target) continue;
      if (!graph.hasPassage(target.a, target.b)) continue; // must rotate into a free edge
      out.push({ open: wall, close: target, pivot });
    }
  }
  return out;
}

/**
 * Shortest path from an arbitrary head cell to the exit, over the current
 * passages. Returns [] when the head cannot reach the exit. Used both as the
 * re-solve from the head and as the test-then-commit connectivity guard.
 */
export function solveFromHead(graph: MazeGraph, head: Cell): Cell[] {
  const cameFrom = new Map<string, Cell | null>();
  const queue: Cell[] = [head];
  cameFrom.set(cellKey(head), null);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (cellKey(current) === cellKey(graph.exit)) {
      const path: Cell[] = [];
      let node: Cell | null = current;
      while (node !== null) {
        path.unshift(node);
        node = cameFrom.get(cellKey(node)) ?? null;
      }
      return path;
    }
    for (const neighbour of orthogonalNeighbours(current, graph.rows, graph.cols)) {
      const key = cellKey(neighbour);
      if (!cameFrom.has(key) && graph.hasPassage(current, neighbour)) {
        cameFrom.set(key, current);
        queue.push(neighbour);
      }
    }
  }
  return [];
}

/**
 * Rotate one wall just ahead of the head (ADR-008). A candidate is a present
 * wall incident to a cell 2-5 steps ahead, rotated about a shared vertex onto a
 * perpendicular free edge. Neither the opened nor the closed edge may touch a
 * travelled cell (the past stays fixed), and the rotation is committed only if
 * the head can still reach the exit. Returns `rotation: null` when no legal move
 * exists (graceful no-op — never blanks the maze).
 */
export function mutateAhead(
  graph: MazeGraph,
  path: Cell[],
  headIndex: number,
  rng: () => number,
): RotationResult {
  const frontier = path.slice(headIndex + FRONTIER_MIN, headIndex + FRONTIER_MAX + 1);
  const travelled = new Set(path.slice(0, headIndex + 1).map(cellKey)); // frozen cells
  const head = path[headIndex];

  // Flat snapshot once: all candidate probing and guard BFS run against O(1)
  // hasPassage graphs, never chained closures.
  const base = passageSet(graph);
  const rebuild = (passages: Set<string>): MazeGraph =>
    buildGraph(graph.rows, graph.cols, graph.entry, graph.exit, passages);

  const candidates: WallRotation[] = [];
  const seenWalls = new Set<string>();
  for (const f of frontier) {
    for (const n of orthogonalNeighbours(f, graph.rows, graph.cols)) {
      if (graph.hasPassage(f, n)) continue; // need a present wall to open
      if (travelled.has(cellKey(n))) continue; // don't disturb the travelled past
      const wallK = edgeKey(f, n);
      if (seenWalls.has(wallK)) continue;
      seenWalls.add(wallK);

      for (const rot of rotationTargets(graph, { a: f, b: n })) {
        if (travelled.has(cellKey(rot.close.a)) || travelled.has(cellKey(rot.close.b))) continue;
        if (solveFromHead(rebuild(applyRotationToSet(base, rot)), head).length === 0) continue; // guard
        candidates.push(rot);
      }
    }
  }

  if (candidates.length === 0) return { graph, rotation: null };
  const rotation = candidates[Math.floor(rng() * candidates.length)];
  return { graph: rebuild(applyRotationToSet(base, rotation)), rotation };
}

/**
 * One tick of the living maze (ADR-007/008): advance the head one cell, rotate a
 * wall just ahead, and re-solve from the head — keeping the drawn-behind prefix
 * fixed so only the path ahead changes. Returns the same state (by reference)
 * once the head has reached the exit, which lets a driver detect completion.
 */
export function advanceThread(state: ThreadState, rng: () => number): ThreadState {
  const { graph, path, headIndex } = state;
  if (headIndex >= path.length - 1) return state;

  const nextHead = headIndex + 1;
  const { graph: nextGraph, rotation } = mutateAhead(graph, path, nextHead, rng);
  if (rotation === null) {
    return { graph, path, headIndex: nextHead, lastRotation: null };
  }

  const ahead = solveFromHead(nextGraph, path[nextHead]);
  const nextPath = path.slice(0, nextHead).concat(ahead);
  return { graph: nextGraph, path: nextPath, headIndex: nextHead, lastRotation: rotation };
}
