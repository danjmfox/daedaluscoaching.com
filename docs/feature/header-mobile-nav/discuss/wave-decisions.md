# Wave Decisions — header-mobile-nav

## Wave: DISCUSS / [DEC-001] Mobile Nav Layout Approach

**Date**: 2026-05-17
**Status**: DECIDED

### Options Considered

| Option             | Description                                                      | JS Required | Complexity |
| ------------------ | ---------------------------------------------------------------- | ----------- | ---------- |
| A — Stacked layout | Logo row, then nav links below in a centered row or wrapped flex | No          | Low        |
| B — Compact row    | Drop wordmark text, reduce gap, keep horizontal                  | No          | Very low   |
| C — Hamburger menu | Toggle button reveals/hides nav                                  | Yes         | Medium     |

### Decision: Option A — Stacked layout

At narrow viewports (below ~600px), the header switches to a two-row stacked layout:

- Row 1: logo mark + wordmark centered (or left-aligned)
- Row 2: four nav links in a compact horizontal row, centered, with reduced gap

### Rationale

**Against Option C (hamburger)**: Four links do not justify the complexity tax. A hamburger adds a JS dependency, an additional interaction (tap to reveal), and increases time-to-navigation — all costs with no benefit when the links can be shown directly. The site's calm, unhurried register is actively harmed by interactive chrome that implies complexity.

**Against Option B (compact row)**: Dropping the wordmark degrades brand recognition on first visit — a referral partner or prospective client arriving on mobile loses the "Daedalus Coaching" signal immediately. The four links at reduced gap still cramp on the narrowest phones (360px) unless the wordmark is dropped entirely or truncated, which is a worse trade-off than a simple stack.

**For Option A (stacked)**: The stacked layout fits naturally in the coaching site's visual grammar — unhurried, one thing at a time, no visual competition. It requires zero JavaScript, is fully accessible (no ARIA toggle state to manage), renders legibly at 360px, and matches how professional service sites at this register tend to handle narrow viewports. The CSS change is a single `flex-direction: column` plus alignment rule under a media query — the walking skeleton is already wired.

### Scope Assessment: PASS

Single component, single CSS breakpoint, no JS, no new dependencies. Estimated effort: 0.5 days. One user-facing story covers the feature entirely.

### Implementation Note (for DESIGN wave)

Breakpoint recommendation: `max-width: 600px` (covers all portrait phone viewports without firing on landscape or tablet). The `.header-inner` flex container becomes `flex-direction: column; align-items: center` at this breakpoint. Nav links retain their existing gap but may reduce from `var(--space-xl)` to `var(--space-md)` to maintain compactness. The `.logo-wordmark` remains visible at all widths.
