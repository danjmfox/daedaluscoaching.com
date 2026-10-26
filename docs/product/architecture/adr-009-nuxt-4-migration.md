# ADR-009: Migrate to Nuxt 4 and the `app/` source directory

status: Accepted (implemented and browser-verified 2026-10-26)
date: 2026-10-26
deciders: Daniel Osborne (owner/developer)
wave: DELIVER (direct execution, no wave artefacts)
relates-to: ADR-001 (STANDS — layer rules unchanged, paths updated)

---

## Context

On 2026-10-26 `pnpm audit` reported 111 advisories (6 critical) against a lockfile dated 2026-05-15. Updating dependencies within their existing semver ranges, which moved Nuxt from 3.21.5 to 3.21.11, cleared all but six. Three of those were Nuxt advisories with no fix in the Nuxt 3 line (four audit entries, because the route-rules advisory also lists `@nuxt/nitro-server`):

- Server-side route rules skipped for case-variant paths.
- Server islands rendering `useHeadSafe` input unsanitised.
- A `javascript:` URL prefixed with a control character executing from `<NuxtLink>`.

None of these can be reached on this site, because it is prerendered to static files and has no running Nitro server. The repository's pre-commit gate (`trunk check`, which runs `osv-scanner` on `pnpm-lock.yaml`) nevertheless rejects any commit that introduces them.

## Options Considered

1. **Stay on Nuxt 3 and record an `osv-scanner.toml` exception** for the unfixable advisories, each with a reason and an expiry date. Smallest change, but it accepts a known-vulnerable framework version indefinitely.
2. **Commit with `--no-verify`.** Fastest, leaves no record of why, and skips the unit tests and the dependency-boundary check as well.
3. **Migrate to Nuxt 4.6.x.** The fixes for the Nuxt advisories ship in the 4.x line. Costs a directory move and a CSP adjustment.

## Decision

Migrate to Nuxt 4 (`nuxt@^4.6.2`).

1. **Nuxt-owned directories move under `app/`**: `assets/`, `components/`, `composables/`, `pages/`, `app.vue`, `error.vue`. In Nuxt 4 the `~` alias resolves to `app/`.
2. **`core/` stays at the repository root.** It has no Nuxt dependency, and the dependency-cruiser boundary reads more clearly with `core/` outside the framework's source directory. App code imports it as `~~/core/...` (`~~` is the repository root), and relative imports gain one `../`.
3. **Boundary tooling follows the move.** The `core-is-pure` rule in `.dependency-cruiser.cjs` now matches `^app/(composables|pages)/`, the lefthook command cruises `core app/composables app/pages`, and the stylelint ignore points at `app/assets/tokens.css`. A deliberate violation (a file in `core/` importing from `app/composables/`) fails the check, which confirms the rule still bites.
4. **`experimental.entryImportMap` is set to `false`.** Nuxt 4 emits an inline `<script type="importmap">` mapping `#entry` to the entry chunk. The CSP in `public/_headers` has no `'unsafe-inline'` and `scripts/inject-csp-hash.mjs` only hashes the `window.__NUXT__` bootstrap, so the browser blocked the import map and the app booted into the "Page not found" error page. Disabling the import map keeps the CSP unchanged.
5. **The type-check now runs.** `typescript@~5.9` and `vue-tsc` are devDependencies, so `pnpm typecheck` works for the first time. `typescript@7.0.2` is not usable yet: `vue-tsc@3.3.13` cannot find its `lib/tsc` entry point there. Nuxt 4 turns `noUncheckedIndexedAccess` on by default, which produced 15 errors in `core/maze/` and `app/pages/`, so `nuxt.config.ts` sets it to `false`, which is the Nuxt 3 behaviour. Four remaining errors were `block.meta.image_alt` typed as `{}`, fixed with a type assertion at the four use sites in `about.vue` and `services.vue`.
6. **The advisory the gate misreads is recorded in `osv-scanner.toml`** (see Exceptions).

## Exceptions

Tracked here because each is a known gap, not a resolved item.

- **GHSA-vjh5-4x84-xrqp (route rules, case-variant paths) is ignored in `osv-scanner.toml` until 2027-01-31.** The OSV record lists 4.6.2 as the fix for the 4.x line but also carries an unbounded `introduced: 3.0.0` range with no fix, so `osv-scanner` matches `nuxt@4.6.2` against it. Re-check on or before the expiry date, and remove the entry once OSV corrects the range.
- **`node-forge` (CVE-2026-85393) has no patched version** and `zod@3.25.76`, pulled in by `@nuxt/content`, is below the fixed 4.6.6. Both are build-time only.
- **A small inlined font is blocked by the CSP.** Vite inlines one Plus Jakarta Sans subset as a `data:` URI and `font-src 'self'` refuses it, so that subset fails to load. Not diagnosed as new or pre-existing.
- **`noUncheckedIndexedAccess` is off.** Turning it back on means handling `undefined` at about 15 indexed reads in `core/maze/` and `app/pages/`. Deferred because `core/maze/` is under active change on another branch.
- **Node versions differ between local and Netlify.** mise now resolves `node = "latest"` (26.12.1 at the time of writing) in both the global config and the repo's `.mise.toml`. Netlify builds with `NODE_VERSION = "22"`. Nuxt 4.6 requires Node `^22.21.0 || ^24.11.0 || >=26`, which both satisfy, provided Netlify's 22.x is at least 22.21.
