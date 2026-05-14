# Product Backlog — Daedalus Coaching

```yaml
maintainer: owner-editor
last_updated: 2026-05-14
session_2026-05-14: HK-1, HK-2, CN-1, CN-2 completed
status_values: [NOW, NEXT, LATER, DEFERRED, DONE]
```

Items are ordered by priority within each section.
`NOW` = blocking or in-flight. `NEXT` = strong candidate for next session.
`LATER` = real but not urgent. `DEFERRED` = deliberate decision to not do yet.

---

## Housekeeping (tooling & repo hygiene)

| ID   | Status | Item                                                                | Notes                                                         |
| ---- | ------ | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| HK-1 | DONE   | Commit modified docs (`execution-log.json`, `feature-delta.md`)     | Done 2026-05-14                                               |
| HK-2 | DONE   | Decide on `.develop-progress.json` — commit or add to `.gitignore`  | Gitignored 2026-05-14                                         |
| HK-3 | NEXT   | Fix DES CLI — `ModuleNotFoundError: No module named des`            | Required before any future tracked delivery work              |
| HK-4 | NEXT   | Register lefthook: `pnpm dlx lefthook install`                      | CLAUDE.md open item; pre-commit TDD guard inactive until done |
| HK-5 | NEXT   | Add stylelint: `.stylelintrc.cjs` + `pnpm lint` script              | Required before any systematic CSS work                       |
| HK-6 | NEXT   | Close out DISCUSS DoD unchecked items or mark as acknowledged skips | JTBD analysis, peer review (LD-08), DoR validation still open |
| HK-7 | LATER  | Sync `.develop-progress.json` — register Phase 04's 4 emerged steps | Prevents false "all done" when resuming DES tracking          |

---

## Content (pages not yet written)

| ID    | Status | Item                                            | Notes                                                                                             |
| ----- | ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| CN-1  | DONE   | Contact page prose                              | Done 2026-05-14                                                                                   |
| CN-2  | DONE   | Services page — full build                      | Done 2026-05-14 — three-mode structure (individuals/teams/orgs)                                   |
| CN-3  | NEXT   | Replace placeholder CLD SVGs                    | `public/images/diagrams/approach.svg`, `background.svg` — hardcoded hex                           |
| CN-4  | LATER  | About page — deepen narrative                   | Skeleton exists; may need expansion after stability test verdict                                  |
| CN-5  | LATER  | 404 page                                        | No custom error page yet; Nuxt fallback only                                                      |
| CN-6  | LATER  | Privacy policy page                             | Required for GDPR; iubenda may supply but needs a dedicated URL                                   |
| CN-7  | LATER  | Accessibility statement                         | Legal requirement in many jurisdictions; brief + contact details                                  |
| CN-8  | DONE   | Services page — content block redesign          | Done 2026-05-14 — 5 blocks + sequential NarrativeEdge; FanEdge fan-out/fan-in → CN-15            |
| CN-9  | DONE   | Coach identity — LinkedIn links                 | Done 2026-05-14 — footer via runtimeConfig; bio on about page via existing narrative              |
| CN-10 | DONE   | Coach photo — placeholder + enable/disable flag | Done 2026-05-14 — flip enabled=true + drop headshot.jpg when ready                               |
| CN-11 | DONE   | Location / geography                            | Done 2026-05-14 — contact page: "Hampshire, UK and remote"                                        |
| CN-12 | DONE   | Engagement scales on services page              | Done 2026-05-14 — services-engagement.md block                                                    |
| CN-15 | LATER  | FanEdge — 3-way fork/recombine on services page | Needs FanEdge.vue + BlockGroup abstraction in useComposedPage; design session required            |
| CN-13 | LATER  | Credentials "Find out more" expand pattern      | Low-key link/expand to certification bodies from trust signals or about page                      |
| CN-14 | LATER  | Abstract imagery for service personas           | Individual / team / org content blocks on services page (depends on CN-8)                         |

---

## Accessibility (WCAG 2.1 AA)

Calibrate to the org evaluator persona — corporate environments often include users with access needs. AA compliance is the floor; it also signals professional credibility.

