/**
 * Walking skeleton — proves the full core/maze/ pipeline:
 * seed → MazeGraph → ThreadPath → SVG polyline points
 *
 * @walking_skeleton @strategy-a
 * This is the first test to go GREEN. All other tests build on it.
 */
import { describe, it, expect } from "vitest";
import { generateMaze } from "../../../core/maze/generator";
import { solveMaze } from "../../../core/maze/solver";
import { renderPath } from "../../../core/maze/renderer";

describe("seed-maze pipeline (walking skeleton)", () => {
  it("produces SVG polyline points from a seed string", () => {
    const graph = generateMaze("daedalus");
    const path = solveMaze(graph);
    const points = renderPath(path);

    expect(points).toBeTruthy();
    expect(path.strokeDashTotal).toBeGreaterThan(0);
  });

  it("same seed always produces same SVG output", () => {
    const run = (seed: string) => renderPath(solveMaze(generateMaze(seed)));
    expect(run("labyrinth")).toBe(run("labyrinth"));
    expect(run("coaching")).toBe(run("coaching"));
  });

  it("different seeds produce different SVG output", () => {
    const run = (seed: string) => renderPath(solveMaze(generateMaze(seed)));
    expect(run("alpha")).not.toBe(run("beta"));
  });
});
