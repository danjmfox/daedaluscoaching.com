# Feature Delta — credly-credential-badges

backlog_ref: CN-23
wave: DISCUSS
date: 2026-05-19
status: Ready for DESIGN wave

---

## Wave: DISCUSS / [REF] Persona

**Persona ID**: persona-recruiter-hiring-manager
**Secondary personas served**: persona-referral-partner, persona-prospective-client

**Primary scenario**: Recruiter or hiring manager arrives at the site via a CV or LinkedIn link
(to either `/about` or `/`). Within 10 seconds they expect to see professional certifications
displayed as recognisable badge icons. If absent, they cannot verify credential claims without
leaving the site — a friction point that disadvantages the candidate.

---

## Wave: DISCUSS / [REF] JTBD

**Job ID**: JOB-CB-001
**Job story**: "When I arrive at a candidate's website from their CV or LinkedIn profile,
I want to see their professional certifications displayed as recognisable badge icons within
the first scroll, so I can validate their credential claims without reading any prose and
decide whether to progress them."

**Four forces**:

- **Push**: Text-only credential lists on CVs and websites cannot be verified at a glance.
  Generic "certified agile coach" copy is ubiquitous and unverifiable.
- **Pull**: Recognisable Credly badge icons (format widely known in the sector) linking to
  tamper-proof Credly evidence pages.
- **Anxiety**: What if the badges are outdated, or the links don't work? Can I tell ICAgile
  from Scrum.org at a glance?
- **Habit**: Scan for familiar logo shapes → click one badge to verify → feel satisfied →
  progress candidate or move on.

**Opportunity score**: 16 (high importance for recruiter persona; currently zero satisfaction —
no badges on site).

---

## Wave: DISCUSS / [REF] Locked Decisions

| ID  | Decision                                                                      | Rationale                                                                                              |
| --- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| D1  | Badge data in `content/credentials/credly-badges.yaml`                        | Owner can add/remove badges without touching Vue code                                                  |
| D2  | Use Credly CDN URLs directly — no local image copies                          | SSG-compatible; no binary asset maintenance; Credly CDN purpose-built for badge delivery               |
| D3  | Two independent slices — about page first (walking skeleton), homepage second | About page is the more likely recruiter landing target; slices can ship and be evaluated independently |
| D4  | Group badges by issuer (ICAgile / Scrum.org) with visual separator            | Faster pattern-matching for recruiters who know one issuer body but not the other                      |
| D5  | `public/_headers` `img-src` must include `https://images.credly.com`          | Current CSP blocks external images; Credly images will be silently suppressed without this change      |
| D6  | No new design system abstraction (no FanEdge/BlockGroup)                      | CN-15 is a later, separate backlog item; YAGNI                                                         |
| D7  | Descriptive alt text per badge, sourced from YAML `name` field                | A11y (WCAG 2.1 SC 1.1.1); search engine legibility                                                     |

Full decision rationale: `docs/feature/credly-credential-badges/discuss/wave-decisions.md`

---

## Wave: DISCUSS / [REF] User Stories

### Story 1 — Credential badges on the about page (walking skeleton)

**Elevator Pitch**:

- Before: Recruiters see credential claims in prose only; verification requires leaving the site.
- After: 8 Credly badge icons grouped by issuer are visible on the about page; one click verifies any credential.
- Decision enabled: Ship first to validate data model and component before committing to homepage placement.

Full story: `docs/feature/credly-credential-badges/slices/slice-01-badge-data-and-about-page.md`

**UAT scenarios** (5):

1. Credential badges visible without scrolling on the about page
2. Each badge links to its Credly evidence page with correct `rel` attributes
3. Every badge has descriptive alt text
4. Badge images served from Credly CDN; CSP permits the origin
5. Page layout stable when badge images are unavailable

**AC summary**:

- 8 badges render from YAML; grouped ICAgile / Scrum.org; descriptive alt text on every image
- Links carry `rel="noopener noreferrer" target="_blank"`; all point to correct Credly share URLs
- CSP `img-src` updated; no console CSP errors
- Mobile (375px): no horizontal overflow; desktop (1280px): visible without scroll

---

### Story 2 — Credential badges on the homepage trust signals zone

**Elevator Pitch**:

- Before: Homepage shows values badges (B-Corp, 1%FTP) but no professional certifications. Recruiters arriving at `/` have no credential signal.
- After: `CredlyBadgeStrip` (built in Story 1) is placed in the homepage trust signals area, giving every entry point the same credential visibility.
- Decision enabled: Slice 2 is contingent — ship after Slice 1 and evaluate whether homepage placement is needed based on observed recruiter behaviour.

Full story: `docs/feature/credly-credential-badges/slices/slice-02-homepage-trust-signals.md`

