# Evolution — Daedalus Coaching Website Redesign

feature_id: daedalus-coaching-website-redesign
closed: 2026-05-15
waves: DISCOVER → DESIGN → DEVOPS → DISTILL → DELIVER
status: COMPLETE — 34/34 acceptance tests green

---

## What Shipped

A production-ready Nuxt 3 SSG site for a solo executive coaching practice. The site
functions as a trust gate for warm-referral visitors: homepage credentials, about narrative,
services overview, systems page (Swoopy embed), and a contact form routed through Netlify
Forms.

**Implementation scope confirmed by DELIVER wave:**

- Pure Core / Imperative Shell architecture enforced by dependency-cruiser in CI
- `core/contact/contact-schema.ts` — Zod validation schema (unit tested, 13/13 Vitest green)
- `core/swoopy/swoopy-url.ts` — pure URL construction function
- `core/content/content-port.ts` — ContentPort type signature
- `composables/useContact.ts`, `composables/usePageContent.ts` — shell adapters
- `server/api/contact.post.ts` — server-side validation → Netlify Forms
- `components/TrustSignals.vue`, `ContactForm.vue`, `SwoopyEmbed.vue` — presentation layer
- `pages/index.vue`, `about.vue`, `contact.vue`, `services.vue`, `systems.vue`
- `public/_headers` — CSP baseline (iubenda + Plausible + same-origin frame-src)
- `.github/workflows/ci.yml` — 7-gate CI pipeline (typecheck → stylelint → dep-cruiser → vitest → SSG build → Netlify probe → Playwright)
- `lefthook.yml` — pre-commit mirrors CI commit stage
- `netlify.toml` — atomic deploy config, Swoopy proxy redirect

No new production code was written during DELIVER. The implementation was complete from
prior content and component work. DELIVER confirmed correctness by running all spec groups
and committing DES phase logs per step.

---

## What Was Deferred and Why

Five scenarios are intentionally skipped with explicit unlock triggers. They are not gaps —
they are trust signals that do not yet exist or integrations not yet confirmed stable.

| Deferred item                                         | Reason                                                   | Unlock trigger                                          |
| ----------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| `trust-signals.spec.ts` — B-Corp credential           | Owner has not yet earned the certification               | Owner earns B-Corp and confirms display flag            |
| `trust-signals.spec.ts` — 1% for the Planet           | Same condition                                           | Same                                                    |
| `trust-signals.spec.ts` — professional accreditations | Credential flags not enabled in config                   | Owner enables each flag as credentials are confirmed    |
| `trust-signals.spec.ts` — SSG HTML check (no-JS)      | Dependent on credential flags being enabled first        | After at least one credential flag is active            |
| `swoopy-embed.spec.ts` — iframe with explicit modelId | No page currently embeds `<SwoopyEmbed modelId="..." />` | When a content page is added that uses the modelId prop |

When any of these unlock, enable the corresponding skipped spec scenario — no new test
code is needed. The scenarios are already written and validated; they just need `test.skip`
removed.

---

## Key Architectural Decisions Confirmed by Implementation

### 1. @nuxt/content v3 (not v2 as originally cited)

The DESIGN wave referenced v2.x from memory. The walking skeleton spike (commit 57966b0)
confirmed the current release is v3.x (resolved to v3.13.0). Architecture brief's
technology stack table cited v2 — this was a pre-implementation estimate. v3 is what ships.

The ContentPort adapter pattern was validated: `composables/usePageContent.ts` is the sole
import boundary for @nuxt/content. Swapping the content backend remains a single-file change.

### 2. `better-sqlite3` as a direct (not dev) dependency

@nuxt/content v3 uses `better-sqlite3` for its content collection index. In non-TTY
environments (CI, Netlify build), this fails silently without an explicit declaration.
The spike confirmed it must be in `dependencies`, not `devDependencies`.

### 3. Walking skeleton strategy C (real local) validated

All acceptance tests drive the real Nuxt dev server via Playwright. No InMemory doubles
exist at the acceptance layer. This was the correct call: the only "external" resource is
the local filesystem (content/\*.md), and an InMemory double would test nothing meaningful.

