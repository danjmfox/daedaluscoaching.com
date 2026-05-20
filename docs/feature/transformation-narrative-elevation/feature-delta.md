<!-- markdownlint-disable MD024 -->
# Feature Delta — Transformation Narrative Elevation

```yaml
feature_id: transformation-narrative-elevation
wave: DISCUSS
date: 2026-05-20
status: OWNER DECISIONS PENDING (D-01, D-02)
job_id: JOB-TN-001
prior_waves:
  discover: docs/feature/transformation-narrative-case-studies/discover/feature-delta.md
  diverge: docs/feature/transformation-narrative-case-studies/recommendation.md
  str1: docs/feature/str-1-acquisition-discovery/discover/feature-delta.md
```

---

## Wave: DISCUSS / [REF] Persona ID

Two personas, established in CN-20 DISCOVER and STR-1. Not re-derived here.

**Persona A — Recruiter / Hiring Manager** (`persona-recruiter-hiring-manager`)
Arrives via CV or LinkedIn. First 10 seconds: credential scan. Seconds 10–60: transformation scope
assessment. Decides whether to progress the candidate. Does not click into sub-pages before completing
the About page credential scan. Does not visit Services.

**Persona B — Evaluating Leader** (`persona-prospective-client`)
Arrives via warm referral. Reads top-to-bottom on About. Needs philosophy coherence confirmed by
transformation evidence before submitting an enquiry. 60-second budget.

**Binding constraint**: the recruiter's 10-second scan governs IA decisions. Any change that puts
transformation evidence further from the top of the page is a regression for the primary persona.

---

## Wave: DISCUSS / [REF] JTBD One-Liner

JOB-TN-001: When a recruiter or evaluating leader arrives at the About page, they want to see
org-level transformation evidence within the credential-validation zone, so they can confirm scope
and decide whether to proceed — without navigating away or reading the full career narrative first.

---

## Wave: DISCUSS / [REF] IA Options Analysis

Four options were mapped against both personas. Full analysis in `discuss/wave-decisions.md`.

| Option | Recruiter fit | Leader fit | Effort | Verdict |
|---|---|---|---|---|
| A: About page reorder (transformation after certifications) | STRONG | STRONG | 0.5 days | RECOMMENDED |
| B: New top-level "Work" page + nav item | WEAK | NEUTRAL | 1–2 days | ELIMINATED |
| C: Services page integration | VERY WEAK | WEAK | 0.5 days | ELIMINATED |
| D: Direction A era sweep (standalone) | NEUTRAL | NEUTRAL | 0 days (built) | PREREQUISITE only |

**Options B and C are eliminated** on persona grounds.

