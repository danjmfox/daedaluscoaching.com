import { describe, it, expect } from "vitest";
import { generateMaze } from "../../../core/maze/generator";
import { solveMaze } from "../../../core/maze/solver";
import {
  renderPath,
  renderTrail,
  trailLength,
  wallRotationGeometry,
} from "../../../core/maze/renderer";
import type { WallRotation } from "../../../core/maze/types";

describe("renderPath", () => {
  const graph = generateMaze("render-test");
  const path = solveMaze(graph);
  const points = renderPath(path);

  it("returns a non-empty string", () => {
    expect(typeof points).toBe("string");
    expect(points.trim().length).toBeGreaterThan(0);
  });

  it("each point is a valid 'x,y' pair", () => {
    const pairs = points.trim().split(/\s+/);
    expect(pairs.length).toBeGreaterThan(0);
    for (const pair of pairs) {
      const [x, y] = pair.split(",").map(Number);
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
    }
  });

  it("starts at the entry point (420, 80 — right wall row 1)", () => {
    const firstPoint = points.trim().split(/\s+/)[0];
    expect(firstPoint).toBe("420,80");
  });

  it("is deterministic — same path produces same points", () => {
    expect(renderPath(path)).toBe(points);
  });
});

describe("renderTrail", () => {
  const graph = generateMaze("render-test");
  const solution = solveMaze(graph).solution;

  it("reports the drawn length: 20px entry stub plus 40px per travelled cell", () => {
    // lets the renderer dash-draw only the newest segment each tick
    expect(trailLength(0)).toBe(20);
    expect(trailLength(1)).toBe(60);
    expect(trailLength(7)).toBe(300);
  });

  it("draws only entry → head, never the route ahead of the head", () => {
    const trail = renderTrail(solution, 3).trim().split(/\s+/);

    // entry wall point + cells 0..3
    expect(trail).toHaveLength(5);
    expect(trail[0]).toBe("420,80");
  });
});

describe("wallRotationGeometry", () => {
  // Pivot at lattice vertex (1,1) = SVG (60,60).
  // close: horizontal wall between cells (0,1)/(1,1) → runs pivot → (100,60), i.e. 0°
  // open:  vertical wall between cells (0,0)/(0,1) → runs pivot → (60,20), i.e. -90°
  const rotation: WallRotation = {
    open: { a: { row: 0, col: 0 }, b: { row: 0, col: 1 } },
    close: { a: { row: 0, col: 1 }, b: { row: 1, col: 1 } },
    pivot: { vr: 1, vc: 1 },
  };

  it("anchors the segment at the pivot and sweeps it in from the vacated edge", () => {
    const g = wallRotationGeometry(rotation);

    expect([g.pivotX, g.pivotY]).toEqual([60, 60]);
    expect([g.x1, g.y1]).toEqual([60, 60]);
    expect([g.x2, g.y2]).toEqual([100, 60]);
    expect(g.fromDeg).toBe(-90);
  });
});
