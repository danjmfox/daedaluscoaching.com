# DISCUSS Decisions — seed-maze-generator

## Date: 2026-05-18

## Key Decisions

- [D1] Seed lifecycle = per-page stateless: no sessionStorage/localStorage; `replaceState` only (see feature-delta.md)
- [D2] Two surfaces: logo (header, 440×440) + homepage hero (responsive, index.vue only)
- [D3] Client-side rendering: SSG constraint rules out server routes
- [D4] Pure Core / Shell: `core/maze/` pure TS, composable owns side effects, components own DOM
- [D5] C-once animation: calculated stroke-dasharray, not hardcoded

## Scope Assessment: PASS

6 stories → 6 slices, each ≤ 1 day. No bounded context crossings beyond core↔shell↔presentation
(already the project default). Right-sized.

## Requirements Summary

- Primary jobs: owner curation of seeded mazes; visitor delight on homepage
- Walking skeleton: Slice 01 proves URL plumbing with existing SVG before any generation
- Feature type: user-facing + cross-cutting (core logic + composable + two components)

## Constraints Established

- `core/maze/` must import nothing from Vue, Nuxt, or browser — enforced by dependency-cruiser
- D-C boundary crossings ≤ 2 per maze (preserves D-as-labyrinth visual narrative)
- Backtrack excursions must land in rows 0–2 or 8–9 (visible zones above/below wings)
- Animation: draw-on linear → hold → ease-out extension (C-once spec)

## Upstream Changes

None — this feature has no prior DISCOVER wave. No SSOT assumptions changed.
