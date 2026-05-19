# Taste Evaluation — Transformation Narrative Presentation

feature_id: transformation-narrative-case-studies
wave: DIVERGE
phase: 4 — Taste Evaluation
date: 2026-05-19

---

## Weight Selection

This is a static content section on a solo practitioner SSG site. No developer tool. Not a consumer app. Closest archetype: personal portfolio/editorial.

**Rationale for weight adjustments from defaults:**

- DVF raised slightly (35%) — feasibility is tighter than default on this SSG with no framework and no JS budget; viability maps to "does not break the design system"; desirability maps directly to the validated recruiter scan job.
- Subtraction (T1) raised to 25% — the core site principle is restraint. Every option that adds ornament to an already-long page is penalised. This is the dominant design value on this site.
- Concept Count (T2) held at 20% — the site's existing design has zero interactive patterns beyond links. New interaction concepts add friction and CSS complexity.
- Progressive Disclosure (T3) reduced to 10% — the page is read in sequence; progressive disclosure is less relevant than total page height reduction.
- Speed-as-Trust (T4) reduced to 10% — SSG; all content is pre-rendered; "speed" here means perceived scan speed (all titles visible at once) rather than load time. Captured better in Subtraction and Concept Count.

**Locked weights:**

| Criterion                    | Weight |
| ---------------------------- | ------ |
| DVF (avg of D/F/V, each 1-5) | 35%    |
| T1 Subtraction               | 25%    |
| T2 Concept Count             | 20%    |
| T3 Progressive Disclosure    | 10%    |
| T4 Speed-as-Trust            | 10%    |

Weights locked before scoring. No adjustment post-scoring.

---

## Phase 1: DVF Filter

Score each lens 1-5. Elimination threshold: DVF average < 2.0 (equivalent to total < 6 on a 3-lens sum).

**Context notes:**

- D (Desirability): does this address the validated job? Does it pass the recruiter 10-second scan?
- F (Feasibility): buildable on Nuxt 3 SSG, hand-rolled CSS, no framework, minimal JS?
- V (Viability): consistent with the design system; does not introduce debt or style conflict?

| Option                    | D   | F   | V   | Avg  | Eliminate? |
| ------------------------- | --- | --- | --- | ---- | ---------- |
| 1 Editorial expand        | 5   | 5   | 4   | 4.67 | No         |
| 2 First-sentence static   | 4   | 5   | 5   | 4.67 | No         |
| 3 Badge-linked expand     | 3   | 4   | 3   | 3.33 | No         |
| 4 Intent selector         | 3   | 3   | 3   | 3.00 | No         |
| 5 Tab strip               | 4   | 4   | 4   | 4.00 | No         |
| 6 NarrativeEdge animation | 3   | 2   | 3   | 2.67 | No         |

**Notes on DVF scores:**

Option 1 (Editorial expand): D=5 — directly serves recruiter scan (all first sentences visible); F=5 — CSS `details`/`summary` is native HTML, zero JS; V=4 — eliminates h3 (title becomes the `summary` element, styleable without heading semantics), minor new component.

Option 2 (First-sentence static): D=4 — serves scan well; mild desirability penalty because the body text is entirely absent from the About page — evaluating leader gets less texture; F=5 — pure content edit, no code; V=5 — zero new pattern, h3 eliminated (no heading at all), fits existing inline prose model.

Option 3 (Badge-linked expand): D=3 — the map from "badge → vignette" is not obvious; a recruiter who clicks a badge to verify a credential may not expect a narrative; F=4 — buildable but requires Vue event binding and CSS expand; V=3 — merges two conceptually separate sections (credentials and narratives); risks visual complexity at the credential strip.

Option 4 (Intent selector): D=3 — the two-button filter is a good concept but 5 items is below the threshold where filtering adds scan value; a recruiter sees 2-3 vignettes, not 5 — reduced coverage; F=3 — Vue computed is straightforward, but the two-button UI requires design work and mobile layout decisions; V=3 — introduces an interactive component with no precedent on this page.

Option 5 (Tab strip): D=4 — all tab labels simultaneously visible is a real scan path; F=4 — CSS :target tabs are feasible but tricky on mobile; Vue toggle is simpler; V=4 — tabs are a known pattern, but the tab strip introduces a new component type.

