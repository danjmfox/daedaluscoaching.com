# ADR-002: Content Architecture — @nuxt/content with Adapter Isolation

status: Accepted (conditional on H3)
date: 2026-05-12
deciders: Daniel Osborne (owner/developer)
wave: DESIGN

---

## Context

The DISCOVER wave established that the owner previously used Contentful for non-developer
content editing (S4 — past behaviour). The current stack replaces Contentful with
`@nuxt/content` (markdown files in repo). Hypothesis H3 (markdown-in-repo acceptable for
~monthly editing cadence) was marked Inconclusive — REQUIRES OWNER WALKTHROUGH.

The owner has confirmed (session context): the DESIGN wave proceeds with `@nuxt/content`
as-is. The H3 walkthrough has NOT been completed. If the walkthrough fails, Option C
(content adapter abstraction, deferred to SPIKE-01) unlocks. DESIGN must not block on it.

Design constraint: content access must be isolated behind an adapter so that if H3 fails,
the content source can be swapped (e.g. to Nuxt Studio, Decap CMS, or a future headless CMS)
without touching core domain logic or Vue components.

## Decision

Use `@nuxt/content` v2 as the content source for all markdown-driven pages (home, about,
contact). Content access is mediated by a **content adapter** in the shell layer
(`server/` or `composables/`) that exposes a typed interface to Vue components.

Vue components never call `@nuxt/content` APIs directly — they receive typed content objects
from the adapter. The adapter's interface (port) is defined as a TypeScript function
signature in `core/content/` so that an alternative implementation can be substituted
without modifying consumers.

The content port signature returns a plain TypeScript object (not a Vue Ref or reactive
object) — reactivity is applied by the shell, not the core.

**H3 open item recorded**: If the owner walkthrough demonstrates unacceptable friction,
Option C (Decap CMS or Nuxt Studio overlay with the same adapter interface) can be adopted
without architectural rework. The adapter boundary makes this substitution safe.

## Alternatives Considered

### Option A: Direct @nuxt/content calls in page components
`useContent()` / `queryContent()` called in `<script setup>` directly. Standard Nuxt
tutorial approach. Rejected because: couples component logic to content source, makes
H3 fallback a full component rewrite, and pulls content-fetching logic out of the
testable shell layer.

### Option B (chosen): @nuxt/content behind a typed adapter
See Decision above. Selected because: adapter boundary makes H3 fallback safe, content
shape is testable through the port definition, components remain focused on presentation.

### Option C: Headless CMS (Contentful, Sanity, or Decap CMS)
Provides visual editing. Was the prior approach (Contentful). Rejected as default because:
adds CMS subscription cost or operational complexity for ~monthly edits from a
developer-practitioner. Re-evaluated only if H3 walkthrough fails.

## Consequences

Positive:
- H3 walkthrough outcome does not block DESIGN wave
- Content source is swappable without touching components
- Content shape (TypeScript interface in core) is documented and testable

Negative:
- Adds one adapter layer that standard Nuxt tutorials skip — learner must understand why
- H3 condition remains open; if walkthrough fails late, Option C adoption requires
  adapter implementation work (estimated small — interface is already defined)

## H3 Condition Record

H3 status at time of this ADR: NOT COMPLETE.
Resolution path: owner performs a real copy-change task (paragraph edit + image reference
change) on a staging branch and reports friction. If >10 minutes or requires documentation
lookup, Decap CMS overlay is evaluated as the adapter implementation.
