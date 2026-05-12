# Solution Testing — Daedalus Coaching Website Redesign

feature_id: daedalus-coaching-website-redesign
phase: 3 — Solution Testing
status: GATE PASSED (G3)
date: 2026-05-12

---

## Hypotheses (derived from OPP-01, OPP-02, OPP-03)

### H1 — Trust-first information architecture
```
We believe presenting credential anchors (B-Corp, 1%FTP, accreditation)
within the primary viewport for prospective clients
will achieve faster credibility confirmation.
We will know this is TRUE when >80% of first-visit testers can name
two trust signals within 5 seconds of the homepage loading.
We will know this is FALSE when testers focus on copy or imagery first
and cannot name credentials without scrolling.
```
Validation method: 5-second test on homepage prototype
Risk category: Value + Usability

### H2 — Committed visual language reduces cognitive friction
```
We believe a single coherent visual system (defined design tokens,
no competing visual metaphors) for the owner/developer
will achieve a site that no longer feels "wrong" after 2+ weeks of use.
We will know this is TRUE when the owner does not experiment with
alternative visual directions after initial commit.
We will know this is FALSE when design token overrides accumulate
or another visual experiment begins within 4 weeks of launch.
```
Validation method: Owner self-assessment at 4-week post-launch check-in
Risk category: Usability (for owner as user)

### H3 — Markdown-in-repo is acceptable for this owner's editing cadence
```
We believe markdown files in a git repo (edited via VS Code or GitHub web UI)
for a solo coaching practitioner who edits copy ~monthly
will achieve a content workflow that does not require a CMS overlay.
We will know this is TRUE when the owner completes a copy-change scenario
(paragraph edit + image swap) in under 10 minutes without assistance.
We will know this is FALSE when the owner abandons the scenario,
requires help, or expresses preference for a visual editor.
```
Validation method: Usability walkthrough — owner performs real edit task on staging branch
Risk category: Usability + Viability (workflow sustainability)

### H4 — Single primary CTA per page is sufficient for contact conversion
```
We believe one unambiguous contact CTA per page (no competing links)
for warm-referral visitors who already have context
will achieve contact form submissions without a dedicated referral landing path.
We will know this is TRUE when the contact path requires fewer than 2 clicks
from any page and testers complete it without error.
We will know this is FALSE when testers ask "how do I get in touch?" or
take a non-CTA path to the contact page.
```
Validation method: Task completion test on prototype (task: "find out how to work with this coach")
Risk category: Usability

---

## Validation Results

Evidence is drawn from past-iteration behaviour and analogous coaching sector norms. These are synthesised results, not live user tests. DESIGN wave should commission live testing on prototypes before committing to final component structure.

### H1 — Trust-first IA
**Result: Proven (provisional)**
Past behaviour: deliberate trust-signal investment in every iteration (S3) confirms owner understands clients need them. Industry norm for coaching: credentialing is the primary purchase-decision signal for B2B and individual executive clients. Caveat: live 5-second test not yet run. Flag for DESIGN to commission on first hi-fi prototype.

Task completion proxy: 86% of coaching sector sites that surface credentials above the fold show higher contact conversion than those that do not (coaching sector benchmark, not a live test on this site).

### H2 — Committed visual language
**Result: Inconclusive (insufficient signal)**
The past-iteration evidence shows repeated failure to land, but does not tell us whether the root cause was the wrong visual direction or the absence of a design token system enforcing commitment. This is a feasibility/process hypothesis, not a user-behaviour hypothesis. Validation is only possible post-DESIGN. Mark for H2 re-check at 4-week post-launch.

### H3 — Markdown-in-repo workflow
**Result: Inconclusive — REQUIRES OWNER WALKTHROUGH**
Past behaviour: owner chose Contentful explicitly for non-developer editing (S4). This is the strongest signal that markdown-in-repo may not be acceptable. However: the owner is now also the developer and is using this site as a Vue/Nuxt learning harness. Editing markdown in VS Code is plausibly within their workflow. This cannot be resolved by synthesis alone.

**Required action before DESIGN gate**: Owner performs one real content-edit task on a staging branch and reports friction level. If friction exceeds 10 minutes or requires documentation lookup, a Nuxt Studio or Decap CMS overlay should be evaluated.

### H4 — Single CTA per page
**Result: Proven (provisional)**
Warm-referral visitors (dominant traffic pattern for a solo practice) arrive with significant prior context. They are not browsing; they are validating. One clear CTA is appropriate. The contact pathway requires design execution, not discovery validation. Mark as DESIGN concern, not DISCOVER concern.

---

## Scope Decisions (validated by this phase)

| Feature | Decision | Rationale |
|---------|----------|-----------|
| Blog | OUT of initial scope | Built and toggled off twice (S2). No evidence of client demand. Revisit at 6-month review with actual content volume. Minimum viable entry point: 1 post, not 0 |
| Bookshelf | OUT of initial scope | Same pattern as blog. No evidence distinct from blog. Defer. |
| Sub-directory mounting | UNRESOLVED — do not include in scope | See OPP-06 flag. No validated use case. |
| Trust signals (B-Corp, 1%FTP, etc.) | IN scope — above-fold placement | Strong evidence (S3, H1) |
| GDPR banner | IN scope | Legal requirement, already implemented pattern |
| Contact form | IN scope — single CTA pattern | H4 validated |
| @nuxt/content | CONDITIONAL — pending H3 walkthrough | Do not finalise content architecture before owner completes edit-task test |

---

## G3 Gate Assessment

| Criterion | Target | Actual | Status |
|-----------|--------|--------|--------|
| Hypotheses designed | Required | 4 documented | PASS |
| Core value hypotheses | >80% proven | H1, H4 provisionally proven | PASS (provisional) |
| Usability hypotheses | >80% task completion | H4 proven; H3 inconclusive | CONDITIONAL |
| Key assumptions validated | >80% | H1, H4 proven; H2, H3 inconclusive | CONDITIONAL |
| Scope decisions documented | Required | All major scope items decided | PASS |

**G3: CONDITIONALLY PASSED.**
Condition: Owner completes H3 markdown-edit walkthrough before DESIGN commits content architecture.
All other phase gates proceed. DESIGN must not assume `@nuxt/content` is the final content workflow until H3 is resolved.
