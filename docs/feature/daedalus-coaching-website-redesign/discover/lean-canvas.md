# Lean Canvas — Daedalus Coaching Website Redesign

feature_id: daedalus-coaching-website-redesign
phase: 4 — Market Viability
status: GATE PASSED (G4)
date: 2026-05-12

---

## Lean Canvas

### 1. Problem (validated Phase 1)
1. Prospective clients cannot quickly assess coach credibility from current site — visual incoherence undermines trust signals that are already present
2. Owner cannot update copy without a code deploy (unresolved in new stack)
3. Site has no settled identity — multiple visual experiments, none retained

### 2. Customer Segments (by JTBD)

**Primary**: Leaders evaluating an Agile/leadership coach — hiring the site to quickly confirm credibility before agreeing to a discovery call. Arrive via warm referral (dominant path) or organic search (secondary).

**Secondary**: Referral partners (other coaches, HR leads, L&D professionals) — hiring the site to verify the coach is credible enough to send clients to. Looser time pressure; will read more deeply.

**Tertiary**: Owner-as-content-editor — hiring the site's content workflow to make copy changes without engineering cost or friction.

### 3. Unique Value Proposition
"A coaching practice that operates with the same integrity it teaches — B-Corp certified, 1% for the Planet member, GDPR-compliant — presented clearly enough to make the first conversation easy to say yes to."

### 4. Solution (top features for top problems)
1. Trust-first homepage: credentials above fold, coherent visual identity, single CTA
2. Narrative about page: coach's approach in their own voice, not a CV
3. Content workflow: validated for solo-practitioner editing cadence (markdown-in-repo or CMS overlay per H3 result)

### 5. Channels
- Warm referral (primary — no channel investment needed; site is the landing, not the acquisition)
- Organic search (secondary — structured content, semantic HTML, no dedicated SEO effort at launch)
- Owner's direct network / social (tertiary — site URL shared; must load quickly and look right on mobile)

### 6. Revenue Streams
Not applicable to this canvas — the site is a conversion channel for coaching engagements, not a direct revenue product. Success metric: contact form submissions and discovery call bookings attributable to site visits.

Proxy metric for DESIGN gate: contact-to-inquiry conversion rate (baseline to be measured post-launch).

### 7. Cost Structure
- Owner time (development): primary cost — Vue/Nuxt learning project, so time is dual-purpose
- Netlify hosting: minimal (free tier adequate for a low-traffic professional site)
- Domain + iubenda GDPR: existing recurring costs, unchanged
- No CMS subscription cost if markdown-in-repo validated (saves ~£100/yr vs Contentful)

### 8. Key Metrics
| Metric | Measurement | Baseline | Target |
|--------|------------|---------|--------|
| Contact form submissions | Netlify form analytics | Unknown (not instrumented) | Establish baseline in first 30 days |
| Time-on-page (homepage) | Plausible / privacy-first analytics | Unknown | Establish baseline |
| Bounce rate (homepage) | Analytics | Unknown | <70% for warm referral traffic |
| Owner content-edit time | Owner self-report | 30+ min (Contentful friction) | <10 min for copy change |
| Visual experiment reversion | Git history | 4+ reversions to date | 0 reversions in 12 weeks post-launch |

### 9. Unfair Advantage
- Owner's B-Corp and 1% for the Planet certifications are not easily copied — they represent legal and financial commitment, not just claims
- Owner is both practitioner and builder — the site can be genuinely responsive to positioning changes without agency cost
- TDD-from-scratch commitment means the codebase is a learning harness and a maintainable asset simultaneously

---

## Four Big Risks Assessment

| Risk | Question | Evidence | Status |
|------|----------|---------|--------|
| Value | Will prospective clients find the redesigned site more credible? | Trust signals already invested (S3); visual incoherence diagnosed as root cause (S1, S2); redesign addresses OPP-01 and OPP-02 | GREEN — problem validated, solution direction confirmed |
| Usability | Can the owner maintain the site without unacceptable friction? | H3 inconclusive — requires walkthrough before DESIGN commits content architecture | YELLOW — condition outstanding |
| Feasibility | Can a solo developer build and maintain this? | Nuxt 3 / Vitest / Playwright stack is pre-confirmed; owner has Vue learning context; TDD commitment documented | GREEN — no feasibility blocker identified |
| Viability | Does the site serve the business model? | Coaching practice primary acquisition is referral-based; site is validation/conversion, not acquisition; CMS cost removal is a minor positive | GREEN — business model not disrupted by redesign |

**Overall risk profile: GREEN with one YELLOW.** Yellow condition (H3 usability walkthrough) is resolvable within a single 30-minute session before DESIGN begins.

---

## Go/No-Go Decision

**Decision: GO** — with the following conditions recorded:

1. **H3 condition**: Owner completes markdown-edit walkthrough before DESIGN commits content architecture. If friction exceeds acceptable threshold, evaluate Nuxt Studio or Decap CMS overlay.

2. **OPP-06 condition**: Sub-directory mounting (/tools/, /resources/) is explicitly OUT OF SCOPE for this redesign until the owner can name a specific tool/resource, its users, and a delivery timeline. Nuxt Layers architecture must not be adopted speculatively.

3. **Blog/bookshelf**: Explicitly out of scope for initial release. Not a gate-fail risk — a scope-discipline requirement.

4. **Visual identity**: DESIGN must commit to a design token system enforced at build time. No visual experiments during or after DESIGN. Owner signs off on direction before component work begins.

---

## G4 Gate Assessment

| Criterion | Target | Actual | Status |
|-----------|--------|--------|--------|
| Lean Canvas complete | Required | Complete | PASS |
| All 4 risks addressed | Required | 3 GREEN, 1 YELLOW | PASS |
| All risks acceptable | Required | YELLOW is conditional, not blocking | PASS |
| Go/No-Go documented | Required | GO with conditions | PASS |
| Scope decisions explicit | Required | Blog out, subdirs out, CMS conditional | PASS |

**G4: PASSED. Ready for peer review and handoff.**
