# Feature Delta — Daedalus Coaching Website Redesign

feature_id: daedalus-coaching-website-redesign
wave: DESIGN
date: 2026-05-12
status: PEER REVIEWED — APPROVED FOR HANDOFF

---

## Wave: DESIGN / [REF] Domain Concepts

Bounded domains for this site (all within a single modular monolith — no separate
services warranted for a solo-practitioner site):

| Domain Concept | Module | Type |
|---------------|--------|------|
| Contact enquiry | `core/contact/` | Core domain — Zod schema, SubmissionPort |
| Page content | `core/content/` | Supporting domain — ContentPort type |
| Swoopy diagram embed | `core/swoopy/` | Supporting domain — URL construction |
| Design tokens | `assets/tokens.css` | Cross-cutting — CSS Custom Properties |
| Trust signals | `components/TrustSignals.vue` | Presentation — no domain logic |

DDD note: this is a simple domain. No aggregates, no domain events, no bounded context
mapping needed. The core/shell boundary provides sufficient isolation without DDD tactical
patterns. If the site grows to include a booking system or client portal, revisit.

---

## Wave: DESIGN / [REF] Component Decomposition

### Core Layer (pure functions, no framework)

| Module | Responsibility |
|--------|---------------|
| `core/contact/contact-schema.ts` | Zod schema — canonical contact form contract |
| `core/contact/contact-port.ts` | `SubmissionPort` type signature |
| `core/content/content-port.ts` | `ContentPort` type signature |
| `core/swoopy/swoopy-url.ts` | Pure function: `(modelId?: string, graph?: string) => string` |

### Shell Layer (composables + server routes)

| Module | Responsibility |
|--------|---------------|
| `composables/useContact.ts` | Reactive form state, validation via core schema, submit via SubmissionPort |
| `composables/usePageContent.ts` | Fetches from @nuxt/content, maps to ContentPort shape |
| `server/api/contact.post.ts` | Server-side validation via core schema, forwards to Netlify Forms |

### Driving Shell (Vue components + pages)

| Component | Responsibility |
|-----------|---------------|
| `components/TrustSignals.vue` | B-Corp, 1%FTP, accreditations display — above fold |
| `components/ContactForm.vue` | Single CTA component — uses `useContact` composable |
| `components/SwoopyEmbed.vue` | `<iframe>` wrapper — src from `core/swoopy/swoopy-url.ts` |
| `pages/index.vue` | Homepage — trust-first IA |
| `pages/about.vue` | Narrative about page |
| `pages/contact.vue` | Contact page |

---

## Wave: DESIGN / [REF] Driving Ports

Driving ports are inbound — the shell initiates, core defines the contract.

| Port | Defined In | Consumed By | Description |
|------|-----------|-------------|-------------|
| Contact validation | `core/contact/contact-schema.ts` (Zod) | `useContact.ts`, `server/api/contact.post.ts` | Both validate against the same schema — no duplication |
| Content retrieval shape | `core/content/content-port.ts` | `usePageContent.ts` | TypeScript type only — adapter fills the shape |

---

## Wave: DESIGN / [REF] Driven Ports and Adapters

Driven ports are outbound — core defines the port, shell implements the adapter.

| Port | Interface Location | v1 Adapter | Fallback Path |
|------|--------------------|------------|---------------|
| `SubmissionPort` | `core/contact/contact-port.ts` | `server/api/contact.post.ts` → Netlify Forms | Resend adapter (ADR-004) |
| `ContentPort` | `core/content/content-port.ts` | `composables/usePageContent.ts` → @nuxt/content | Decap CMS adapter if H3 fails (ADR-002) |
| `SwoopyEmbedPort` | Implicit: `SwoopyEmbed.vue` props | `<iframe>` to `/swoopy/?m=<modelId>` | Web Component — SPIKE-01 (ADR-003) |

Probe requirements (Earned Trust):
- `SubmissionPort` adapter: CI check asserts `data-netlify` attribute present in generated HTML
- `ContentPort` adapter: @nuxt/content is a build-time dependency — probe = successful `nuxt generate` with non-empty content query result
- `SwoopyEmbedPort`: Netlify proxy redirect rule validated via `netlify-cli` deploy preview check

---

## Wave: DESIGN / [REF] Technology Choices

| Decision | Choice | Licence | ADR |
|----------|--------|---------|-----|
| Architectural style | Pure Core / Imperative Shell | — | ADR-001 |
| Framework | Nuxt 3 (pre-decided) | MIT | ADR-001 |
| Validation | Zod ^3.x (pre-decided) | MIT | ADR-004 |
| Content source | @nuxt/content v2 (conditional H3) | MIT | ADR-002 |
| Swoopy integration | Netlify proxy + iframe | — | ADR-003 |
| Design token enforcement | CSS Custom Properties + Stylelint | MIT | ADR-005 |
| Dependency enforcement | dependency-cruiser | MIT | ADR-001 |
| Unit/mutation testing | Vitest + Stryker | MIT / Apache 2.0 | ADR-006 |
| E2E testing | Playwright | Apache 2.0 | ADR-006 |

All proprietary dependencies (Netlify, iubenda) are pre-existing with documented rationale.
No new proprietary dependencies introduced in this design.

---

## Wave: DESIGN / [REF] Decisions Table

