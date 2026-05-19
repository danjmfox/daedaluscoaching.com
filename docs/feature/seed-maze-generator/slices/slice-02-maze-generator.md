# Slice 02 — Core Maze Generator

## Feature: seed-maze-generator | Effort: ~4h

## Goal

Pure function: seed string → valid solvable 10×10 MazeGraph. Testable in isolation.

## IN Scope

- `core/maze/prng.ts`: mulberry32 PRNG + string-to-uint32 hash (djb2 or similar)
- `core/maze/generator.ts`: recursive backtracking with seeded PRNG, constrained entry/exit
- `core/maze/types.ts`: MazeGraph, Cell, Wall types
- Unit tests: determinism, solvability, D-C boundary constraint (≤2 crossings)

## OUT Scope

- Solver (Slice 03)
- SVG rendering (Slice 04)
- Vue integration

## Learning Hypothesis

Disproves: "recursive backtracking with constraints on a 10×10 grid is complex enough to need a library"
Confirms if it succeeds: ~100 lines of pure TS is sufficient; constraints (C-mouth entry/exit, D-C limit) can be enforced post-generation via wall removal

## Acceptance Criteria

- `generateMaze("same-seed")` called 3× returns identical wall sets
- `generateMaze("seed-a")` ≠ `generateMaze("seed-b")` for 100 random seed pairs
- BFS from entry to exit finds exactly one solution (tested on 50 random seeds)
- `core/maze/generator.ts` has 0 imports from Vue, Nuxt, or browser (dep-cruiser)
- Stryker kill rate ≥ 80% on generator + prng

## Dependencies

Slice 01 (types defined here flow to 03 and 04, but Slice 01 can land independently)

## Estimate

~4h | Reference class: clean algorithm, no I/O
