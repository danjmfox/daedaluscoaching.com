# Slice 03 — OG social card image

```yaml
slice_id: slice-03
feature_id: launch-readiness
story: S-LR-003
estimate: 3h
execution_order: 3
```

## Goal

Add a static 1200×630 branded PNG as the global OG image for all pages, so link previews on LinkedIn, Slack, and iMessage show the practice identity rather than a blank card.

## IN scope

- Design + export `public/images/og-card.png` (1200×630, brand palette, Fraunces/Plus Jakarta Sans)
- `og:image`, `og:image:width`, `og:image:height` meta tags in `nuxt.config.ts` global head config
- `twitter:image` meta tag
- Verify in one preview tool (opengraph.xyz or LinkedIn post inspector)

## OUT scope

- Per-page OG images (deferred — requires Nuxt OG Image module or Satori, SEO-8 v2)
- Video OG tags
- WhatsApp-specific card optimisation

## Learning hypothesis

Disproves: "a single static OG image is sufficient for a multi-page site."
Confirms: global `og:image` in `nuxt.config.ts` head config propagates to all generated pages.

## Acceptance criteria

- AC-LR-003-1: `og:image` present in `<head>` on all pages pointing to `/images/og-card.png`
- AC-LR-003-2: Asset exists at that path, 1200×630px
- AC-LR-003-3: Image uses brand palette (committed colour tokens, Fraunces + Plus Jakarta Sans)
- AC-LR-003-4: `og:image:width` = 1200, `og:image:height` = 630 present
- AC-LR-003-5: `twitter:image` present, same asset
- AC-LR-003-6: Image legible at 1200×630 and 600×315
- AC-LR-003-7: Verified in at least one OG preview tool

## Dependencies

- OG image design asset must be created before implementation (owner creates or delegates to design tool)
- Brand tokens: DONE

## Pre-slice SPIKE

None needed for the meta tag wiring. The image asset creation is the effort; the Nuxt config change is trivial.

## Note on effort split

~2h is design (image creation), ~1h is Nuxt config + verification. If the image is provided as an asset, implementation is ~1h total.
