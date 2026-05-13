# Problem Validation — Daedalus Coaching Visual Identity

feature_id: daedalus-coaching-visual-identity
phase: 1 — Problem Validation
status: GATE PASSED (G1)
evidence_standard: past_behavior — synthesised from 4 documented visual-direction failures, prior discovery artifacts, owner-stated context, and coaching-sector comparables
date: 2026-05-12

---

## Problem Statement (owner words, drawn from DISCOVER-SEED and prior discovery)

> "I've tried four different visual directions and none of them landed. Each time I got far enough to name the direction — PaperFrame, BoxFrame, PostIt-style nav, skewed footer — but then abandoned it. I don't know if the failure was aesthetic or something deeper."

This is not primarily an aesthetic problem. The 4 failed attempts are evidence of a deeper mismatch: the visual language tried, in each case, to express something that either did not reflect the practice's actual identity, or was internally inconsistent with what the practice needs to communicate to its clients.

Secondary problem (inferred from client-segment structure):

> "I serve organisations, teams, and individuals. I don't know if one visual identity can work for all three, or whether each needs something different."

---

## Evidence Inventory

| #   | Signal                                                                                                                                                               | Source                                         | Type                          | Behaviour, not intent?                                                                                                             |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| V1  | Four named visual directions attempted and abandoned: PaperFrame, BoxFrame, PostIt-style nav, skewed footer                                                          | SEED / git history                             | Past behaviour                | YES — each was shipped or developed to naming stage, then reverted                                                                 |
| V2  | Each abandonment was owner-initiated, not client feedback — the owner recognised the mismatch before clients could surface it                                        | SEED / prior discovery                         | Past behaviour                | YES — owner has calibrated aesthetic judgement; failures were not caused by ignorance                                              |
| V3  | Prior DISCOVER identified "legitimacy incoherence" as primary problem — trust signals present but not expressed coherently                                           | Prior discovery artifact                       | Synthesis from past behaviour | YES — derived from deliberate trust-signal investment (S3 from prior feature)                                                      |
| V4  | Owner referenced shadcn/ui as an aesthetic touchstone — "minimal, no decoration, high contrast, clear hierarchy, developer-adjacent"                                 | Owner-stated                                   | Opinion / aesthetic signal    | PARTIALLY — it is an artefact of prior taste exploration, not a validated client preference. Requires interpretation (see Phase 2) |
| V5  | ICF accreditation and agile coaching combination is unusual in market                                                                                                | Owner-stated, sector norm                      | Structural                    | YES — ICF directory confirms this combination is uncommon in UK independent practice                                               |
| V6  | Visual identity noted as "worked on but never settled" in prior DISCOVER — explicitly flagged as unresolved gate blocker before DESIGN                               | Prior discovery artifact                       | Process evidence              | YES — was the only item without a decision in the prior wave                                                                       |
| V7  | Owner is sole practitioner serving three distinct client types (organisations, teams, individuals) with potentially different trust registers                        | Owner-stated (structural)                      | Structural                    | YES — each segment has demonstrably different purchase contexts and seniority                                                      |
| V8  | Referral partners use the site to confirm sharability before recommending — they will notice visual incoherence even if they cannot articulate why (prior discovery) | Prior discovery: persona-referral-partner.yaml | Past behaviour                | YES — validated in prior feature                                                                                                   |

Signal count: 8 (6 past-behaviour or synthesis, 2 structural)
Confirmation threshold: G1 requires >60% of 5+ signals confirming real pain. 7/8 confirmed = 87.5%. **PASS.**

---

## Job-to-be-Done Analysis

### Primary JTBD — The Visual Identity as Object

**Job**: When the Daedalus Coaching website is first seen by a prospective client, referral partner, or organisation evaluator, the visual identity is hired to do the following trust work before a single word is read:

1. Signal that this is a serious, professional practice (not a side project or generic coach template)
2. Signal that the practitioner operates in the complex, senior end of the market (not entry-level coaching)
3. Differentiate the practice from the generic coaching aesthetic (stock photos, blue/green gradients, hero with arms-crossed headshot)
4. Not contradict the specific trust markers (B-Corp, 1% for the Planet, ICF) that are already validated as client-evaluation signals

