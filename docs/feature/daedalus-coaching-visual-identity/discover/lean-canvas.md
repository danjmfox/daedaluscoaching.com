# Lean Canvas — Daedalus Coaching Visual Identity

feature_id: daedalus-coaching-visual-identity
phase: 4 — Market Viability
status: GATE PASSED (G4)
date: 2026-05-12

---

## Lean Canvas

### 1. Problem (validated Phase 1)

1. Four visual directions attempted and abandoned — each expressed one dimension of the practice without holding the rigour/warmth tension
2. No articulated brief existed before any direction was attempted — visual execution preceded communication strategy
3. No verifiable "done" criterion — iteration continued without a defined success condition

### 2. Customer Segments (by JTBD)

**Primary decision-maker for visual identity**: The owner — who must commit to a direction and not revert it. The visual identity "product" is consumed by clients, but the decision-maker who will be satisfied or dissatisfied is the owner. The identity succeeds when the owner's need (a settled, accurate representation of the practice) and the client's need (a credible, trustworthy signal) are both served by the same direction.

**Client tier 1 — Organisation evaluator** (HR Director, L&D lead, programme sponsor): highest credibility bar, making a vendor decision, will compare against other options. Visual identity must pass an implicit "is this professional enough to put in front of my CFO?" test.

**Client tier 2 — Team context** (Agile transformation sponsor, engineering or product leadership team): familiar with agile tooling aesthetics; will notice if the site looks like an agile consultancy template; need to see a practitioner with a distinct philosophy, not a methodology salesperson.

**Client tier 3 — Individual leader** (referred senior leader): arrives with peer context; needs confirmation not discovery; will respond to a clear, unhurried visual language that signals the practitioner is not trying to sell them anything.

**Referral partner** (other coach, HR lead, L&D professional): hiring the site to decide whether to share it. Will notice incoherence even if they cannot name it. Visual identity must pass the "I would share this" test.

### 3. Unique Value Proposition

"A coaching practice that holds rigour and warmth simultaneously — ICF-accredited and B-Corp certified, expressed in a visual language calibrated for senior leaders in complex organisations, without looking like a corporate template or a design experiment."

### 4. Solution (what DISCUSS must deliver)

1. A resolved brief: five constraints that govern every token decision — what to communicate, to whom in priority order, what the visual language must NOT be, how to hold the rigour/warmth tension, and the done criterion
2. A typographic system: one primary typeface (or one pair), weight range, and scale — chosen to express "confident without trying" in a professional services context, not a developer UI context
3. A colour system: 2-3 neutrals + one accent maximum — warm or cool neutral calibrated to the organisation evaluator's trust register; accent functional (interactive elements, key credentials), not decorative

### 5. Channels

The visual identity is not a product with its own acquisition channel — it is a component of the site, which is already validated as a warm-referral conversion tool (prior discovery). The channel question for visual identity is: who validates the direction before it ships?

- Owner: primary validator (must pass the "I would not change it after 2 weeks" test)
- Referral partner: secondary validator (1-2 trusted colleagues who can confirm "I would share this")
- DISCUSS wave output: the brief serves as the channel from DISCOVER to design execution

### 6. Revenue Streams

Not applicable directly. The visual identity contributes to coaching engagement conversion via the site. The measurable proxy from prior discovery applies: contact form submissions, discovery call bookings, and the 4-week visual experiment reversion rate (target: 0).

The distinct metric for this feature: **visual direction stability post-launch** — measured by absence of design token overrides or new visual experiments in the 12 weeks post-launch.

### 7. Cost Structure

- Owner time in DISCUSS wave: primary cost — resolve the brief, conduct comparables exercise, commit to tokens
- No external design cost anticipated (owner is developer; tokens.css is the output)
- Risk: if the brief resolution requires multiple iterations, the DISCUSS wave extends — the prior pattern suggests this is possible. Mitigation: brief-before-tokens discipline enforced by this artifact.

### 8. Key Metrics

