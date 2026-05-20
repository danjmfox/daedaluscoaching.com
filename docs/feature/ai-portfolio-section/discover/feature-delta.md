# Feature Delta — AI Portfolio Section

feature_id: ai-portfolio-section
wave: DISCOVER
date: 2026-05-20
status: COMPLETE — RECOMMENDATION: SCOPED ALTERNATIVE (not as proposed)

---

## Wave: DISCOVER / [APS-00] Discovery Context

**Feature hypothesis (owner-stated):** "A coach with large-scale AI-transformation experience is a rare thing for a short while — add a GitHub profile link and/or AI Portfolio section to the site."

**Discovery method:** Owner self-knowledge as primary evidence source (pre-launch, no analytics). Mom Test discipline applied — past behaviour and observable facts only. Assumptions scored and tested against validated persona data from STR-1 discovery (2026-05-19) and persona files established in `docs/product/journeys/`.

**Evidence sources consulted:**

- `persona-recruiter-hiring-manager.yaml` (STR-1, 2026-05-19)
- `persona-prospective-client.yaml` (DISCOVER-SEED, Phase 1 JTBD)
- `docs/product/jobs.yaml` — JOB-CB-001, JOB-TN-001
- `journey-transformation-evidence.yaml`
- `.claude/brand-voice-guidelines.md`
- `docs/feature/daedalus-coaching-website-redesign/discover/feature-delta.md`

---

## Wave: DISCOVER / [APS-01] Persona ID

### Primary: Persona-Recruiter-Hiring-Manager

**Arrival mode:** CV / LinkedIn → site. Time budget: 10-second credential scan.
**JTBD:** Confirm candidate credentials, seniority, and org-scope evidence without reading prose.
**Pattern library:** ICF, ICAgile, Scrum.org badge shapes. GitHub = developer category. Portfolio pages = developer/designer category.
**What they do not need:** GitHub profiles, portfolio pages, blog content, resources pages.

Evidence reference: `persona-recruiter-hiring-manager.yaml` — `what_they_do_not_need`; `signals_of_failure` ("site reads as a coaching practice storefront rather than a practitioner profile").

### Secondary: Persona-Prospective-Client (Evaluating Leader)

**Arrival mode:** Warm referral. Time budget: 60 seconds to enquiry decision.
**JTBD:** Corroborate philosophy and approach; confirm credibility; decide whether to enquire.
**Pattern for AI signal:** "Does this person understand the terrain I am navigating?" — not "Can this person build tools?"
**What they do not need:** Technical portfolio, GitHub activity, app showcase.

Evidence reference: `persona-prospective-client.yaml` — `what_they_do_not_need`; `signals_of_failure` ("generic coaching copy that could apply to any practitioner").

### Not in scope: Developer / Technical Evaluator

No evidence this persona arrives via any current channel. Organic search is not a meaningful channel (confirmed in STR-1). LinkedIn → CV → Site is the dominant path. A technical evaluator persona is speculative and not validated.

---

## Wave: DISCOVER / [APS-02] Opportunity Statement

**Problem:** The owner has a genuine and rare credential — practitioner-level AI fluency combined with org-transformation coaching experience. The site currently signals no AI fluency at all. The opportunity is to surface this signal in a way that reinforces rather than undermines the coaching-practitioner identity.

**Reframed opportunity:** Signal AI fluency as practitioner pattern recognition (Daedalus frame) rather than as technical capability (builder/developer frame) — within existing content surfaces, without new navigation or dedicated infrastructure.

**What this is not:** A GitHub link, a portfolio page, or an "AI apps" showcase. Those formats fire the wrong professional category signal for both validated personas.

---

## Wave: DISCOVER / [APS-03] Assumption Analysis

### Assumption 1 — Recruiter signal fit

**Assumption:** Recruiters scanning for Agile/Enterprise Coach roles will interpret AI app-building experience as a differentiating credential that raises their confidence.

**Risk score:**

- Impact if wrong: 3 (High — fires "developer, not coach" disqualification heuristic)
- Uncertainty: 3 (High — speculation; no recruiter interview data)
- Ease of testing: 2 (Weeks, moderate cost)
- **Score: (3×3) + (3×2) + (2×1) = 9+6+2 = 17 — TEST FIRST**

