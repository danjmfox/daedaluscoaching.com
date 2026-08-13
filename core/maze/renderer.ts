import type {
  ThreadPath,
  Cell,
  BacktrackExcursion,
  Vertex,
  WallEdge,
  WallRotation,
} from "./types";
import { CELL_SIZE } from "./generator";
import { wallVertices } from "./mutate";

// ── Coordinate helpers ───────────────────────────────────────────────────────

// Cell centre in SVG space (440×440 canvas, 20px border, 40px cells)
// e.g. (row=1, col=9) → (400, 80)
function cellCentre(cell: Cell): { x: number; y: number } {
  return {
    x: 20 + cell.col * CELL_SIZE + CELL_SIZE / 2,
    y: 20 + cell.row * CELL_SIZE + CELL_SIZE / 2,
  };
}

// Right-wall external point (entry and exit gap, 20px outside col 9)
// e.g. row 1 → (420, 80), row 9 → (420, 400)
function wallPoint(cell: Cell): { x: number; y: number } {
  const c = cellCentre(cell);
  return { x: c.x + CELL_SIZE / 2, y: c.y };
}

function pt(p: { x: number; y: number }): string {
  return `${p.x},${p.y}`;
}

// ── Renderer ─────────────────────────────────────────────────────────────────

/**
 * Converts a ThreadPath into an SVG polyline points string.
 *
 * Layout:
 *   entry_wall_point → solution cells (with backtracks interleaved) → exit_wall_point
 *
 * Each backtrack at origin:
 *   origin → branch[0] → … → branch[n-1] → branch[n-2] → … → branch[0] → origin
 *   (the doubled line visually shows the false-start retrace)
 */
/** Lattice corner in SVG space — the point a rotating wall pivots about. */
function vertexPoint(v: Vertex): { x: number; y: number } {
  return { x: 20 + v.vc * CELL_SIZE, y: 20 + v.vr * CELL_SIZE };
}

/** The endpoint of `edge` that is not the pivot. */
function farVertex(edge: WallEdge, pivot: Vertex): Vertex {
  const [p, q] = wallVertices(edge);
  return p.vr === pivot.vr && p.vc === pivot.vc ? q : p;
}

export interface RotationGeometry {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly pivotX: number;
  readonly pivotY: number;
  /** Degrees to rotate the segment by so it starts on the vacated edge. */
  readonly fromDeg: number;
}

/**
 * SVG geometry for one rotating wall (ADR-008): the segment drawn in its landed
 * position, plus the pivot and the offset angle it sweeps in from. Always a
 * multiple of 90° — the lattice is axis-aligned, so the angle is rounded.
 */
export function wallRotationGeometry(rotation: WallRotation): RotationGeometry {
  const pivot = vertexPoint(rotation.pivot);
  const landed = vertexPoint(farVertex(rotation.close, rotation.pivot));
  const vacated = vertexPoint(farVertex(rotation.open, rotation.pivot));

  const bearing = (p: { x: number; y: number }) =>
    (Math.atan2(p.y - pivot.y, p.x - pivot.x) * 180) / Math.PI;
  const fromDeg =
    ((Math.round(bearing(vacated) - bearing(landed)) + 540) % 360) - 180;

  return {
    x1: pivot.x,
    y1: pivot.y,
    x2: landed.x,
    y2: landed.y,
    pivotX: pivot.x,
    pivotY: pivot.y,
    fromDeg,
  };
}

/** Entry stub is half a cell; every step after it is one full cell. */
export const TRAIL_STEP = CELL_SIZE;

/**
 * Drawn length of the trail in SVG units. The renderer dashes the newest
 * `TRAIL_STEP` in over one tick, so growth reads as continuous rather than
 * jumping a whole cell at a time.
 */
export function trailLength(headIndex: number): number {
  return CELL_SIZE / 2 + headIndex * CELL_SIZE;
}

/**
 * Polyline points for the travelled trail: entry wall point → cells up to and
 * including the head. The route ahead is never drawn — the maze reads as being
 * explored, not solved, so a re-route ahead of the head is invisible.
 */
export function renderTrail(path: Cell[], headIndex: number): string {
  if (path.length === 0) return "";

  const points = [pt(wallPoint(path[0]))];
  for (const cell of path.slice(0, headIndex + 1)) {
    points.push(pt(cellCentre(cell)));
  }
  return points.join(" ");
}

export function renderPath(path: ThreadPath): string {
  const { solution, backtracks } = path;

  // Index backtracks by origin cell key for O(1) lookup
  const backtrackByOrigin = new Map<string, BacktrackExcursion>();
  for (const bt of backtracks) {
    backtrackByOrigin.set(`${bt.origin.row},${bt.origin.col}`, bt);
  }

  const points: string[] = [];

  // Entry: external wall point before first solution cell
  points.push(pt(wallPoint(solution[0])));

  for (const cell of solution) {
    // Emit the solution cell
    points.push(pt(cellCentre(cell)));

    // If this cell is a backtrack origin, weave the branch in-and-out
    const bt = backtrackByOrigin.get(`${cell.row},${cell.col}`);
    if (bt) {
      // Branch forward to dead end
      for (const b of bt.path) {
        points.push(pt(cellCentre(b)));
      }
      // Retrace back toward origin (skip dead-end, stop before origin)
      for (let i = bt.path.length - 2; i >= 0; i--) {
        points.push(pt(cellCentre(bt.path[i])));
      }
      // Return to origin
      points.push(pt(cellCentre(cell)));
    }
  }

  // Exit: external wall point after last solution cell
  points.push(pt(wallPoint(solution[solution.length - 1])));

  return points.join(" ");
}
