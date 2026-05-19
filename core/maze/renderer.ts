import type { ThreadPath, Cell, BacktrackExcursion } from "./types"
import { CELL_SIZE } from "./generator"

// ── Coordinate helpers ───────────────────────────────────────────────────────

// Cell centre in SVG space (440×440 canvas, 20px border, 40px cells)
// e.g. (row=1, col=9) → (400, 80)
function cellCentre(cell: Cell): { x: number; y: number } {
  return {
    x: 20 + cell.col * CELL_SIZE + CELL_SIZE / 2,
    y: 20 + cell.row * CELL_SIZE + CELL_SIZE / 2,
  }
}

// Right-wall external point (entry and exit gap, 20px outside col 9)
// e.g. row 1 → (420, 80), row 9 → (420, 400)
function wallPoint(cell: Cell): { x: number; y: number } {
  const c = cellCentre(cell)
  return { x: c.x + CELL_SIZE / 2, y: c.y }
}

function pt(p: { x: number; y: number }): string {
  return `${p.x},${p.y}`
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
export function renderPath(path: ThreadPath): string {
  const { solution, backtracks } = path

  // Index backtracks by origin cell key for O(1) lookup
  const backtrackByOrigin = new Map<string, BacktrackExcursion>()
  for (const bt of backtracks) {
    backtrackByOrigin.set(`${bt.origin.row},${bt.origin.col}`, bt)
  }

  const points: string[] = []

  // Entry: external wall point before first solution cell
  points.push(pt(wallPoint(solution[0])))

  for (const cell of solution) {
    // Emit the solution cell
    points.push(pt(cellCentre(cell)))

    // If this cell is a backtrack origin, weave the branch in-and-out
    const bt = backtrackByOrigin.get(`${cell.row},${cell.col}`)
    if (bt) {
      // Branch forward to dead end
      for (const b of bt.path) {
        points.push(pt(cellCentre(b)))
      }
      // Retrace back toward origin (skip dead-end, stop before origin)
      for (let i = bt.path.length - 2; i >= 0; i--) {
        points.push(pt(cellCentre(bt.path[i])))
      }
      // Return to origin
      points.push(pt(cellCentre(cell)))
    }
  }

  // Exit: external wall point after last solution cell
  points.push(pt(wallPoint(solution[solution.length - 1])))

  return points.join(" ")
}