Option B fails because recruiters go to About, not "Work." The DISCOVER wave named this explicitly
as an anti-pattern (IA-03: "A dedicated page only reached after scroll or navigation fails the
10-second scan"). A top-level page is marginally better than a sub-page, but the recruiter still
has to know to click "Work" before they finish the About credential scan — and they do not.

Option C fails because recruiters do not visit Services. Evidence is invisible to the dominant persona.

**Recommended: Option A.** Reorder the About page block sequence so `about-transformation` follows
`about-certifications` directly. The current ordering places 4 career narrative blocks between
certifications and transformation evidence — the exact scroll distance that buries the content this
feature is designed to surface.

**Direction A (three-era career sweep) is a compatible enhancement.** It reduces the About page
from 11 to 8 blocks and is already built in the codebase (commented out in `content/about.md`).
It is optional and independent of the reorder. The two moves can ship separately.

---

## Wave: DISCUSS / [REF] Locked Decisions

Decision D-01 (IA direction) is the gate for DESIGN. Owner approval required before DESIGN begins.
See Owner Decision flags below.

**Pending owner confirmation of D-01, the following are locked within Option A:**

- Transformation evidence placed immediately after certifications in the About page block order
- No new page created; no new nav item added
- No changes to `TransformationNarrative.vue` component (CN-20 scope, already diverged)
- No changes to vignette content (P-01–P-05 from CN-20 DISCOVER are owner pre-requisites)
- The `about-working-with-me` block moves with the reorder, landing after `about-transformation`

---

## Wave: DISCUSS / [REF] Owner Decision Flags

### D-01 — Core IA Direction (blocks DESIGN)

🤔 OWNER DECISION REQUIRED: Should the About page be reorganised so `about-transformation`
follows `about-certifications` directly? — Options: (A) Yes, reorder to: approach → background →
[career blocks] → certifications → transformation → working-with-me → daedalus → site; (B) No,
keep current order and accept that transformation evidence is buried; (C) Yes, and also replace
career narrative with Direction A era sweep simultaneously — What happens if deferred: DESIGN
cannot begin. The current order is the problem this feature exists to solve.

### D-02 — Career Narrative Form (independent of D-01)

🤔 OWNER DECISION REQUIRED: Should the 4-block career narrative (career-start, facilitation,
scale, now) be replaced with the Direction A three-era sweep already in the codebase? — Options:
(A) Yes, switch to Direction A (shorter page, image-led era blocks); (B) No, keep Direction B;
(C) Condense Direction B differently — owner to specify — What happens if deferred: Acceptable.
D-01 ships without D-02. Page remains longer but transformation evidence is more prominent.

### D-03 — `about-site` Block (low urgency)

🤔 OWNER DECISION REQUIRED: The `about-site` meta-note block ends the About page. Neither
persona reads this far. Should it be retained, moved, or removed? — Options: (A) Retain for
curious visitors; (B) Remove; (C) Move to footer or privacy page — What happens if deferred:
No impact on D-01. Low urgency; can be decided in a later pass.

---

## Wave: DISCUSS / [REF] User Stories

### System Constraints

- `content/about.md` controls block render order via YAML front-matter block array
- Block files are in `content/blocks/`; each block is a standalone Markdown file with front-matter
- The `TransformationNarrative.vue` component is rendered by `about-transformation` block; component
  is not in scope for this feature
- Direction A blocks (`about-era-digital`, `about-era-coaching`, `about-era-ai`) exist in codebase
  and are commented out in `content/about.md`; no new files needed to activate them
- SSG build (Nuxt generate): block order changes take effect at build time; no runtime changes
- No analytics instrumentation exists; proxy metrics are contact form submissions (Netlify)

---

### US-TNE-01: Transformation Evidence Promoted to Credential Zone

#### Problem

A recruiter arriving from a CV or LinkedIn profile scans the About page from top to bottom.
Under the current block order, they reach certifications at block 7, then encounter four career
narrative blocks (blocks 3–6) before the transformation evidence at block 8. At 10-second scan
speed, the career narrative is noise — they have already formed their assessment or abandoned
before reaching transformation evidence. The evidence exists; it is in the wrong position to
do its job.

#### Who

- Recruiter / Hiring Manager — 10-second credential scan, validation not discovery
- Evaluating Leader — 60-second top-to-bottom read, needs philosophy confirmed by evidence

#### Solution

Reorder the `content/about.md` block array so `about-transformation` immediately follows
`about-certifications`. Career narrative blocks remain but land after the credential-validation
zone rather than inside it.

#### Elevator Pitch

**Before**: A recruiter scans Dan's About page, clears the certifications badge strip, then faces
four paragraphs of career history before finding any transformation evidence — if they scroll
that far at all.

**After**: The recruiter clears the certifications badge strip and immediately sees six
transformation vignette titles and opening sentences, each signalling org type and scale. No
additional scrolling required to assess whether org-level work is present.

**Decision enabled**: The recruiter can confirm or disqualify the candidate's org-transformation
claim within seconds of clearing the credential scan — the same visit, the same page, no
sub-navigation.

#### Domain Examples

**Example 1 — Sarah (Recruiter, FTSE 100 HR)**: Sarah arrives from a CV link mid-afternoon,
gives herself 45 seconds. She clears the Credly badge strip. Immediately below it she sees
"When the data changed the conversation — A product organisation in consumer technology, around
two hundred engineers..." She scans three more lead sentences. Sector fit confirmed. She opens
the fourth vignette. Time elapsed: 38 seconds. She moves the candidate to the next stage.

**Example 2 — Marcus (Evaluating Leader, referred by a peer)**: Marcus opens the About page
after a colleague's recommendation. He reads the Approach block (philosophy), scrolls to
certifications (credibility), and immediately encounters the vignettes. He reads the "From
troubled to exemplar" vignette in full — it matches the team dynamics he is dealing with.
Sixty seconds in, he opens the contact form.

**Example 3 — Priya (Recruiter, unfamiliar with coaching sector)**: Priya cannot distinguish
ICF levels from credential text. She scans to the transformation section. "A technology
organisation of several thousand people" — that scale is recognisable. She has enough context
to flag the profile to a domain-expert colleague without having read every block.

#### UAT Scenarios (BDD)

```gherkin
Scenario: Recruiter reaches transformation evidence in credential-validation zone
  Given a recruiter has opened the About page from a CV link
  And the page has fully loaded
  When the recruiter scrolls past the certifications badge strip
  Then the transformation narrative section is the next content block visible
  And no career narrative blocks appear between certifications and transformation

Scenario: Evaluating leader reads philosophy then encounters transformation evidence without interruption
  Given an evaluating leader has read the Approach block
  And they are scrolling the About page top to bottom
  When they pass the certifications section
  Then they immediately encounter the transformation vignettes
  And the vignette lead sentences are visible without expanding any element

Scenario: Career narrative blocks remain accessible below the credential zone
  Given a visitor has read the transformation evidence
  When they continue scrolling
  Then the career narrative blocks are present below the transformation section
  And no content has been removed from the page

Scenario: Block order is expressed in content configuration not component code
  Given the block order has been updated in content/about.md
  When the site is built with nuxt generate
  Then the rendered About page reflects the new block order
  And no changes to Vue components or Nuxt pages are required
```

#### Acceptance Criteria

- [ ] `content/about.md` block array places `about-transformation` immediately after `about-certifications`
- [ ] No career narrative blocks appear between `about-certifications` and `about-transformation` in the rendered page
- [ ] All 11 blocks remain present (no blocks removed)
- [ ] `about-working-with-me`, `about-daedalus`, and `about-site` appear after `about-transformation`
- [ ] Nuxt SSG build passes with no errors after the reorder
- [ ] No changes made to `TransformationNarrative.vue` or any block `.md` file content (order only)

#### Outcome KPIs

- **Who**: Recruiter / Hiring Manager arriving via CV or LinkedIn
- **Does what**: reaches transformation evidence during the credential scan without abandoning the page
- **By how much**: transformation section is visible within 2 scrolls of the certifications badge strip (proxy: scroll depth)
- **Measured by**: Netlify contact form submissions (lagging); owner qualitative signal from early enquirers
- **Baseline**: zero — no analytics pre-launch; establish post-launch

#### Technical Notes

- Change is entirely in `content/about.md` front-matter (YAML block array reorder)
- No component changes, no new files, no CSS changes
- Build: `pnpm run generate` — no test changes anticipated
- Dependency: CN-20 `TransformationNarrative.vue` must be merged before this is visible (vignettes must exist)
- If Direction A (D-02) ships simultaneously, `about-career-start`, `about-career-facilitation`,
  `about-career-scale`, `about-career-now` are replaced by `about-era-digital`, `about-era-coaching`,
  `about-era-ai` — 4 blocks become 3; total drops from 11 to 10

---

### US-TNE-02: Direction A Career Narrative — Shorter About Page

**Note: This story depends on D-02 owner decision. It is a DRAFT pending that decision.**

#### Problem

James, a recruiter with fifteen seconds, scrolls from the certifications badge strip and hits
four sequential career narrative blocks — start, facilitation, scale, now — each a paragraph of
prose. At scan speed, these are indistinguishable from each other. The reading commitment required
to extract the career arc is disproportionate to the recruiter's available attention. Direction A
(already in the codebase as commented-out blocks) presents the same career arc as three era
blocks with images — scannable at a glance.

#### Who

- Recruiter / Hiring Manager — needs career arc signal at scan speed
- Evaluating Leader — benefits from a shorter, more structured journey through the page

#### Solution

Activate Direction A by replacing the four-block Direction B career sequence with the three-block
Direction A era sequence in `content/about.md`. No new files; no content authoring.

#### Elevator Pitch

**Before**: The About page career narrative requires reading four separate prose blocks to extract
a career arc that spans 30 years — a reading commitment most recruiters will not make.

**After**: Three era blocks, each with an image and a focused paragraph, present the same arc
in a format that can be scanned or read. Page length drops from 11 blocks to 8 (combined with
US-TNE-01 reorder).

**Decision enabled**: A recruiter who would have skipped the career narrative now absorbs the
career arc as a side-effect of scanning the images — enough context to understand the practitioner's
trajectory without committing to full-read prose.

#### Domain Examples

**Example 1 — James (Recruiter, 15-second budget)**: James scans the era images. "Digital era"
signals technical background. "Coaching era" signals the transition. "AI era" signals current
edge. He has the arc without reading a word.

**Example 2 — Alicia (Evaluating Leader, referred)**: Alicia reads each era block in full.
Three blocks, three focused paragraphs, three images. The progression is coherent and quicker
than four separate blocks.

**Example 3 — Direction B comparison (owner regression check)**: Owner opens the About page
after switching. Verifies that the career narrative substance has not been lost — only the
block count has changed. Direction B blocks remain in the codebase if reversal is needed.

#### UAT Scenarios (BDD)

```gherkin
Scenario: Direction A blocks render in correct era sequence
  Given Direction A is activated in content/about.md
  When the About page is built and rendered
  Then the career section shows three blocks: era-digital, era-coaching, era-ai
  And no Direction B blocks (career-start, career-facilitation, career-scale, career-now) appear

Scenario: Page length is reduced relative to Direction B
  Given Direction A replaces Direction B (3 blocks instead of 4)
  And US-TNE-01 reorder is also applied
  When the About page is rendered
  Then the total block count is 8 (not 11)

Scenario: Direction B blocks remain in codebase for reversal
  Given Direction A is active
  When a developer inspects content/about.md
  Then Direction B block names are present as commented-out configuration
  And can be restored without file recovery

Scenario: SSG build succeeds with Direction A activated
  Given content/about.md references Direction A block files
  When nuxt generate runs
  Then no missing content errors occur
  And all three era block files are found and rendered
```

#### Acceptance Criteria

- [ ] `content/about.md` block array uses `about-era-digital`, `about-era-coaching`, `about-era-ai` instead of the four Direction B career blocks
- [ ] Direction B block references are preserved as YAML comments in `content/about.md`
- [ ] Nuxt SSG build passes with no missing-content errors
- [ ] Rendered About page shows 8 blocks (combined with US-TNE-01) in this order: `about-approach`, `about-era-digital`, `about-era-coaching`, `about-era-ai`, `about-certifications`, `about-transformation`, `about-working-with-me`, `about-daedalus`
- [ ] `about-site` block placement is resolved per D-03 decision (include or exclude)

#### Outcome KPIs

- **Who**: Recruiter scanning the About page
- **Does what**: absorbs career arc without committing to full-prose read
- **By how much**: career narrative scan time reduced (proxy: shorter page = fewer scroll events before transformation evidence)
- **Measured by**: qualitative — owner judgment on first shareable site; Netlify form submissions (lagging)
- **Baseline**: not measurable pre-launch

#### Technical Notes

- Change is entirely in `content/about.md` front-matter
- Direction A block files (`about-era-digital`, `about-era-coaching`, `about-era-ai`) exist in `content/blocks/`
- No content authoring required — blocks are complete
- Verify `about-era-digital`, `about-era-coaching`, `about-era-ai` content is current and accurate before activating
- Dependency: owner must confirm D-02 before this story enters DESIGN
- This story can ship as a separate PR from US-TNE-01 (independent content change)

---

### US-TNE-03: `about-site` Block Disposition

**Note: This story depends on D-03 owner decision. Draft only.**

#### Problem

The `about-site` meta-note block currently closes the About page. It is a self-referential note
about the site itself — interesting to curious visitors but not relevant to either primary persona's
validation journey. It adds scroll distance without adding credential or transformation signal.

#### Who

- Owner — needs the page to end cleanly on practice-relevant content, not a technical footnote

#### Solution

Decide: retain, remove, or relocate. If removed, the About page ends at `about-daedalus` (the
origin story) — a clean, intentional close. If relocated, the footer or privacy page are candidates.

#### Elevator Pitch

**Before**: The About page closes with a paragraph about the site's technical construction —
visible to anyone who scrolls all the way down, but not serving either persona's decision.

**After**: The page closes at the Daedalus origin story — a thematically coherent end that
reinforces the practice's philosophy without a technical postscript.

**Decision enabled**: Owner can share the About page URL knowing the page ends on content that
represents the practice, not the site's build stack.

#### Domain Examples

**Example 1 — Standard recruiter visit**: Recruiter does not scroll to `about-site`. No impact
on their journey. This story is purely about page coherence for the full-read visitor.

**Example 2 — Curious evaluating leader**: Alicia reads top to bottom. Currently ends on a
meta-note about Nuxt. After removal, ends on the Daedalus myth — philosophy given the last word.

**Example 3 — Owner sharing**: Owner sends the About URL to a referral partner. No caveat
needed about "ignore that last bit."

#### UAT Scenarios (BDD)

```gherkin
Scenario: About page does not end on site meta-note (if removed)
  Given D-03 decision is to remove about-site
  When the About page is rendered
  Then the last visible content block is about-daedalus
  And no technical meta-commentary about the site appears

Scenario: about-site block is accessible elsewhere if retained (if relocated)
  Given D-03 decision is to relocate about-site
  When a visitor navigates to the designated destination (footer or privacy page)
  Then the about-site content is present and readable
```

#### Acceptance Criteria

- [ ] D-03 decision is confirmed by owner before implementation
- [ ] If removed: `about-site` is absent from `content/about.md` block array; block file is retained in `content/blocks/` for potential future use
- [ ] If relocated: block content appears at the agreed destination; About page block array excludes it
- [ ] Nuxt SSG build passes with no errors

#### Outcome KPIs

- **Who**: Any visitor who reads the About page to the end
- **Does what**: experiences a coherent close aligned with the practice philosophy
- **By how much**: not measurable — this is a content quality improvement, not a behavior change
- **Measured by**: owner judgment
- **Baseline**: current state (page ends on about-site)

#### Technical Notes

- Change is entirely in `content/about.md` block array (remove `about-site` entry)
- Block file `content/blocks/about-site.md` should be retained even if removed from array
- If relocated to footer: footer component or layout template change required — scope creep risk; recommend removal over relocation at v1

---

## Wave: DISCUSS / [REF] Story Map

### Backbone (About page visitor journey)

| Arrive | Credential scan | Transformation scan | Enquiry decision |
|---|---|---|---|
| Open About page | Certifications badge strip | Transformation vignettes | Contact form or external action |

### Walking Skeleton

US-TNE-01 (reorder only) — the thinnest possible change that puts transformation evidence in
the credential zone. Zero new content, zero new components, one YAML edit.

### Release 1: Credential Zone Coherence (Must Have)

US-TNE-01 — block reorder in `content/about.md`

Outcome targeted: recruiter reaches transformation evidence during credential scan.
KPI proxy: contact form submissions from credential-validation path.

Dependency: CN-20 `TransformationNarrative.vue` must be merged.

### Release 2: Page Length Reduction (Should Have, pending D-02)

US-TNE-02 — Direction A career narrative activation

Outcome targeted: career arc scannable without full-prose read; page 3 blocks shorter.
Independent of Release 1; can ship in same PR or separately.

### Release 3: Page End Coherence (Could Have, pending D-03)

US-TNE-03 — `about-site` block disposition

Outcome targeted: About page closes on practice-relevant content.
Lowest priority; no persona impact at scan speed.

### Priority Rationale

US-TNE-01 first: directly resolves the named problem (transformation evidence buried). Zero
risk. Content edit only. Recruiter and leader both served immediately.

US-TNE-02 second: reduces page length, improves scanability. Depends on D-02 decision.
Independent of US-TNE-01 — neither blocks the other.

US-TNE-03 last: no persona impact at scan speed. Owner quality decision. Can be deferred
indefinitely without affecting the core problem statement.

---

## Wave: DISCUSS / [REF] Out of Scope

- Changes to `TransformationNarrative.vue` component or vignette content (CN-20 scope)
- New page at `/work`, `/transformation`, or `/case-studies`
- New navigation items
- Services page content changes
- Vignette drafting (P-01–P-05 from CN-20 DISCOVER — owner pre-requisites)
- Analytics instrumentation (no analytics installed; post-launch consideration)
- Direction A era block content authoring (blocks exist; content review is pre-implementation)

---

## Wave: DISCUSS / [REF] Pre-requisites

| ID | Pre-requisite | Owner action? | Blocks |
|---|---|---|---|
| PRE-01 | D-01 decision confirmed (IA direction) | Yes | US-TNE-01 DESIGN |
| PRE-02 | CN-20 `TransformationNarrative.vue` merged (vignettes exist on page) | No (engineering) | US-TNE-01 full value |
| PRE-03 | D-02 decision confirmed (Direction A vs B) | Yes | US-TNE-02 DESIGN |
| PRE-04 | D-03 decision confirmed (`about-site` disposition) | Yes | US-TNE-03 DESIGN |
| PRE-05 | Direction A era block content verified as current and accurate | Yes | US-TNE-02 implementation |

---

## Wave: DISCUSS / [REF] DoR Validation

### US-TNE-01

| DoR Item | Status | Evidence |
|---|---|---|
| Problem statement clear, domain language | PASS | Recruiter scan speed / buried transformation evidence articulated |
| User/persona with specific characteristics | PASS | Recruiter (10s scan) and Evaluating Leader (60s) — established in STR-1, CN-20 |
| 3+ domain examples with real data | PASS | Sarah, Marcus, Priya — real scan behaviours and org contexts |
| UAT in Given/When/Then (3–7 scenarios) | PASS | 4 scenarios |
| AC derived from UAT | PASS | 6 AC items traceable to scenarios |
| Right-sized (1–3 days, 3–7 scenarios) | PASS | 0.5 days; 4 scenarios; single YAML edit |
| Technical notes: constraints/dependencies | PASS | CN-20 dependency noted; SSG build implications noted |
| Dependencies resolved or tracked | PASS | CN-20 as PRE-02; D-01 owner decision as PRE-01 |

**DoR Status: PASSED** — pending D-01 owner decision before DESIGN handoff.

### US-TNE-02

| DoR Item | Status | Evidence |
|---|---|---|
| Problem statement clear, domain language | PASS | Four prose blocks at scan speed = indistinguishable noise |
| User/persona with specific characteristics | PASS | Recruiter (scan speed) and Evaluating Leader (shorter page) |
| 3+ domain examples with real data | PASS | James, Alicia, owner regression check |
| UAT in Given/When/Then (3–7 scenarios) | PASS | 4 scenarios |
| AC derived from UAT | PASS | 5 AC items |
| Right-sized (1–3 days, 3–7 scenarios) | PASS | 0.5 days; 4 scenarios; one YAML edit |
| Technical notes: constraints/dependencies | PASS | D-02 dependency noted; no new files required |
| Dependencies resolved or tracked | CONDITIONAL | D-02 owner decision is PRE-03 — blocked until confirmed |

**DoR Status: BLOCKED** — pending D-02 owner decision. Story is ready to enter DESIGN immediately
upon D-02 confirmation.

### US-TNE-03

| DoR Item | Status | Evidence |
|---|---|---|
| Problem statement clear, domain language | PASS | Page ends on technical footnote not practice content |
| User/persona with specific characteristics | PASS | Owner as primary stakeholder; full-read visitor |
| 3+ domain examples with real data | PASS | Recruiter (no impact), Alicia, owner sharing scenario |
| UAT in Given/When/Then (3–7 scenarios) | PASS | 2 scenarios (right-sized; decision is binary) |
| AC derived from UAT | PASS | 3 AC items |
| Right-sized (1–3 days, 3–7 scenarios) | PASS | 0.25 days; smallest possible scope |
| Technical notes: constraints/dependencies | PASS | Footer relocation scope creep risk noted |
| Dependencies resolved or tracked | CONDITIONAL | D-03 owner decision is PRE-04 — blocked until confirmed |

**DoR Status: BLOCKED** — pending D-03 owner decision.
