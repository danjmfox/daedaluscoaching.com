# ADR-006: Testing Strategy — Outside-In TDD with Mutation Testing on Core

status: Accepted
date: 2026-05-12
deciders: Daniel Osborne (owner/developer)
wave: DESIGN

---

## Context

The DISCOVER wave established that tests in the prior codebase were stale scaffolding (S5 —
past behaviour). The redesign starts with a clean TDD commitment. The owner's global
engineering defaults specify Outside-In TDD (double loop: BDD acceptance test outer,
unit tests inner) and Stryker mutation testing at 85% kill rate for core modules.

The architecture (ADR-001) creates a testable `core/` layer of pure functions — no mocks
required, no framework dependencies. This makes Stryker viable without test-environment
complexity.

## Decision

**Unit testing (Vitest)**: All `core/` modules tested with Vitest. No mocks. Pure function
in, assertion out. Stryker mutation testing targets `core/` with 85% kill rate target.
Stryker is run on demand (`/nw-mutation-test`), not as a merge gate (hobby project
on Claude Pro — gates are on-demand per CLAUDE.md nWave Rigor Profile).

**Component testing (Vitest + Vue Test Utils)**: Shell-layer composables and Vue components
tested at the component level. Composables that cross the port boundary use the port
interface (typed function signature) to inject test doubles — no framework-level mocking.

**End-to-end testing (Playwright)**: Critical user journeys tested:
- Warm referral visitor reads homepage, finds CTA, submits contact form
- Owner navigates to Swoopy embed, sees diagram load

Playwright tests are the outer loop in Outside-In TDD — they define the acceptance criterion
before any component work begins (Walking Skeleton first).

**Mutation testing scope**: `core/contact/`, `core/swoopy/`, `core/content/` (if
content adapter port logic is non-trivial). Shell layer excluded from Stryker — mutation
testing Vue reactivity and HTTP handlers is disproportionate effort for the value.

Stryker is bootstrapped via `npx stryker init` which generates `stryker.config.mjs` with
the `@stryker-mutator/vitest-runner` targeting `core/`. Treat as a one-time setup task in
Sprint 1 — not a per-feature cost.

**Pre-commit gate**: `pnpm test --run` (Vitest unit + component tests) via lefthook.
Playwright e2e not in pre-commit (too slow) — runs in CI on push.

## Alternatives Considered

### Option A: Test-after (write code, then write tests to cover it)
Faster to initial commit. Rejected: reproduces the S5 anti-pattern (stale scaffolding).
Tests written after implementation describe what the code does, not what it should do.

### Option B (chosen): Outside-In TDD (double loop)
Playwright acceptance test defines the behaviour. Vitest unit tests drive the implementation.
Stryker validates that unit tests would catch real bugs. Selected because it matches
owner's committed methodology and makes the `core/` purity architectural constraint
empirically verifiable.

### Option C: Property-based testing only (fast-check)
Replaces unit tests with property specifications. Aspirational for a learner. Rejected as
default: property-based thinking requires fluency the owner is building. fast-check is
available as an addition to the strategy for validation rules (e.g., contact schema
round-trip properties), not a replacement.

## Consequences

Positive:
- Playwright acceptance tests prevent Tested-But-Unwired (TBU) failures
- Stryker on `core/` verifies that test suite catches real bugs, not just executes lines
- Pre-commit gate blocks commits with failing unit tests — no stale scaffolding

Negative:
- Playwright setup (browser install, CI integration) has upfront cost
- Stryker first run on a new codebase requires configuration tuning (timeout, file
  inclusion patterns) — treat as a one-time setup cost

## Earned Trust: Test Infrastructure Probe

CI must verify that Playwright browsers are installed and can launch before running e2e tests.
A failing browser install that silently skips e2e tests would mean the outer TDD loop is
unwired without the developer knowing. The CI pipeline must assert on Playwright's exit code
from `playwright install --with-deps` before executing test suites.
