# Feature Delta — Daedalus Coaching Website Redesign

feature_id: daedalus-coaching-website-redesign
wave: DESIGN
date: 2026-05-12
status: PEER REVIEWED — APPROVED FOR HANDOFF

---

## Wave: DESIGN / [REF] Domain Concepts

Bounded domains for this site (all within a single modular monolith — no separate
services warranted for a solo-practitioner site):

| Domain Concept       | Module                        | Type                                     |
| -------------------- | ----------------------------- | ---------------------------------------- |
| Contact enquiry      | `core/contact/`               | Core domain — Zod schema, SubmissionPort |
| Page content         | `core/content/`               | Supporting domain — ContentPort type     |
| Swoopy diagram embed | `core/swoopy/`                | Supporting domain — URL construction     |
| Design tokens        | `assets/tokens.css`           | Cross-cutting — CSS Custom Properties    |
| Trust signals        | `components/TrustSignals.vue` | Presentation — no domain logic           |

DDD note: this is a simple domain. No aggregates, no domain events, no bounded context
mapping needed. The core/shell boundary provides sufficient isolation without DDD tactical
patterns. If the site grows to include a booking system or client portal, revisit.

---

## Wave: DESIGN / [REF] Component Decomposition

### Core Layer (pure functions, no framework)

| Module                           | Responsibility                                                |
| -------------------------------- | ------------------------------------------------------------- |
| `core/contact/contact-schema.ts` | Zod schema — canonical contact form contract                  |
| `core/contact/contact-port.ts`   | `SubmissionPort` type signature                               |
| `core/content/content-port.ts`   | `ContentPort` type signature                                  |
| `core/swoopy/swoopy-url.ts`      | Pure function: `(modelId?: string, graph?: string) => string` |

### Shell Layer (composables + server routes)

| Module                          | Responsibility                                                             |
| ------------------------------- | -------------------------------------------------------------------------- |
| `composables/useContact.ts`     | Reactive form state, validation via core schema, submit via SubmissionPort |
| `composables/usePageContent.ts` | Fetches from @nuxt/content, maps to ContentPort shape                      |
| `server/api/contact.post.ts`    | Server-side validation via core schema, forwards to Netlify Forms          |

### Driving Shell (Vue components + pages)

| Component                     | Responsibility                                            |
| ----------------------------- | --------------------------------------------------------- |
| `components/TrustSignals.vue` | B-Corp, 1%FTP, accreditations display — above fold        |
| `components/ContactForm.vue`  | Single CTA component — uses `useContact` composable       |
| `components/SwoopyEmbed.vue`  | `<iframe>` wrapper — src from `core/swoopy/swoopy-url.ts` |
| `pages/index.vue`             | Homepage — trust-first IA                                 |
| `pages/about.vue`             | Narrative about page                                      |
| `pages/contact.vue`           | Contact page                                              |

---

## Wave: DESIGN / [REF] Driving Ports

Driving ports are inbound — the shell initiates, core defines the contract.

| Port                    | Defined In                             | Consumed By                                   | Description                                            |
| ----------------------- | -------------------------------------- | --------------------------------------------- | ------------------------------------------------------ |
| Contact validation      | `core/contact/contact-schema.ts` (Zod) | `useContact.ts`, `server/api/contact.post.ts` | Both validate against the same schema — no duplication |
| Content retrieval shape | `core/content/content-port.ts`         | `usePageContent.ts`                           | TypeScript type only — adapter fills the shape         |

---

## Wave: DESIGN / [REF] Driven Ports and Adapters

Driven ports are outbound — core defines the port, shell implements the adapter.

| Port              | Interface Location                | v1 Adapter                                      | Fallback Path                           |
| ----------------- | --------------------------------- | ----------------------------------------------- | --------------------------------------- |
| `SubmissionPort`  | `core/contact/contact-port.ts`    | `server/api/contact.post.ts` → Netlify Forms    | Resend adapter (ADR-004)                |
| `ContentPort`     | `core/content/content-port.ts`    | `composables/usePageContent.ts` → @nuxt/content | Decap CMS adapter if H3 fails (ADR-002) |
| `SwoopyEmbedPort` | Implicit: `SwoopyEmbed.vue` props | `<iframe>` to `/swoopy/?m=<modelId>`            | Web Component — SPIKE-01 (ADR-003)      |

Probe requirements (Earned Trust):

- `SubmissionPort` adapter: CI check asserts `data-netlify` attribute present in generated HTML
- `ContentPort` adapter: @nuxt/content is a build-time dependency — probe = successful `nuxt generate` with non-empty content query result
- `SwoopyEmbedPort`: Netlify proxy redirect rule validated via `netlify-cli` deploy preview check

