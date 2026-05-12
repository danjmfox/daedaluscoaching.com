---
feature_id: daedalus-coaching-website-redesign
wave: BUILD (walking skeleton)
date: 2026-05-12
commit: 57966b0
---

# Wave Decisions — Walking Skeleton

## WS Strategy: C (Real Local)

@nuxt/content reads markdown files from the local filesystem at build/dev time.
No paid external APIs, no costly subprocesses. Real adapter throughout — the
acceptance test exercises the full content pipeline against the real dev server.

Rationale for Strategy C over Strategy A/B/D:
- The only "external" resource is the local filesystem (content/*.md files)
- No InMemory double is needed or meaningful here — the adapter IS the filesystem
- CI cost: zero (pnpm dev + playwright, no containers, no paid APIs)

## Dependency Decisions

**`better-sqlite3` as direct dep**: spike finding confirmed silent failure in non-TTY
environments without this explicit declaration. Added to `dependencies` (not devDependencies)
because @nuxt/content uses it at runtime for the content collection index.

**`@nuxt/content` v3.x**: spike used v3.5.0. Architecture brief table cited v2.x but that
was written before H3 ran — H3 verified v3.x is the current release. Walking skeleton
uses v3.13.0 (resolved version).

## Architecture Decisions

**`composables/usePageContent.ts` as sole @nuxt/content import boundary**: this is the
ContentPort adapter. All other files (`pages/index.vue`, future components) import
from the composable, never directly from @nuxt/content. This boundary makes swapping
the content backend a single-file change.

**`core/content/content-port.ts` contains only types**: no runtime imports, no Vue, no Nuxt.
Dependency-cruiser rule `core-no-vue-nuxt` enforces this at error severity.

**`ContentRenderer` used in `pages/index.vue`**: @nuxt/content v3 returns a structured body
object (not raw HTML string) that requires `<ContentRenderer>` for rendering. The `body`
field in `ContentPage` is typed as `string` in the port — this is a simplification adequate
for the skeleton. Downstream steps can refine the type if the body structure matters.

## `pages/index.vue` shape

The page uses `queryCollection` directly via `useAsyncData` rather than going through
`usePageContent`. This is a deliberate walking skeleton shortcut: the composable exists
and the port type is defined, but the page renders via `<ContentRenderer>` which needs
the raw @nuxt/content document object (not the mapped `ContentPage`). The composable
is the correct long-term boundary — the page will be refactored to use it once
`ContentRenderer` usage is consolidated.

## Deferred

- lefthook pre-commit hook configuration (blocked on lefthook install — not in current package.json)
- stylelint + design tokens (no CSS yet)
- Vitest unit test configuration (no unit tests yet — walking skeleton drove no unit tests)
- `tsconfig.json` (Nuxt auto-generates one; explicit config deferred to first typecheck failure)