| Metric                     | Measurement                                                                                      | Baseline             | Target                           |
| -------------------------- | ------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------- |
| Visual direction stability | Absence of design token overrides in git history                                                 | 4 reversions to date | 0 in 12 weeks post-launch        |
| Owner commitment signal    | Owner answers the H-V4 question with a rejection criterion (not just preference)                 | Not yet articulated  | Documented before DISCUSS begins |
| Comparables coverage       | Number of non-developer examples where owner confirms "confident without trying" principle       | 0 to date            | 3+ confirmed                     |
| Tier coverage              | Organisation evaluator, individual leader, referral partner all assessed against final direction | 0                    | All 3 assessed in DISCUSS        |

### 9. Unfair Advantage

- The ICF + Agile combination has no established visual language — there is no sector template to copy. This is a constraint (no obvious shortcut) and an advantage (owning the gap).
- The owner is both practitioner and developer — the visual system can be maintained and evolved without agency cost. This requires the token system to be simple enough for the owner to maintain solo.
- The failure history is itself an advantage: 4 documented failures with named directions and failure hypotheses provide a richer brief than any practice that has not tried and failed. DISCUSS begins with "here is what does not work and why" — that is a better starting point than a blank page.

---

## Four Big Risks Assessment

| Risk        | Question                                                                                                   | Evidence                                                                                                                                                                                       | Status                                                                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Value       | Will a brief-led visual direction produce a committed outcome rather than a 5th experiment?                | H-V1 proven — brief absence is the identified root cause of 4 failures. Brief-before-tokens is the intervention                                                                                | GREEN                                                                                                                                        |
| Usability   | Can the owner maintain the visual token system without friction?                                           | Simple token architecture (typography + 2-3 colours + spacing scale) is within owner's developer capability; Nuxt CSS variable approach is established                                         | GREEN                                                                                                                                        |
| Feasibility | Can a solo developer implement a professional visual identity without external design support?             | tokens.css approach is technically straightforward; typographic system selection is the key skill requirement; owner has aesthetic calibration (evidenced by 4 rejections of wrong directions) | GREEN with condition: comparables exercise must include enough reference material for the owner to make a typographic choice with confidence |
| Viability   | Will the visual identity serve the business model — referral-led coaching practice serving senior leaders? | Client tier analysis confirms one identity calibrated for organisation evaluator is viable for all tiers. Professional services analogues confirm the pattern.                                 | GREEN                                                                                                                                        |

**Overall risk profile: GREEN (with comparables condition on Feasibility).**

---

## The Six DISCOVER Questions — Final Answers

The feature brief specified six questions DISCOVER must answer. Answers follow, stated as constraints for DISCUSS (not aspirational adjectives):

**Q1: Why did the 4 previous visual directions fail?**

Each direction resolved the rigour/warmth tension by choosing one pole rather than holding both. PaperFrame chose warmth (craft, approachability) over rigour. BoxFrame chose rigour (precision, systems) over warmth. PostIt chose personality (practitioner identity) over credibility (institutional trust). Skewed footer chose distinctiveness (visual energy) without a coherent system behind it. The failure was structural, not aesthetic: each direction was attempted without a brief that required it to hold the tension. DISCUSS must document the brief before producing any visual option.

**Q2: What does each client type need to feel from the visual identity?**

One calibrated register serves all three, provided it is calibrated for the hardest-to-satisfy evaluator (organisation buyer). The specific emotional jobs by tier:

- Organisation evaluator: "This practitioner operates at the level my senior leaders need. I would not be embarrassed to recommend them to my board."
- Team context (Agile/transformation): "This is not a methodology salesperson. This person has a philosophy and is not performing agility."
- Individual leader (warm referral): "This is someone worth an hour of my time. My colleague was right to refer them."
- Referral partner: "I would share this. It represents the person I know."

These four statements, not adjectives, are the brief. DISCUSS must test every candidate direction against them.

**Q3: What does credibility look like in this sector?**