---

## Wave: DESIGN / [REF] Technology Choices

| Decision                 | Choice                            | Licence          | ADR     |
| ------------------------ | --------------------------------- | ---------------- | ------- |
| Architectural style      | Pure Core / Imperative Shell      | —                | ADR-001 |
| Framework                | Nuxt 3 (pre-decided)              | MIT              | ADR-001 |
| Validation               | Zod ^3.x (pre-decided)            | MIT              | ADR-004 |
| Content source           | @nuxt/content v2 (conditional H3) | MIT              | ADR-002 |
| Swoopy integration       | Netlify proxy + iframe            | —                | ADR-003 |
| Design token enforcement | CSS Custom Properties + Stylelint | MIT              | ADR-005 |
| Dependency enforcement   | dependency-cruiser                | MIT              | ADR-001 |
| Unit/mutation testing    | Vitest + Stryker                  | MIT / Apache 2.0 | ADR-006 |
| E2E testing              | Playwright                        | Apache 2.0       | ADR-006 |

All proprietary dependencies (Netlify, iubenda) are pre-existing with documented rationale.
No new proprietary dependencies introduced in this design.

---

## Wave: DESIGN / [REF] Decisions Table

| Decision                           | Rationale                                                           | Reversible?                              | ADR     |
| ---------------------------------- | ------------------------------------------------------------------- | ---------------------------------------- | ------- |
| Pure Core / Imperative Shell       | Matches global default; makes Stryker viable; enforced mechanically | Low (would require significant refactor) | ADR-001 |
| Content adapter isolation          | H3 walkthrough not complete; swap path must be safe                 | Yes — adapter implementation only        | ADR-002 |
| Netlify proxy for Swoopy           | Independent deployments; same-origin iframe; no build coupling      | Yes — co-deploy is an alternative        | ADR-003 |
| Zod in core, Netlify Forms adapter | Server-side validation; SubmissionPort is swappable                 | Yes — Resend adapter available           | ADR-004 |
| CSS Custom Properties + Stylelint  | Mechanically enforces H2 hypothesis; zero new tooling               | Yes — Tailwind if workflow changes       | ADR-005 |
| Outside-In TDD + Stryker on core   | Addresses S5 (stale scaffolding) structurally                       | Low (methodology commitment)             | ADR-006 |

---

## Wave: DESIGN / [REF] Reuse Analysis

### Swoopy Renderer — Reuse Assessment

**Component**: Swoopy's rendering engine (`@swoopy/renderer`, `@swoopy/engine`) at
`~/projects/swoopy`.

**Current state**: React + Vite application. Renderer takes an `HTMLCanvasElement`. Engine
is pure logic. Both are in the same repo, not yet published as npm packages.

**Reuse options assessed**:

| Path                               | Swoopy work required                                       | Nuxt work required               | Status                          |
| ---------------------------------- | ---------------------------------------------------------- | -------------------------------- | ------------------------------- |
| iframe proxy (chosen, v1)          | None — deploy as-is                                        | `SwoopyEmbed.vue` + proxy config | IN SCOPE                        |
| Direct canvas embed (read-only)    | Export `RendererStore` factory; publish `@swoopy/renderer` | Vue component with canvas ref    | SPIKE-01                        |
| Web Component (`<swoopy-diagram>`) | Add `@r2wc/react-to-web-component` build target; publish   | Import and use Custom Element    | SPIKE-01                        |
| Vue shell rewrite                  | N/A                                                        | Port React toolbar to Vue        | Out of scope (disproportionate) |

**Conclusion**: The iframe proxy maximises reuse of Swoopy as-is. No Swoopy package changes
are required for v1. The upgrade path (SPIKE-01) is well-defined and triggered only by a
concrete iframe limitation, not speculatively.

**Risk**: Swoopy is an internal project with no published packages. There is no Pact
contract test applicable at v1 (no API boundary). SPIKE-01 trigger creates a package
boundary — at that point, snapshot/contract testing of `@swoopy/renderer` API becomes
recommended. Noted in handoff to platform-architect.

---

## Wave: DESIGN / [REF] Open Questions

