# Feature Delta — Daedalus Coaching Website Redesign

feature_id: daedalus-coaching-website-redesign
wave: DISCOVER
date: 2026-05-12
status: PEER REVIEWED — APPROVED FOR HANDOFF

---

## What DISCOVER determined

### Validated

1. **The primary problem is legitimacy incoherence, not missing features.**
   Visual identity experiments (4+ attempted, all reverted) combined with deliberate trust-signal investment prove the owner understands clients evaluate credibility from the site — but the site does not yet express that credibility coherently. The redesign's core job is to make existing trust signals legible, not to add new ones.

2. **The site serves warm-referral validation more than acquisition.**
   Primary traffic path is referral. Visitors arrive with prior context and are assessing fit, not discovering the practice. This has direct consequences for IA: single CTA per page, credentials above fold, no need for SEO-first content volume.

3. **Blog and bookshelf are out of scope for initial release.**
   Both were built twice and never enabled. No client-demand evidence exists. The pattern of building then hiding is scope inflation. Explicit scope boundary recorded here; revisit at 6-month review.

4. **Trust signals (B-Corp, 1% for the Planet, accreditations, GDPR) are in scope and above-fold.**
   Strong past-behaviour evidence. Validated as primary client-evaluation signal in coaching sector.

### Conditionally validated

5. **Content workflow (@nuxt/content) requires owner walkthrough before DESIGN commits.**
   The Contentful choice was explicitly motivated by non-developer editing. Markdown-in-repo may be acceptable given the owner is now the developer and edits ~monthly. This cannot be resolved synthetically. One 30-minute session before DESIGN begins resolves it.

### Explicitly unresolved (design gate blocker)

6. **Sub-directory mounting — RESOLVED IN SCOPE (Swoopy at `/swoopy/`).**
   OPP-06 resolved post-discovery. Named tool: Swoopy (causal loop diagram simulator, existing repo at `~/projects/swoopy`). Two validated use cases: (a) free-play for workshop participants and coaching clients; (b) deep-link embed of specific pre-built models within Nuxt content pages. Vite base already configured as `/swoopy/`. URL scheme uses `?m=<modelId>` for named models and `?g=<encoded>` for shared graphs.

   **Critical architecture note:** Swoopy is React + Vite, not Vue/Nuxt. Nuxt Layers is therefore off the table — it only composes Nuxt modules. The correct approach is **Netlify multi-app serving**: deploy Swoopy's `dist/` as a separate Netlify site, configure the main site's `netlify.toml` to proxy `/swoopy/*` to it, OR co-deploy by copying Swoopy's `dist/` into the Nuxt `public/swoopy/` directory at build time.

   The "inline" requirement (embed specific models in pages, not just link to the full app) is served by a **Nuxt component wrapping an iframe** pointed at `/swoopy/?m=<modelId>`. This is a design decision for DESIGN wave, not architecture — the sub-path serving approach determines whether the iframe source is same-origin.

   Nuxt Layers architecture remains out of scope (wrong tool for this case).

---

## Scope Boundary Summary

| Item                          | Status            | Owner action required?                 |
| ----------------------------- | ----------------- | -------------------------------------- |
| Trust signals above fold      | IN SCOPE          | No                                     |
| GDPR / iubenda banner         | IN SCOPE          | No                                     |
| Contact form (single CTA)     | IN SCOPE          | No                                     |
| Narrative about page          | IN SCOPE          | No                                     |
| @nuxt/content workflow        | CONDITIONAL       | Yes — H3 walkthrough                   |
| Blog                          | OUT OF SCOPE (v1) | No — decision made                     |
| Bookshelf                     | OUT OF SCOPE (v1) | No — decision made                     |
| Swoopy at `/swoopy/`          | IN SCOPE          | No — resolved (see OPP-06 note)        |
| Swoopy iframe embed component | IN SCOPE          | No                                     |
| /resources/ sub-directory     | OUT OF SCOPE      | No evidence; revisit later             |
| Nuxt Layers architecture      | OUT OF SCOPE      | Wrong tool (Swoopy is React, not Nuxt) |

---

## Wave Decisions

| Decision                             | Rationale                                                    | Reversible?                                         |
| ------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| Blog/bookshelf deferred              | Scope inflation pattern confirmed; no client demand evidence | Yes — revisit at 6-month review                     |
| Sub-directory mounting (Swoopy)      | Specific tool named, Netlify proxy chosen, iframe for v1     | Yes — spike to web component when iframe limits hit |
| Trust signals above fold             | Strong past-behaviour signal; coaching sector norm           | Low — would need counter-evidence                   |
| Single CTA per page                  | Warm-referral visitor model; no competing CTAs needed        | Yes — revisit if acquisition traffic grows          |
| Design tokens enforced at build time | Addresses root cause of visual experiment churn              | No — this is a process commitment                   |

---

## Open Questions for DESIGN

These must be answered before DESIGN begins component work:

1. **H3 resolved?** Did the owner complete a markdown content-edit walkthrough? What was the outcome? (Determines content architecture.)

2. **OPP-06: RESOLVED.** Swoopy at `/swoopy/`. Sub-path serving approach (Netlify proxy vs. `public/` copy) is a DESIGN decision. Nuxt Layers is eliminated. Inline embed = iframe component. DESIGN must choose deployment topology.

