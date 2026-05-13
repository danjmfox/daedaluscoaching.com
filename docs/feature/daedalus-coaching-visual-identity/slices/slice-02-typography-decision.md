# Slice 02 — Typography Decision

```yaml
feature_id: daedalus-coaching-visual-identity
slice_id: slice-02
stories: S-VI-003
estimate: ≤1 day
status: BLOCKED — depends on Slice 01 completion + peer review
```

## Goal

Commit to a typeface category based on comparables evidence, implement typography
tokens in `assets/tokens.css`, and apply them to at least one rendered page.
At the end of this slice, the typographic direction is visible in the browser and
the owner has confirmed it holds all three tensions.

## IN Scope

- Typeface category selection (from Slice 01 comparables pattern)
- Font selection within category (specific typeface — Google Fonts or system font)
- Typography tokens in `assets/tokens.css`:
  - `--font-family-base`, `--font-family-heading`
  - `--font-size-*` scale (5+ steps)
  - `--line-height-*`
  - `--font-weight-*`
- Apply typography tokens to at least one page (homepage or about)
- Owner evaluation of rendered typography

## OUT Scope

- Colour tokens (Slice 03)
- Spacing tokens (Slice 03)
- Full homepage application (Slice 04)

## Learning Hypothesis

Confirms typography is the primary trust carrier if, after seeing two typographic options
rendered on a page, the owner can distinguish between them using constraint language
("this one holds Enterprise seriousness; this one resolves toward Agile energy")
rather than aesthetic vocabulary ("I prefer this one; it feels right").

Confirms if fails: owner cannot distinguish using brief vocabulary → typography is
not the primary trust carrier → review comparables analysis for colour as primary
differentiator (would challenge LD-03).

## Acceptance Criteria (from S-VI-003)

- AC1: `assets/tokens.css` contains font-family, scale, line-height, and weight tokens
- AC2: Typeface category selected via comparables evidence (Slice 01 closed first)
- AC3: Stylelint passes — no token override violations
- AC4: Typography applied to at least one rendered page
- AC5: Owner confirms rendered typography holds all three tensions without one dominating

## Pre-Slice SPIKE needed?

Possible. If the comparables exercise points toward a paid typeface (e.g. Söhne, Tiempos),
a SPIKE may be needed to evaluate licensing cost vs free alternatives (Fraunces, DM Serif Display,
Literata, Instrument Serif for serif; Plus Jakarta Sans, Atkinson Hyperlegible for humanist sans).
Decision: hold until Slice 01 completes.

## Dependencies

- Slice 01: MUST BE CLOSED (comparables evaluation + peer review complete)
- LD-08 (peer review before tokens): MUST BE CLEARED

## Effort Estimate

- Typeface selection from comparables findings: ~30 min
- Token implementation in `assets/tokens.css`: ~45 min
- Apply to one page + Stylelint check: ~30 min
- Owner evaluation: ~15 min

Total: ~2 hours

## Dogfood Moment

Owner navigates to `localhost:3000/` the same day tokens are committed, sees the
typographic direction rendered, and can say: "I can see all three tensions here —
the letterform has warmth, the hierarchy has authority, and the weight range doesn't
read like a developer tool." That sentence is the dogfood moment.
