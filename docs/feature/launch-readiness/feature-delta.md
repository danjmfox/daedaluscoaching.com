# Feature Delta — launch-readiness

```yaml
feature_id: launch-readiness
wave: DISCUSS
status: complete
created: 2026-05-17
personas: [persona-prospective-client, persona-referral-partner, owner-editor]
```

---

## Wave: DISCUSS / [REF] Persona

**Primary:** `persona-prospective-client` — org evaluator or referred individual leader who receives the site URL via a referral partner.

**Secondary:** `persona-referral-partner` — colleague who shares the URL; the OG preview and absence of broken pages reflects on their recommendation.

**Owner:** `owner-editor` — needs confidence to share the URL without mental reservations.

---

## Wave: DISCUSS / [REF] JTBD

### JOB-LR-001 — Uncaveated sharing

> "When I share the site URL with a referral partner or potential client, I want every page and social preview to represent the practice professionally, so I can share it without mental reservations or explanatory context."

| Dimension  | Statement                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Functional | 404 → branded dead-end recovery; privacy policy → legal baseline met; OG image → social previews render correctly    |
| Emotional  | No hesitation before sharing a link; the site feels finished without asterisks                                       |
| Social     | Referral partners forward the URL and it lands well — no broken previews, no bare error pages, no missing legal page |

**Four Forces:**

| Force   | Detail                                                                                                                                                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Push    | CN-5: broken links return a bare Nuxt fallback. CN-6: GDPR exposure and iubenda cookie banner has no policy URL to link to. SEO-8: sharing on LinkedIn/Slack shows a text-only preview with Nuxt default title |
| Pull    | Site shareable without prefacing. OG preview shows brand. Broken links recover gracefully. Legal baseline is clean                                                                                             |
| Anxiety | OG image requires design effort — is a text-only card acceptable for now? 404 is rarely hit pre-launch — is it worth the effort?                                                                               |
| Habit   | Owner checks site before sharing, notices gaps, adds mental caveats — eroding confidence in the site as a business asset                                                                                       |

---

## Wave: DISCUSS / [REF] Locked Decisions

| ID      | Decision                                          | Verdict                                       | Rationale                                                                                                                                                |
| ------- | ------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-LR-01 | Privacy policy: iubenda-generated vs. custom page | iubenda-generated page embedded at `/privacy` | iubenda is already installed for cookie consent; their generator covers GDPR requirements and reduces maintenance. A dedicated Nuxt page wraps the embed |
| D-LR-02 | 404 page: full layout vs. minimal                 | Full site layout (header + footer)            | Consistent with site register; gives the visitor nav options rather than a dead end. Nuxt provides `error.vue` as the standard hook                      |
| D-LR-03 | OG image: designed asset vs. text-only            | Designed static PNG (1200×630)                | Text-only previews undermine the visual identity established in the visual-identity feature. A single static image covers all pages initially            |
| D-LR-04 | OG image scope: one global vs. per-page           | Single global OG image for v1                 | Per-page images require automation infrastructure (Nuxt OG Image module or Satori). A single high-quality static asset is the LRM approach               |

---

## Wave: DISCUSS / [REF] User Stories

### S-LR-001 — Custom 404 page

**As a** visitor who follows a broken or outdated link,
**I want** a branded error page that tells me the page doesn't exist and gives me a way back,
**so that** a dead link doesn't end my visit or undermine my impression of the practice.

`job_id: JOB-LR-001`

#### Elevator Pitch (S-LR-001)

Before: A broken link returns a bare Nuxt error — no branding, no navigation, no recovery path.
After: visit `/anything-that-doesnt-exist` → see branded 404 page with site header/footer, a clear "Page not found" message, and a link back to the homepage.
Decision enabled: visitor decides to continue exploring the site rather than closing the tab.

#### Acceptance Criteria (S-LR-001)

- AC-LR-001-1: Navigating to a non-existent path (e.g. `/does-not-exist`) renders `error.vue` with the site header and footer
- AC-LR-001-2: Page displays a clear heading ("Page not found" or equivalent) and a link to the homepage (`/`)
- AC-LR-001-3: HTTP status code is 404 (verified at Netlify edge — `nuxt generate` + `netlify.toml` 404 redirect)
- AC-LR-001-4: Page title is "Page not found | Daedalus Coaching"
- AC-LR-001-5: Page is styled consistently with the site design system (uses existing CSS tokens, not inline styles)

