# Wave Decisions — Transformation Narrative / Case Studies

feature_id: transformation-narrative-case-studies
cn_id: CN-20
wave: DISCOVER
date: 2026-05-19

---

## Decisions

| ID   | Decision                                                               | Rationale                                                                                                                                                                                                                        | Reversible?                                                      |
| ---- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| D-01 | Recruiter / Hiring Manager is the primary persona for format decisions | The 10-second scan constraint is tighter than the 60-second evaluation. Serving the recruiter scan speed automatically serves the evaluating leader. Optimising for depth first would fail the scan                              | Low — requires evidence that recruiter persona no longer applies |
| D-02 | Format: short anonymised vignettes (3–5 items, 80–120 words each)      | Passes 10-second scan; provides texture for 60-second evaluation; requires no org permission; aligns with brand voice (anecdote-over-assertion, grounded, precise)                                                               | Yes — revisit if client permission workflow established          |
| D-03 | Label: "transformation narrative" preferred over "case studies"        | "Case studies" imports formal consulting expectations (named client, quantified ROI, methodology disclosure) that the practice cannot satisfy at v1 under ICF constraints. The honest label names what the content actually is   | Yes — owner confirms label                                       |
| D-04 | No dedicated sub-page at v1                                            | An isolated `/case-studies/` page requires navigation before the credential scan is complete — fails the recruiter 10-second scan. Transformation evidence must be accessible from or near the existing credential surface       | Yes — revisit when content volume exceeds 5 vignettes            |
| D-05 | All content anonymised — no named clients or organisations at v1       | ICF ethics framework is current practice. No org-permission workflow exists. Named content would require bespoke negotiation per engagement                                                                                      | Yes — revisit when first client grants explicit permission       |
| D-06 | Quantified outcomes out of scope for v1                                | No analytics baseline; coaching outcomes resist short-window quantification; tabular before/after metrics misrepresent the nature of systemic transformation work                                                                | Yes — revisit if named-client permission workflow established    |
| D-07 | Org context must be signalled without identification                   | Recruiter needs "recognisable org contexts" (sector, scale, org type) to pattern-match seniority and scope. Exact identification violates ICF constraints. Signal level: e.g. "a FTSE 250 infrastructure division, ~3,000 staff" | Stable                                                           |

---

## Validated Assumptions

| ID    | Assumption                                                     | Evidence                                                                                                                                              |
| ----- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| VA-01 | Both personas need transformation evidence                     | Recruiter persona: absence is explicit failure signal. Warm-referral journey: no transformation evidence step exists                                  |
| VA-02 | 10-second scan is the binding format constraint                | STR-1 recruiter persona: established, not derived                                                                                                     |
| VA-03 | Org-level transformation context is required                   | Recruiter persona: "recognisable org contexts (not just individual coaching)"                                                                         |
| VA-04 | ICF ethics requires anonymisation                              | ICF ethics framework is current practice; brand voice guidelines confirm                                                                              |
| VA-05 | "Case study" framing is undeliverable at v1                    | Formal case study format requires: named client, quantified outcome, methodology disclosure, org permission — none available without bespoke workflow |
| VA-06 | Short vignettes are highest-ROI format                         | Serves scan speed and approach evaluation; no org permission required; brand voice compatible                                                         |
| VA-07 | "Transformation narrative" is more accurate and differentiated | Brand voice: avoid abstract category labels; anecdote over assertion; no methodology sales                                                            |
| VA-08 | Site is validation step, not discovery channel                 | STR-1: established constraint                                                                                                                         |

---

## Invalidated Assumptions

| ID    | Assumption                                                 | Why Invalidated                                                                           |
| ----- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| IA-01 | Formal case studies feasible at v1                         | ICF confidentiality + no analytics baseline + no org-permission workflow                  |
| IA-02 | Evaluating leader is primary audience for format decisions | Recruiter 10-second scan is tighter constraint — serving it serves both                   |
| IA-03 | Dedicated case studies page is correct IA                  | Isolated page fails recruiter 10-second scan; requires navigation before credential check |
| IA-04 | More detail signals more credibility                       | Brand voice: precision over density; anecdote over assertion                              |

---

## Constraints

| ID   | Constraint                                                             | Source                             |
| ---- | ---------------------------------------------------------------------- | ---------------------------------- |
| C-01 | Anonymised only — no named clients or orgs at v1                       | ICF ethics (current practice)      |
| C-02 | Org-type and scale context required, without identification            | Recruiter persona + ICF constraint |
| C-03 | No quantified outcomes at v1                                           | No baseline; nature of the work    |
| C-04 | 10-second scan is binding format constraint                            | Recruiter persona (STR-1)          |
| C-05 | Brand voice applies: precise, grounded, systemic, restrained           | Brand voice guidelines             |
| C-06 | "Case study" label off-brand                                           | Brand voice + ICF deliverability   |
| C-07 | No dedicated sub-page at v1                                            | IA constraint: scan speed          |
| C-08 | Evidence must span both Agile Coach and leadership coaching dimensions | STR-1: dual professional identity  |

---

---

## DIVERGE Wave — Decisions

wave: DIVERGE
date: 2026-05-19

| ID   | Decision                                                                                | Rationale                                                                                                                                                                                                                                                 | Reversible?                                                                       |
| ---- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| D-08 | Present vignettes as editorial expand cards using `<details>`/`<summary>`               | Serves dual-audience: all five first sentences visible simultaneously (recruiter scan); body available on expand (evaluating leader). Zero JS dependency. Resolves h3 typographic hierarchy problem. Scores 4.68 weighted vs. next best 4.10 (tab strip). | Yes — degrade to first-sentence-only static list (Option 2) without code rollback |
| D-09 | Replace `h3` with `<summary>` element                                                   | Eliminates the undeclared h3 tier from the design system. `<summary>` is styleable as a span without heading semantics.                                                                                                                                   | Stable                                                                            |
| D-10 | First vignette open by default                                                          | Signals to the evaluating leader that body text exists and is accessible. Prevents the pattern appearing as a title-only list.                                                                                                                            | Reversible — remove `open` attribute                                              |
| D-11 | NarrativeEdge animation carousel deferred                                               | Scores 2.03 on the weighted matrix (well below viability threshold). Conflicts with no-heavy-JS SSG constraint and the site's restraint design value. Appropriate for a future surface where animation is contextually earned.                            | Deferred, not killed                                                              |
| D-12 | Content discipline: each vignette's first sentence must carry org-type and scale signal | The editorial expand pattern depends on the first sentence as the scan signal. All five current vignettes satisfy this. Must be maintained as vignettes are edited or added.                                                                              | Stable                                                                            |

## Open Questions (Pre-requisites for Implementation)

| ID   | Question                                                                          | Owner decision required? |
| ---- | --------------------------------------------------------------------------------- | ------------------------ |
| P-01 | Owner drafts 3–5 vignettes from actual engagements                                | Yes                      |
| P-02 | ICF anonymisation review — owner confirms level of detail is sufficient           | Yes                      |
| P-03 | Org context signal level agreed (how specific is "recognisable")                  | Yes                      |
| P-04 | Label confirmed: "transformation narrative" or alternative                        | Yes                      |
| P-05 | IA placement confirmed: about page, services page, or combined credential section | Yes                      |
