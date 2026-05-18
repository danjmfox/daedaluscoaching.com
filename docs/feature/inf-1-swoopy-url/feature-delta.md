# Feature Delta — inf-1-swoopy-url

<!-- Wave: DISCUSS | Density: lean | Expansion prompt: ask-intelligent | Triggers fired: none -->

---

## Wave: DISCUSS / [REF] Persona ID

**owner-editor** — the practice owner who builds and maintains the site. Sole operator for all infrastructure decisions.

---

## Wave: DISCUSS / [REF] JTBD One-liner

`job_id: infrastructure-only`
`infrastructure_rationale:` This feature restores a pre-designed capability to production. The decision to embed Swoopy in the coaching site was made during site design (SwoopyEmbed.vue, core/swoopy/swoopy-url.ts). No new user job is being introduced — the proxy and iframe already exist in the codebase; the missing piece is a live deployment target. JTBD analysis would be circular (the job was already validated at design time).

---

## Wave: DISCUSS / [REF] Locked Decisions

| ID  | Decision              | Verdict                                             | Rationale                                                                                                                    |
| --- | --------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| D1  | Target URL for Swoopy | `swoopy.daedaluscoaching.com` (custom subdomain)    | Keeps all daedaluscoaching.com properties under one domain. Consistent SSL trust context. Future deep-links remain on-brand. |
| D2  | Proxy mode            | Keep `status = 200` (pass-through, no redirect)     | Already established in netlify.toml. Browser treats /swoopy/\* as same-origin, eliminating CSP frame-src exception.          |
| D3  | Deployment model      | Separate Netlify site, connected to the Swoopy repo | Pre-established in CLAUDE.md. Swoopy has its own build pipeline (React/Vite). Separate deploy lifecycle from main site.      |

---

## Wave: DISCUSS / [REF] User Stories

### US-INF1-001 — Swoopy deployed to Netlify with custom subdomain

```yaml
# @infrastructure
job_id: infrastructure-only
infrastructure_rationale: >
  Pure deployment plumbing — Swoopy app on Netlify with custom
  domain. No user-visible change until US-INF1-002 completes. Precursor commit, not a
  standalone release.
```

**As** the site owner,
**I want** the Swoopy React/Vite app deployed to Netlify at `swoopy.daedaluscoaching.com`,
**so that** the main site's proxy has a stable, production URL to target.

#### US-INF1-001 Acceptance Criteria

- [ ] A new Netlify site exists connected to the Swoopy GitHub repo
- [ ] Build command (`npm run build` or `pnpm build`) runs to completion; publish directory is `dist`
- [ ] Auto-deploy is enabled from the `main` branch
- [ ] `swoopy.daedaluscoaching.com` is added as a custom domain in the Netlify site settings
- [ ] DNS: an `A` record (Netlify load balancer IP) or `CNAME` to `[site-name].netlify.app` is set at the domain registrar for the `swoopy` subdomain
- [ ] Netlify SSL certificate is provisioned for `swoopy.daedaluscoaching.com` (green padlock)
- [ ] `https://swoopy.daedaluscoaching.com/` serves the Swoopy app (200 response, app shell loads)

---

### US-INF1-002 — Swoopy accessible at /swoopy/ on the main site

```yaml
job_id: infrastructure-only
infrastructure_rationale: >
  Makes a pre-designed embedded capability live in production.
  The UX (SwoopyEmbed.vue, iframe, url construction) was designed previously. This story
  connects the deployment target to the proxy — the user-visible outcome is the iframe
  loading at /swoopy/.
```

**As** a visitor to the coaching site,
**I want** to access Swoopy at `/swoopy/` without leaving the site,
**so that** I can engage with the causal loop diagram tool in context.

### Elevator Pitch

Before: Visiting `https://www.daedaluscoaching.com/swoopy/` proxies to a placeholder URL — Swoopy does not load.
After: Navigate to `https://www.daedaluscoaching.com/swoopy/` → Swoopy app loads in the embedded iframe at full width, same-origin (no cross-origin warning, no CSP violation in console).
Decision enabled: Owner can share `/swoopy/` with clients and referral partners as a live tool — no caveats, no "this will work soon."

#### US-INF1-002 Acceptance Criteria

- [ ] `netlify.toml` `[[redirects]]` `to` value updated from `https://swoopy.netlify.app/:splat` to `https://swoopy.daedaluscoaching.com/:splat`
- [ ] Main site deployed with updated `netlify.toml`
- [ ] `GET https://www.daedaluscoaching.com/swoopy/` returns 200 with Swoopy app shell (not a blank page or error)
- [ ] No CSP violations in browser console when loading `/swoopy/`
- [ ] Swoopy URL with query params (`/swoopy/?m=modelId&g=graph`) resolves correctly (`:splat` passes query string)
- [ ] `core/swoopy/swoopy-url.ts` unchanged (relative paths work as-is)
- [ ] Scenarios 1, 3, 4, 5 in `swoopy-embed.spec.ts` pass against production (already enabled; verify no regression)

