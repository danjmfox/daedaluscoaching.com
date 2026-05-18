# Slice 02 — Update proxy URL and unblock TST-2

**Goal:** Main site's `/swoopy/` proxy points to the live Swoopy deployment; iframe loads; TST-2 passes.

## IN Scope

- Update `netlify.toml` `[[redirects]]` `to` from `https://swoopy.netlify.app/:splat` to `https://swoopy.daedaluscoaching.com/:splat`
- Deploy main site with updated config
- Verify `/swoopy/` loads in production
- Confirm Scenarios 1, 3, 4, 5 in `tests/e2e/.../swoopy-embed.spec.ts` pass (Scenario 2 remains skipped — unrelated to INF-1)
- Update `docs/product/backlog.md` INF-1 → DONE
- Remove "Swoopy URL" open item from `CLAUDE.md`

## OUT of Scope

- Swoopy app changes
- CSP changes (not required; status 200 proxy preserves same-origin)

## Learning Hypothesis

Disproves: "The netlify.toml pass-through proxy doesn't correctly forward query strings to the custom subdomain."
Confirms: `/swoopy/?m=modelId&g=graph` resolves correctly; TST-2 green; no CSP violations.

## Acceptance Criteria

- `netlify.toml` `to` value = `https://swoopy.daedaluscoaching.com/:splat`
- `GET /swoopy/` on production returns 200 with Swoopy app shell
- No CSP console errors on `/swoopy/` page load
- `/swoopy/?m=modelId&g=graph` passes query string correctly (`:splat` forwarding)
- Swoopy embed Scenarios 1, 3, 4, 5 pass in CI (`pnpm test --run`)
- INF-1 marked DONE in backlog; CLAUDE.md open item removed

## Dependencies

- Slice 01 complete (Swoopy live at `swoopy.daedaluscoaching.com`)

## Effort Estimate

< 1 hour (one-line config change + test unblock + housekeeping)

## Reference Class

Config-only change. Single line in netlify.toml. Risk: low.

## Pre-slice SPIKE

None.

## User-visible value

YES — `/swoopy/` on the main site becomes a live, working embedded tool. Elevator pitch:

- Before: `/swoopy/` proxies to a placeholder URL; Swoopy does not load
- After: `/swoopy/` loads Swoopy app in iframe, same-origin, no CSP warnings
- Decision enabled: owner can share `/swoopy/` with clients without caveats
