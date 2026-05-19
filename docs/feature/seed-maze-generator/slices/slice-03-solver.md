# Slice 03 — Maze Solver + Thread Path

## Feature: seed-maze-generator | Effort: ~3h

## Goal

Pure function: MazeGraph → ThreadPath with solution waypoints, 2 visible backtrack excursions,
and calculated strokeDashTotal.

## IN Scope

- `core/maze/solver.ts`: BFS solution finder + dead-end picker for visible zones
- `core/maze/renderer.ts`: ThreadPath → polyline points string + strokeDashTotal
- Unit tests: backtrack zone constraint, step count, dashTotal accuracy

## OUT Scope

- Vue integration
- SVG wall rendering

## Learning Hypothesis

Disproves: "finding dead-end excursions in the visible zone requires backtracking the full maze"
Confirms if it succeeds: a simple post-BFS scan of cells adjacent to the solution path is sufficient

## Acceptance Criteria

- Solver returns exactly 2 backtrack excursions, each ≥ 2 steps
- Both excursions originate from visible-zone cells (rows 0–2 or 8–9, or col 0)
- `strokeDashTotal` matches manual sum of segment lengths (pixel-accurate)
- Solver tested on 20 randomly generated mazes (no crashes, always 2 excursions found)
- `core/maze/solver.ts` and `core/maze/renderer.ts` import nothing from Vue/Nuxt/browser

## Dependencies

Slice 02 (MazeGraph type + generateMaze)

## Estimate

~3h
