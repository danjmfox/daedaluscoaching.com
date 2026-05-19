import { describe, it, expect } from "vitest";
import { generateMaze } from "../../../core/maze/generator";
import { solveMaze } from "../../../core/maze/solver";
import { renderPath } from "../../../core/maze/renderer";

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