Option 6 (NarrativeEdge animation carousel): D=3 — only one vignette visible at a time; NNG research confirms <10% of carousel visitors advance past slide 1; F=2 — SVG path morphing requires GSAP or equivalent; heavy JS dependency on a no-framework SSG is a feasibility problem; this is the only option that meaningfully risks failing to build; V=3 — animation draws attention but risks competing with the subdued, restrained aesthetic of the site.

No options eliminated (all averages > 2.0). All 6 proceed to taste scoring.

---

## Phase 2: Taste Scoring

### Option 1: Editorial Card + Inline Expand

**T1 Subtraction (1-5):**
Each entry = title (styled span) + first sentence always visible + `details`/`summary` to expand body. The always-visible first sentence is load-bearing for the scan job. The expand is a necessary progressive mechanism. Could the expand be removed? Yes, but then all body text is visible (height problem returns). Could the title be removed? No — it is the scan anchor for the evaluating leader. Nothing removable without breaking value. Score: **5**

**T2 Concept Count (1-5):**
One new concept: the expandable entry. Users have the established mental model for disclosure widgets (FAQ expand, `<details>` on MDN). One concept, well-anchored to a familiar pattern. Score: **4**

**T3 Progressive Disclosure (1-5):**
First interaction (scan): title + first sentence. Second interaction (read): expand. Perfectly staged. Score: **5**

**T4 Speed-as-Trust (1-5):**
All titles and first sentences rendered on load — instant. Expand is CSS-driven (`details`/`summary`) — zero latency. Score: **5**

---

### Option 2: First-Sentence-Only Static List

**T1 Subtraction:**
Nothing left to remove — this is already the minimum expression. Title + first sentence, five entries, rule separators. Score: **5**

**T2 Concept Count:**
Zero new concepts. It's a list. Score: **5**

**T3 Progressive Disclosure:**
No progressive disclosure exists — body text is not available at all on this surface. This is a design choice, not a failure, but it means the evaluating leader's "60-second approach evaluation" job is only partially served. Score: **3** (first interaction = only interaction; no depth available on this surface).

**T4 Speed-as-Trust:**
Instant — static HTML. Score: **5**

---

### Option 3: Badge-Linked Credential Expand

**T1 Subtraction:**
The badge strip already exists. Adding a vignette expand to each badge adds a mechanism. The expand is load-bearing for the job. But the conceptual merge (credential + narrative) is an addition, not a subtraction from the existing design. Could we remove the expand and just link to vignettes? Then we need another surface. The combine is non-trivially complex. Score: **3**

**T2 Concept Count:**
Two new concepts: (1) clicking a badge now does something different from before (it was a link to Credly; now it also expands a narrative); (2) the inline expanded vignette is a new visual state in the credential section. Score: **2**

**T3 Progressive Disclosure:**
Credential scan → click badge → read vignette. The progression is logical but the trigger (click a badge) is non-obvious. Badges have an established affordance as links (to Credly). Adding an expand to a badge breaks the established badge mental model. Score: **2**

**T4 Speed-as-Trust:**
Badge click → expand is instant (CSS show/hide). Score: **4**

---

### Option 4: Intent Selector (Two-Button Filter)

**T1 Subtraction:**
The two buttons add a UI mechanism. The filtered list reduces what's visible. Net: additions and subtractions roughly balance. But the buttons themselves introduce concepts not required by the job. Score: **3**

**T2 Concept Count:**
Two new concepts: (1) the filter buttons; (2) the fact that content changes based on selection. For a static narrative page, dynamic content filtering is a non-trivial new concept. Score: **2**

**T3 Progressive Disclosure:**
Intent selector → see filtered set → read individual vignette. Three steps to the vignette content. For a recruiter who wants to assess scope quickly, this is an additional step before seeing evidence. Score: **2**

**T4 Speed-as-Trust:**
Vue computed filter is instant. No latency. But the interaction step itself adds a perceived barrier before content appears. Score: **3**

---

### Option 5: Tab Strip

**T1 Subtraction:**
The tab strip (5 labels) + one full vignette below = compact. But the tab mechanism adds UI chrome (the strip itself). The full vignette body is visible for the active tab — no truncation. Could the tab labels be removed? Then it's a carousel. Could the body be truncated? Then it's closer to Option 1. The tab strip is the necessary mechanism for one-at-a-time display with simultaneous label visibility. Score: **4**