ICF accreditation + Agile coaching is an unusual combination. The sector visual defaults are wrong for both: ICF directories tend to corporate-blue-generic; agile consultancies tend to bold-coloured startup-adjacent. Daedalus Coaching should be neither.

Credibility signals that are appropriate and sector-validated:

- The credential names (ICF PCC/MCC, B-Corp) displayed in the typographic system — not as badges or icons, as text
- Restrained, unhurried spatial rhythm — the opposite of a marketing site optimised for scroll and click
- No stock photography — the practitioner's presence is the differentiator, not a visual metaphor
- Specificity of language (the site copy will be distinct; the visual language must not contradict it by being generic)

**Q4: What does the shadcn reference actually signal?**

The operative principle is: **confidence through restraint**. The site should not look like it is trying to impress. Specific translations for the coaching context:

- Typographic hierarchy carries the content — no decoration competes with it
- High contrast (near-black on near-white, or warm dark on warm light) — legibility is a form of respect for the reader's time
- Generous whitespace — the absence of clutter signals the practitioner's thinking is not cluttered
- No metaphors encoded in layout or UI elements — the practice is about clear thinking; the site should embody it

Operationalised as a design constraint: "The visual language should be the quietest thing on the page — legible, spacious, unhurried — so that the practitioner's words and credentials do the work, not the design."

What the shadcn reference does NOT mean for this context:

- Geometric sans-serif only (monospace or developer-tool typography would be wrong for coaching)
- Cool, grey-toned neutrals (coaching context needs a warmer neutral register — human, not industrial)
- Minimal to the point of anonymous (the practitioner has a distinct voice; the visual language should not erase it)

**Q5: What would "settled" feel like?**

The test is behavioural, not aesthetic: the owner does not want to change the direction after 2 weeks of using it. Before that test can be applied, the owner must answer one question in DISCUSS: "What did each of the 4 previous directions fail to do that a successful one would do?" The answer to this question is the rejection criterion that transforms "I'll know it when I see it" into a testable brief.

If the owner cannot answer this question, DISCUSS must return to this artifact and resolve it before proceeding to token decisions.

**Q6: Does the three-tier structure require different visual expression, or one coherent identity?**

One coherent identity, calibrated for the most demanding evaluator (organisation buyer). Copy does the segmentation; the visual identity does the trust establishment. This is the professional services norm and the most evidence-consistent option. The comparables exercise in DISCUSS must confirm it with coaching-adjacent examples before tokens are committed.

---

## Go/No-Go Decision

**Decision: GO** — with the following conditions for DISCUSS:

1. **Brief condition**: Owner answers the H-V4 question (rejection criterion, not just preference) before DISCUSS produces any candidate directions. Document the answer as the brief's "done criterion" section.

2. **Comparables condition**: Comparables exercise must include non-developer examples (professional services, academic-practitioner, values-led advisory) before the typographic system is chosen.

3. **Typography-leads condition**: DISCUSS resolves typography before colour. Colour palette decisions are secondary and dependent on typographic choice.

4. **One identity condition**: The three-tier client structure does not require different visual expressions. DISCUSS must not produce tier-specific design directions.

5. **Metaphor-free condition**: No visual metaphors. No texture, no geometric UI encoding, no workshop-culture aesthetics. The brief's "visual NOT" is as load-bearing as its "visual IS."

---

## G4 Gate Assessment

| Criterion                        | Target                      | Actual                                | Status |
| -------------------------------- | --------------------------- | ------------------------------------- | ------ |
| Lean Canvas complete             | Required                    | Complete                              | PASS   |
| All 4 risks addressed            | Required                    | 4 addressed                           | PASS   |
| All risks acceptable             | Required                    | 3 GREEN, 1 GREEN-with-condition       | PASS   |
| Go/No-Go documented              | Required                    | GO with 5 conditions                  | PASS   |
| Six discovery questions answered | Required (feature-specific) | All 6 answered as DISCUSS constraints | PASS   |

**G4: PASSED. Ready for peer review and handoff.**
