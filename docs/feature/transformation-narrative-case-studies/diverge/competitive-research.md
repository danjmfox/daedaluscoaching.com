# Competitive Research — Transformation Narrative Presentation Patterns

feature_id: transformation-narrative-case-studies
wave: DIVERGE
phase: 2 — Competitive Research
date: 2026-05-19
depth: lightweight (3+ patterns)

---

## Research Scope

Job: enable a visitor to assess org-level transformation scope during a credential surface visit — first-line scannable, no navigation required, no full-read obligation.

Research question: how do comparable sites solve the "multiple short evidence items on a long page" problem without burying them or over-inflating page height?

---

## Product 1: Garfinkle Executive Coaching (garfinkleexecutivecoaching.com/testimonials)

**Pattern**: Isolated dedicated testimonials page. Full prose testimonials, one per paragraph block, vertical list, no truncation.

**What it does well**: exhaustive — nothing is hidden. Long testimonials fully rendered.

**Where it fails the job**:

- Requires navigation to `/testimonials` before the recruiter credential scan is complete (violates C-07/IA-03 from DISCOVER).
- No scan path: all testimonials are equal weight; there is no title, label, or first-line signal to orient a 10-second scan.
- Zero progressive disclosure: reader must scroll through all entries to reach the ones relevant to them.

**Key assumption about user behaviour**: visitors arrive motivated to read testimonials and will self-navigate to find them.

**Relevance**: the "dedicated page" anti-pattern. This is what DISCOVER's IA-03 invalidated.

---

## Product 2: Ernest Barbaric Executive Coaching (ernestbarbaric.com/testimonials)

**Pattern**: Single-page scrolling testimonial list, each entry in a distinct card with a subtle border. No titles — just attribution (name, role, org). Entries are 2–4 sentences. Consistent card height means a short entry has whitespace; a long entry expands the card.

**What it does well**:

- Attribution gives instant org-context scan signal (e.g., "Director of Engineering, Series B SaaS").
- Short entries (2-4 sentences) make the page manageable — a visitor can scan all 8 entries in under 30 seconds.
- No interaction required: all evidence is visible without click, hover, or navigation.

**Where it fails the job**:

- Attribution-only format gives org-context but no transformation narrative — no sense of what actually happened or changed.
- Still a separate page — recruiter must navigate after credential scan.
- Cards of variable height produce an irregular rhythm that makes the scroll feel longer than it is.

**Key assumption about user behaviour**: social proof is delivered by the attributed source (Director of Engineering says it was good) not by the content of what is described.

**Relevance**: the "attribution-as-context" pattern. Closest to the recruiter first-line scan requirement — but missing the narrative texture the evaluating leader needs.

---

## Product 3: Center for Executive Coaching (centerforexecutivecoaching.com/testimonials)

**Pattern**: Carousel/slider with large testimonial quotes, client name below, auto-advance or manual arrow navigation. One testimonial visible at a time.

**What it does well**:

- Dramatically reduces vertical page height — only one item occupies space at a time.
- Strong visual presence for the single visible item.

**Where it fails the job**:

- Auto-advance means the recruiter may be scanning when the slide changes — losing their place.
- Manual navigation requires a click to see each vignette — the recruiter cannot scan all five titles in one pass. The scan is sequential, not parallel.
- Hidden content is under-trusted: usability research (Nielsen Norman Group) shows users do not advance carousels. Content after slide 1 is effectively invisible.
- No org-context in the first visible scan — the recruiter sees one quote with one attribution; they cannot see that there are 5 entries covering different org types.

**Key assumption about user behaviour**: users will interact with the carousel and advance through slides. Evidence (NNG carousel research, 2013–2023) consistently refutes this.

**Relevance**: this is the owner's proposed "carousel" direction. The research shows it reduces page height but harms scan coverage — directly trading ODI-2 (recruiter reaches transformation evidence) against ODI-1 (org type scannable).

---

## Non-Obvious Alternative: UK Law Firm Profile Pages (e.g., Linklaters, Allen & Overy practice group bios)

