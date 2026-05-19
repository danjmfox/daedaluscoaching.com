# Feature Delta — Transformation Narrative / Case Studies

feature_id: transformation-narrative-case-studies
cn_id: CN-20
wave: DISCOVER
date: 2026-05-19
status: DISCOVER COMPLETE — READY FOR HANDOFF

---

## Wave: DISCOVER / [REF] Persona ID

Two primary personas. Neither is subordinate — the feature must serve both without one undermining the other.

**Persona A: Recruiter / Hiring Manager** (`persona-recruiter-hiring-manager`)

- Arrives via CV or LinkedIn. Has already seen credentials list. Needs transformation evidence to confirm the CV narrative — specifically org-level transformation work, not individual coaching.
- Job: confirm or disqualify the candidate within 60 seconds. Credential scan is first 10 seconds; transformation evidence is seconds 10–60.
- Critical gap: the existing persona confirms "no evidence of org-level transformation work" is a signal of failure. This feature directly closes that failure mode.

**Persona B: Evaluating Leader** (`persona-prospective-client`)

- Arrives via warm referral. Has prior context. Needs to confirm credibility and approach fit before agreeing to a first conversation.
- Job: assess whether the coach's philosophy and evidence of practice are coherent enough to justify the enquiry.
- Critical gap: the existing `journey-warm-referral` journey has no transformation evidence step. The "assess approach" step (Step 3) currently relies entirely on prose philosophy. Transformation evidence is the missing corroboration signal.

**Primary persona for format decisions**: Recruiter / Hiring Manager.
Rationale: the 10-second scan constraint is the binding constraint. Any format that serves a 10-second scan will also serve a 60-second approach evaluation. The reverse is not true — a format optimised for 60-second depth (formal case study prose) will fail the 10-second scan. Format decisions must be validated against the recruiter's scan speed first.

---

## Wave: DISCOVER / [REF] Opportunity Statement

> The recruiter who arrives from a CV or LinkedIn profile cannot find evidence of org-level transformation work on the site. The evaluating leader who arrives via warm referral has no corroboration signal beyond prose philosophy. Both leave with a gap that the coach's practice has already closed in real engagements. The opportunity is to surface transformation evidence in a format that passes a 10-second credential scan while remaining coherent to a 60-second approach evaluation — without fabricating formality the practice does not operate at.