### 4. `pages/index.vue` uses `queryCollection` directly (not via composable)

This is a documented walking skeleton shortcut. `<ContentRenderer>` requires the raw
@nuxt/content document object, not the mapped `ContentPage` shape from `usePageContent`.
The composable is the correct long-term boundary. Refactor this when ContentRenderer usage
is consolidated (future sprint, not a bug).

### 5. Contact form confirmation UX, not Netlify capture

The acceptance tests validate the confirmation UX (user sees success state). They do not
validate that Netlify captures the submission — that is impossible locally (Netlify Forms
only captures submissions in their CDN environment). The CI `grep data-netlify` probe
provides the structural confidence that the form will be captured in production.

---

## Observations for Future Maintainers

**Content-asserting tests are copy-coupled.** `walking-skeleton.spec.ts` asserts verbatim
content text from `content/home.md`. When homepage copy changes, this test will fail. This
is expected — update the assertion to match the new copy. It is not a bug; it is the
intended guard against accidental content deletion.

**Trust signal scenarios are toggle-driven.** `TrustSignals.vue` renders conditionally on
config flags. Before enabling any credential flag, read the existing skipped scenarios in
`trust-signals.spec.ts` — the test for that credential is already written and waiting.

**SPIKE-01 trigger conditions are documented.** If the Swoopy iframe hits a concrete
limitation (scroll lock, resize observer, token sharing), see `docs/product/architecture/brief.md`
SPIKE-01 open item for the web component upgrade path. Do not speculate — wait for the
concrete problem.

**Swoopy proxy `to` URL needs updating.** `netlify.toml` contains a placeholder Swoopy URL.
Before the first Swoopy deploy, update the `to` value in the `[[redirects]]` block to the
real Netlify URL (DEVOPS-01).

**Lefthook must be installed per checkout.** Run `pnpm dlx lefthook install` after cloning.
The hooks are defined in `lefthook.yml` but must be registered with git locally.

**Analytics is unresolved.** No analytics provider is configured. Plausible was rejected
(cost). The CSP whitelist in `public/_headers` includes `plausible.io` as a placeholder —
revise or remove when a final decision is made (see memory: project_analytics.md).

---

## DELIVER Wave Execution Summary

5 steps, all COMMIT/PASS. Completed 2026-05-15.

| Step  | Name                           | Result | Note                                                                      |
| ----- | ------------------------------ | ------ | ------------------------------------------------------------------------- |
| 01-01 | Navigation acceptance tests    | PASS   | 8/8 scenarios green; cold-start timing issue resolved without code change |
| 02-01 | About page acceptance tests    | PASS   | 4/4 green on first run                                                    |
| 02-02 | Services page acceptance tests | PASS   | 3/3 green on first run                                                    |
| 03-01 | Contact page a11y scenarios    | PASS   | 9/9 green; role=alert and disabled-during-send confirmed                  |
| 04-01 | Contact schema unit tests      | PASS   | 13/13 Vitest green; schema already had .trim().min(1) from prior work     |

Integration gate (Phase 3.5): 34/34 enabled scenarios green. 3 intentional skips (trust
signals pending credentials). DES integrity verified: all 5 steps have complete traces.

---

## Permanent Artifact Locations

| Artifact                    | Location                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------- |
| Architecture brief          | `docs/product/architecture/brief.md`                                                    |
| ADRs (001–006)              | Referenced in architecture brief ADR index                                              |
| Acceptance scenarios        | `tests/e2e/daedalus-coaching-website-redesign/acceptance/`                              |
| Feature file (GWT spec)     | `tests/e2e/daedalus-coaching-website-redesign/acceptance/warm-referral-journey.feature` |
| CI pipeline                 | `.github/workflows/ci.yml`                                                              |
| Delivery infrastructure     | `netlify.toml`, `lefthook.yml`, `public/_headers`                                       |
| Feature workspace (history) | `docs/feature/daedalus-coaching-website-redesign/`                                      |
