# Slice 01 — Brief + Comparables

```yaml
feature_id: daedalus-coaching-visual-identity
slice_id: slice-01
stories: S-VI-001, S-VI-002
estimate: 1–2 days (deep-dive research extends this slice)
status: IN PROGRESS — owner comparables evaluation pending
```

## Goal

Produce a brief document that holds the three-way professional tension explicitly,
and ground it in evidence from 5-7 comparable sites the owner has evaluated.
At the end of this slice, the owner can evaluate any candidate direction using
constraint vocabulary — without aesthetic preference or design skill.

## IN Scope

- H-V4 constraint vocabulary documented (three-way tension as named, testable constraints)
- 5-7 comparables evaluated against 6-dimension framework
- Typeface category pattern identified from evaluations
- Brief peer review completed (LD-08)
- Brief document readable and usable without design knowledge

## OUT Scope

- Typography token implementation (Slice 02)
- Any CSS changes
- Colour or spacing decisions

## Learning Hypothesis

Disproves the execution-quality alternative hypothesis if the owner can evaluate
candidate directions using brief vocabulary after this slice completes.
Confirms the brief-absence root cause if the brief + comparables exercise produces
a clear, confident direction without the "I'll know it when I see it" response.

Confirms if fails: the owner still cannot evaluate without aesthetic vocabulary
after completing the exercise → execution-quality hypothesis becomes primary →
DISCOVER re-entry required before Slice 02.

## Acceptance Criteria

From S-VI-001:

- AC1: Brief holds all three tensions as named, observable constraints with rejection signals
- AC2: Owner can state why a specific example "fails" without aesthetic vocabulary
- AC3: 4 DISCOVER brief statements present as test cases
- AC4: "What this is NOT" constraints documented (no metaphors, no geometric-only, no cool grey)

From S-VI-002:

- AC1: 5-7 sites evaluated using 6-dimension framework
- AC2: ≥1 non-UK, non-coaching example
- AC3: ≥1 anti-comparable with stated rejection reason referencing the three-way tension
- AC4: Each site categorised with reason
- AC5: Typeface category pattern documented as a finding
- AC6: Peer review of brief completed before Slice 02 begins

## Pre-Slice SPIKE needed?

No. The comparables are real public sites. The brief framework is documented in feature-delta.md.
The risk is not unknown — it is the H-V4 alternative hypothesis (execution quality).
This slice IS the test for that hypothesis.

## Dependencies

- DISCOVER wave: APPROVED — no blocker
- H-V4 owner answer: RECEIVED (constraint vocabulary extracted)
- Owner time to evaluate 6-7 websites: REQUIRED — interactive gate

## Effort Estimate

- Comparables research (complete): 0
- Owner evaluation of 6-7 sites: ~30 minutes browsing
- Brief peer review: ~30 minutes (invoke `/nw-review nw-product-owner-reviewer`)
- Brief document finalisation: ~30 minutes

Total: ~2 hours owner time + peer review round-trip

## Dogfood Moment

Owner opens `feature-delta.md`, reads the brief, picks one of the anti-comparables (MBS Works),
and can immediately state: "This fails the Enterprise seriousness constraint — the organic imagery
and informal tone communicate individual-coaching warmth only. A visitor evaluating for their CFO
would not find a credibility signal here."

If the owner achieves this, the brief is working.