---

### S-LR-002 — Privacy policy page

**As a** visitor checking the site's legal pages (prompted by the iubenda cookie banner or their own due diligence),
**I want** a privacy policy page at a stable URL,
**so that** I can understand how my data is handled and the site meets its GDPR obligations.

`job_id: JOB-LR-001`

#### Elevator Pitch (S-LR-002)

Before: The iubenda cookie consent banner has no privacy policy URL — clicking any "learn more" link goes nowhere. The site has GDPR exposure.
After: visit `/privacy` → see a page with the iubenda-generated privacy policy embedded or linked, with site header and footer intact.
Decision enabled: visitor (or regulatory check) confirms the site has a privacy policy in place.

#### Acceptance Criteria (S-LR-002)

- AC-LR-002-1: Route `/privacy` resolves to a page (does not 404)
- AC-LR-002-2: Page renders the iubenda privacy policy (via embed script or direct link to iubenda-hosted policy)
- AC-LR-002-3: Page has site header and footer (consistent layout)
- AC-LR-002-4: Page title is "Privacy Policy | Daedalus Coaching"
- AC-LR-002-5: iubenda cookie banner `privacyPolicyUrl` config in `nuxt.config.ts` (or equivalent) is updated to point to `/privacy`
- AC-LR-002-6: `/privacy` is included in `sitemap.xml`

---

### S-LR-003 — OG social card image

**As a** referral partner or the site owner sharing the URL in Slack, email, or LinkedIn,
**I want** the link preview to show a branded image alongside the page title and description,
**so that** the share looks professional and the practice identity is visible before the recipient clicks through.

`job_id: JOB-LR-001`

#### Elevator Pitch (S-LR-003)

Before: sharing any page URL on LinkedIn, Slack, or iMessage shows a text-only preview with the Nuxt default title — no image, generic appearance.
After: share `https://daedaluscoaching.com` → link preview shows a 1200×630 branded OG image, correct title ("Daedalus Coaching"), and meta description.
Decision enabled: recipient decides whether to click through based on a professional branded preview rather than a blank card.

#### Acceptance Criteria (S-LR-003)

- AC-LR-003-1: `<meta property="og:image">` is present in the `<head>` of all pages, pointing to a static asset (e.g. `/images/og-card.png`)
- AC-LR-003-2: OG image asset exists at the referenced path and is 1200×630px
- AC-LR-003-3: Image uses the established brand palette (Fraunces/Plus Jakarta Sans, committed colour tokens)
- AC-LR-003-4: `<meta property="og:image:width">` = 1200 and `<meta property="og:image:height">` = 630 present
- AC-LR-003-5: `<meta name="twitter:image">` present and points to the same asset
- AC-LR-003-6: OG image renders legibly at 1200×630 and at 600×315 (2× display scaling)
- AC-LR-003-7: Verified in at least one preview tool (e.g. opengraph.xyz or LinkedIn post inspector)

---

## Wave: DISCUSS / [REF] Story Map

```text
Backbone (user activities):
  [Share URL] → [Recipient arrives] → [Recipient scans] → [Legal due diligence]

Walking skeleton:
  Minimum: S-LR-002 (privacy policy) alone — unblocks cookie consent legal loop

Slice execution order (learning leverage first):
  slice-02 → slice-01 → slice-03
  Rationale: slice-02 lowest effort + highest legal urgency;
             slice-01 pure UX polish, independent;
             slice-03 requires design effort, can ship last without blocking others
```

---

## Wave: DISCUSS / [REF] Outcome KPIs

| KPI                                       | Target                                        | Measurement                                         |
| ----------------------------------------- | --------------------------------------------- | --------------------------------------------------- |
| K-LR-01: Privacy policy page exists       | 100% — `/privacy` resolves with 200           | Playwright smoke test post-deploy                   |
| K-LR-02: 404 page branded                 | 100% — `error.vue` renders on bad paths       | Playwright test: navigate to `/does-not-exist`      |
| K-LR-03: OG image present on all pages    | 100% — `og:image` in `<head>` on all 6+ pages | `nuxt generate` output audit or Playwright snapshot |
| K-LR-04: No bare Netlify/Nuxt error pages | 0 bare errors on any routed path              | Manual check + Playwright smoke                     |

