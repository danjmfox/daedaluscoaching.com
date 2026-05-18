# Evolution — launch-readiness

```yaml
feature_id: launch-readiness
date: 2026-05-17
status: DELIVERED
tests: 53/65 passing (12 skipped — og-card.png asset pending owner action)
commit: 2231c52
```

## Summary

Three standard website gaps closed before the site is considered shareable without caveats:
a custom 404 page, a cookie notice replacing the never-implemented iubenda integration,
and OG social card meta tags. All presentation-layer changes — no `core/` modifications.

## Business Context

Job: JOB-LR-001 (Uncaveated sharing) — owner needed confidence to share the URL without
mental reservations. Three gaps each eroded that confidence: a bare Nuxt error on broken
links, an iubenda cookie banner configured but never wired up (with GDPR exposure), and
text-only social previews when sharing the URL on LinkedIn or Slack.

## Key Decisions

| Decision                   | Outcome                                                                                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iubenda removed from stack | Custom `CookieNotice.vue` replaced it. iubenda was consent-management infrastructure for ad-tech; the site has no non-essential cookies. Trust signal delivered without third-party dependency. |
| Future analytics direction | Consent-exempt privacy-first tools only (Fathom, Plausible, Umami). No ads, no data selling. iubenda remains unnecessary even when analytics is added.                                          |
| OG image scope             | Single global static PNG for v1. Per-page images deferred (requires Nuxt OG Image / Satori infrastructure). LRM.                                                                                |
| 404 HTTP status mechanism  | Netlify redirect `from = "/*" to = "/200.html" status = 404`. Nuxt SSG pre-renders `200.html` as SPA fallback; Netlify serves it with 404 status at CDN edge.                                   |
| Privacy policy             | `pages/privacy.vue` + `content/privacy.md` already existed with a complete custom GDPR policy — discovered during DESIGN wave. iubenda embed approach superseded.                               |

## Steps Completed

| Step  | Description                                          | Verification                                            |
| ----- | ---------------------------------------------------- | ------------------------------------------------------- |
| 01-01 | `CookieNotice.vue` + mounted in `app.vue`            | 7 cookie-notice scenarios green                         |
| 01-02 | Strip iubenda from `public/_headers` CSP             | CSP header test green                                   |
| 02-01 | `error.vue` + Netlify 404 redirect in `netlify.toml` | WS-01 + 404 scenarios green                             |
| 02-02 | Full 404 scenario set enabled                        | 5 404-page scenarios green                              |
| 03-01 | OG meta tags in `nuxt.config.ts`                     | Config wired; 9 OG scenarios skip pending `og-card.png` |

## Files Shipped

**Production:**

- `components/CookieNotice.vue` (new)
- `error.vue` (new)
- `app.vue` (mount CookieNotice)
- `nuxt.config.ts` (OG meta tags)
- `netlify.toml` (404 redirect)
- `public/_headers` (CSP cleaned)

**Tests:**

- `tests/e2e/launch-readiness/acceptance/walking-skeleton.spec.ts`
- `tests/e2e/launch-readiness/acceptance/404-page.spec.ts`
- `tests/e2e/launch-readiness/acceptance/cookie-notice.spec.ts`
- `tests/e2e/launch-readiness/acceptance/og-image.spec.ts`

**SSOT:**

- `docs/product/jobs.yaml` (JOB-LR-001 added)
- `docs/product/journeys/journey-warm-referral.yaml` (off-path gaps documented)
- `docs/product/architecture/brief.md` (iubenda removed, CookieNotice added)
- `docs/product/backlog.md` (UX-6 Zcal added as LATER)

## Pending Owner Action

`public/images/og-card.png` — 1200×630 PNG using brand palette (Fraunces/Plus Jakarta Sans,
committed colour tokens). Drop the file at that path; 9 test scenarios auto-unblock with no
code changes needed. `twitter:card` is set to `summary_large_image` so the image displays
at full width in Twitter/X previews.

## Lessons

- **Discovery during DESIGN is valuable.** `pages/privacy.vue` and `content/privacy.md` were
  found already implemented — discovered only when the DESIGN wave read the actual codebase.
  Slice-02 collapsed from ~1h to ~20min as a result.
- **iubenda decision resolved a long-standing open item.** The CSP entries had been there from
  the start but iubenda was never wired. Naming the decision explicitly (and the reasoning about
  consent-exempt analytics) closes it permanently.
- **Markdownlint on wave artifacts.** `feature-delta.md` required 3 commit attempts to pass
  the pre-commit hook. nWave wave artifacts use heading conventions (same heading text across
  stories, bold-as-heading) that conflict with standard markdownlint rules. Worth noting for
  future waves.
