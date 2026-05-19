# DESIGN Decisions — seed-maze-generator

## Date: 2026-05-18 | Architect: Morgan (nw-solution-architect)

## Key Decisions

- [DA-1] Application scope only — no new bounded contexts or infrastructure
- [DA-6] Recursive backtracking — perfect maze (one solution), deterministic, testable in isolation
- [DA-7] mulberry32 PRNG + djb2 hash — zero dependencies, 10 lines total
- [DA-8] Computed Vue template SVG — no SVG library, walls are `<line>` elements, thread is `<polyline>`
- [DA-9] CSS stroke-dashoffset animation — dashTotal computed from path, not hardcoded

## Architecture Summary

- Pattern: Pure Core / Imperative Shell (project default, enforced by dep-cruiser)
- Paradigm: Functional (pure functions in core/, side effects isolated to composable)
- Key components: `core/maze/` (5 pure TS files) + `useMazeSeed.ts` + `MazeLogo.vue` + `MazeHero.vue`

## Reuse Analysis

| Existing Component          | File           | Overlap                  | Decision          | Justification                    |
| --------------------------- | -------------- | ------------------------ | ----------------- | -------------------------------- |
| `useContact.ts`             | `composables/` | URL param pattern        | EXTEND pattern    | Own file; distinct concern       |
| `core/swoopy/swoopy-url.ts` | `core/swoopy/` | Pure function convention | EXTEND convention | Same zero-import rule            |
| `SwoopyEmbed.vue`           | `components/`  | SVG in component         | CREATE NEW        | iframe vs inline SVG — different |
| Static logo SVG             | `public/`      | Logo visual              | REPLACE           | Static → dynamic component       |

## Technology Stack

- mulberry32 PRNG: inline (no package)
- djb2 hash: inline (no package)
- Vue template SVG: no library
- CSS animation: stroke-dashoffset (existing spec)
- Vitest + Stryker: existing toolchain

## Constraints Established

- `core/maze/` must have zero imports from Vue/Nuxt/browser (dep-cruiser enforced)
- Cell size: 40×40px, canvas 440×440 (matches existing design)
- D-C boundary crossings ≤ 2 (narrative constraint from DISCUSS)
- `history.replaceState` only — no router navigation, no storage

## Open Questions (deferred to DELIVER)

- OQ-1: Wing paths inline vs asset
- OQ-2: MazeHero viewport size
- OQ-3: Stryker scope (include renderer?)
- OQ-4: Seed length / entropy verification

## Upstream Changes

None — DESIGN is consistent with all DISCUSS decisions.