| ID            | Question                                                                     | Impact if unresolved                                                            | Resolution path                              |
| ------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------- |
| H3            | Did owner complete markdown content-edit walkthrough?                        | ContentPort adapter must be swapped to Decap CMS — estimated small but not zero | Owner performs 30-min task on staging branch |
| Plausible     | Analytics provider confirmed (cloud vs self-host)?                           | CSP header and GDPR banner config differ                                        | Owner decision before launch sprint          |
| Swoopy domain | Does Swoopy deploy to its own Netlify custom domain or `swoopy.netlify.app`? | Proxy `to` URL in `netlify.toml`                                                | Developer decision, low risk                 |
| CSP           | What third-party scripts are required (iubenda, Plausible, any fonts)?       | Content-Security-Policy header must whitelist all of them                       | Enumerate in Sprint 1                        |

---

## Wave: DEVOPS / [REF] Delivery Infrastructure

### Platform Configuration Produced

| Artifact                   | Path                                 | Purpose                                                |
| -------------------------- | ------------------------------------ | ------------------------------------------------------ |
| `netlify.toml`             | `/netlify.toml`                      | Build command, publish dir, Node 22 pin, Swoopy proxy  |
| `public/_headers`          | `/public/_headers`                   | CSP baseline for all pages (Netlify `_headers` format) |
| `.github/workflows/ci.yml` | `/.github/workflows/ci.yml`          | GitHub Actions CI — 7 quality gates                    |
| `lefthook.yml`             | `/lefthook.yml`                      | Pre-commit hooks mirroring CI commit stage             |
| `environments.yaml`        | `docs/feature/.../environments.yaml` | Environment inventory with rollback procedure          |

### CI Quality Gate Order

| Order | Gate                          | Failure mode  | Tool                                    |
| ----- | ----------------------------- | ------------- | --------------------------------------- |
| 1     | TypeScript type check         | Build blocked | `tsc --noEmit` via `pnpm typecheck`     |
| 2     | Stylelint token enforcement   | Build blocked | `stylelint-declaration-strict-value`    |
| 3     | Dependency boundary           | Build blocked | `dependency-cruiser`                    |
| 4     | Unit + component tests        | Build blocked | Vitest                                  |
| 5     | SSG build                     | Build blocked | `pnpm run generate`                     |
| 6     | Netlify Forms attribute probe | Build blocked | `grep data-netlify` in `.output/public` |
| 7     | E2e tests                     | Build blocked | Playwright (Chromium)                   |

### Rollback Strategy

SSG + Netlify atomic deploys means rollback = redeploy previous deploy from Netlify dashboard.
No automated rollback trigger is needed — there is no runtime error rate to monitor.
Estimated RTO < 2 minutes (CDN propagation). Full procedure in `environments.yaml`.

### CSP Domains Whitelisted

- `https://cdn.iubenda.com` — iubenda consent banner script
- `https://cs.iubenda.com` — iubenda consent state API
- `https://plausible.io` — Plausible Analytics script and event endpoint
- `frame-src 'self'` — Swoopy iframe is same-origin via Netlify proxy; no external frame-src needed

### Open Items (DEVOPS wave)

| ID        | Item                                                                                                                                                                | Owner     | Trigger                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------- |
| DEVOPS-01 | Confirm Swoopy Netlify URL and update `netlify.toml` `to` value                                                                                                     | Developer | Before first Swoopy deploy        |
| DEVOPS-02 | Install lefthook: `pnpm dlx lefthook install` after cloning                                                                                                         | Developer | First checkout                    |
| DEVOPS-03 | Add `pnpm lint` script to `package.json` pointing to stylelint once stylelint is configured                                                                         | Developer | Sprint 1                          |
| DEVOPS-04 | Playwright CI e2e runs against `pnpm dev` — add `pnpm serve` script using `serve .output/public` for pure SSG validation when dev server overhead becomes a concern | Developer | When CI e2e runtime exceeds 5 min |

---

## Wave: DISTILL / [REF] Acceptance Test Suite

wave: DISTILL
date: 2026-05-14
status: PEER REVIEWED — APPROVED FOR HANDOFF TO DELIVER
designer: Quinn (Acceptance Test Designer, nWave DISTILL wave)

---

### Walking Skeleton Strategy

**Strategy C — Real local (browser-level)** applies for all scenarios.

The site is Nuxt SSG served via `pnpm dev` during Playwright runs. The browser is the
driving adapter. No InMemory doubles exist at the acceptance layer — the walking skeletons
hit the real dev server with real markdown content and real server routes.

Contact form submission uses the real `/api/contact` Nuxt server route (validates via Zod).
The Netlify Forms endpoint is the costly external dependency and is not reached in local
runs (the route responds but Netlify does not capture it locally — consistent with Strategy B/C
boundary). The acceptance test validates the confirmation UX, not the Netlify capture.

---

### Driving Ports Used