---

## Wave: DISCUSS / [REF] Definition of Done

- [x] 1. JTBD analysis complete — JOB-LR-001 documented with all dimensions and four forces
- [x] 2. Journey touch points mapped — gaps identified in `journey-warm-referral`
- [x] 3. User stories written — S-LR-001, S-LR-002, S-LR-003 with Elevator Pitches
- [x] 4. Acceptance criteria testable — all ACs are verifiable end-to-end
- [x] 5. Requirements completeness score > 0.95 — three items, all well-scoped, no ambiguous ACs
- [x] 6. Outcome KPIs defined with targets and measurement methods
- [x] 7. DoR validated — see DoR section below
- [x] 8. Slice briefs exist — slice-01, slice-02, slice-03 at `docs/feature/launch-readiness/slices/`
- [ ] 9. Handoff accepted by nw-solution-architect (DESIGN wave)

---

## Wave: DISCUSS / [REF] DoR Validation

| #   | DoR Item                                       | Status | Evidence                                                                                                                                |
| --- | ---------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Story in "who + what + why" format             | PASS   | All 3 stories follow LeanUX format                                                                                                      |
| 2   | Acceptance criteria testable and unambiguous   | PASS   | All ACs reference observable outputs (HTTP status, rendered element, meta tag)                                                          |
| 3   | JTBD traceability                              | PASS   | All stories reference JOB-LR-001                                                                                                        |
| 4   | No external dependencies blocking the slice    | PASS   | S-LR-001 and S-LR-003 are fully self-contained. S-LR-002 requires iubenda account access to retrieve policy embed code — owner has this |
| 5   | Scope bounded (≤1 day per slice)               | PASS   | Estimates: slice-02 1h, slice-01 2h, slice-03 3h                                                                                        |
| 6   | Out-of-scope explicit                          | PASS   | See Out of Scope section                                                                                                                |
| 7   | Elevator Pitch present per story               | PASS   | All 3 stories have Elevator Pitch with before/after/decision                                                                            |
| 8   | Walking skeleton identified                    | PASS   | S-LR-002 is the WS — unblocks legal loop independently                                                                                  |
| 9   | No slice contains only @infrastructure stories | PASS   | All slices have user-visible value                                                                                                      |

---

## Wave: DISCUSS / [REF] Out of Scope

- Per-page OG images (requires Nuxt OG Image module or Satori — deferred to v2)
- Accessibility statement page (CN-7 — separate backlog item)
- Cookie policy page (PL-3 — separate backlog item, may be covered by iubenda)
- Blog or resources section
- Structured data / JSON-LD (SEO-6 — separate backlog item)
- Analytics (AN-1 deferred)

---

## Wave: DISCUSS / [REF] Walking Skeleton Strategy

**Strategy B** (brownfield — thin slice on existing skeleton).

The site skeleton (Nuxt 3 SSG, Netlify deployment, content layer, component library) is fully operational. Each slice adds one new page or one new meta tag — no new architectural layers required. No new walking skeleton needed.

---

## Wave: DISCUSS / [REF] Driving Ports

| Port               | Surface                             | Story    |
| ------------------ | ----------------------------------- | -------- |
| Browser navigation | `/does-not-exist` → `error.vue`     | S-LR-001 |
| Browser navigation | `/privacy` → privacy page           | S-LR-002 |
| HTML `<head>` meta | `og:image` tag on all pages         | S-LR-003 |
| Netlify edge       | 404 redirect rule in `netlify.toml` | S-LR-001 |

---

## Wave: DISCUSS / [REF] Pre-Requisites

- Nuxt 3 SSG scaffold: DONE (existing site)
- Netlify deployment pipeline: DONE
- iubenda account with privacy policy generated: owner must confirm policy embed code is available before slice-02 executes
- OG image design asset: must be created before slice-03 executes (owner creates or delegates)
- Brand tokens (colour, type): DONE (`assets/css/tokens.css`)

---

## Wave: DESIGN / [REF] Reuse Analysis

