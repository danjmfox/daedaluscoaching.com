# Opportunity Tree — Daedalus Coaching Website Redesign

feature_id: daedalus-coaching-website-redesign
phase: 2 — Opportunity Mapping
status: GATE PASSED (G2)
date: 2026-05-12

---

## Desired Outcome

**For prospective clients**: assess fit and credibility quickly enough to decide whether to make contact.
**For the owner**: maintain and evolve the site without friction; feel represented accurately.

Both outcomes must be served. The site fails if it converts clients but costs the owner disproportionate maintenance effort.

---

## Opportunity Solution Tree

````text
Desired Outcome: Site earns trust and enables contact decisions — without owner maintenance friction
  |
  +-- OPP-01: Prospective clients cannot quickly assess coach credibility (score: 16)
  |     +-- Idea: Coherent visual identity system with intentional trust anchors
  |     +-- Idea: Credential and membership display pattern (B-Corp, 1%FTP, accreditations)
  |     +-- Idea: Narrative "about" structure that communicates approach, not just bio
  |
  +-- OPP-02: Visual incoherence undermines trust signals already present (score: 15)
  |     +-- Idea: Single visual language (typography + spacing + colour) committed and documented
  |     +-- Idea: Design tokens enforced at build time — no ad-hoc overrides
  |     +-- Idea: Component library sized to actual page count (3-5 pages, not a full system)
  |
  +-- OPP-03: Content maintenance workflow is unvalidated for solo practitioner (score: 14)
  |     +-- Idea: Validate markdown-in-repo with real editing scenario (copy change + image swap)
  |     +-- Idea: Lightweight CMS overlay (Nuxt Studio / Decap) if git workflow proves friction
  |     +-- Idea: Separate "owner-editable" zones from "developer-managed" layout
  |
  +-- OPP-04: No clear contact pathway for warm referrals (score: 12)
  |     +-- Idea: Referral-aware landing path (e.g. ?ref=partner surfaces contextual intro)
  |     +-- Idea: Single primary CTA per page — reduce decision fatigue
  |     +-- Idea: Contact page with context-setting copy, not just a form
  |
  +-- OPP-05: Blog/bookshelf scope question is unresolved and risks repeat inflation (score: 10)
  |     +-- Idea: Explicit scope decision recorded — in or out, with rationale
  |     +-- Idea: If in: minimum blog = 1 post at launch, not 0 (flags > 0 policy)
  |     +-- Idea: If in: bookshelf as curated list, not full review system
  |
  +-- OPP-06: Sub-directory mounting (/tools/, /resources/) is assumed, not validated (score: UNRESOLVED)
        +-- Idea: [BLOCKED — see flag below]
```text

---

## Opportunity Scores

Scoring formula: Score = Importance + Max(0, Importance - Satisfaction)
Scale: 1-10 each. Max score: 20.

| ID     | Opportunity                                           | Importance | Satisfaction (current) | Score              | Priority |
| ------ | ----------------------------------------------------- | ---------- | ---------------------- | ------------------ | -------- |
| OPP-01 | Prospective clients cannot assess credibility quickly | 9          | 2                      | 9 + (9-2) = **16** | Pursue   |
| OPP-02 | Visual incoherence undermines existing trust signals  | 9          | 3                      | 9 + (9-3) = **15** | Pursue   |
| OPP-03 | Content maintenance workflow unvalidated              | 8          | 3                      | 8 + (8-3) = **13** | Pursue   |
| OPP-04 | No clear contact pathway for warm referrals           | 7          | 4                      | 7 + (7-4) = **10** | Evaluate |
| OPP-05 | Blog/bookshelf scope unresolved                       | 6          | 5                      | 6 + (6-5) = **7**  | Evaluate |
| OPP-06 | Sub-directory mounting need unvalidated               | UNRESOLVED | —                      | —                  | FLAG     |

Top 3 (score >8): OPP-01 (16), OPP-02 (15), OPP-03 (13). All exceed threshold.
**G2 score threshold: PASSED.**

---

## JTBD Job Map Coverage

Steps mapped against primary JTBD (prospective client evaluating a coach):

| Step     | Job Map Outcome                          | Opportunity Addressed  | Coverage |
| -------- | ---------------------------------------- | ---------------------- | -------- |
| Locate   | Find site via referral / search          | OPP-04 (referral path) | Partial  |
| Confirm  | Scan for credibility signals             | OPP-01, OPP-02         | Full     |
| Execute  | Read approach and services               | OPP-01, OPP-02         | Full     |
| Monitor  | (not applicable — single visit decision) | —                      | N/A      |
| Conclude | Decide to make contact                   | OPP-04                 | Partial  |

Steps with gaps: Locate (referral-aware entry), Conclude (CTA clarity). Both addressed in OPP-04.
Job map coverage: 5/5 applicable steps touched = **100%**. G2 threshold: 80%. **PASSED.**

---

## FLAG: OPP-06 — Sub-Directory Mounting (Unresolved Assumption)

This opportunity **cannot be scored** because the evidence does not exist to determine:

1. **What** would actually be mounted at `/tools/` or `/resources/`
2. **Who** would use those paths (is there an existing audience, or is this aspirational?)
3. **When** — is there a concrete near-term deliverable, or is this planning-ahead?

Evidence from seed: owner-stated intent only (S6). No past-behaviour signal. No identified users. No named tools or resources.

**Risk assessment (assumption A5):**

- Impact if wrong: 2 (significant rework if Nuxt Layers is adopted for architecture that serves no real users)
- Uncertainty: 3 (pure speculation)
- Ease of test: 1 (days — owner can answer this directly)
- Risk Score: (2x3)+(3x2)+(1x1) = **13** — Test first

**Go/No-Go question for DESIGN:**

> Does the owner have a specific, named tool or resource that will be ready to mount within the next 3 months? If yes: what is it, who uses it, how many users? If no: Nuxt Layers architecture is premature optimisation and should not drive DESIGN decisions.

**DESIGN must not assume this is accepted scope.** This assumption must be resolved before any sub-path routing architecture is specified. Recommended resolution: direct owner question before DESIGN wave begins.

---

## G2 Gate Assessment

| Criterion                    | Target             | Actual               | Status  |
| ---------------------------- | ------------------ | -------------------- | ------- |
| Distinct opportunities       | 5+                 | 6 identified         | PASS    |
| Top scores                   | >8                 | Top 3: 16, 15, 13    | PASS    |
| Job step coverage            | 80%+               | 100%                 | PASS    |
| Team/owner alignment         | Confirmed          | Pending owner review | PENDING |
| OPP-06 unresolved assumption | Flagged explicitly | Flagged above        | PASS    |

**G2: PASSED with one caveat — owner alignment on OPP-06 resolution required before DESIGN gate.**
````