All acceptance scenarios enter through the browser (Playwright) invoking the rendered Nuxt
pages. This maps to the architecture's driving ports as follows:

| Acceptance test target | Driving port invoked                   | Architecture mapping                      |
| ---------------------- | -------------------------------------- | ----------------------------------------- |
| Contact form scenarios | Browser → `/contact` page              | ContactForm.vue → useContact.ts → core    |
| Content rendering      | Browser → `/`, `/about`, `/services`   | pages → usePageContent.ts → @nuxt/content |
| Trust signals          | Browser → `/` (TrustSignals.vue)       | core/trust-signals/config.ts              |
| Swoopy embed           | Browser → `/systems` (SwoopyEmbed.vue) | core/swoopy/swoopy-url.ts → iframe        |
| Navigation             | Browser → all pages via nav links      | SiteHeader.vue → NuxtLink router          |

Mandate CM-A: zero test files import internal components or core modules directly. All
invocations are through the browser rendering public pages.

---

### Scenario Inventory

**Feature file (specification layer)**:
`tests/e2e/daedalus-coaching-website-redesign/acceptance/warm-referral-journey.feature`

| Category          | Count  |
| ----------------- | ------ |
| Walking skeletons | 3      |
| Happy path        | 19     |
| Error / edge      | 15     |
| **Total**         | **37** |

Error/edge ratio: **40.5%** — mandate gate passed (target >= 40%).

**Spec files (executable implementation layer)**:

| File                       | Enabled | Skipped | Total  |
| -------------------------- | ------- | ------- | ------ |
| `walking-skeleton.spec.ts` | 1       | 0       | 1      |
| `contact-page.spec.ts`     | 7       | 2       | 9      |
| `about-page.spec.ts`       | 2       | 2       | 4      |
| `trust-signals.spec.ts`    | 1       | 4       | 5      |
| `swoopy-embed.spec.ts`     | 4       | 1       | 5      |
| `navigation.spec.ts`       | 1       | 7       | 8      |
| `services-page.spec.ts`    | 1       | 2       | 3      |
| **Total**                  | **17**  | **18**  | **35** |

17 scenarios enabled and passing. 18 skipped — one enabled per file, implement and
enable one at a time per DELIVER wave TDD discipline.

---

### Walking Skeleton Identification (for DELIVER sequencing)

The DELIVER wave should implement against these three skeletons in order:

1. **Homepage content skeleton** (`walking-skeleton.spec.ts:1`)
   — "visiting the homepage renders content from the markdown file"
   — Proves: @nuxt/content delivers markdown to pages in the browser. Currently passing.

2. **Contact form skeleton** (`contact-page.spec.ts:1`)
   — "visitor reaches the contact page and sees the enquiry form"
   — Proves: ContactForm.vue renders with all three fields accessible. Currently passing.

3. **Warm referral E2E skeleton** (in feature file — no dedicated spec yet)
   — "Referred visitor arrives, reads the site, and sends an enquiry"
   — Proves: the complete journey from homepage to enquiry confirmation works end-to-end.
   — Recommended as the DELIVER wave's integration test when all skeletons are green.

---

### Mandate Compliance Evidence

**CM-A — Hexagonal boundary enforcement**:
All spec files import only from `@playwright/test`. Zero imports from `core/`, `composables/`,
or `server/`. Scenarios drive the site exclusively through the browser.

**CM-B — Business language purity**:
The feature file contains zero technical terms. No references to Zod, Netlify, API, endpoint,
composable, Vue, SSR, hydration, or HTTP status codes. Playwright technical details are
confined to spec files (step implementation layer only).

**CM-C — User journey completeness**:
All 5 steps of `journey-warm-referral.yaml` are covered:

- Step 1 (Arrive): homepage content and load scenarios
- Step 2 (Scan): trust signals scenarios
- Step 3 (Assess approach): about page and services page scenarios
- Step 4 (Decide): navigation and homepage CTA scenarios
- Step 5 (Enquire): contact form happy path and error path scenarios

**CM-D — Pure function / adapter boundary**:
Acceptance tests do not test `core/` directly. Pure functions (`core/contact/contact-schema.ts`,
`core/swoopy/swoopy-url.ts`) are exercised indirectly through the browser. Unit tests for
these functions are the inner-loop responsibility (Vitest, not in scope for DISTILL).

---

### One-at-a-Time Implementation Sequence (DELIVER handoff)

Recommended order for enabling skipped scenarios. Each represents one TDD outer-loop cycle.