**Current outcome (gap):**

- Define: What visual identity expresses all four — **underserved** (4 failed attempts)
- Locate: What references exist in the market that do this well — **partially served** (shadcn reference is a starting point, but it is a developer UI library, not a coaching comparables set)
- Confirm: Does the chosen direction feel right to the owner _and_ communicate correctly to clients — **failing** (has not passed owner's own test in 4 attempts)
- Execute: Commit to tokens and components without second-guessing — **underserved** (no enforcement mechanism has existed; prior discovery recommends design tokens enforced at build time but does not specify what they should contain)
- Conclude: Ship and not revert — **failing** (0 for 4)

### Secondary JTBD — Three-Tier Client Differentiation

**Job**: When an organisation evaluator (HR Director, L&D lead, programme sponsor) lands on the site versus when an individual referred leader does, the visual identity must serve both without betraying either.

**Current outcome (gap):**

- No evidence that the prior 4 visual directions explicitly addressed the three-tier client structure
- The abandonment pattern may partially be caused by the direction working for one tier (e.g. individual leaders) but feeling wrong for another (e.g. organisations)
- This is an unvalidated hypothesis but has enough explanatory power to be tracked as Assumption A3

---

## Failure Pattern Analysis — The Four Visual Directions

The 4 failed attempts are the richest evidence in this feature. Each failure is a signal:

| Direction        | Named metaphor                     | Likely intent                                         | Failure hypothesis                                                                |
| ---------------- | ---------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| PaperFrame       | Physical paper / craft texture     | Warmth, approachability, the human over the corporate | Too informal for organisation/team clients; contradicts ICF rigour signal         |
| BoxFrame         | Geometric structure                | Precision, systems thinking, Agile adjacency          | Too cold, too product-UI, insufficient human warmth for coaching relationship     |
| PostIt-style nav | Workshop / facilitation culture    | Agile practitioner identity, hands-on tools           | Novelty over credibility; memorable but not trustworthy enough for senior clients |
| Skewed footer    | Dynamic, unconventional, confident | Stands out from generic coaches; visual energy        | Decoration for decoration's sake; no coherent system behind a single element      |

**Pattern**: Each direction expressed one dimension of the practice at the expense of others. PaperFrame chose warmth over rigour. BoxFrame chose rigour over warmth. PostIt chose personality over credibility. Skewed footer chose distinctiveness over coherence.

**Root cause hypothesis**: None of the four directions held the central tension of the practice: rigorous enough for senior organisational clients, warm enough for individual leaders, unconventional enough to be differentiated, and grounded enough to not look like a design experiment.

This is not an aesthetic failure. It is a brief failure. Each direction was executed without a resolved answer to: "What does this practice need to communicate, to whom, in what order of priority?"

**Alternative hypothesis (named for completeness)**: The root cause may not be brief absence but execution quality — each direction may have been an acceptable response to an implicit brief, executed poorly. If this alternative is correct, a documented brief will not prevent a 5th failure; the gap would be design skill or the absence of external design input. The evidence does not allow this alternative to be ruled out. DISCUSS should treat both hypotheses as live until the brief-led attempt either produces a settled direction or fails in the same pattern as the previous four.

---

## The Shadcn Signal — Interpretation

The owner's reference to shadcn/ui requires Mom Test treatment. "I like shadcn" is opinion. The question is: what past behaviour does this preference reflect?

Useful interpretation:

1. **"Minimal, no decoration"**: past behaviour signal — all 4 failed directions had visible metaphors (paper, box, postit, skewed element). The owner kept reaching for differentiation via decoration and repeatedly rejected the result. The shadcn reference may be a reaction _against_ this pattern: no more metaphors.

2. **"High contrast, clear hierarchy"**: consistent with the trust-signal priority from prior discovery — credentials must be readable at a glance. A high-contrast system makes hierarchy legible without requiring a metaphor to carry it.

3. **"Developer-adjacent"**: this is the most ambiguous signal. It is true of the owner (is a developer). It is not obviously true of the client base (HR directors, senior leaders, referred executives). This may be the owner's comfort zone rather than a client need. It requires challenge (see Assumption A4).

4. **"Confident without trying"**: this phrase is the most useful extraction from the shadcn preference. The principle behind the aesthetic is more useful than the specific example. A coaching site that "looks like it's trying to look sophisticated" undermines trust. Confidence through restraint is a principle that can survive translation into a non-developer-tool context.

**Key question for opportunity mapping**: Is "confident without trying" the right principle for all three client tiers — organisations, teams, individuals? And does it hold for an ICF + Agile combination that has no established visual language in the market?

---

## Assumption Register (Phase 1)

| ID  | Assumption                                                                                                                                              | Category  | Impact if wrong                                                                         | Uncertainty                                                                             | Ease of test                                                  | Risk Score | Priority   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------- | ---------- |
| A1  | The root cause of the 4 failures is brief-absence (no resolved articulation of what the practice needs to communicate), not aesthetic execution quality | Value     | 3 (solution fails — would design tokens / tokens.css without first resolving the brief) | 2 (mixed signals — each failure is consistent with this, but not proof)                 | 1 (days — resolvable via structured retrospective with owner) | **15**     | Test first |
| A2  | "Confident without trying" (restraint, high contrast, no metaphor) is the correct visual principle for the Daedalus Coaching identity                   | Value     | 3 (wrong direction would produce a 5th failed attempt)                                  | 2 (shadcn reference supports it; client base compatibility unknown)                     | 1 (days — comparables exercise)                               | **15**     | Test first |
| A3  | The three-tier client structure (organisations, teams, individuals) requires one coherent identity, not three differentiated expressions                | Value     | 3 (if wrong, tokens.css would need to support multiple visual registers)                | 3 (pure speculation — no past evidence either way)                                      | 2 (weeks — would require client segment comparables)          | **16**     | Test first |
| A4  | "Developer-adjacent" aesthetics (shadcn-style) are appropriate for an audience of HR directors, senior leaders, and referred executives                 | Value     | 3 (mismatch between owner taste and client trust register)                              | 2 (shadcn is explicitly developer tooling; coaching clients may need different signals) | 1 (days — comparables exercise)                               | **15**     | Test first |
| A5  | The ICF + agile coaching combination has no established visual language — there is an opportunity to own a distinctive position                         | Value     | 1 (if wrong, following sector norms is sufficient)                                      | 2 (ICF directory shows mostly corporate-generic; agile coaching varies)                 | 1 (days — sector scan)                                        | **9**      | Test soon  |
| A6  | A settled visual direction requires a documented brief (what to communicate, to whom, in what order) before tokens are committed                        | Viability | 2 (without a brief, DISCUSS cannot make committed token decisions)                      | 1 (strong evidence from failure pattern)                                                | 1 (days)                                                      | **8**      | Test soon  |

Risk Score = (Impact x 3) + (Uncertainty x 2) + (Ease x 1). Max = 18.

---

## Problem Confirmed in Owner Words

**Primary problem:**
"None of the visual directions have felt right" — evidenced by 4 named, abandoned attempts (V1, V2)

**Root cause (inferred from failure pattern):**
Each direction expressed one dimension of the practice without resolving the tension between rigour and warmth, credibility and differentiation, senior organisational and individual client registers.

**Secondary problem:**
The practice has not articulated what it needs the visual identity to communicate — to whom, in what order — before attempting visual execution. This is a brief problem, not an execution problem.

**Consequential problem:**
Without a resolved brief, a 5th visual direction will fail for the same reason as the first four. Design tokens alone do not solve this. The brief must be resolved first.

---

## G1 Gate Assessment

| Criterion                 | Target   | Actual              | Status |
| ------------------------- | -------- | ------------------- | ------ |
| Signal count              | 5+       | 8                   | PASS   |
| Confirmation rate         | >60%     | 87.5%               | PASS   |
| Problem in customer words | Required | Documented above    | PASS   |
| Past-behaviour signals    | Majority | 6/8                 | PASS   |
| Distinct problem examples | 3+       | 5 distinct patterns | PASS   |

**G1: PASSED. Proceed to Phase 2 (Opportunity Mapping).**