**Pattern** (cross-domain transfer): Senior practitioner profiles on large law firm sites present "matters" — brief anonymised deal/case descriptions — inline on the bio page. Each matter is 2-3 sentences: sector, type of work, role. No click required. The format is: title-less, attribution-less (confidentiality), inline, visually lightweight (no card, no border, no heading — just a subtle bullet or thin rule). Typically 4-6 matters. The page is long but the matter section is visually compressed by removing ornament.

**What it does well**:

- Passes the recruiter scan: sector + scale signals are in the first clause of each matter.
- No interaction required — all matters visible.
- No new visual concept introduced — the matter list is typographically identical to the surrounding prose.
- Solves the h3 problem: no headings used. The title signal comes from the first few words of the matter description itself.
- Minimal page height per item: 2-3 sentences with no card chrome adds ~80px per item vs. ~200px in a bordered card.

**Where it fails the job**:

- Lacks the narrative arc that the Daedalus vignettes have — law firm matters are dry (sector + deal type). The Daedalus vignettes have titles that carry rhetorical weight ("When the data changed the conversation").
- Without visual separation, five entries flow into each other — the scan boundary between entries is harder to perceive.

**Key assumption about user behaviour**: the recruiter/evaluator already trusts the practitioner context (law firm brand does pre-work). For a solo practitioner site, the context needs more not less ornament.

**Relevance**: the "inline matter list" pattern — most typographically conservative option, highest information density per pixel. A potential model for the "Eliminate" SCAMPER direction.

---

## Non-Obvious Alternative: Notion's "database card gallery" — filtered by tag

**Pattern** (same job, different category): Product docs and knowledge bases use filterable card galleries where each card has a title + one-line summary always visible, and full content accessible via click/expand. The filter tags (e.g., "Org transformation", "Leadership coaching", "Facilitation") let the visitor route to their relevant category before reading.

**What it does well**:

- Scan path: all titles and first lines visible at once (grid layout, not carousel).
- Filterable: recruiter can immediately surface org-transformation vignettes; leader can surface leadership coaching entries.
- Progressive disclosure: the card summary satisfies the scan; click reveals the full narrative.

**Where it fails the job**:

- Requires new concept introduction: filter controls, card interaction model. Concept count cost is high.
- Feasibility: implementing a filterable card grid in a hand-rolled SSG with no CSS framework and no JS framework beyond Nuxt is non-trivial.
- 5 items is too few for filtering to add value — filters are useful at 10+ items.
- DISCOVER constraint C-07: no dedicated sub-page. A filterable gallery on the About page would visually dominate the section.

**Relevance**: the "filterable gallery" pattern. Fails at 5 items. Noted for future revisit if vignettes grow to 10+.

---

## Pattern Summary

| Pattern                             | Page height cost         | Recruiter scan coverage             | Narrative texture | Concept count | SSG feasible       |
| ----------------------------------- | ------------------------ | ----------------------------------- | ----------------- | ------------- | ------------------ |
| Dedicated page (Garfinkle)          | Low (no impact on About) | None — requires navigation          | High              | Low           | Yes                |
| Attribution cards (Barbaric)        | Medium                   | Medium — org-context in attribution | Low               | Low           | Yes                |
| Carousel (Center for Exec Coaching) | Low                      | Low — only slide 1 reliably seen    | Medium            | Medium        | Yes (with caveats) |
| Inline matter list (law firm)       | Low                      | High — all entries visible          | Low (no titles)   | Very low      | Yes                |
| Filterable gallery (Notion-style)   | High                     | High — all titles visible           | Medium            | High          | Possible           |

**Research conclusion**: No existing pattern fully satisfies the recruiter scan coverage + narrative texture + low page height triple. The carousel solves height but harms scan. The inline list solves height and scan but loses narrative signal. The gap is between the recruiter's scan speed requirement and the evaluating leader's narrative texture requirement. A satisfying solution must give the recruiter parallel title-scanning (all 5 visible) while compressing body text.

---

## Gate G2 Check

- [x] 3+ real products named (Garfinkle, Barbaric, Center for Executive Coaching)
- [x] Non-obvious alternative included (UK law firm matter list pattern — different category, same job)
- [x] No generic market claims — all findings tied to specific product behaviours

### G2: PASS