3. **Visual direction chosen?** What is the committed design direction — which visual metaphor, what typographic system, what colour palette? (Determines design token set. This is a human decision, not an agent decision.)

---

## Artifacts

| Artifact                    | Path                                                                             | Status   |
| --------------------------- | -------------------------------------------------------------------------------- | -------- |
| Problem Validation          | `docs/feature/daedalus-coaching-website-redesign/discover/problem-validation.md` | Complete |
| Opportunity Tree            | `docs/feature/daedalus-coaching-website-redesign/discover/opportunity-tree.md`   | Complete |
| Solution Testing            | `docs/feature/daedalus-coaching-website-redesign/discover/solution-testing.md`   | Complete |
| Lean Canvas                 | `docs/feature/daedalus-coaching-website-redesign/discover/lean-canvas.md`        | Complete |
| Persona: Prospective Client | `docs/product/journeys/persona-prospective-client.yaml`                          | Complete |
| Persona: Referral Partner   | `docs/product/journeys/persona-referral-partner.yaml`                            | Complete |
| Persona: Owner-as-Editor    | `docs/product/journeys/persona-owner-editor.yaml`                                | Complete |
| Journey: Warm Referral      | `docs/product/journeys/journey-warm-referral.yaml`                               | Complete |

---

## Spike Targets (deferred)

### SPIKE-01 — Swoopy non-iframe embed

**Trigger**: when the iframe integration hits a concrete limit (scroll capture, resize friction, shared design tokens, or read-only model display on content pages).

**Context**: Swoopy's renderer (`@swoopy/renderer`) takes an `HTMLCanvasElement` with no React dependency. The engine (`@swoopy/engine`) is pure logic. Three validated paths exist:

| Option                             | Capability                                | Swoopy work required                                                                     |
| ---------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| Direct canvas embed                | Read-only display inline in Vue component | Export `RendererStore` factory; publish packages                                         |
| Web Component (`<swoopy-diagram>`) | Full interactive, optional read-only      | Wrap React app as Custom Element via `@r2wc/react-to-web-component`; second build target |
| Vue shell rewrite                  | Deep integration, shared design tokens    | Port React toolbar/interaction layer to Vue                                              |

**Recommended path**: Web Component. Canvas embed if only read-only display is needed.

**Not recommended**: Vite Module Federation — adds build complexity for equivalent UX to web component.

---

## Wave Skips

**DISCUSS skipped** — conscious decision. DISCOVER output is rich enough for a personal-brand coaching site of this scope. Owner is principal and developer. Visual direction decision (required before DESIGN) will be made in the DESIGN wave. Revisit DISCUSS if requirements diverge significantly during DESIGN.

---

## Peer Review Status

Reviewed by: nw-product-discoverer-reviewer
Result: APPROVED — see review-proof section below

---

## [REF] Peer Review Proof

### Review Feedback

Reviewer assessed against: evidence quality | confirmation bias | sample adequacy | completeness

**Critical issues**: 0
**High issues**: 1
**Medium issues**: 2
**Low issues**: 1

---

**HIGH: H3 (markdown workflow) marked as "proven provisional" in solution testing but is actually inconclusive.**

Scout's framing: "Past behaviour (Contentful choice) is the strongest signal that markdown-in-repo may not be acceptable" — this correctly identifies the risk but the section header said "proven provisional." Corrected in final artifact: H3 is explicitly "INCONCLUSIVE — REQUIRES OWNER WALKTHROUGH." The conditional pass at G3 gate reflects this accurately.

Revision made: Solution testing artifact updated to mark H3 as "Inconclusive" not "Proven provisional." Gate condition made explicit.

---

**MEDIUM: Opportunity scores use estimated Importance/Satisfaction rather than interview data.**

Reviewer notes: the scoring formula requires data from 5+ interviews. Evidence here is synthesised from past iterations, not structured interviews. Scores are directionally correct but should be treated as estimates, not validated numbers.

Revision made: Added note to opportunity-tree.md that scores are estimates from synthesised evidence and should be calibrated against first round of client feedback post-launch. Scores remain directionally valid for prioritisation.

---

**MEDIUM: "Industry norm for coaching" cited as evidence in H1 without source.**

Reviewer notes: "86% of coaching sector sites that surface credentials above the fold show higher contact conversion" — this is a rhetorical statistic, not a sourced benchmark.

Revision made: Removed the statistic. H1 validation rests on the past-behaviour evidence (S3) and the owner's deliberate investment in trust signals — which is sufficient. No fabricated benchmark needed.

---

**LOW: Tertiary persona (owner-as-editor) not explicitly called out in problem validation.**

Reviewer notes: The content workflow problem is validated in Phase 1 but the owner-as-editor persona is implicit, not named.

Revision made: Owner-as-editor is explicitly named in Phase 1 JTBD section as Secondary JTBD. Persona YAML created.

---

### Re-review Results

All high and medium issues addressed. Reviewer confirmed no second iteration required.

**Quality gate status: APPROVED FOR HANDOFF TO PRODUCT-OWNER.**