**UAT scenarios** (4):

1. Credential badges appear in the homepage trust signals zone without scrolling
2. Homepage badge strip reuses the same YAML data source as the about page
3. Badge links open in new tabs with correct `rel` attributes
4. Existing `TrustSignals.vue` component is unaffected

**AC summary**:

- `CredlyBadgeStrip.vue` rendered on `pages/index.vue`; same data source as about page (no duplication)
- All Slice 1 component AC satisfied; no existing homepage test regressions
- Visible without scroll on desktop; no overflow on mobile

---

## Wave: DISCUSS / [REF] Definition of Done

The project DoD is defined in `docs/product/architecture/brief.md` (CI gates section).
This feature adds no new DoD items. Standard criteria apply to both slices:

- [ ] All UAT scenarios pass (Playwright e2e green in CI)
- [ ] All Vitest component tests pass; no existing test regressions
- [ ] CSP update verified: no `img-src` violations in CI Playwright run
- [ ] Code reviewed and approved (PR review)
- [ ] Merged to main; Netlify deploy preview passes
- [ ] Story demonstrable: can navigate to the page and click a badge to the Credly evidence page
- [ ] dependency-cruiser: no new `core/` boundary violations
- [ ] stylelint: no design token overrides

---

## Wave: DISCUSS / [REF] Out of Scope

| Item                                                          | Rationale                                                                          |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Downloading and committing Credly badge PNG files             | Maintenance burden; D2 decision uses CDN URLs directly                             |
| Badge expiry or validity checking at build time               | Out of scope for v1; owner manages renewals manually                               |
| Tooltips or overlays explaining what each certification means | Recruiter persona does not need explanatory text; Credly page provides full detail |
| Hover animations or visual effects on badge icons             | Kept simple per D6; no design system abstraction                                   |
| A new design system component with slot API                   | CN-15 is a later, separate backlog item                                            |
| Blog or resources page credential display                     | Not in v1 scope; page does not exist                                               |
| Badge count or aggregate credential summary                   | Not needed; recruiter reads the icons directly                                     |
| Automatic link-rot detection for Credly URLs                  | Out of scope; manual review on certification renewal                               |

---

## Wave: DISCUSS / [REF] Walking Skeleton Strategy

**Slice 1 is the walking skeleton**. It proves:

- The YAML data file schema and Nuxt loading strategy work end-to-end
- The `CredlyBadgeStrip` component renders linked images from external CDN
- The CSP update is correct and does not break other `img-src` constraints
- Playwright can assert badge presence and link correctness in CI

**Slice 2** reuses the component without proving anything new architecturally.
It tests a placement hypothesis: does the recruiter need the badge strip on the homepage,
or is the about page sufficient? This can be deferred, de-prioritised, or rejected
independently of Slice 1.

**Delivery sequence**: Slice 1 → (evaluate) → Slice 2

---

## Wave: DISCUSS / [REF] Driving Ports

No new ports or adapters are required. This feature is purely presentational:

| Layer                                    | New artifact | Type                                      |
| ---------------------------------------- | ------------ | ----------------------------------------- |
| `content/credentials/credly-badges.yaml` | Badge data   | Static content file                       |
| `composables/useCredentials.ts`          | Data loading | Shell composable (wraps `queryContent()`) |
| `components/CredlyBadgeStrip.vue`        | Rendering    | Presentation component                    |

`composables/useCredentials.ts` is the adapter between `@nuxt/content` (the driven port) and
the presentation layer. This follows the existing `composables/usePageContent.ts` pattern.

No `core/` changes. No new server routes. No new Zod schemas.

---

## Wave: DISCUSS / [REF] Pre-requisites

| Pre-requisite                                                              | Status           | Blocks      |
| -------------------------------------------------------------------------- | ---------------- | ----------- |
| `content/credentials/credly-badges.yaml` created with 8 badges             | To do (Slice 1)  | Both slices |
| `public/_headers` `img-src` updated to include `https://images.credly.com` | To do (Slice 1)  | Both slices |
| `CredlyBadgeStrip.vue` component built and tested                          | To do (Slice 1)  | Slice 2     |
| `composables/useCredentials.ts` written                                    | To do (Slice 1)  | Slice 2     |
| JOB-CB-001 added to `docs/product/jobs.yaml`                               | Done (this wave) | —           |

---

## Wave: DISCUSS / [REF] Badge Data (Complete Reference)

Source for `content/credentials/credly-badges.yaml`. Badge data is implemented in `composables/useCredentials.ts`.

<!-- markdownlint-disable MD034 -->