**Past behaviour evidence:** Recruiter persona pattern library is built around recognised coaching credential bodies (ICF, ICAgile, Scrum.org). GitHub is a developer signal in recruiter ATS and manual scan workflows. Past behaviour: recruiters use LinkedIn Recruiter keyword filters — "AI transformation" is a growing tag, but "GitHub" is not a filter applied to coaching roles.

**Hypothesis:**

> We believe displaying a GitHub profile link for `persona-recruiter-hiring-manager` will raise their confidence in the candidate.
> We will know this is TRUE when we see recruiters citing GitHub as a positive signal in structured reference feedback.
> We will know this is FALSE when we see recruiters interpreting the signal as developer-category misalignment, or ignoring it entirely.

**Verdict: INVALIDATED.** Observable category heuristic: GitHub = developer, not coach. The recruiter's job is to pattern-match seniority and credentials at speed. A GitHub link introduces category ambiguity at exactly the moment the site should resolve doubt. This is a signal-dilution risk, not a signal-amplification opportunity. Confidence: HIGH (consistent with established persona behaviour patterns and sector norms).

---

### Assumption 2 — Evaluating leader signal fit

**Assumption:** A leader evaluating this coach for their AI transformation programme will find that seeing built AI apps builds trust in the coach's practitioner credibility.

**Risk score:**

- Impact if wrong: 3 (High — "this person is a developer, not a coach" triggers disengagement)
- Uncertainty: 2 (Medium — mixed signals; Icarus frame suggests route but format is uncertain)
- Ease of testing: 2 (Weeks)
- **Score: 9+4+2 = 15 — TEST FIRST**

**Past behaviour evidence:** `persona-prospective-client.yaml` — evaluating leader arrives warm-referred, has 60 seconds. Test is "can I justify this recommendation to my organisation?" A GitHub link raises a category question ("is this a coach or a developer?") the referral context had already resolved. The site's function is to confirm the referral, not introduce new questions.

Brand voice guideline: "Breadth of background shapes how I listen — credibility comes from having built and shipped things, not from credentials alone. That history is _pattern recognition_." This is the signal to amplify — but the vehicle is narrative, not portfolio.

**Hypothesis:**

> We believe a dedicated AI Portfolio page for `persona-prospective-client` will increase their confidence in the coach's AI-transformation credibility.
> We will know this is TRUE when we see leaders citing the portfolio as a factor in their enquiry decision.
> We will know this is FALSE when we see leaders expressing confusion about whether this is a coaching practice or a development shop.

**Verdict: PARTIALLY INVALIDATED.** The underlying need is real — a leader hiring a coach to navigate AI transformation wants to know the coach has genuinely navigated that terrain. But the delivery vehicle (dedicated portfolio page, GitHub link, app showcase) fires the wrong frame. The right vehicle is practitioner narrative, not technical artefacts. Confidence: HIGH.

---

### Assumption 3 — Window of scarcity

**Assumption:** "A coach with hands-on AI experience is a rare thing for a short while" — genuine differentiator now, temporary window.

**Risk score:**

- Impact if wrong: 2 (Medium — misjudging window length affects investment timing)
- Uncertainty: 2 (Medium — trajectory observable but exact window length speculative)
- Ease of testing: 2
- **Score: 6+4+2 = 12 — TEST SOON**

**Past behaviour evidence:** AI literacy is diffusing rapidly through the coaching sector. In 12-24 months, "I have worked with AI tools" will not differentiate. The scarcity window is real but short. Observable fact: LinkedIn coaching role posts mentioning AI fluency have increased significantly in the past 12 months (sector-level signal, not interview data — treat as directional).

**Implication:** The right response to a short scarcity window is minimum-footprint infrastructure. Build the signal into existing surfaces now. Do not build dedicated infrastructure (portfolio page, GitHub showcase) that will be redundant when the window closes. A vignette is a one-off writing investment; a portfolio page is ongoing maintenance.

**Verdict: CONDITIONALLY VALIDATED.** The window is real. The implication is lean integration, not dedicated infrastructure. Confidence: MEDIUM.

---

### Assumption 4 — Format fit

**Assumption:** A GitHub link is the right vehicle for this audience.

**Risk score:**