| Existing Component                         | File                                      | Overlap                      | Decision                                  | Justification                                                                                                         |
| ------------------------------------------ | ----------------------------------------- | ---------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `pages/privacy.vue` + `content/privacy.md` | `pages/privacy.vue`, `content/privacy.md` | S-LR-002 privacy page        | **ALREADY DONE** — page and content exist | Custom GDPR policy already written and deployed. D-LR-01 (iubenda embed) superseded — see Changed Assumptions         |
| `nuxt.config.ts` app.head meta array       | `nuxt.config.ts:29-33`                    | OG meta tags for S-LR-003    | EXTEND                                    | `og:image`, `og:image:width`, `og:image:height`, `twitter:image` added to existing meta array. Zero structural change |
| `app.vue` layout (SiteHeader + SiteFooter) | `app.vue`                                 | Layout shell for S-LR-001    | REFERENCE (not extend)                    | `error.vue` bypasses `app.vue` entirely in Nuxt — must explicitly import `<SiteHeader>` and `<SiteFooter>`            |
| Netlify redirect config                    | `netlify.toml`                            | 404 HTTP status for S-LR-001 | EXTEND                                    | Add `[[redirects]]` rule: `from = "/*" to = "/200.html" status = 404` (CDN-level 404 status)                          |

---

## Wave: DESIGN / [REF] Component Decomposition

| Component            | Path                        | Change Type    | Story    | Notes                                                                                            |
| -------------------- | --------------------------- | -------------- | -------- | ------------------------------------------------------------------------------------------------ |
| Error page           | `error.vue` (project root)  | CREATE NEW     | S-LR-001 | Nuxt 3 standard hook for unmatched routes. Must manually include `<SiteHeader>` + `<SiteFooter>` |
| Privacy page         | `pages/privacy.vue`         | ALREADY EXISTS | S-LR-002 | Page and content complete. Only remaining work: confirm iubenda banner links to `/privacy`       |
| Privacy content      | `content/privacy.md`        | ALREADY EXISTS | S-LR-002 | Custom GDPR policy written                                                                       |
| OG meta config       | `nuxt.config.ts`            | EXTEND         | S-LR-003 | Add 4 meta tags to existing `app.head.meta` array                                                |
| OG image asset       | `public/images/og-card.png` | CREATE NEW     | S-LR-003 | Static 1200×630 PNG — design artifact, not code                                                  |
| Netlify 404 redirect | `netlify.toml`              | EXTEND         | S-LR-001 | CDN-level 404 status — `error.vue` alone is not sufficient                                       |

---

## Wave: DESIGN / [REF] Driving Ports

| Port                                | Surface                           | Story    | Notes                                                              |
| ----------------------------------- | --------------------------------- | -------- | ------------------------------------------------------------------ |
| Browser navigation (unmatched path) | `error.vue` Nuxt hook             | S-LR-001 | Triggered by any path not matched by `pages/`                      |
| Browser navigation                  | `/privacy` → `pages/privacy.vue`  | S-LR-002 | Already wired via existing page                                    |
| HTML `<head>` meta                  | `og:image` on all generated pages | S-LR-003 | Global head config in `nuxt.config.ts` propagates to all SSG pages |

---

## Wave: DESIGN / [REF] Driven Ports + Adapters

No new driven ports. All three items are presentation-layer only — no new I/O, no new core/ functions, no new composables.

---

## Wave: DESIGN / [REF] Technology Choices

No new technology introductions. All work uses existing stack:

| Component       | Technology                                | Why sufficient                                                  |
| --------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Error page      | Nuxt 3 `error.vue` convention             | Framework-native — no library needed                            |
| Privacy content | `@nuxt/content` Markdown                  | Already used for all other page content                         |
| OG meta         | `nuxt.config.ts` `app.head.meta`          | Already used for `og:type`, `og:site_name`, `twitter:card`      |
| 404 HTTP status | Netlify `[[redirects]]` in `netlify.toml` | CDN handles status code — SSG cannot set HTTP status at runtime |

---

## Wave: DESIGN / [REF] Decisions