---

## Wave: DISCUSS / [REF] Definition of Done

- [ ] All ACs above verified in production (not staging)
- [ ] `netlify.toml` committed with updated URL
- [ ] Swoopy embed acceptance tests (Scenarios 1, 3, 4, 5) pass in CI
- [ ] Swoopy site build succeeds on Netlify dashboard (no failed deploys)
- [ ] SSL cert active on `swoopy.daedaluscoaching.com`
- [ ] No console errors on `/swoopy/` page load
- [ ] `docs/product/backlog.md` INF-1 status updated to DONE
- [ ] `CLAUDE.md` open item "Swoopy URL" removed
- [ ] This feature-delta.md filed under `docs/feature/inf-1-swoopy-url/`

---

## Wave: DISCUSS / [REF] Out of Scope

- **TST-2 Scenario 2 unblock** — backlog.md incorrectly attributed this skip to INF-1. Actual blocker per test comment: "skipped until a content page embeds `<SwoopyEmbed modelId='...' />`." The URL update does not unblock it. Separate content/feature work needed.
- Swoopy app changes (new features, visual updates) — separate feature
- SPIKE-01 (web component upgrade) — deferred per CLAUDE.md; trigger conditions unchanged
- CI/CD for the Swoopy repo (automated PR deploys, preview URLs) — nice-to-have, out of scope for v1
- CSP header changes — status 200 proxy already eliminates need for frame-src exception
- Analytics or error tracking on Swoopy — not installed anywhere on the main site

---

## Wave: DISCUSS / [REF] WS Strategy

**Strategy B — Brownfield thin slice.** The walking skeleton already exists (SwoopyEmbed.vue + netlify.toml proxy are in place and tested). This feature completes the skeleton by wiring in a live deployment target. No new architectural layers introduced.

---

## Wave: DISCUSS / [REF] Driving Ports

| Port                       | Surface              | Entry point                                               |
| -------------------------- | -------------------- | --------------------------------------------------------- |
| Netlify UI / CLI           | Deployment creation  | Manual: Netlify dashboard → "Add new site" → connect repo |
| Domain registrar DNS panel | DNS configuration    | Manual: add `A` or `CNAME` record for `swoopy` subdomain  |
| `netlify.toml`             | Proxy URL            | Edit `[[redirects]]` `to` value                           |
| Vitest / Playwright        | Acceptance test gate | `pnpm test --run` — TST-2 unskipped                       |

---

## Wave: DISCUSS / [REF] Pre-requisites

| Dependency                                                                    | Status   | Notes                                                                                                              |
| ----------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| Swoopy repo exists with `main` branch and Vite build config                   | Assumed  | Verify build command (`npm run build` vs `pnpm build`) and publish directory (`dist`) before creating Netlify site |
| Domain registrar access for `daedaluscoaching.com`                            | Required | Needed to add `swoopy` subdomain DNS record                                                                        |
| Netlify account with access to both main site and ability to create new sites | Required | —                                                                                                                  |
| TST-2 test location                                                           | Known    | `docs/product/backlog.md` line ~142 references it; find the actual test file before unskipping                     |

---

## Wave: DISCUSS / [REF] Scope Assessment

**PASS.** 2 stories, 2 integration points (Netlify + DNS), effort < 1 day, single persona, no new architectural layers.

---

## Wave: DISCUSS / [REF] Wave Decisions

```markdown
# DISCUSS Decisions — inf-1-swoopy-url

## Key Decisions

- [D1] Custom subdomain swoopy.daedaluscoaching.com: consistent with brand; same SSL trust context (see feature-delta.md)
- [D2] Keep status 200 proxy: already established; eliminates CSP frame-src exception (see netlify.toml)
- [D3] Separate Netlify site: pre-established in CLAUDE.md; independent deploy lifecycle
- [D4] Infrastructure-only escape valve: no new JTBD; pre-designed capability going live

## Requirements Summary

- Primary need: live deployment target so the existing /swoopy/ proxy works in production
- Scope: Netlify site creation + DNS + proxy URL update + TST-2 unblock
- Feature type: infrastructure

## Constraints Established

- Must not change core/swoopy/swoopy-url.ts (relative paths work as-is)
- Must not require CSP changes (status 200 proxy preserves same-origin)
- TST-2 must be unskipped as part of this feature, not left as a follow-up

## Upstream Changes

- None. No DISCOVER wave ran for this feature.
```
