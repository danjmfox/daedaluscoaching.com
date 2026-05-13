# Feature Delta — Daedalus Coaching Visual Identity

feature_id: daedalus-coaching-visual-identity
wave: DISCOVER
date: 2026-05-12
status: PEER REVIEWED — APPROVED FOR HANDOFF

---

## What DISCOVER determined

### Validated

**1. The root cause of 4 failed visual directions is brief-absence, not aesthetic execution.**

Each direction — PaperFrame, BoxFrame, PostIt-style nav, skewed footer — resolved the rigour/warmth tension by choosing one pole. PaperFrame chose warmth over rigour. BoxFrame chose rigour over warmth. PostIt chose personality over credibility. Skewed footer chose distinctiveness without a coherent system. The failure was not the execution of each direction; it was that no direction was attempted with a documented answer to "what must this communicate, to whom, in what order of priority, and what must it not be." Brief-before-tokens is the intervention. It is non-negotiable for DISCUSS.

**2. One coherent visual identity serves all three client tiers — calibrated for the most demanding evaluator.**

The professional services norm (law, executive search, senior consultancy) is one identity calibrated to the institutional buyer. The individual leader who was referred by a peer does not want a "softer" site — they want confirmation they are engaging a serious practitioner. Copy does the segmentation; the visual identity does the trust establishment. This removes the multi-register design problem.

The calibration target: "Would an HR Director or programme sponsor be embarrassed to put this practitioner in front of their board?" If the answer is "no" the identity works for all tiers.

**3. "Confident without trying" is the right operative principle — restraint over decoration, hierarchy over metaphor.**

The shadcn/ui reference is not the literal reference; it is a signal about a principle. Translated for the coaching context: typographic hierarchy carries the content; no decoration competes with it; generous whitespace signals the practitioner's thinking is not cluttered; no visual metaphors (no paper, post-it, workshop aesthetics, geometric encoding). The visual language should be "the quietest thing on the page — legible, spacious, unhurried — so that the practitioner's words and credentials do the work."

What this principle does NOT mean for this context: geometric sans-serif only (developer-tool typography is wrong for coaching); cool grey neutrals (a warmer neutral register is needed — human, not industrial); minimal to the point of anonymous (the practitioner has a distinct voice that the visual language must not erase).

**4. Typography is the primary carrier of the rigour/warmth tension. Colour is secondary.**

Professional services differentiate primarily through typographic systems, not colour. Colour in this context is constrained: 2-3 neutrals and one functional accent. DISCUSS resolves typography before colour. This sequencing is a gate condition.

**5. The ICF + Agile combination has no established visual language — the gap is an advantage.**

Sector defaults are wrong in both directions: ICF directories tend to corporate-blue-generic; agile consultancies tend to bold-coloured startup-adjacent. Daedalus Coaching should be neither. There is no template to copy, which means there is no competitor that has already claimed the correct position. The failure history is an asset: DISCUSS begins with "here is what does not work and why" — a richer brief than a blank page.

### Conditionally validated

**6. "Confident without trying" translates from developer UI to professional services coaching context.**

The principle holds in adjacent non-developer contexts: senior legal and advisory practices, academic-practitioner consultancies, values-led professional services. The condition is that the comparables exercise in DISCUSS must include non-developer examples before the typographic system is chosen. This cannot be skipped. The risk of not doing it: the owner commits to a typographic system that reads correctly to a developer but signals "product tool" rather than "senior practitioner" to an HR Director.

### Explicitly unresolved — DISCUSS gate blockers

**7. Owner must articulate a rejection criterion (not just a preference) before DISCUSS produces any candidate directions.**

The H-V4 question must be answered explicitly: "What did each of the 4 previous directions fail to do that a successful one would do? What specific quality would make a direction feel settled rather than not-quite-right?"

If the owner answers with aesthetic vocabulary only ("it would feel right", "it would feel like me") with no constraint vocabulary, DISCUSS must push for at least one rejection criterion — something that can be evaluated against a candidate direction without requiring the direction to be implemented first.

If the owner cannot answer this question, DISCUSS must return to this artifact before proceeding to token decisions.

---

## Four Statements That Are the Brief

These replace adjectives. DISCUSS must test every candidate direction against all four:

1. "This practitioner operates at the level my senior leaders need. I would not be embarrassed to recommend them to my board." (Organisation evaluator)
2. "This is not a methodology salesperson. This person has a philosophy and is not performing agility." (Team / Agile context)
3. "This is someone worth an hour of my time. My colleague was right to refer them." (Individual leader, warm referral)
4. "I would share this. It represents the person I know." (Referral partner)

None of these contain adjectives. Each is a past-behaviour testable statement. A candidate direction either earns these statements or it does not.

---

## Scope Boundary Summary

| Item                             | Status                  | DISCUSS action required                                                       |
| -------------------------------- | ----------------------- | ----------------------------------------------------------------------------- |
| Visual brief document            | IN SCOPE — gate blocker | Owner answers H-V4 rejection criterion before any directions produced         |
| Comparables exercise             | IN SCOPE — first action | Must complete before typographic system is chosen                             |
| Typographic system               | IN SCOPE                | Resolved before colour; typography carries rigour/warmth tension              |
| Colour system                    | IN SCOPE                | 2-3 neutrals + one functional accent; warm neutral register; after typography |
| Spacing scale                    | IN SCOPE                | Generous whitespace is load-bearing; not decorative                           |
| tokens.css                       | IN SCOPE                | Output of DISCUSS; enforced at build time                                     |
| Metaphor-driven elements         | OUT OF SCOPE            | No paper, no boxes, no workshop aesthetics, no skew/rotation encoding         |
| Geometric sans-serif only        | OUT OF SCOPE            | Wrong register for coaching; developer-tool signal                            |
| Cool grey neutrals               | OUT OF SCOPE            | Industrial register; wrong for coaching relationship                          |
| Stock photography                | OUT OF SCOPE            | Prior discovery: practitioner's presence is the differentiator                |
| Tier-specific visual expressions | OUT OF SCOPE            | One identity; copy does the segmentation                                      |
| Three-way identity system        | OUT OF SCOPE            | Not evidenced; not required; adds maintenance cost                            |

---

## DISCUSS: Required Sequence

The sequencing is a gate. Do not reorder.

1. **Owner answers the H-V4 rejection criterion question.** Document the answer verbatim. This is the brief's "done criterion." If not answered, stop.

2. **Comparables exercise.** Minimum: 3-5 practices the owner says "work." Must include at least one non-UK, non-coaching example; at least one "close but not quite right" example; at least one explicit anti-comparable. Record for each: typeface category (serif / humanist sans-serif / geometric sans-serif), weight range, colour register (warm vs cool neutral), visual metaphor presence, trust signal placement, and owner response category ("works / principle works but aesthetics wrong / does not work").

3. **Typography decision.** Select typeface category and weight range. The correct category will express both rigour and warmth without resolving toward one pole. Humanist serif or humanist sans-serif is the most likely fit; geometric sans-serif is likely wrong (too cold); traditional serif may be too formal unless weight range is carefully constrained. This is a human decision — the comparables exercise provides the evidence for it.

4. **Colour decision.** After typography is committed: 2-3 neutrals (warm register — cream, warm white, near-black with a brown-black undertone, not a blue-black) + one functional accent (for interactive elements and key credentials; not decorative; used sparingly).

5. **Spacing decision.** Generous whitespace is not a preference — it is part of the "confident without trying" principle. A spacing scale that enforces vertical rhythm and resists compaction under content pressure.

6. **Two-week stability test.** After tokens are committed and implemented, the owner reviews the direction. Does not trigger changes. This is the done criterion. If changes are triggered, DISCOVER must be revisited before further iteration.

---

## Wave Decisions

| Decision                                              | Rationale                                                                       | Reversible?                                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Brief-before-tokens                                   | 4 failures confirm brief absence as root cause                                  | No — this is a process commitment                                             |
| One identity for all three tiers                      | Professional services norm; strongest evidence-consistent option                | Yes — would require counter-evidence from comparables exercise                |
| Typography leads, colour follows                      | Typography is primary trust carrier in professional services                    | Yes — only if comparables exercise shows colour is the primary differentiator |
| Metaphor-free visual language                         | Every metaphor in 4 attempts was abandoned; principle is restraint              | No — the failure pattern is unambiguous                                       |
| Warm neutral palette (not cool/grey)                  | Coaching relationship register; shadcn "not" translation                        | Yes — comparables may show exceptions                                         |
| Done criterion is behavioural, not aesthetic          | "I would not change it after 2 weeks" is testable; preference vocabulary is not | Yes — if owner can articulate a stronger criterion                            |
| Credentials as text in typographic system, not badges | Prior discovery signal; "performative expertise" stated value of owner          | Low — would need client-segment evidence to override                          |

