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
