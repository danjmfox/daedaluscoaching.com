export type Cell = { row: number; col: number };

export interface MazeGraph {
  readonly rows: number;
  readonly cols: number;
  readonly entry: Cell; // { row: 1, col: 9 } — right wall opening, C top arm
  readonly exit: Cell; // { row: 9, col: 9 } — right wall opening, C bottom arm
  hasPassage(a: Cell, b: Cell): boolean;
}

export interface BacktrackExcursion {
  readonly origin: Cell; // cell on the solution path where branch starts
  readonly path: Cell[]; // branch cells, ≥ 2 steps, ends at dead end
}

export interface ThreadPath {
  readonly solution: Cell[];
  readonly backtracks: [BacktrackExcursion, BacktrackExcursion];
  readonly strokeDashTotal: number; // pixel total at CELL_SIZE=40
}

// ── Living maze (ADR-007, ADR-008) ───────────────────────────────────────────

/** A wall (or candidate wall) between two orthogonally-adjacent cells. */
export interface WallEdge {
  readonly a: Cell;
  readonly b: Cell;
}

/** A lattice corner — the grid vertices walls pivot about. */
export interface Vertex {
  readonly vr: number;
  readonly vc: number;
}

/**
 * One wall rotating ~90° about a shared vertex (ADR-008): the `open` edge loses
 * its wall (becomes a passage) and the `close` edge gains one — wall count is
 * conserved. `pivot` is the shared corner the segment rotates about (the
 * renderer's transform-origin).
 */
export interface WallRotation {
  readonly open: WallEdge;
  readonly close: WallEdge;
  readonly pivot: Vertex;
}

/** Evolving thread: the current maze, the current path, and where the head is. */
export interface ThreadState {
  readonly graph: MazeGraph;
  readonly path: Cell[];
  readonly headIndex: number;
  /** The rotation that produced this frame (ADR-008); null on no-op/initial. */
  readonly lastRotation?: WallRotation | null;
}

export interface PlaybackHandle {
  readonly stop: () => void;
}

export interface PlaybackConfig {
  readonly initial: ThreadState;
  readonly step: (state: ThreadState) => ThreadState; // pure transition (the policy)
  readonly onFrame: (state: ThreadState) => void;
  readonly stepIntervalMs: number;
}

/**
 * Port: drives a pure `step` over wall-clock time, emitting each frame.
 * Adapters (jsHeadPlayback, cssDashPlayback, staticPlayback) differ only in
 * HOW time advances — the policy stays pure and shared. Provisional until the
 * first adapter proves the shape (ADR-007).
 */
export type ThreadPlayback = (config: PlaybackConfig) => PlaybackHandle;