---

## Client Tier Note (within persona-prospective-client)

The existing `persona-prospective-client.yaml` treats the evaluating leader as a single type. DISCOVER identified meaningful segmentation within this persona for visual identity purposes:

- **Organisation evaluator** (HR Director, L&D lead, programme sponsor): vendor decision, institutional credibility bar, implicitly asks "would I put this in front of my CFO?"
- **Individual leader** (warm referral): confirmation not discovery, arrives with peer context, responds to an unhurried visual language that signals the practitioner is not selling

The visual identity is calibrated to the organisation evaluator. The individual leader accepts and often prefers the institutional register — it confirms they are engaging a serious practitioner, not a generic coach.

This does not require a new persona file. The segmentation is a DISCUSS design constraint, not a separate journey.

---

## Artifacts

| Artifact           | Path                                                                            | Status                             |
| ------------------ | ------------------------------------------------------------------------------- | ---------------------------------- |
| Problem Validation | `docs/feature/daedalus-coaching-visual-identity/discover/problem-validation.md` | Complete — G1 PASSED               |
| Opportunity Tree   | `docs/feature/daedalus-coaching-visual-identity/discover/opportunity-tree.md`   | Complete — G2 PASSED               |
| Solution Testing   | `docs/feature/daedalus-coaching-visual-identity/discover/solution-testing.md`   | Complete — G3 CONDITIONALLY PASSED |
| Lean Canvas        | `docs/feature/daedalus-coaching-visual-identity/discover/lean-canvas.md`        | Complete — G4 PASSED               |

No new persona files created. Existing personas are sufficient. Client tier segmentation documented above as a DISCUSS constraint.

---

## Peer Review Status

Reviewed by: nw-product-discoverer-reviewer (inline)
Result: APPROVED — see review proof below

---

## [REF] Peer Review Proof

### Review Feedback

Reviewer assessed against: evidence quality | confirmation bias | sample adequacy | completeness

**Critical issues**: 0
**High issues**: 1
**Medium issues**: 1
**Low issues**: 1

---

**HIGH: H-V4 "done criterion" was inconclusive but not structurally enforced as a DISCUSS gate blocker.**

Scout's framing in solution-testing.md correctly identified the risk but the condition ("required action before DISCUSS gate") could be overlooked as a note rather than a gate. The feature-delta now lists the H-V4 owner question as a named gate blocker with specific wording — DISCUSS must not produce any candidate directions until it is answered.

Revision made: "Explicitly unresolved — DISCUSS gate blockers" section and "Required sequence" section both enforce the H-V4 condition as stop-first.

---

**MEDIUM: Comparables exercise is specified in solution-testing.md but not positioned as the first DISCUSS action.**

Reviewer notes: H-V3, H-V4 (indirect), and H-V5 all depend on the comparables exercise. If DISCUSS begins with typographic system ideation before completing it, the exercise becomes confirmation bias rather than validation. Sequencing must be explicit.

Revision made: "Required sequence" section makes comparables exercise step 2 (immediately after the H-V4 owner question is answered) and states it must be completed before any token decisions.

---

**LOW: "Organisation evaluator" client tier introduced in lean canvas without reconciliation to existing persona.**

Reviewer notes: the lean canvas describes meaningful segmentation within the prospective-client persona. Without an explicit note, DISCUSS might treat the persona as a monolith and calibrate for the individual leader register (warmer, softer) rather than the institutional register (more demanding, higher credibility bar).

Revision made: "Client tier note" section documents the segmentation as a DISCUSS design constraint without creating a new persona file.

---

### Re-review Results

All high and medium issues addressed. Low issue addressed. No second iteration required.

**Quality gate status: APPROVED FOR HANDOFF TO PRODUCT-OWNER (DISCUSS wave).**
