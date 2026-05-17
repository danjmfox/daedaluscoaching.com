# Slice 01 — Mobile Nav Layout

## Goal

Deliver a readable, non-overflowing header navigation at narrow phone viewports through a CSS-only stacked layout, with no change to the desktop experience and no JavaScript introduced.

## In Scope

- `components/SiteHeader.vue` scoped CSS only
- `flex-direction: column` on `.header-inner` at `max-width: 600px`
- `align-items: center` on `.header-inner` at mobile breakpoint
- Gap reduction on `.nav-list` at mobile breakpoint
- Touch target padding on `.nav-link` (minimum 44px tap height)
- Verify skip link function at mobile viewport widths
- Tab order verification through stacked header

## Out of Scope

- Any JS (no toggle, no hamburger, no resize listeners)
- Any change to desktop layout (breakpoints > 600px)
- Animation or transition on layout change
- Sticky header behaviour
- Any other component or page

## Learning Hypothesis

We believe that stacking the header into two rows at narrow viewports will allow mobile visitors to read and use the navigation without zooming, and that this will not require any JavaScript or structural HTML changes — just a CSS media query addition.

**Validated when**: Playwright viewport tests pass at 360px and 390px with no horizontal overflow; manual test on a physical device (iPhone SE or equivalent) shows legible, tappable nav links.

## Acceptance Criteria

- [ ] At `<= 600px` viewport: `.header-inner` stacks to column layout
- [ ] Logo wordmark remains visible at all widths
- [ ] All four nav links fit within viewport at 360px without overflow
- [ ] Nav link tap targets are at least 44px tall
- [ ] Desktop layout (> 600px) is unchanged
- [ ] Skip link reaches `#main` correctly at mobile viewport
- [ ] Tab order: skip link → logo → About → Services → Systems → Contact
- [ ] No JavaScript added

## Effort Estimate

0.5 days — CSS-only, single component, existing structure already correct.

## Stories

- US-NAV-001 (layout, primary)
- US-NAV-002 (accessibility, bundled)