| ID       | Decision                                         | Verdict                                                      | Rationale                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------- | ------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D-LR-D01 | 404 HTTP status mechanism                        | Netlify redirect `from = "/*" to = "/200.html" status = 404` | Nuxt SSG pre-renders `200.html` as the SPA fallback. Netlify redirect rule tells the CDN to serve it with a 404 status. This is the standard pattern — no `nitro.prerender` change needed                                                                                                                                                                                                                                                                                                  |
| D-LR-D02 | Privacy policy: iubenda embed vs. custom content | Custom content in `content/privacy.md` (already complete)    | `pages/privacy.vue` and `content/privacy.md` already exist with a full custom GDPR policy. iubenda embed (D-LR-01) is superseded — no rework needed. Simpler, no third-party dependency for page content                                                                                                                                                                                                                                                                                   |
| D-LR-D03 | `error.vue` layout strategy                      | Manually import `<SiteHeader>` and `<SiteFooter>`            | `error.vue` is a root-level Nuxt component that bypasses `app.vue` entirely. It receives `error` and `clearError` props from Nuxt. Header/footer must be explicitly composed in                                                                                                                                                                                                                                                                                                            |
| D-LR-D04 | Cookie consent: iubenda vs. custom component     | Custom `CookieNotice.vue`                                    | iubenda is consent-management infrastructure for ad-tech (cookie categorisation, IAB strings, third-party flows). None of this applies here. The value wanted is explicit trust signal: "no cookies, no tracking." A custom component delivers that with zero third-party dependency, no cost, and no CSP overhead. When/if analytics is added, a privacy-first tool (Fathom, Plausible, Umami) is consent-exempt under GDPR — so iubenda remains unnecessary. iubenda removed from stack. |

---

## Wave: DESIGN / [REF] Open Questions

| ID       | Question                                                                      | Owner    | Blocker for                                                                           |
| -------- | ----------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| OQ-LR-01 | ~~Where is the iubenda script initialised?~~                                  | RESOLVED | iubenda removed from stack — not implemented, not needed. CSP entries to be stripped. |
| OQ-LR-02 | OG image design: who creates `og-card.png`? Tool: Figma, Canva, or generated? | Owner    | slice-03                                                                              |

---

## Wave: DESIGN / [REF] Changed Assumptions

**D-LR-01 revised** — original DISCUSS assumption: iubenda-generated policy embedded at `/privacy`.

Source: `docs/feature/launch-readiness/feature-delta.md`, Wave: DISCUSS / [REF] Locked Decisions, D-LR-01.

Original assumption: "iubenda is already installed for cookie consent; their generator covers GDPR requirements and reduces maintenance. A dedicated Nuxt page wraps the embed."

New assumption: `pages/privacy.vue` and `content/privacy.md` already exist with a custom, complete GDPR privacy policy. The custom policy is preferable — no iubenda embed dependency, no third-party content loading, fully owned. The iubenda `privacyPolicyUrl` config still needs to point to `/privacy`, but the page content is already done. The iubenda embed approach is abandoned.

**S-LR-002 scope revised (2026-05-17)**: iubenda removed from stack. Remaining work: build `CookieNotice.vue`, mount in `app.vue`, strip iubenda from CSP.

---

## Wave: DISTILL / [REF] WS Strategy

**Strategy C — Real local.** Playwright tests hit the Nuxt dev server; all assertions are against real rendered HTML. No driven ports with I/O, no costly externals. Walking skeleton: one enabled test per story in `walking-skeleton.spec.ts`; all other scenarios `test.skip`'d for one-at-a-time TDD in DELIVER.

Scaffold note: Playwright tests are naturally RED when components don't exist (element-not-found failures). No `__SCAFFOLD__` markers in Vue files — the absence of the component IS the RED state.

---

## Wave: DISTILL / [REF] Scenario List