**T2 Concept Count:**
One new concept: tabs (well-established UI pattern). The tabs map to "five separate stories" which is a familiar model. Score: **4**

**T3 Progressive Disclosure:**
All tab labels visible on load (scan). Active tab body visible immediately (one vignette). Other vignettes accessible via tab click. Well-staged. Score: **4**

**T4 Speed-as-Trust:**
Tab switch is instant (CSS :target or Vue toggle). Score: **5**

---

### Option 6: NarrativeEdge Animation Carousel

**T1 Subtraction:**
The animated edge is ornamental relative to the navigation job. The animation communicates continuity but a simple "next" button would also work. Substantial non-essential elements exist (SVG morph, animation timing, multiple path variants). Score: **2**

**T2 Concept Count:**
Two new concepts: (1) the edge is interactive (not decorative as currently); (2) vignettes are sequential (only one visible). The edge-as-navigation is a novel affordance with no established mental model. Score: **1**

**T3 Progressive Disclosure:**
Only one vignette visible at a time. On load, one vignette renders. User must interact to see others. The interactive edge needs to be discovered. Score: **2**

**T4 Speed-as-Trust:**
Animation involves JS and potentially GSAP. SVG morph is not instantaneous visually by design. Score: **2**

---

## Phase 3: Weighted Scoring Matrix

Formula: (DVF × 0.35) + (T1 × 0.25) + (T2 × 0.20) + (T3 × 0.10) + (T4 × 0.10)

| Option                    | DVF (×0.35)        | T1 Sub (×0.25)  | T2 Concept (×0.20) | T3 Prog (×0.10) | T4 Speed (×0.10) | Weighted Total |
| ------------------------- | ------------------ | --------------- | ------------------ | --------------- | ---------------- | -------------- |
| 1 Editorial expand        | 4.67 × 0.35 = 1.63 | 5 × 0.25 = 1.25 | 4 × 0.20 = 0.80    | 5 × 0.10 = 0.50 | 5 × 0.10 = 0.50  | **4.68**       |
| 2 First-sentence static   | 4.67 × 0.35 = 1.63 | 5 × 0.25 = 1.25 | 5 × 0.20 = 1.00    | 3 × 0.10 = 0.30 | 5 × 0.10 = 0.50  | **4.68**       |
| 5 Tab strip               | 4.00 × 0.35 = 1.40 | 4 × 0.25 = 1.00 | 4 × 0.20 = 0.80    | 4 × 0.10 = 0.40 | 5 × 0.10 = 0.50  | **4.10**       |
| 3 Badge-linked expand     | 3.33 × 0.35 = 1.17 | 3 × 0.25 = 0.75 | 2 × 0.20 = 0.40    | 2 × 0.10 = 0.20 | 4 × 0.10 = 0.40  | **2.92**       |
| 4 Intent selector         | 3.00 × 0.35 = 1.05 | 3 × 0.25 = 0.75 | 2 × 0.20 = 0.40    | 2 × 0.10 = 0.20 | 3 × 0.10 = 0.30  | **2.70**       |
| 6 NarrativeEdge animation | 2.67 × 0.35 = 0.93 | 2 × 0.25 = 0.50 | 1 × 0.20 = 0.20    | 2 × 0.10 = 0.20 | 2 × 0.10 = 0.20  | **2.03**       |

**Ranked:**

1. Option 1 — Editorial expand: 4.68
2. Option 2 — First-sentence static: 4.68 (tied)
3. Option 5 — Tab strip: 4.10
4. Option 3 — Badge-linked expand: 2.92
5. Option 4 — Intent selector: 2.70
6. Option 6 — NarrativeEdge animation: 2.03

**Tie-break (Options 1 vs 2):** Options 1 and 2 score identically. The tie-break is T3 Progressive Disclosure: Option 1 scores 5 (full body available on expand); Option 2 scores 3 (no body available on About page). Since the evaluating leader's job requires approach-texture beyond the first sentence, and T3 captures whether the surface serves graduated engagement, Option 1 is the stronger answer for the dual-audience constraint. The tie-break is T3: **Option 1 wins by a sliver.**

---

## Gate G4 Check

- [x] DVF filter applied to all 6 options
- [x] All options scored on all 4 taste criteria
- [x] Weights documented and locked before scoring
- [x] Weighted ranking complete
- [x] Recommendation with dissenting case: see recommendation.md

### G4: PASS
