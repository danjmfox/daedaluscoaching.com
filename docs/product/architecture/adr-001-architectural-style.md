# ADR-001: Architectural Style — Pure Core / Imperative Shell (Hexagonal via Functions)

status: Accepted
date: 2026-05-12
deciders: Daniel Osborne (owner/developer)
wave: DESIGN

---

## Context

Daedalus Coaching website is a greenfield Nuxt 3 (Vue + Vite + SSG) project for a solo
practitioner. The codebase is simultaneously a production site and a Vue/Nuxt learning harness.
Quality attributes ranked by the owner: maintainability > testability > time-to-market >
operational simplicity. Team size: 1 developer.

The DISCOVER wave established:
- Contact form submission is the primary conversion action (single CTA per page)
- Zod validation is required at the contact form boundary
- Markdown-in-repo (@nuxt/content) is the content source (H3 walkthrough not yet complete)
- Swoopy React app must be served at `/swoopy/` via Netlify proxy
- Stryker mutation testing is in scope for pure logic modules

The owner's global engineering defaults (CLAUDE.md) specify Pure Core / Imperative Shell as the
architecture default for any project with a domain model, persistence, or external services.

## Decision

Adopt **Pure Core / Imperative Shell** (hexagonal architecture expressed through functions, not
classes) as the architectural style for the entire Nuxt 3 application.

Concretely:
- **Core** (`core/`): pure functions only. No Vue reactivity, no Nuxt composables, no fetch,
  no filesystem access. Domain logic, validation schemas (Zod), and data transformations live here.
  Fully testable with Vitest and no mocks. Stryker mutation testing applies to this layer.
- **Shell** (`composables/`, `server/api/`, Vue components): all I/O, side effects, and
  framework bindings. Imports from `core/` but never the reverse.
- **Ports**: function type signatures at the `core/shell` boundary, defined in `core/`.
  Shell adapters implement those signatures. No DI container — dependency injection via
  parameter passing.
- **Enforcement**: dependency-cruiser in CI enforces that `core/` never imports from
  `composables/`, `server/`, `components/`, or `pages/`. Violation = build failure.

## Alternatives Considered

### Option A: Layered architecture (pages → composables → services → utilities)
Standard Vue/Nuxt convention. No explicit dependency rule. Rejected because: no enforcement
mechanism, core logic drifts into composables over time, Zod schemas scatter, testability
degrades without mocks. Adequate for a tutorial project; inadequate for a TDD-committed
production site with mutation testing in scope.

### Option B (chosen): Pure Core / Imperative Shell
See Decision above. Selected because it matches owner's CLAUDE.md default, makes Stryker
mutation testing viable without mocks, and enforces the boundary mechanically via
dependency-cruiser.

### Option C: Feature-folder structure with no explicit core
Co-locates all logic per feature (contact/, home/, swoopy/). Rejects the
core/shell distinction. Appealing for discoverability but collapses testability — Zod schemas
and transformation logic are co-located with Vue reactivity, making mutation testing
impractical. Rejected on testability grounds.

## Consequences

Positive:
- `core/` modules are pure and testable without mocks — Stryker mutation testing is viable
- Dependency-cruiser enforces the boundary; it cannot erode silently
- Shell adapters are replaceable (e.g. if H3 walkthrough fails, content adapter swaps without
  touching core logic)
- Consistent with owner's global engineering defaults — no cognitive overhead for future work

Negative:
- Requires discipline for a learner: must resist the temptation to call `useFetch` inside `core/`
- Some Nuxt patterns (auto-imports, composables) feel natural to put in core — dependency-cruiser
  catches this early
- Slightly more directory structure than a tutorial-style Nuxt project
