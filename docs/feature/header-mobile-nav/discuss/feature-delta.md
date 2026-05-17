<!-- markdownlint-disable MD024 -->

# Feature Delta — header-mobile-nav

## Wave: DISCUSS / [REF] Persona ID

**Persona**: Mobile site visitor — a prospective client or referral partner arriving on a phone, scanning to confirm credibility within 60 seconds. Unhurried but impatient; forms a first impression before reading.

---

## Wave: DISCUSS / [REF] JTBD One-Liner

**JOB-NAV-001**: When visiting the site on a phone, I want the navigation to present clearly without zooming or squinting, so I can move to the section I need without friction undermining my first impression of the practice.

---

## Wave: DISCUSS / [REF] Locked Decisions

| Decision                            | Choice                               | Reference                    |
| ----------------------------------- | ------------------------------------ | ---------------------------- |
| Layout approach at narrow viewports | Stacked (logo row + nav row)         | DEC-001 in wave-decisions.md |
| Breakpoint                          | `max-width: 600px`                   | DEC-001                      |
| JS requirement                      | None                                 | DEC-001                      |
| Wordmark visibility                 | Always visible at all widths         | DEC-001                      |
| Hamburger menu                      | Explicitly rejected for a 4-link nav | DEC-001                      |

---

## Wave: DISCUSS / [REF] User Stories

### US-NAV-001: Mobile visitors can read and use the navigation without zooming

**Job**: JOB-NAV-001

#### Elevator Pitch

**Before**: A prospective client opens the site on their phone and sees the logo and four nav links crammed into a single row. The links are small and close together. The visitor either zooms in or immediately forms an impression that the site is not polished — at odds with the senior-professional register the practice projects.

**After**: On a narrow phone screen, the header stacks: logo and wordmark on top, nav links compact and legible beneath. No zooming, no overflow, no horizontal scroll. The visual impression is calm and deliberate.

**Decision enabled**: To reach the Services or Contact page from a phone, the visitor taps a clearly legible link. There is no interaction barrier between arrival and navigation.

#### UAT Scenarios

```gherkin
Scenario: Nav links are legible without zooming on a narrow phone
  Given a visitor opens the site on a phone with a 390px viewport width
  When the header renders
  Then the logo and wordmark appear on one row
  And the four nav links appear on a second row beneath the logo
  And no content overflows or requires horizontal scrolling

Scenario: Nav links remain accessible on the narrowest common phone
  Given a visitor opens the site on a phone with a 360px viewport width
  When the header renders
  Then all four nav links are visible and tappable without zooming

Scenario: Desktop layout is unaffected
  Given a visitor opens the site on a desktop with a 1024px viewport width
  When the header renders
  Then the logo and nav links appear in a single horizontal row
  And the layout matches the current desktop design exactly

Scenario: Current page is visually indicated in the nav
  Given a visitor is on the Services page on a mobile viewport
  When they view the header
  Then the Services nav link is visually distinguished from the other three links
```

#### Acceptance Criteria

- [ ] At viewports <= 600px: header stacks to two rows (logo row, nav row)
- [ ] At viewports > 600px: header retains existing single-row layout
- [ ] No horizontal overflow or scroll at 360px viewport width
- [ ] All four nav links are tappable without zoom at 360px (minimum 44px touch target height)
- [ ] Logo wordmark remains visible at all viewport widths
- [ ] Active/current page link is visually distinguishable
- [ ] No JavaScript is introduced

#### Technical Notes

- Target: `components/SiteHeader.vue` — CSS scoped styles only
- `.header-inner` is already `display: flex; flex-direction: row` — add `flex-direction: column; align-items: center` at `max-width: 600px`
- Nav link gap: reduce from `var(--space-xl)` to `var(--space-md)` at mobile breakpoint
- Touch target: ensure `.nav-link` has sufficient padding for 44px tap height
- No dependency on other stories

---

### US-NAV-002: Mobile visitors can skip to main content with keyboard or assistive technology

**Job**: JOB-NAV-001 (accessibility dimension)

#### Elevator Pitch

**Before**: The skip link (`<a href="#main" class="skip-link">`) exists in the markup but has not been tested with the stacked mobile layout — it may shift focus incorrectly or be visually clipped after the layout change.

