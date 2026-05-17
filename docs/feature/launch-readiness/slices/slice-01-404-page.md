# Slice 01 — Custom 404 page

```yaml
slice_id: slice-01
feature_id: launch-readiness
story: S-LR-001
estimate: 2h
execution_order: 2
```

## Goal

Add a branded `error.vue` that renders when any path is not found, with site header, footer, and a link back to the homepage.

## IN scope

- `error.vue` in project root (Nuxt error page hook)
- Page title "Page not found | Daedalus Coaching"
- Headline + homepage link using existing components
- `netlify.toml` 404 redirect (if not already present)

## OUT scope

- Custom error pages for 500 or other status codes
- Animated or illustrative 404 designs
- Per-error-type messaging

## Learning hypothesis

Disproves: "a Nuxt SSG site can't serve a custom 404 without extra Netlify config."
Confirms: `error.vue` + `netlify.toml` `[[redirects]]` with status=404 is sufficient.

## Acceptance criteria

- AC-LR-001-1: `/does-not-exist` renders `error.vue` with site header and footer
- AC-LR-001-2: Page shows "Page not found" heading and homepage link
- AC-LR-001-3: HTTP status is 404 at Netlify edge
- AC-LR-001-4: Page title is "Page not found | Daedalus Coaching"
- AC-LR-001-5: Styled with existing CSS tokens

## Dependencies

None — fully self-contained.

## Pre-slice SPIKE

None needed. Nuxt `error.vue` is documented; Netlify 404 redirect is standard.