- Impact if wrong: 3 (High — fires developer category signal)
- Uncertainty: 1 (Low — category signal is well-established in recruiting and professional services contexts)
- Ease of testing: 1 (Days)
- **Score: 9+2+1 = 12 — TEST SOON**

**Past behaviour evidence:** GitHub is a professional credential surface for software developers and technical contributors. Its use as a signal on a coaching practice site has no precedent in the sector. The persona data is unambiguous: recruiters and evaluating leaders do not arrive expecting this signal and have no established pattern for interpreting it positively.

**Verdict: INVALIDATED.** GitHub link is the wrong vehicle for both personas. The signal it fires (technical builder, developer) conflicts with the coaching-practitioner identity the site is built to establish. Confidence: HIGH.

---

### Assumption 5 — Positioning coherence

**Assumption:** An AI Portfolio section extends the Icarus/survivable-experiments narrative rather than creating a split identity.

**Risk score:**

- Impact if wrong: 3 (High — brand coherence is the site's most fragile asset at this stage)
- Uncertainty: 2 (Medium — depends heavily on execution)
- Ease of testing: 2
- **Score: 9+4+2 = 15 — TEST FIRST**

**Brand voice evidence:** The Daedalus frame is: "the craftsman who understood conditions before he committed." Pillar 3 states: "Breadth of background shapes how I listen — credibility comes from having built and shipped things — that shapes how I listen, and what I notice." This is explicitly the framing for AI fluency. The risk is the execution: a portfolio page with app links reads as "technologist who also coaches." A narrative vignette that includes AI-transformation context reads as "coach whose pattern recognition includes hands-on AI experience."

**Verdict: CONDITIONALLY VALIDATED for narrative framing; INVALIDATED for portfolio/GitHub format.** The Icarus frame can carry an AI-fluency signal without identity split — but only if the format matches the frame. Confidence: HIGH.

---

## Wave: DISCOVER / [APS-04] Validated Assumptions

| ID         | Assumption                                                 | Confidence | Evidence                                                                                          |
| ---------- | ---------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| A3         | Scarcity window is real and time-limited (12-24 months)    | MEDIUM     | Sector signal: AI fluency diffusing rapidly; window real but short                                |
| A5-partial | Icarus narrative can carry AI-fluency signal coherently    | HIGH       | Brand voice Pillar 3; Daedalus frame explicitly covers "built and shipped" as pattern recognition |
| A2-partial | Evaluating leader needs AI-fluency signal from their coach | MEDIUM     | Persona JTBD: corroborate approach; AI transformation context is a live concern for this leader   |

**Validated opportunity:** There is a genuine, time-limited opportunity to signal AI practitioner credibility to the evaluating leader persona. The signal must be framed as pattern recognition, not technical portfolio.

---

## Wave: DISCOVER / [APS-05] Invalidated Assumptions

| ID        | Assumption                                                 | Evidence Reference                                                                                         | Why Invalidated                                                                                              |
| --------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| A1        | GitHub link raises recruiter confidence                    | `persona-recruiter-hiring-manager.yaml` — signals_of_failure; sector norm (GitHub = developer category)    | Category misfire: fires developer heuristic, introduces ambiguity at credential-scan speed                   |
| A2        | Dedicated AI portfolio page builds evaluating leader trust | `persona-prospective-client.yaml` — what_they_do_not_need; journey-warm-referral arrival mode              | Format mismatch: portfolio format implies developer/designer identity; leader needs coach identity confirmed |
| A4        | GitHub is the right vehicle for this audience              | Persona data (both); sector norms; no precedent for GitHub as coaching credential                          | Signal fires wrong professional category for both primary personas                                           |
| A5-format | Portfolio page / GitHub showcase extends Icarus narrative  | `brand-voice-guidelines.md` — visual identity section ("developer-tool aesthetic" is explicitly off-brand) | Developer-tool aesthetic is named as a disqualifying visual register; portfolio format carries the same risk |

---

## Wave: DISCOVER / [APS-06] Dropped Options

| Option                                     | Reason Dropped                                                                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub profile link in footer/header       | Fires developer category signal at first-impression surface. Actively harmful to persona-recruiter-hiring-manager.                        |
| Dedicated `/ai-portfolio` page             | No validated persona need. Adds navigation complexity. Redundant when scarcity window closes. Developer/designer format mis-signals.      |
| AI apps showcase with project descriptions | Same format problem. No evidence either persona arrives looking for this. Maintenance cost ongoing.                                       |
| GitHub link on About page only             | Softer but still misfires. About page is credential surface for recruiter (10-second scan). Wrong signal at the highest-attention moment. |
| "AI work" section as separate site section | Fragments the Daedalus frame. Creates split identity (practitioner-coach vs. AI builder). Brand coherence risk confirmed in A5.           |

---

## Wave: DISCOVER / [APS-07] Scoped Alternative — What to Build Instead

**Recommendation: Extend existing transformation narrative vignettes to include one or two AI-transformation contexts.**

### Rationale

JOB-TN-001 (transformation narrative, CN-20) is already validated and shipped. Five vignettes exist covering org-transformation scope. The scoped alternative is: write one additional vignette (or reframe one existing vignette) in an AI-transformation context, using the same established structure:

> [Org type + scale + presenting condition] → [what the work addressed at structural level] → [what shifted — qualitative, specific]

This satisfies the evaluating leader's need to see that the coach has navigated AI-transformation terrain — without:

- Adding navigation
- Creating a developer-category signal
- Building infrastructure that becomes redundant
- Splitting the brand identity

**AI fluency signal in the About page narrative arc** (secondary option): The brand voice guidelines already map the coach's intellectual arc as: "technical craft → software delivery and architecture → agile → coaching → systemic facilitation → AI." This arc is the credential. Ensuring the About page narrative closes this arc explicitly (to the extent not already done) costs nothing and signals the same fluency.

### What this replaces in the feature backlog

The `ai-portfolio-section` feature as proposed does not proceed to DESIGN. Instead:

1. **Story: AI-transformation vignette** — add one vignette to the existing transformation narrative surface (CN-20 / JOB-TN-001). Scoped within the existing feature and story structure.
2. **Story: About page arc close** — verify the About page narrative closes the "systemic facilitation → AI" arc. If not, add a single sentence. Owner decision.

Neither of these is a new feature. Both are content additions to validated, shipped surfaces.

---

## Wave: DISCOVER / [APS-08] Decision Gate

### G1 — Problem Validation

| Criterion                             | Target   | Result                                                                                                 |
| ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| Signal confirmed by 5+ interviews     | 5+       | NOT MET — owner self-knowledge proxy; no external interviews conducted                                 |
| >60% confirm pain                     | >60%     | CONDITIONAL — persona data is strong proxy; direct interview confirmation absent                       |
| Problem articulated in customer words | Required | MET — recruiter signals_of_failure and evaluating leader JTBD documented in customer-adjacent language |
| 3+ examples                           | 3+       | MET — 5 assumptions tested against observable evidence                                                 |

**G1 status: CONDITIONAL PASS.** The problem (how to signal AI fluency without misfiring) is real and substantiated by validated persona data. The absence of live recruiter or evaluating leader interviews is a gap. For a personal-brand site at pre-launch stage with no analytics and owner-as-developer, this matches the nWave Rigor Profile: gates on-demand, not mandatory. The scoped alternative recommendation is low-risk enough to proceed on conditional evidence.

**Remediation if full validation required:** Conduct 3-5 conversations with recruiters who have recently placed senior agile/enterprise coaches. Ask: "When you see a coach's website that includes a GitHub profile link or 'AI apps' section, what does that tell you about them?" Past behaviour framing.

### G2 — Opportunity Mapping

| Criterion                     | Target    | Result                                                                                                           |
| ----------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| Opportunities identified (5+) | 5         | MET — 5 assumptions tested; 2 distinct opportunity framings emerged                                              |
| Top scores >8                 | >8        | NOT MET for proposed feature — "GitHub link/portfolio page" scores ~5-6 across both personas                     |
| Reframed opportunity scores   | —         | CONDITIONAL — "AI fluency via narrative" scores ~10 for evaluating leader (importance 7, satisfaction 3: 7+4=11) |
| Team alignment                | Confirmed | N/A — solo practice                                                                                              |

**G2 status: PASS for scoped alternative; FAIL for proposed feature.**
The proposed GitHub/portfolio feature does not clear the opportunity score threshold for either primary persona. The reframed opportunity (AI fluency signalled via narrative vignette) scores above threshold for the evaluating leader persona. This is the basis for the scoped alternative recommendation.

### G3 — Solution Testing

**G3 status: NOT EVALUATED.** Feature as proposed killed at G2. Scoped alternative (vignette addition) does not require G3 discovery gate — it is a content addition to a validated, existing surface (JOB-TN-001, already shipped). The solution testing for transformation narrative vignettes was completed in CN-20 discovery.

### G4 — Market Viability

**G4 status: NOT EVALUATED.** Feature as proposed killed at G2. Scoped alternative does not require a separate Lean Canvas — it is in scope of the existing business model.

**Overall gate decision: REDIRECT.** The feature as proposed fails G2 for both primary personas. The underlying signal need is real. The scoped alternative is viable and recommended. No dedicated feature progresses to DESIGN.

---

## Wave: DISCOVER / [APS-09] Constraints Established

1. **No GitHub link on any public-facing surface** — fires developer category signal; actively harmful to recruiter persona credential scan.
2. **No dedicated portfolio or AI apps page** — format mis-signals professional identity for both personas; maintenance cost ongoing; redundant when scarcity window closes.
3. **AI fluency signal must be carried in narrative format** — Daedalus frame (pattern recognition from built-and-shipped history), not portfolio frame.
4. **Anonymisation constraint applies** — same as JOB-TN-001. No named clients. No named organisations. Sector and scale may be included.
5. **ICF ethics framework applies** — confidentiality constraints on any AI-transformation vignette are the same as existing transformation vignettes.
6. **Scarcity window constraint** — any signal built should require zero ongoing maintenance after initial writing. If the window closes, the vignette remains valid as a past-behaviour credential; it does not require removal or redesign.
7. **Brand voice constraint** — "developer-tool aesthetic" is explicitly off-brand (brand-voice-guidelines.md). Any AI-fluency signal must pass the Daedalus frame test: "craftsman who understood conditions before committing" — not "builder who ships apps."

---

## Wave: DISCOVER / [APS-10] Pre-requisites

For the scoped alternative (AI-transformation vignette and About page arc review):

1. **Owner decision: AI-transformation vignette content** — the owner must draft or approve the vignette. The same anonymisation constraints and structure as existing vignettes apply. No agent can draft this without client context the owner holds.
2. **Owner decision: About page arc** — does the current About page copy close the "systemic facilitation → AI" arc? Owner to review. If the arc is not visible, one sentence addition is the minimum-footprint fix. Agent can draft options; owner approves.
3. **No infrastructure work required** — the scoped alternative requires no new components, routes, or Nuxt configuration.

---

## Wave: DISCOVER / [APS-11] OST Summary

```text
Desired Outcome: Signal AI practitioner credibility without misfiring on professional category
  |
  +-- OPP-APS-01: Evaluating leader confirms coach has navigated AI terrain (score ~11)
  |     +-- [RECOMMENDED] AI-transformation vignette in existing transformation narrative surface
  |     +-- [DROPPED] Dedicated AI portfolio page
  |     +-- [DROPPED] GitHub link on About page
  |
  +-- OPP-APS-02: Recruiter sees AI fluency as Agile Coach credential (score ~5)
  |     +-- [DROPPED] GitHub link — fires developer signal
  |     +-- [LOW PRIORITY] "AI transformation" as keyword in credential copy
  |
  +-- OPP-APS-03: About page narrative closes intellectual arc to AI (score ~8)
        +-- [RECOMMENDED] Single sentence addition if arc is incomplete
        +-- [DROPPED] Separate "AI journey" section
```

---

## Artifacts

| Artifact                  | Path                                                           | Status                   |
| ------------------------- | -------------------------------------------------------------- | ------------------------ |
| Feature Delta (this file) | `docs/feature/ai-portfolio-section/discover/feature-delta.md`  | Complete                 |
| Wave Decisions            | `docs/feature/ai-portfolio-section/discover/wave-decisions.md` | Complete                 |
| Journey: AI Portfolio     | `docs/product/journeys/journey-ai-portfolio.yaml`              | Seeded (scoped alt only) |