**After**: Screen reader and keyboard users on mobile can bypass the navigation and reach main content with a single action, regardless of the header's layout at narrow widths.

**Decision enabled**: The site passes WCAG 2.2 AA at mobile viewport widths. A keyboard user can navigate the site efficiently on a phone with an external keyboard.

#### UAT Scenarios

```gherkin
Scenario: Skip link reaches main content on mobile
  Given a keyboard user opens the site on a 390px viewport
  When they activate the skip link
  Then focus moves to the main content area
  And the main content area is visible without scrolling to the header

Scenario: Nav links are reachable in order by keyboard on mobile
  Given a keyboard user is navigating the stacked mobile header
  When they tab through the header
  Then focus order is: skip link → logo link → About → Services → Systems → Contact
  And each focused element has a visible focus indicator
```

#### Acceptance Criteria

- [ ] Skip link functions correctly at mobile viewport widths
- [ ] Tab order through stacked header is logical (skip link, logo, then nav links in DOM order)
- [ ] Focus indicators are visible on all interactive header elements at mobile widths
- [ ] No focus traps introduced by the layout change

#### Technical Notes

- Verify existing skip link CSS (`position: absolute; top: -100%`) does not interact badly with stacked layout
- No new markup changes expected — CSS-only fix
- Depends on US-NAV-001 (same CSS change)

---

## Wave: DISCUSS / [REF] Definition of Done

| #   | Item                                             | Status                                                            |
| --- | ------------------------------------------------ | ----------------------------------------------------------------- |
| 1   | Problem statement clear, in domain language      | PASS — cramped nav on mobile, first-impression risk               |
| 2   | Persona with specific characteristics            | PASS — mobile visitor, 60-second credibility scan                 |
| 3   | 3+ domain examples with real data                | PASS — 390px, 360px, 1024px concrete viewport scenarios           |
| 4   | UAT scenarios in Given/When/Then (3-7 per story) | PASS — 4 scenarios in US-NAV-001, 2 in US-NAV-002                 |
| 5   | AC derived from UAT                              | PASS — each AC item traces to a scenario                          |
| 6   | Stories right-sized (1-3 days, 3-7 scenarios)    | PASS — estimated 0.5 days total, CSS-only                         |
| 7   | Technical notes: constraints and dependencies    | PASS — component named, approach described                        |
| 8   | Dependencies resolved or tracked                 | PASS — no external dependencies; US-NAV-002 depends on US-NAV-001 |
| 9   | Outcome KPIs defined                             | PASS — see outcome-kpis section below                             |

### Outcome KPIs

#### US-NAV-001

- **Who**: Mobile visitors (first-time, referral-link arrivals)
- **Does what**: Reach a nav destination without zooming or horizontal scroll
- **By how much**: Zero horizontal overflow events at 360–600px viewports
- **Measured by**: Manual device testing (iPhone SE, Samsung Galaxy A series); Playwright viewport tests
- **Baseline**: Current layout overflows / cramps at narrow widths (no responsive breakpoint)

#### US-NAV-002

- **Who**: Keyboard and screen reader users on mobile
- **Does what**: Bypass nav and reach main content in one action
- **Measured by**: Manual axe-core audit at 390px viewport; tab-order verification
- **Baseline**: Skip link untested at mobile viewports

---

## Wave: DISCUSS / [REF] Out of Scope

- Hamburger / toggle menu (explicitly rejected — see DEC-001)
- Animated transitions on layout change
- Sticky / scroll-aware header behaviour
- Search functionality
- Any change to desktop layout
- Any change to pages other than `SiteHeader.vue`
- Dark mode variants
- Any JS introduction

---

## Wave: DISCUSS / [REF] WS Strategy

**Strategy A — Already wired, CSS change only.**

The walking skeleton exists: `SiteHeader.vue` renders and links work. The architectural risk (Nuxt routing, `NuxtLink`, `aria-label`) is already resolved. This slice adds a single CSS media query to an existing scoped style block. No new components, no new ports, no integration points.

---

## Wave: DISCUSS / [REF] Driving Ports

**Browser viewport width** is the sole driving port. The header responds to `max-width: 600px` via CSS media query — no JavaScript, no resize events, no container queries required for this feature scope.
