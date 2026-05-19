# Slice 01 — URL Seed Composable

## Feature: seed-maze-generator | Effort: ~3h

## Goal

Prove the URL plumbing end-to-end using the existing hand-crafted SVG.
No maze generation yet. Seeds flow through; animation plays.

## IN Scope

- `composables/useMazeSeed.ts`: reads `?maze=` param; generates 6-char alphanumeric seed if absent; writes to URL via `replaceState`
- Wire `MazeLogo.vue` to accept `seed` prop and read from composable
- Existing SVG renders with animation (no generation change)

## OUT Scope

- Maze generation algorithm
- Dynamic SVG rendering
- Homepage hero

## Learning Hypothesis

Disproves: "URL seed management requires a router plugin or Nuxt middleware"
Confirms if it succeeds: composable + `replaceState` is sufficient; no navigation side effects

## Acceptance Criteria

- `?maze=test123` in URL → composable returns `"test123"`
- No URL param → composable generates seed, URL becomes `?maze=<generated>` before first paint
- Seed visible in address bar before animation frame 1
- `useMazeSeed` has unit tests covering: param present, param absent, replaceState called once

## Dependencies

None — uses existing SVG and animation

## Estimate

~3h | Reference class: composable + URL integration (similar to useCookieNotice pattern in codebase)