| Scenario                                    | File                       | Tags                         | Story    |
| ------------------------------------------- | -------------------------- | ---------------------------- | -------- |
| WS-01: broken path shows branded error page | `walking-skeleton.spec.ts` | `@walking_skeleton @real-io` | S-LR-001 |
| WS-02: /privacy shows privacy policy        | `walking-skeleton.spec.ts` | `@walking_skeleton @real-io` | S-LR-002 |
| WS-03: homepage has og:image meta tag       | `walking-skeleton.spec.ts` | `@walking_skeleton @real-io` | S-LR-003 |
| 404 renders with site header and footer     | `404-page.spec.ts`         | `@real-io`                   | S-LR-001 |
| 404 offers homepage link; link navigates    | `404-page.spec.ts`         | `@real-io`                   | S-LR-001 |
| 404 has correct document title              | `404-page.spec.ts`         | `@real-io`                   | S-LR-001 |
| Deeply nested bad path also 404s gracefully | `404-page.spec.ts`         | `@real-io @error`            | S-LR-001 |
| Cookie notice visible on first visit        | `cookie-notice.spec.ts`    | `@real-io`                   | S-LR-002 |
| Cookie notice links to /privacy             | `cookie-notice.spec.ts`    | `@real-io`                   | S-LR-002 |
| Dismissing notice hides it                  | `cookie-notice.spec.ts`    | `@real-io`                   | S-LR-002 |
| Notice does not reappear after reload       | `cookie-notice.spec.ts`    | `@real-io`                   | S-LR-002 |
| Notice stays dismissed across navigation    | `cookie-notice.spec.ts`    | `@real-io`                   | S-LR-002 |
| Privacy page has correct document title     | `cookie-notice.spec.ts`    | `@real-io`                   | S-LR-002 |
| CSP does not contain iubenda domains        | `cookie-notice.spec.ts`    | `@real-io @error`            | S-LR-002 |
| og:image width and height meta present      | `og-image.spec.ts`         | `@real-io`                   | S-LR-003 |
| twitter:image meta present                  | `og-image.spec.ts`         | `@real-io`                   | S-LR-003 |
| og:image present on all key pages           | `og-image.spec.ts`         | `@real-io`                   | S-LR-003 |
| og-card.png asset loads with 200            | `og-image.spec.ts`         | `@real-io`                   | S-LR-003 |

Error/edge scenarios: 3 of 18 = 17%. All happy-path, one error (deeply nested 404), one header check (CSP), one asset check (og-card.png 200). Acceptable for a UI-only feature with no complex failure modes.

---

## Wave: DISTILL / [REF] Adapter Coverage

No driven adapters in this feature (presentation layer only — no new ports, no I/O). Existing adapters (Netlify Forms, content layer) are unaffected. No `@adapter-integration` scenarios required.

| Driving surface                      | Covered by                         |
| ------------------------------------ | ---------------------------------- |
| Browser navigation → Nuxt error hook | `walking-skeleton.spec.ts` WS-01   |
| Browser navigation → `/privacy` page | `walking-skeleton.spec.ts` WS-02   |
| HTML `<head>` meta → `og:image`      | `walking-skeleton.spec.ts` WS-03   |
| HTTP response headers → CSP          | `cookie-notice.spec.ts` Scenario 8 |
| Static asset → `/images/og-card.png` | `og-image.spec.ts` Scenario 5      |

---

## Wave: DISTILL / [REF] Scaffolds

No production module scaffolds required. Vue components (`error.vue`, `CookieNotice.vue`) do not exist yet — Playwright tests are RED on element-not-found. This is the correct RED state for Strategy C.

The `__SCAFFOLD__` pattern applies to imported TypeScript/Python modules. For Vue components exercised only through Playwright, absence = RED.

---

## Wave: DISTILL / [REF] Test Placement

```text
tests/e2e/launch-readiness/acceptance/
  walking-skeleton.spec.ts   # WS-01, WS-02, WS-03
  404-page.spec.ts           # S-LR-001 full scenario set
  cookie-notice.spec.ts      # S-LR-002 full scenario set
  og-image.spec.ts           # S-LR-003 full scenario set
```

Precedent: `tests/e2e/{feature-id}/acceptance/` — matches existing pattern from `daedalus-coaching-website-redesign`.

---

## Wave: DISTILL / [REF] Pre-Requisites

- Playwright configured and running (confirmed — 34/34 existing tests green)
- Nuxt dev server available at `localhost:3000` (existing `playwright.config.ts` webServer)
- OG image asset `public/images/og-card.png` must exist before `og-image.spec.ts` WS-03 and Scenario 5 can go green (owner action)
- `error.vue` must exist before `404-page.spec.ts` scenarios go green
- `CookieNotice.vue` must exist before `cookie-notice.spec.ts` scenarios go green