This is a content format and IA problem, not a feature complexity problem. The evidence exists (in the coach's actual engagements). The gap is between what exists and what is legible on the site.

**Opportunity Score (estimated — no analytics baseline):**

- Importance to recruiter persona: 9/10 (signal-of-failure criterion in persona definition)
- Current satisfaction: 1/10 (no transformation evidence exists on site)
- Score: 9 + (9 - 1) = **17/20** — pursue immediately

---

## Wave: DISCOVER / [REF] Validated Assumptions

Evidence standard: past behaviour and established constraints only. No future-intent evidence used.

| ID    | Assumption                                                                                          | Evidence                                                                                                                                                                                                                                                              | Confidence  |
| ----- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| VA-01 | Both personas need transformation evidence, not just one                                            | Recruiter persona definition names absence as failure signal; warm-referral journey Step 3 relies on prose only — no corroboration signal                                                                                                                             | High        |
| VA-02 | The recruiter's 10-second scan is the binding format constraint                                     | Recruiter persona: "10-second credential scan before any prose is read" — established in STR-1, not derived here                                                                                                                                                      | High        |
| VA-03 | Org-level transformation context is required, not individual coaching only                          | Recruiter persona: "evidence of actual transformation work in recognisable org contexts (not just individual coaching)"                                                                                                                                               | High        |
| VA-04 | ICF ethics constraints apply and require anonymisation                                              | ICF ethics framework is current practice (brand-voice-guidelines.md). Client confidentiality is explicit. No named client evidence is available without org permission                                                                                                | High        |
| VA-05 | "Case study" framing imports expectations the practice cannot satisfy                               | Formal case studies imply: named client, quantified outcome, methodology disclosure, org permission. Solo practice with ICF confidentiality obligations cannot deliver this at v1 without bespoke negotiation per engagement                                          | High        |
| VA-06 | Short-form vignettes in customer language are the highest-ROI format                                | Serves scan speed (recruiter); provides enough texture for approach evaluation (evaluating leader); does not require org permission; aligns with brand voice (grounded, specific, anecdote-over-assertion)                                                            | Medium-High |
| VA-07 | The label "transformation narrative" is more honest and differentiated than "case studies"          | Brand voice explicitly rejects "abstract category labels" and "credential-as-qualification framing". "Case studies" is a corporate consulting frame. "Transformation narrative" names what the practice actually produces — an account of movement through complexity | Medium      |
| VA-08 | The site is a validation step, not a discovery channel — content must serve scan speed before depth | Established in STR-1: "the site is a validation step, not a discovery mechanism"                                                                                                                                                                                      | High        |

---

## Wave: DISCOVER / [REF] Invalidated Assumptions

| ID    | Assumption                                                                                  | Why Invalidated                                                                                                                                                                                                                                                                      | Implication                                                                                                             |
| ----- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| IA-01 | Formal case studies (named client, quantified ROI, before/after metrics) are feasible at v1 | ICF confidentiality obligations + no analytics baseline + solo practice with no org-permission workflow make this unfeasible without significant per-engagement negotiation. Past behaviour: no such documents exist or have been produced                                           | Format must be anonymised and qualitative. Quantified outcomes are out of scope for v1                                  |
| IA-02 | The evaluating leader is the primary audience for format decisions                          | The 10-second recruiter constraint is tighter than the 60-second leader evaluation. Serving the recruiter scan speed serves both; optimising for the leader's depth preference does not serve the recruiter                                                                          | Recruiter scan speed is the binding constraint                                                                          |
| IA-03 | A dedicated "Case Studies" page is the right IA pattern                                     | Recruiting evaluators do not navigate to sub-pages before passing the credential scan. A dedicated page only reached after scroll or navigation fails the 10-second scan                                                                                                             | Transformation evidence must be accessible from or near the credential display surface, not isolated on a separate page |
| IA-04 | More detail signals more credibility                                                        | Brand voice evidence: "Grounded — authority comes from things built, shipped, facilitated, and observed over time. Not from titles or frameworks. Anecdote and specificity carry more weight than assertion." Density does not signal credibility for this practice — precision does | Fewer, sharper vignettes outperform longer, vaguer case studies                                                         |

---

## Wave: DISCOVER / [REF] Dropped Options

| Option                                                 | Reason Dropped                                                                                                                                                                                      |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Named client case studies                              | ICF confidentiality; no org-permission workflow; would require bespoke negotiation per engagement. Feasible only if a future client explicitly grants permission — deferred, not killed             |
| Quantified outcome tables (before/after metrics)       | No analytics baseline exists; coaching outcomes resist quantification in the timeframe of an engagement; misrepresents the nature of the work (structural condition → leverage, not input → output) |
| Dedicated `/case-studies/` page (isolated)             | Fails the 10-second recruiter scan — requires navigation before the credential scan is complete. IA anti-pattern for this site model                                                                |
| Long-form narrative posts (1000+ words per engagement) | Exceeds attention budget of both personas. Blog is explicitly out of scope (v1). Not a scan-speed-compatible format                                                                                 |
| Video testimonials                                     | Requires on-camera client participation; ICF confidentiality; production overhead disproportionate to site scope                                                                                    |
| Testimonial quotes only (no context)                   | Recruiter persona explicitly needs org-context transformation evidence, not individual praise. Quotes without structural context do not close the recruiter failure mode                            |

---

## Wave: DISCOVER / [REF] Decision Gate

| Gate                     | Criterion                                                                         | Status | Evidence                                                                                                                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G1: Problem validated    | Clear gap between what transformation evidence exists and what both personas need | PASS   | Recruiter persona names absence as failure signal; warm-referral journey has no transformation evidence step; no such content currently exists on site                                                      |
| G2: Persona validated    | Primary persona identified; format serves both personas                           | PASS   | Recruiter identified as primary (10-second scan is binding constraint). Short vignette format serves scan and 60-second evaluation. Evidence from STR-1 persona definitions                                 |
| G3: Opportunity sized    | Format with highest ROI given dual-audience constraint identified                 | PASS   | Short anonymised vignettes (3–5, 80–120 words each, placed on or near the about/credentials surface): serves scan speed, satisfies approach evaluation, requires no org permission, aligns with brand voice |
| G4: Build/defer decision | Specific scope defined; deferrals explicit                                        | PASS   | See Constraints Established and Pre-requisites below                                                                                                                                                        |

**Overall gate: PASS — proceed to handoff.**

---

## Wave: DISCOVER / [REF] Constraints Established

| ID   | Constraint                                                                                                                                          | Source                                                                                                            | Reversible?                                                                          |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| C-01 | All transformation content must be anonymised — no named clients, no named organisations                                                            | ICF ethics framework (current practice)                                                                           | Only with explicit per-client opt-in; not a v1 path                                  |
| C-02 | Org-level transformation context must be signalled (sector, scale, org type) without identifying the org                                            | Recruiter persona requirement: "recognisable org contexts"; ICF constraint: no names                              | Stable                                                                               |
| C-03 | Quantified outcomes are out of scope for v1 — vignettes are qualitative                                                                             | No analytics baseline; coaching outcomes resist short-window quantification; misrepresents the nature of the work | Revisit if named-client permission workflow is established                           |
| C-04 | Content must pass a 10-second scan before serving 60-second depth                                                                                   | Recruiter is the binding constraint (STR-1)                                                                       | Low — would require evidence that recruiter persona no longer applies                |
| C-05 | Content must use brand voice: precise, grounded, anecdote-over-assertion, systemic framing                                                          | Brand voice guidelines (canonical reference)                                                                      | Not reversible — this is brand identity                                              |
| C-06 | "Case study" label is off-brand — imports corporate consulting expectations this practice does not operate at                                       | Brand voice: avoid abstract category labels; avoid credential-as-qualification framing                            | Stable                                                                               |
| C-07 | No dedicated sub-page at v1 — transformation evidence must be accessible from the existing credential/about surface                                 | IA constraint: isolated page fails 10-second scan                                                                 | Revisit if content volume grows beyond 5 vignettes or if a portfolio pattern emerges |
| C-08 | Coach's professional identity straddles org transformation (Agile Coach) and individual leadership coaching — evidence must reflect both dimensions | STR-1 context                                                                                                     | Stable                                                                               |

---

## Wave: DISCOVER / [REF] Pre-requisites

| ID   | Pre-requisite                                                                                                                                                                                                | Owner action?                                            | Blocks                |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | --------------------- |
| P-01 | Owner to draft 3–5 transformation vignettes (anonymised, 80–120 words each) from actual engagements                                                                                                          | Yes — owner is the only person with engagement knowledge | Implementation        |
| P-02 | Vignettes must be reviewed against ICF ethics constraints before publication — owner confirms anonymisation is sufficient                                                                                    | Yes — owner's professional judgement                     | Implementation        |
| P-03 | Org-type and scale signals agreed (e.g. "a Series B product organisation, ~120 people" vs. "a FTSE 250 infrastructure division") — enough context for recruiter pattern-match without identifying the client | Yes — owner decides level of context                     | Implementation        |
| P-04 | Label decision confirmed: "transformation narrative" or alternative — not "case studies"                                                                                                                     | Yes — human decision, not agent decision                 | Copy and IA           |
| P-05 | IA placement confirmed: near credentials surface (about page or services page), not as a dedicated sub-page at v1                                                                                            | Yes — human decision                                     | IA and implementation |

---

## Out of Scope (v1)

- Named client case studies (deferred — requires per-client opt-in workflow)
- Quantified outcome tables
- Video testimonials
- Dedicated `/transformation-narrative/` or `/case-studies/` sub-page
- Client permission management workflow

**Revisit trigger**: when the first client explicitly grants permission for a named case study, or when content volume exceeds 5 vignettes and a portfolio IA pattern becomes appropriate.
