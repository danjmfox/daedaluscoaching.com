# ADR-005: Design Token Enforcement — CSS Custom Properties + Build-Time Linting

status: Accepted
date: 2026-05-12
deciders: Daniel Osborne (owner/developer)
wave: DESIGN

---

## Context

OPP-02 (score 15): visual incoherence is the second-highest ranked opportunity. The DISCOVER
wave established that 4+ visual experiments were attempted and reverted (S1). H2 hypothesis:
a single coherent visual system enforced at build time will prevent further experiment churn.

H2 is marked Inconclusive (requires post-launch validation), but the architectural decision —
how to enforce design tokens so that ad-hoc overrides fail builds rather than accumulate
silently — must be made now.

## Decision

Design tokens are defined as CSS Custom Properties in a single `assets/tokens.css` file.
All component styles reference these custom properties. Hard-coded colour, typography, or
spacing values in component `<style>` blocks are a lint violation.

**Enforcement mechanism**: Stylelint with the `stylelint-declaration-strict-value` plugin.
Rules configured to require `var(--token-*)` for colour, font-family, font-size, and
spacing properties. Stylelint runs in the lefthook pre-commit hook and in CI.

A component `<style>` block using `color: #2c3e50` instead of `color: var(--color-text-primary)`
fails the pre-commit hook. The violation is caught before it reaches the repo.

This is the architectural enforcement of H2 — not a process commitment, but a mechanical
gate. The owner cannot accidentally circumvent it (the pre-commit hook blocks the commit).

## Alternatives Considered

### Option A: Design tokens as a Figma source of truth (Figma Tokens plugin)
Token sync from Figma to CSS. Appropriate for multi-designer teams. Rejected: solo
developer, no dedicated design tooling workflow, adds Figma dependency for what is a
code-level enforcement problem.

### Option B (chosen): CSS Custom Properties + Stylelint enforcement
Zero external tooling dependency beyond the linter. Tokens are code — they live in version
control, they are searchable, they are diffable. Stylelint is already a standard in the
Vue/Vite ecosystem (MIT licence, active maintenance).

### Option C: Tailwind CSS design tokens
Tailwind's config is the token source; utility classes enforce usage. Appealing for
consistency. Rejected because: Tailwind's utility-class model conflicts with the
Vue SFC `<style scoped>` pattern the owner is learning; adds a cognitive load tax
during the learning phase. Revisit if the owner moves to a utility-first workflow.

## Consequences

Positive:
- Pre-commit hook enforces the token contract before any override reaches the repo
- Token file is the single source of truth — no scatter across components
- Addresses root cause of visual experiment churn (OPP-02) mechanically

Negative:
- Requires Stylelint configuration to be maintained as the token set evolves
- Learning overhead: owner must understand why the linter rejects hard-coded values
  and know the token variable names — mitigated by IDE autocompletion for custom properties
