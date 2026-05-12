# ADR-003: Swoopy Integration — Netlify Proxy + iframe Component

status: Accepted
date: 2026-05-12
deciders: Daniel Osborne (owner/developer)
wave: DESIGN

---

## Context

OPP-06 (resolved post-discovery): Swoopy is a causal loop diagram simulator at
`~/projects/swoopy`. Two validated use cases:
(a) free-play for workshop participants and coaching clients
(b) deep-link embed of specific pre-built models within Nuxt content pages

Swoopy is React + Vite — not Vue/Nuxt. Vite base is already configured as `/swoopy/`.
URL scheme: `?m=<modelId>` for named models, `?g=<encoded>` for shared graphs.

Nuxt Layers is eliminated (wrong tool — only composes Nuxt modules, not React apps).

SPIKE-01 (deferred) covers non-iframe embed paths (direct canvas embed, web component,
Vue shell rewrite) triggered when the iframe integration hits a concrete limit.

## Decision

**Deployment topology**: Netlify multi-app proxy.

Swoopy deploys as a separate Netlify site. The main site's `netlify.toml` configures a
redirect rule proxying `/swoopy/*` to the Swoopy Netlify site URL, rewriting the path.
This makes Swoopy appear same-origin to the browser — enabling deep-link iframes without
`X-Frame-Options` or CSP `frame-ancestors` issues.

**Inline embed**: a Nuxt Vue component (`SwoopyEmbed.vue`) wraps an `<iframe>` with:
- `src` computed from the Swoopy base URL + `?m=<modelId>` or `?g=<encoded>`
- Explicit `width`, `height`, and `title` props (accessibility)
- No JavaScript communication between the Nuxt shell and the iframe at v1
  (postMessage API deferred to SPIKE-01 scope)

The component accepts `modelId` or `graph` as props. The parent page passes the identifier;
the component constructs the URL. URL construction logic lives in `core/swoopy/` as a
pure function — testable with Vitest, no DOM dependency.

**Alternative topology (co-deploy)**: Copy Swoopy's `dist/` into Nuxt's `public/swoopy/`
at build time via a `netlify.toml` build command. This avoids a second Netlify site but
couples the two build pipelines and makes independent Swoopy deployments impossible.
Rejected for v1 — proxy is simpler operationally and keeps the two projects deployable
independently.

## Alternatives Considered

### Option A: Netlify proxy (chosen)
See Decision. Independent deployments, same-origin appearance, no build coupling.

### Option B: Co-deploy (public/swoopy/ copy)
Single Netlify site, simpler DNS. Rejected: couples build pipelines, Swoopy cannot be
updated independently of the main site, increases main site build time.

### Option C: Web Component (`<swoopy-diagram>`)
Wraps React app as Custom Element via `@r2wc/react-to-web-component`. Full interactive
embed with no iframe boundary. No iframe sizing/scroll issues. Rejected for v1 because:
requires Swoopy to publish `@swoopy/renderer` and `@swoopy/engine` as packages and add a
second build target. SPIKE-01 trigger: when iframe hits a concrete limit.

### Option D: Vue shell rewrite
Port React toolbar/interaction layer to Vue. Deep integration, shared design tokens.
Rejected: disproportionate effort for v1, loses Swoopy's existing test coverage.

### Option E: Vite Module Federation
Build-time composition. Equivalent UX to web component at higher build complexity.
Rejected by DISCOVER wave explicitly, and independently here on the same grounds: Module
Federation adds webpack/rspack build orchestration across two repos for a result identical
to the web component approach. No new evidence to reopen this evaluation.

## Consequences

Positive:
- Swoopy and the main site deploy independently — a Swoopy update does not require a
  main site build
- iframe is same-origin via proxy — no CORS/CSP complications
- URL construction logic in `core/swoopy/` is pure and mutation-testable
- SPIKE-01 upgrade path is clean — SwoopyEmbed.vue is the swap point

Negative:
- Two Netlify sites to manage (though both on free tier)
- iframe sizing remains a manual concern (no automatic height adaptation in v1)
- No design token sharing between Nuxt and Swoopy at v1

## External Integration Annotation

Swoopy at `/swoopy/` is served via Netlify proxy — not a third-party API. No consumer-driven
contract test required. If SPIKE-01 elevates to web component with npm package publication,
revisit: the `@swoopy/renderer` package boundary would then be an internal API consumed
across a project boundary, warranting snapshot/contract testing.
