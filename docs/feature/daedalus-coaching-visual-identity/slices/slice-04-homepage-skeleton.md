# Slice 04 — Homepage Walking Skeleton

```yaml
feature_id: daedalus-coaching-visual-identity
slice_id: slice-04
stories: S-VI-005
estimate: ≤1 day
status: BLOCKED — depends on Slice 03 completion
```

## Goal

Apply all committed tokens to the homepage. Owner evaluates the complete visual direction
against the 4 DISCOVER brief statements and makes the go/no-go decision for the 2-week
stability test.

## IN Scope

- `pages/index.vue` updated to use only token-driven CSS values
- B-Corp, 1%FTP, ICF credentials visible above fold as typographic elements (not icon badges)
- Single CTA (contact) visible and reachable in ≤2 clicks from homepage
- Owner evaluation against all 4 DISCOVER brief statements
- Stylelint passes on homepage

## OUT Scope

- About page token application
- Contact page token application
- Swoopy embed styling
- Navigation full restyle (minimal for skeleton)

## Learning Hypothesis

Confirms the minimal skeleton approach is sufficient for the 2-week stability evaluation:
if the owner can evaluate the full direction from the homepage alone and make a confident
go/no-go decision, then the skeleton is right-sized — no additional pages are needed before
the stability test clock starts.

Confirms if fails: owner cannot evaluate without seeing the about page or contact page →
expand skeleton before starting the 2-week clock (not a feature failure, just scope adjustment).

## The Four DISCOVER Brief Statements (evaluation framework)

Owner records verdict (would not deny / would deny) + notes for each:

| #   | Statement                                                                                                                                            | Verdict | Notes |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| 1   | "This practitioner operates at the level my senior leaders need. I would not be embarrassed to recommend them to my board." (Organisation evaluator) |         |       |
| 2   | "This is not a methodology salesperson. This person has a philosophy and is not performing agility." (Team / Agile context)                          |         |       |
| 3   | "This is someone worth an hour of my time. My colleague was right to refer them." (Individual leader, warm referral)                                 |         |       |
| 4   | "I would share this. It represents the person I know." (Referral partner)                                                                            |         |       |

Gate: ≥3 of 4 verdicts are "would not deny" before 2-week clock starts.

## Acceptance Criteria (from S-VI-005)

- AC1: `pages/index.vue` uses only token-driven CSS values (Stylelint passes)
- AC2: B-Corp, 1%FTP, ICF credentials visible above fold as typographic elements (not badges)
- AC3: Single CTA visible and reachable in ≤2 clicks
- AC4: Owner records evaluation against all 4 DISCOVER brief statements
- AC5: ≥3 of 4 statements earn "would not deny" verdict
- AC6: No metaphor-driven visual elements (LD-04)

## Pre-Slice SPIKE needed?

No. The homepage structure already exists. This slice is a CSS/token application task.
If the homepage copy needs updating to reflect the committed visual brief, that is a
separate content task — do not conflate visual identity tokens with copy editing.

## Dependencies

- Slice 03: MUST BE CLOSED (full tokens.css committed and Stylelint-enforced)
- Homepage content: existing — do not change copy as part of this slice

## Effort Estimate

- Apply tokens to `pages/index.vue` components: ~60 min
- Check credentials above fold (placement review): ~15 min
- Stylelint pass + manual browser review: ~15 min
- Owner evaluation + statement recording: ~20 min

Total: ~2 hours

## Dogfood Moment

Owner shares the localhost URL with one person who knows them professionally
(referral partner or trusted peer) and asks: "Would you share this without a caveat?"
That is the dogfood moment for this slice. Production data is real — synthetic tests
(just the owner looking) are not sufficient for the stability test decision.
