# Wave Decisions — AI Portfolio Section

feature_id: ai-portfolio-section
wave: DISCOVER
date: 2026-05-20

---

## Decision Summary

| Decision | Rationale | Reversible? |
|----------|-----------|-------------|
| GitHub link — REJECTED | Fires developer category signal in recruiter's 10-second credential scan. Actively harmful. | No — category heuristic is structural |
| Dedicated AI portfolio page — REJECTED | Format mis-signals professional identity for both personas. Redundant when scarcity window closes. | No evidence base to reverse |
| Feature as proposed — KILLED AT G2 | Opportunity score ~5-6 for both primary personas; below threshold for dedicated feature investment | Yes — if new persona data emerges |
| Scoped alternative — RECOMMENDED | AI-transformation vignette in existing CN-20 surface; About page arc review. Zero infrastructure. | Yes — lightweight content addition |

---

## Validated Assumptions

| Assumption | Confidence |
|-----------|------------|
| Scarcity window for AI-fluent coaches is real and time-limited (~12-24 months) | MEDIUM |
| Icarus/Daedalus narrative frame can carry AI fluency without identity split | HIGH |
| Evaluating leader needs confirmation coach has navigated AI terrain | MEDIUM |

---

## Invalidated Assumptions

| Assumption | Evidence |
|-----------|---------|
| GitHub link raises recruiter confidence | Developer category signal; persona signals_of_failure |
| AI portfolio page builds evaluating leader trust | Format mismatch (developer/designer frame); persona what_they_do_not_need |
| GitHub is the right vehicle for coaching persona audiences | No precedent; fires wrong category for both primary personas |
| Portfolio format extends Icarus narrative | Developer-tool aesthetic is explicitly off-brand (brand-voice-guidelines.md) |

---

## Constraints

1. No GitHub link on any public-facing surface
2. No dedicated portfolio or AI apps page
3. AI fluency must be carried in narrative format (Daedalus frame — pattern recognition, not portfolio)
4. Anonymisation and ICF ethics constraints apply to any AI-transformation vignette
5. Scarcity window constraint: zero ongoing maintenance after initial content
6. Brand voice: developer-tool aesthetic is off-brand

---

## Scoped Alternative

**What to do instead of the proposed feature:**

1. Add one AI-transformation vignette to the existing transformation narrative surface (JOB-TN-001 / CN-20). Same structure as existing vignettes. Owner drafts or approves content.
2. Review About page narrative arc — confirm "systemic facilitation → AI" arc is visible. Add single sentence if not. Owner decision.

**What this does not require:** new routes, new components, new Nuxt configuration, GitHub account links, portfolio infrastructure.

---

## Gate Results

| Gate | Status | Notes |
|------|--------|-------|
| G1 — Problem Validation | CONDITIONAL PASS | Persona proxy evidence sufficient for low-risk scoped alternative; live recruiter interviews would strengthen |
| G2 — Opportunity Mapping | FAIL (proposed) / PASS (scoped alt) | Proposed feature scores ~5-6; scoped alternative scores ~11 for evaluating leader |
| G3 — Solution Testing | NOT EVALUATED | Feature killed at G2; scoped alt covered by existing CN-20 validation |
| G4 — Market Viability | NOT EVALUATED | Scoped alt within existing business model |

**Overall: REDIRECT to scoped alternative. No dedicated feature proceeds to DESIGN.**
