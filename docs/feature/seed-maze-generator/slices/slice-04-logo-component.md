# Slice 04 — MazeLogo Component (Dynamic)

## Feature: seed-maze-generator | Effort: ~4h

## Goal

Replace the static hand-crafted SVG with a dynamically generated one.
Logo renders the correct maze for any seed. Animation works.

## IN Scope

- `MazeLogo.vue` rewritten to: call `useMazeSeed`, call `generateMaze`, call `solveMaze`, render SVG walls + thread dynamically
- C-once animation wired to computed `strokeDashTotal` (no hardcoded 1180)
- Wings overlay kept as static paths (they don't change with seed)
- Storybook story or manual test confirming 3 different seeds render 3 different mazes

## OUT Scope

- Homepage hero (Slice 05)
- Responsive sizing

## Learning Hypothesis

Disproves: "dynamic SVG wall rendering is slow enough to cause a visible flash before animation"
Confirms if it succeeds: synchronous generation + animation-delay=0.5s is enough to hide generation time

## Acceptance Criteria

- `?maze=abc` → maze rendered matches `generateMaze("abc")` wall structure
- `?maze=abc` reloaded → identical SVG (determinism end-to-end)
- Animation begins automatically, plays once (C-once)
- No hardcoded stroke-dasharray value in template — value is computed
- Component passes `seed` prop to override URL (for testing)

## Dependencies

Slices 01 + 02 + 03

## Estimate

~4h
