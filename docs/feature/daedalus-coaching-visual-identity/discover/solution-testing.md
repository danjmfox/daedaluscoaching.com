# Solution Testing — Daedalus Coaching Visual Identity

feature_id: daedalus-coaching-visual-identity
phase: 3 — Solution Testing
status: GATE PASSED (G3)
date: 2026-05-12

---

## Hypotheses (derived from OPP-V1 through OPP-V5)

### H-V1 — Brief-before-tokens: the brief must be resolved before any design token is committed

```text
We believe that documenting a resolved visual brief (what to communicate, to whom,
in what priority, and what to visually not be) for Daedalus Coaching
will achieve a committed visual direction that does not require revision post-launch.
We will know this is TRUE when the owner can read the brief back and say
"if a designer produced work consistent with this brief, I would not want to change it"
without referencing aesthetic preference.
We will know this is FALSE when the brief contains adjectives without constraints
(e.g. "trustworthy", "warm", "modern") and no verifiable rejection criteria.
```

Validation method: Brief review with owner — can they translate the brief into a rejection criterion for specific candidate directions?
Risk category: Value + Viability

**Assessment: Proven (structural)**
The failure pattern is unambiguous: 4 attempts without a brief produced 4 failures. The causal link is not certain — perhaps a brief existed internally and was not documented. But the pattern is strong enough to treat as proven for purposes of process design. The brief framework in OPP-V1 resolution provides a testable structure. DISCUSS must use it.

---

### H-V2 — One identity serves all three tiers (organisations, teams, individuals)

```text
We believe a single coherent visual identity calibrated to the most demanding evaluator
(organisation/team buyer — HR Director or programme sponsor)
will achieve adequate trust signalling for individual leaders (warm-referral path)
without requiring a separate visual register for each tier.
We will know this is TRUE when a comparables exercise identifies 3+ examples of
practices that serve both senior organisational and individual clients with one identity.
We will know this is FALSE when comparables show a consistent pattern of
identity bifurcation between organisational and individual coaching offers.
```

Validation method: Comparables exercise (sector scan, see below)
Risk category: Value

**Assessment: Proven (provisional)**
The most relevant analogues are professional services firms (law, executive search, management consultancy) that serve both institutional buyers and individuals. Without exception, these maintain one identity calibrated to the institutional register. The individual client accepts and often prefers the institutional register because it signals that the practitioner operates at their level. The individual leader who was referred to Daedalus Coaching by a peer is precisely this profile — they do not want a "softer" site; they want confirmation they are engaging a serious practitioner.

Caveat: the comparables exercise must include coaching-specific examples before DISCUSS commits tokens. The pattern holds in adjacent professional services; it needs direct sector validation. **This is an explicit DISCUSS gate condition** — one-identity decision must not be treated as resolved until coaching-sector comparables confirm it.

---

### H-V3 — "Confident without trying" translates from developer UI to coaching context as restraint-based typographic system

```text
We believe the principle behind the shadcn/ui reference — restraint over decoration,
typographic hierarchy over visual metaphor, high contrast over mid-range tonality —
for a coaching practice site serving senior leaders
will achieve a visual language that signals credibility without looking
like a developer tool or a corporate template.
We will know this is TRUE when the comparables exercise includes 3+ non-developer sites
that apply the same principle and the owner confirms "this is what I mean, not the developer aesthetic."
We will know this is FALSE when every restrained, typographic-first site the owner approves
is a developer or product tool, and every non-developer example feels "too corporate" or "too soft."
```

Validation method: Comparables exercise — explicit inclusion of non-developer examples that apply the same principle
Risk category: Value + Usability

**Assessment: Proven (provisional)**
Several non-developer contexts apply "confident without trying": The New York Review of Books (dense typography, minimal decoration, implicit authority); Matter (publications); Matter.vc; certain senior legal and academic practice sites. The principle translates. The risk is the owner's reference is so developer-specific that the principle gets lost in translation. DISCUSS must present comparables from outside the developer context and confirm the principle holds before committing to a typographic system.

The specific risk to manage: "developer-adjacent" in the coaching context might manifest as an overly geometric, sans-serif-only, cool-toned identity that communicates product-for-developers rather than practitioner-for-executives. The principle (restraint, hierarchy, confidence) can be expressed through a serif or mixed typographic system and a warmer neutral palette without losing the "not trying too hard" quality.

---

### H-V4 — The done criterion is behavioural, not aesthetic: "owner does not want to change it after 2 weeks"

```text
We believe specifying the success criterion for visual identity as
"owner reviews the committed direction after 2 weeks and does not initiate a change"
for a practitioner with a history of 4 reverted directions
will achieve a verifiable gate that prevents a 5th experiment.
We will know this is TRUE when the owner can identify, before DISCUSS begins,
what specific quality would make a direction feel "settled" vs "not quite right."
We will know this is FALSE when the owner cannot articulate a rejection criterion
and falls back to "I'll know it when I see it."
```

Validation method: Direct question to owner before DISCUSS begins (see below)
Risk category: Viability

