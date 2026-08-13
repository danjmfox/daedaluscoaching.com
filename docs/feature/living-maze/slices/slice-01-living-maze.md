# Slice 01 — Living maze (single slice)

**Stories**: US-LM-001, US-LM-002, US-LM-003 · **Job**: JOB-MZ-002 · **Type**: bug fix + core primitive + presentation
**Est**: ~1–2 days (owner chose one slice over a 3-way carpaccio split — see note)

## Goal

The homepage maze evolves correctly and legibly: the travelled past stays fixed, walls change only
by rotating into a free edge (staying solvable), and those changes are _animated_ (pivot, not snap).

## Ordered internal checkpoints (land in this order — correctness first)

1. **Past-route invariant** (US-LM-001) — `mutateAhead` excludes walls incident to any travelled
   cell (at/behind `headIndex`); `solveFromHead` excludes the fixed prefix so the re-solve cannot
   re-enter travelled cells. Property test (fast-check) + deletion check.
2. **Rotate-into-free-edge primitive** (US-LM-002) — replace open-a-wall with a single segment
   rotating ~90° about a shared endpoint into a wall-less adjacent edge; test-then-commit
   connectivity guard (reuse BFS in `core/maze/generator.ts`); measure liveliness ≥60%.
3. **Animated wall rotation** (US-LM-003) — emit rotation data through the playback frame; SVG
   transform-origin pivot in `MazeLogo.vue`/`MazeHero.vue`; reduced-motion keeps the static frame
   (`composables/useLivingMaze.ts:67`).

## IN scope

- `core/maze/mutate.ts` (checkpoints 1 + 2), `core/maze/types.ts` + `composables/playback/` frame
  payload (checkpoint 3), `MazeLogo.vue`/`MazeHero.vue` rotation rendering, unit/property tests.

## OUT scope

- Deploy (owner-gated, no-push rule). Other `ThreadPlayback` adapters. Seed/curation UI.
  Maze size/palette/layout changes.

## Learning hypotheses (per checkpoint)

- **C1** disproves "past-route bug is a pure locus/exclusion bug" if excluding travelled cells does
  NOT stop the visible past-rewriting (→ it's the draw model, not the engine).
- **C2** disproves "rotate-into-free-edge stays lively" if <60% of ticks show a visible frontier
  change. **Highest-risk question** — answered before the animation work (checkpoint 3) is built;
  if it fails, stop and re-design before investing in motion.
- **C3** disproves "animated rotation reads as deliberate" if local observation shows distraction,
  flicker, or jank on a mid-tier device.

## Acceptance criteria

- US-LM-001 AC1–AC4, US-LM-002 AC1–AC4, US-LM-003 AC1–AC4 (see `feature-delta.md`).
- Verify locally via the preview workflow (render homepage, observe pivot, toggle reduced-motion).

## Dependencies

- Existing WIP (kept & corrected): `mutate.ts`, `types.ts`, `playback/jsHeadPlayback.ts`,
  `useLivingMaze.ts`. ADR-007 (Proposed). New ADR (rotate primitive + animation) authored in DESIGN.

## Reference class

- seed-maze-generator (DELIVERED) core pipeline; ADR-007 connectivity guard + graceful degradation.

## Note on one-slice choice

Carpaccio ideal is ≤1 day/slice; this slice is thicker by owner decision. Mitigation: the three
internal checkpoints are each independently verifiable, so the de-risking order (correctness →
liveliness → motion) is preserved even though they ship on one branch.