| ID     | Status | Item                                                              | Notes                                                                  |
| ------ | ------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| A11-1  | NEXT   | Audit keyboard navigation throughout                              | Tab order, focus traps — manual keyboard pass needed                   |
| A11-2  | DONE   | Add skip navigation link (`<a href="#main">Skip to content</a>`)  | Done 2026-05-14                                                        |
| A11-3  | NEXT   | Verify colour contrast — all text and interactive elements        | 4.5:1 normal text, 3:1 large text; check against committed tokens      |
| A11-4  | DONE   | Audit focus indicators                                            | Done 2026-05-14 — global :focus-visible + form scoped override         |
| A11-5  | DONE   | Add `prefers-reduced-motion` guards to NarrativeEdge animations   | N/A — NarrativeEdge is a static SVG, no animation                      |
| A11-6  | NEXT   | Alt text audit — all images                                       | Decorative images get `alt=""`; informative images get descriptive alt |
| A11-7  | NEXT   | ARIA landmarks — verify `<main>`, `<nav>`, `<header>`, `<footer>` | Landmarks verified in snapshot; nav labels present                     |
| A11-8  | LATER  | Screen reader test (VoiceOver + NVDA)                             | Manual pass; catch issues automated tools miss                         |
| A11-9  | LATER  | High-contrast mode support                                        | Verify `forced-colors: active` doesn't break layout or icons           |
| A11-10 | LATER  | Touch target size audit                                           | Min 44×44px (WCAG 2.5.5); check mobile nav and contact CTA             |

---

## Performance (Core Web Vitals)

| ID   | Status | Item                                                 | Notes                                                      |
| ---- | ------ | ---------------------------------------------------- | ---------------------------------------------------------- |
| PF-1 | NEXT   | Image optimisation — WebP + `srcset` + lazy loading  | Any non-SVG images; Nuxt Image module candidate            |
| PF-2 | NEXT   | Font strategy — `font-display: swap` + subsetting    | Check current font loading; subset to used characters      |
| PF-3 | LATER  | Core Web Vitals baseline — run PageSpeed Insights    | LCP, CLS, INP targets: all green before launch             |
| PF-4 | LATER  | Audit third-party script impact (iubenda)            | iubenda consent banner; measure actual render cost         |

---

## Privacy, Legal & Compliance

| ID   | Status | Item                                                        | Notes                                                        |
| ---- | ------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| PL-1 | DONE   | Confirm analytics tool                                      | No analytics — Plausible too expensive; decision 2026-05-14  |
| PL-2 | DONE   | Verify iubenda consent banner fires before analytics loads  | N/A — no analytics tool in use                               |
| PL-3 | LATER  | Cookie policy — confirm iubenda covers it or add standalone | Check iubenda plan covers cookie policy generation           |
| PL-4 | LATER  | Data retention statement for contact form submissions       | Netlify Forms stores submissions — document retention period |

---

## Security & HTTP Headers

| ID    | Status | Item                                                       | Notes                                                               |
| ----- | ------ | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| SEC-1 | DONE   | CSP: finalise Content-Security-Policy in `public/_headers` | Done 2026-05-14 — iubenda domains; Plausible removed 2026-05-14     |
| SEC-2 | DONE   | HSTS header: `Strict-Transport-Security: max-age=31536000` | Done 2026-05-14                                                     |
| SEC-3 | DONE   | Permissions-Policy header                                  | Was already in place                                                |
| SEC-4 | DONE   | Referrer-Policy header                                     | Was already in place                                                |
| SEC-5 | LATER  | Contact form spam protection                               | Netlify honeypot field or Turnstile; current form has no protection |

---

## SEO & Discoverability

Low-acquisition-channel site, but referral partners checking the URL will share it — OG tags matter for that moment.