| Decision | Rationale | Reversible? | ADR |
|----------|-----------|-------------|-----|
| Pure Core / Imperative Shell | Matches global default; makes Stryker viable; enforced mechanically | Low (would require significant refactor) | ADR-001 |
| Content adapter isolation | H3 walkthrough not complete; swap path must be safe | Yes — adapter implementation only | ADR-002 |
| Netlify proxy for Swoopy | Independent deployments; same-origin iframe; no build coupling | Yes — co-deploy is an alternative | ADR-003 |
| Zod in core, Netlify Forms adapter | Server-side validation; SubmissionPort is swappable | Yes — Resend adapter available | ADR-004 |
| CSS Custom Properties + Stylelint | Mechanically enforces H2 hypothesis; zero new tooling | Yes — Tailwind if workflow changes | ADR-005 |
| Outside-In TDD + Stryker on core | Addresses S5 (stale scaffolding) structurally | Low (methodology commitment) | ADR-006 |

---

## Wave: DESIGN / [REF] Reuse Analysis

### Swoopy Renderer — Reuse Assessment

**Component**: Swoopy's rendering engine (`@swoopy/renderer`, `@swoopy/engine`) at
`~/projects/swoopy`.

**Current state**: React + Vite application. Renderer takes an `HTMLCanvasElement`. Engine
is pure logic. Both are in the same repo, not yet published as npm packages.

**Reuse options assessed**:

| Path | Swoopy work required | Nuxt work required | Status |
|------|---------------------|-------------------|--------|
| iframe proxy (chosen, v1) | None — deploy as-is | `SwoopyEmbed.vue` + proxy config | IN SCOPE |
| Direct canvas embed (read-only) | Export `RendererStore` factory; publish `@swoopy/renderer` | Vue component with canvas ref | SPIKE-01 |
| Web Component (`<swoopy-diagram>`) | Add `@r2wc/react-to-web-component` build target; publish | Import and use Custom Element | SPIKE-01 |
| Vue shell rewrite | N/A | Port React toolbar to Vue | Out of scope (disproportionate) |

**Conclusion**: The iframe proxy maximises reuse of Swoopy as-is. No Swoopy package changes
are required for v1. The upgrade path (SPIKE-01) is well-defined and triggered only by a
concrete iframe limitation, not speculatively.

**Risk**: Swoopy is an internal project with no published packages. There is no Pact
contract test applicable at v1 (no API boundary). SPIKE-01 trigger creates a package
boundary — at that point, snapshot/contract testing of `@swoopy/renderer` API becomes
recommended. Noted in handoff to platform-architect.

---

## Wave: DESIGN / [REF] Open Questions

| ID | Question | Impact if unresolved | Resolution path |
|----|----------|---------------------|----------------|
| H3 | Did owner complete markdown content-edit walkthrough? | ContentPort adapter must be swapped to Decap CMS — estimated small but not zero | Owner performs 30-min task on staging branch |
| Plausible | Analytics provider confirmed (cloud vs self-host)? | CSP header and GDPR banner config differ | Owner decision before launch sprint |
| Swoopy domain | Does Swoopy deploy to its own Netlify custom domain or `swoopy.netlify.app`? | Proxy `to` URL in `netlify.toml` | Developer decision, low risk |
| CSP | What third-party scripts are required (iubenda, Plausible, any fonts)? | Content-Security-Policy header must whitelist all of them | Enumerate in Sprint 1 |

---

## Wave: DEVOPS / [REF] Delivery Infrastructure

### Platform Configuration Produced

| Artifact | Path | Purpose |
|----------|------|---------|
| `netlify.toml` | `/netlify.toml` | Build command, publish dir, Node 22 pin, Swoopy proxy |
| `public/_headers` | `/public/_headers` | CSP baseline for all pages (Netlify `_headers` format) |
| `.github/workflows/ci.yml` | `/.github/workflows/ci.yml` | GitHub Actions CI — 7 quality gates |
| `lefthook.yml` | `/lefthook.yml` | Pre-commit hooks mirroring CI commit stage |
| `environments.yaml` | `docs/feature/.../environments.yaml` | Environment inventory with rollback procedure |

### CI Quality Gate Order

| Order | Gate | Failure mode | Tool |
|-------|------|-------------|------|
| 1 | TypeScript type check | Build blocked | `tsc --noEmit` via `pnpm typecheck` |
| 2 | Stylelint token enforcement | Build blocked | `stylelint-declaration-strict-value` |
| 3 | Dependency boundary | Build blocked | `dependency-cruiser` |
| 4 | Unit + component tests | Build blocked | Vitest |
| 5 | SSG build | Build blocked | `pnpm run generate` |
| 6 | Netlify Forms attribute probe | Build blocked | `grep data-netlify` in `.output/public` |
| 7 | E2e tests | Build blocked | Playwright (Chromium) |

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

| ID | Item | Owner | Trigger |
|----|------|-------|---------|
| DEVOPS-01 | Confirm Swoopy Netlify URL and update `netlify.toml` `to` value | Developer | Before first Swoopy deploy |
| DEVOPS-02 | Install lefthook: `pnpm dlx lefthook install` after cloning | Developer | First checkout |
| DEVOPS-03 | Add `pnpm lint` script to `package.json` pointing to stylelint once stylelint is configured | Developer | Sprint 1 |
| DEVOPS-04 | Playwright CI e2e runs against `pnpm dev` — add `pnpm serve` script using `serve .output/public` for pure SSG validation when dev server overhead becomes a concern | Developer | When CI e2e runtime exceeds 5 min |
