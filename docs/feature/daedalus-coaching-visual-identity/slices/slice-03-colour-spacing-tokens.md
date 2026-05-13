# Slice 03 — Colour + Spacing Tokens

```yaml
feature_id: daedalus-coaching-visual-identity
slice_id: slice-03
stories: S-VI-004
estimate: ≤1 day
status: BLOCKED — depends on Slice 02 completion
```

## Goal

Complete `assets/tokens.css` with colour and spacing tokens. At the end of this slice,
the full token set is committed and Stylelint-enforced. Colour and spacing reinforce
the typographic trust signal without competing with it.

## IN Scope

Colour tokens:

- 2-3 warm neutrals: off-white/cream background, warm white, near-black with brown undertone (not blue-black)
- 1 functional accent: for interactive elements and key credentials ONLY (not decorative)
- Named semantic aliases: `--color-background`, `--color-surface`, `--color-text-primary`, `--color-text-secondary`, `--color-accent`

Spacing tokens:

- 8-step scale based on a base unit (e.g. 4px or 8px base)
- Named semantic aliases: `--space-xs` through `--space-3xl` (or equivalent)
- Vertical rhythm enforcement — generous whitespace is load-bearing (LD-05)

Stylelint update:

- `stylelint-declaration-strict-value` config updated to enforce all colour and spacing vars
- Pre-commit hook confirms 0 violations

## OUT Scope

- Homepage application (Slice 04)
- Component-level styling beyond one test page
- Dark mode (not in v1 scope)
- Animation or transition tokens

## Learning Hypothesis

Confirms warm neutrals reinforce (not override) typography choice: if the owner
reviews the colour + spacing applied alongside the committed typography and says
"the typography still carries the trust signal — colour and spacing support it,"
then LD-03 (typography leads) is confirmed in practice.

Confirms if fails: colour overwhelms typography → either the accent is too strong,
the neutrals are too warm/cool, or the spacing is too compressed — each has a specific fix.

## Acceptance Criteria (from S-VI-004)

- AC1: `assets/tokens.css` contains colour tokens: 2-3 warm neutrals + 1 functional accent
- AC2: `assets/tokens.css` contains spacing scale (min 8 steps; enforces vertical rhythm)
- AC3: Colour register is warm neutral — passes LD-05 check (no cool grey, no blue-black)
- AC4: Functional accent used ONLY for interactive elements and key credentials
- AC5: Stylelint passes — no raw hex/rgb values outside token definitions

## Token palette constraints (from DISCOVER + LD-05 + LD-07)

| Token        | Constraint                                                     | Excluded by           |
| ------------ | -------------------------------------------------------------- | --------------------- |
| Background   | Warm cream or warm off-white — not pure white                  | LD-05                 |
| Text primary | Near-black with brown-black undertone — not #000 or blue-black | LD-05                 |
| Neutral mid  | Warm mid-grey for secondary text — not cool grey               | LD-05                 |
| Accent       | One only; warm or neutral-warm; used sparingly                 | LD-04 (no decoration) |

## Dependencies

- Slice 02: MUST BE CLOSED (typography tokens committed, owner confirmed)
- Comparables exercise: warm/cool colour register pattern may emerge from C-series evaluations

## Effort Estimate

- Colour token selection: ~30 min
- Spacing scale definition: ~30 min
- Token implementation + Stylelint config update: ~45 min
- Owner evaluation of colour + spacing on test page: ~15 min

Total: ~2 hours

## Dogfood Moment

Owner navigates to `localhost:3000/` same day, sees the full typographic + colour + spacing
system rendered, and can apply the fourth DISCOVER brief statement:
_"I would share this. It represents the person I know."_
If a referral partner could say that about this rendered page, colour and spacing are right.