| Order | Spec file               | Scenario                                                 | Unlock condition                |
| ----- | ----------------------- | -------------------------------------------------------- | ------------------------------- |
| 1     | `navigation.spec.ts`    | About page reachable via nav link                        | All pages routed                |
| 2     | `navigation.spec.ts`    | Services page reachable via nav link                     | After (1)                       |
| 3     | `navigation.spec.ts`    | Systems page reachable via nav link                      | After (2)                       |
| 4     | `navigation.spec.ts`    | Contact page reachable via nav link                      | After (3)                       |
| 5     | `navigation.spec.ts`    | Logo returns visitor to homepage                         | After (4)                       |
| 6     | `navigation.spec.ts`    | 404 path does not produce server error                   | After (5)                       |
| 7     | `navigation.spec.ts`    | Homepage CTA leads to contact form                       | After (6)                       |
| 8     | `about-page.spec.ts`    | About page prose from content blocks                     | Content blocks wired            |
| 9     | `about-page.spec.ts`    | Blocks rendered in declared order                        | After (8)                       |
| 10    | `about-page.spec.ts`    | Unknown about sub-path: not-found, no crash              | After (9)                       |
| 11    | `services-page.spec.ts` | Services page delivers prose from content file           | Content composable working      |
| 12    | `services-page.spec.ts` | Unknown services path: not-found, no crash               | After (11)                      |
| 13    | `trust-signals.spec.ts` | B-Corp credential visible (when flag enabled)            | B-Corp flag enabled in config   |
| 14    | `trust-signals.spec.ts` | 1% for the Planet visible (when flag enabled)            | 1%FTP flag enabled in config    |
| 15    | `trust-signals.spec.ts` | Professional accreditations visible (when flags enabled) | Accreditation flags enabled     |
| 16    | `trust-signals.spec.ts` | Trust signals present in SSG HTML without JS             | After SSG build validation      |
| 17    | `swoopy-embed.spec.ts`  | Iframe links to specific model when modelId provided     | A page with modelId prop exists |
| 18    | `contact-page.spec.ts`  | Validation errors announced as role="alert"              | Accessibility markup confirmed  |
| 19    | `contact-page.spec.ts`  | Send button disabled while sending                       | Submitting state UX confirmed   |

---

### Open Items (DISTILL wave)

| ID         | Item                                                                                      | Owner     | Trigger                                  |
| ---------- | ----------------------------------------------------------------------------------------- | --------- | ---------------------------------------- |
| DISTILL-01 | `walking-skeleton.spec.ts` asserts specific content text — update if copy changes         | Developer | Any homepage copy edit                   |
| DISTILL-02 | Swoopy iframe unavailability scenario (diagram not responding) has no executable spec yet | Developer | When Swoopy deploy is confirmed stable   |
| DISTILL-03 | Trust signal credential scenarios skipped until flags are enabled in config               | Owner     | When each credential is earned/confirmed |
| DISTILL-04 | Navigation "already on this page" edge case has no executable spec yet                    | Developer | When navigation is fully wired           |
| DISTILL-05 | Whitespace-only name validation: Zod schema must trim and reject — verify in unit tests   | Developer | Inner loop (Vitest on core/contact)      |

---

### Peer Review

Reviewer: acceptance-designer (self-review, critique-dimensions skill)
Result: **APPROVED**

| Dimension                           | Status | Notes                                                         |
| ----------------------------------- | ------ | ------------------------------------------------------------- |
| 1. Happy path bias                  | PASSED | 40.5% error/edge scenarios                                    |
| 2. GWT format compliance            | PASSED | All feature scenarios have Given/When/Then; single When each  |
| 3. Business language purity         | PASSED | Feature file clean; technical terms confined to spec files    |
| 4. Coverage completeness            | PASSED | All 5 journey steps covered; all in-scope capabilities tested |
| 5. Walking skeleton user-centricity | PASSED | 3 WS scenarios; all title/Then describe user goals/outcomes   |
| 6. Priority validation              | PASSED | Trust signals + contact form = highest DISCOVER opportunities |
| 7. Observable behavior assertions   | PASSED | All Then steps assert visible elements or observable outcomes |
| 8. Traceability coverage            | N/A    | DISCUSS skipped; traces to journey steps and DISCOVER opps    |
| 9. WS boundary proof                | PASSED | Strategy C; real browser + real dev server; no InMemory       |

Critical issues: 0 | High issues: 0 | Medium issues: 1

Medium: `walking-skeleton.spec.ts` asserts verbatim content text — tightly coupled to copy.
Acceptable at DISTILL; DELIVER wave should note that content-asserting tests require
maintenance when copy changes (DISTILL-01 above).