| ID    | Status | Item                                                       | Notes                                                                                   |
| ----- | ------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| SEO-1 | DONE   | `<meta>` description per page                              | Done 2026-05-14 — useSeoMeta on all 6 pages from frontmatter                            |
| SEO-2 | DONE   | Open Graph tags (`og:title`, `og:description`, `og:image`) | Done 2026-05-14 — og:title, og:desc, og:url, og:type on all pages; og:image still LATER |
| SEO-3 | DONE   | `robots.txt`                                               | Done 2026-05-14                                                                         |
| SEO-4 | DONE   | `sitemap.xml` generation                                   | Done 2026-05-14 — static file, all 6 pages                                              |
| SEO-5 | LATER  | Canonical URLs                                             | Prevent duplicate-content issues if Netlify serves on multiple URLs                     |
| SEO-6 | LATER  | Structured data — Person + LocalBusiness schema (JSON-LD)  | Helps Google understand the practitioner context                                        |
| SEO-7 | DONE   | Twitter/X Card meta tags                                   | Done 2026-05-14 — twitter:card summary via global head config                           |
| SEO-8 | LATER  | OG image (social card)                                     | 1200×630px PNG needed; text-only previews until then                                    |

---

## Analytics

| ID   | Status   | Item                                                      | Notes                                                                 |
| ---- | -------- | --------------------------------------------------------- | --------------------------------------------------------------------- |
| AN-1 | DEFERRED | Analytics tool selection                                  | Plausible too expensive; revisit if budget allows or find alternative |
| AN-2 | DEFERRED | Define analytics goals (contact form submit, Swoopy load) | Blocked on AN-1                                                       |

---

## Infrastructure & Deployment

| ID    | Status | Item                                                           | Notes                                                        |
| ----- | ------ | -------------------------------------------------------------- | ------------------------------------------------------------ |
| INF-1 | NEXT   | Update Swoopy proxy URL in `netlify.toml` once Swoopy deployed | CLAUDE.md open item; current `to` value is a placeholder     |
| INF-2 | LATER  | Netlify deploy previews — verify branch deploys work           | Useful for reviewing content changes before merging          |
| INF-3 | LATER  | DEVOPS wave artifact for website-redesign feature              | Feature is at DESIGN approved; no DEVOPS artifact exists yet |

---

## UX & Interaction

| ID   | Status | Item                                                   | Notes                                                            |
| ---- | ------ | ------------------------------------------------------ | ---------------------------------------------------------------- |
| UX-1 | DONE   | Contact form success and error states                  | Done — v-if="submitted" confirmation state in ContactForm.vue    |
| UX-2 | NEXT   | Email confirmation to enquirer on form submit          | Basic trust signal; Netlify Forms can trigger via notification   |
| UX-3 | LATER  | Mobile nav — verify usability at 375px                 | Keyboard + touch; current nav not tested at phone breakpoints    |
| UX-4 | LATER  | Print stylesheet                                       | Low priority but some org evaluators print pages                 |
| UX-5 | LATER  | Testimonials / social proof (beyond credential badges) | Quota-blocked until practitioner has explicit client consent     |

---

## Testing

| ID    | Status | Item                                                       | Notes                                                          |
| ----- | ------ | ---------------------------------------------------------- | -------------------------------------------------------------- |
| TST-1 | DONE   | Contact form acceptance tests                              | Done 2026-05-14 — 9 scenarios in contact-page.spec.ts          |
| TST-2 | DONE   | Swoopy embed acceptance tests                              | Done 2026-05-14 — 4 enabled; modelId scenario skipped (INF-1)  |
| TST-3 | LATER  | Visual regression baseline                                 | After stability test passes; snapshot before any token changes |
| TST-4 | LATER  | Playwright e2e smoke test — contact form submit on Netlify | Requires staging environment or branch deploy                  |

---

## Deferred (deliberate — revisit at 6-month review)

| ID    | Item                            | Decision record                                              |
| ----- | ------------------------------- | ------------------------------------------------------------ |
| DEF-1 | Blog                            | No client demand evidence; scope inflation pattern confirmed |
| DEF-2 | Bookshelf                       | Same rationale as blog                                       |
| DEF-3 | `/resources/` sub-directory     | No evidence; revisit if referral partners request it         |
| DEF-4 | Nuxt Layers architecture        | Wrong tool; Swoopy is React not Nuxt                         |
| DEF-5 | Swoopy web component (SPIKE-01) | Deferred per ADR-003; trigger: SPIKE-01 trigger conditions   |
| DEF-6 | Client portal                   | Revisit if practice grows to multiple concurrent clients     |
| DEF-7 | Booking system integration      | Out of scope; discovery call scheduling is currently manual  |