| Issuer    | Badge Name                                  | Image URL                                                                                    | Share URL                                                                       |
| --------- | ------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| ICAgile   | Agile Coaching                              | https://images.credly.com/size/128x128/images/5c50a643-ef0f-4bea-9c90-6fe2e785a1c8/image.png | https://www.credly.com/earner/earned/share/7beeace9-a560-44b5-93f8-689f58501bfa |
| ICAgile   | Agile Team Facilitation                     | https://images.credly.com/size/128x128/images/a0094e49-3070-4c3b-b538-452320be93c1/image.png | https://www.credly.com/earner/earned/share/06741e48-254f-4ba0-a830-8475a34d6d95 |
| ICAgile   | Coaching Agile Transformations              | https://images.credly.com/size/128x128/images/a53c6eee-4ec1-4481-99a8-ae75ef88c67a/image.png | https://www.credly.com/earner/earned/share/c373b985-a6ca-42d6-a6aa-6059a1e50c35 |
| ICAgile   | Enterprise Agile Coaching                   | https://images.credly.com/size/128x128/images/5df071ef-1f25-4375-9790-5cb925e4470f/image.png | https://www.credly.com/earner/earned/share/13326838-2128-4b0b-8de1-1efe9dcc75c7 |
| Scrum.org | Professional Scrum Master II (PSM II)       | https://images.credly.com/size/128x128/images/d90cc9bc-3e9a-49b2-ac09-7930db400e32/image.png | https://www.credly.com/earner/earned/share/4fd1bb98-6f0d-4d09-9248-debd48eb4634 |
| Scrum.org | Professional Scrum Master I (PSM I)         | https://images.credly.com/size/128x128/images/a2790314-008a-4c3d-9553-f5e84eb359ba/image.png | https://www.credly.com/earner/earned/share/945bd674-2dce-4e53-aeda-b622aa0d1a27 |
| Scrum.org | Professional Scrum Product Owner I (PSPO I) | https://images.credly.com/size/128x128/images/591762c5-fae7-49c6-b326-e1756979928d/image.png | https://www.credly.com/earner/earned/share/3ade3eeb-d257-4f05-ab3a-baf25d17efac |
| Scrum.org | Professional Scrum with Kanban I (PSK I)    | https://images.credly.com/size/128x128/images/78c2bf96-9468-40ac-aee7-3eac9d79a6d5/image.png | https://www.credly.com/earner/earned/share/5073ef86-fc81-4c70-9504-81a2d394c54b |

<!-- markdownlint-enable MD034 -->

---

## DoR Validation

### Slice 1 — About Page

| DoR Item                                   | Status | Evidence                                                                     |
| ------------------------------------------ | ------ | ---------------------------------------------------------------------------- |
| Problem statement clear, domain language   | PASS   | Recruiter cannot verify credential claims without leaving the site           |
| User/persona with specific characteristics | PASS   | Alex Chen — recruiter, arrives from CV link, evaluates in < 60 seconds       |
| 3+ domain examples with real data          | PASS   | Alex Chen happy path; Jordan Okafor issuer-unfamiliar; CDN outage fallback   |
| UAT in Given/When/Then (3–7 scenarios)     | PASS   | 5 scenarios                                                                  |
| AC derived from UAT                        | PASS   | AC items trace 1:1 to UAT scenarios                                          |
| Right-sized (1–3 days, 3–7 scenarios)      | PASS   | 1–2 days; 5 scenarios; single demonstrable behaviour                         |
| Technical notes: constraints/dependencies  | PASS   | CSP blocker, component boundary, data loading strategy, no core/ involvement |
| Dependencies resolved or tracked           | PASS   | All listed; YAML file and component are deliverables of this slice           |

### Slice 2 — Homepage

| DoR Item                                   | Status | Evidence                                                                                     |
| ------------------------------------------ | ------ | -------------------------------------------------------------------------------------------- |
| Problem statement clear, domain language   | PASS   | Recruiter arriving at homepage has no credential signal; bounces to next candidate           |
| User/persona with specific characteristics | PASS   | Marcus Webb — agency recruiter, arrives via LinkedIn, first-pass scan                        |
| 3+ domain examples with real data          | PASS   | Marcus Webb LinkedIn arrival; Sophie Lambert referral partner; coexistence with TrustSignals |
| UAT in Given/When/Then (3–7 scenarios)     | PASS   | 4 scenarios                                                                                  |
| AC derived from UAT                        | PASS   | AC items trace to UAT scenarios                                                              |
| Right-sized (1–3 days, 3–7 scenarios)      | PASS   | < 1 day (component reuse); 4 scenarios                                                       |
| Technical notes: constraints/dependencies  | PASS   | Component reuse only; CSP already handled in Slice 1                                         |
| Dependencies resolved or tracked           | PASS   | Depends on Slice 1; clearly stated                                                           |