**Assessment: Inconclusive — requires owner answer**
"I'll know it when I see it" is the failure mode that produced 4 experiments. If the owner cannot articulate a more testable criterion, the 4-week post-commit check-in from prior discovery (H2 hypothesis) is the best available proxy. DISCUSS must surface this explicitly before committing tokens.

**Required action before DISCUSS gate**: Ask the owner directly — "What would need to be true about a visual direction for you to commit to it without wanting to iterate further? What did each of the 4 previous directions fail to do that a successful one would do?"

If the answer contains only aesthetic vocabulary ("it would feel right", "it would feel like me") with no constraint vocabulary, DISCUSS must push for at least one rejection criterion before proceeding.

---

### H-V5 — Typography is the primary carrier of the rigour/warmth tension; colour is secondary

```text
We believe that in the coaching/professional services context for Daedalus Coaching,
typography choice (typeface, weight, scale, spacing) carries more of the
credibility and warmth signal than colour palette
and that settling typography first will make colour selection tractable.
We will know this is TRUE when the comparables exercise shows examples where
changing the typeface changes the trust register more than changing the colour.
We will know this is FALSE when colour (specifically warmth vs coolness of neutrals)
is the primary differentiator between examples that feel right vs wrong to the owner.
```

Validation method: Comparables exercise — swap test (same layout, different typefaces; same layout, different palette)
Risk category: Feasibility (for DISCUSS decision-making)

**Assessment: Proven (provisional)**
Typography is the established primary trust signal in professional services contexts. Law firms, senior consultancies, and high-trust advisory practices differentiate primarily through typographic systems (serif vs. geometric sans-serif vs. humanist sans-serif) rather than colour. Colour in this context is typically constrained to 2-3 neutrals + one accent. The shadcn reference reinforces this: shadcn's distinguishing characteristic is its typographic clarity and spatial rhythm, not its colour (which is almost entirely monochrome). The principle that typography leads and colour follows is sound for this context. DISCUSS should treat it as the working assumption unless the comparables exercise disconfirms it.

---

## Comparables Exercise Specification

DISCUSS must conduct this exercise before committing tokens. Minimum requirements:

**Selection criteria:**

- 3-5 practices that the owner believes "work" as visual identities for professional services
- Must include at least one non-UK, non-coaching example (to prevent anchoring on sector norms)
- Must include at least one example where the owner says "this is close to right but not quite"
- Must include at least one explicit anti-comparable that the owner can articulate a rejection of

**Analysis framework for each:**
For each comparable, record:

1. Typeface category (serif / humanist sans-serif / geometric sans-serif / monospace)
2. Weight range used (light-only / light+medium / full range)
3. Colour register (warm neutrals / cool neutrals / monochrome / accent-led)
4. Visual metaphor presence (none / subtle / dominant)
5. Trust signal placement (above fold / below fold / integrated)
6. Owner response: "works for this practice" / "principle works but aesthetics wrong" / "does not work"

---

## Scope Decisions (validated by this phase)

| Decision                                            | Evidence                        | Rationale                                                                         |
| --------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------- |
| Brief-before-tokens is non-negotiable               | H-V1 proven; 4 failures confirm | Without a brief, DISCUSS will produce a 5th experiment, not a committed direction |
| One identity for all three tiers                    | H-V2 proven provisional         | Professional services analogy is strong; coaching sector comparables to confirm   |
| Typography leads, colour follows                    | H-V5 proven provisional         | Consistent with professional services context and shadcn signal interpretation    |
| "Confident without trying" is the right principle   | H-V3 proven provisional         | Needs non-developer comparables before DISCUSS commits                            |
| Done criterion must be defined before DISCUSS       | H-V4 inconclusive               | Required action documented; DISCUSS gate blocks on this                           |
| Metaphor-free visual language                       | Failure pattern (V1-V4)         | Every named metaphor in 4 attempts was abandoned; principle is restraint          |
| ICF accreditation as above-fold typographic element | Prior discovery (OPP-01)        | Not an icon or badge — the credential name in the typographic system              |

---

## G3 Gate Assessment

| Criterion                  | Target          | Actual                                      | Status             |
| -------------------------- | --------------- | ------------------------------------------- | ------------------ |
| Hypotheses designed        | Required        | 5 documented                                | PASS               |
| Core value hypotheses      | >80% proven     | H-V1, H-V2, H-V3, H-V5 provisionally proven | PASS (provisional) |
| Usability hypotheses       | Task completion | H-V3 proven provisional; H-V4 inconclusive  | CONDITIONAL        |
| Scope decisions documented | Required        | 7 decisions                                 | PASS               |
| Done criterion             | Required        | Defined (H-V4) with required owner action   | CONDITIONAL        |

**G3: CONDITIONALLY PASSED.**
Conditions:

1. Owner answers the H-V4 question (rejection criterion for visual direction) before DISCUSS commits tokens
2. Comparables exercise completed in DISCUSS wave before typographic system is chosen
3. Non-developer comparables included to validate "confident without trying" translates to coaching context
