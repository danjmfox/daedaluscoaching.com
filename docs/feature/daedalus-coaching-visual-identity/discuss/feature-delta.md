# Feature Delta — Daedalus Coaching Visual Identity

```yaml
feature_id: daedalus-coaching-visual-identity
wave: DISCUSS
date: 2026-05-13
status: STABILITY TEST IN PROGRESS — clock started 2026-05-13; verdict due 2026-05-27
density: lean + ask-intelligent
```

---

## Wave: DISCUSS / [REF] Persona ID

| Persona                                        | Role in this feature                                               | Calibration target                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| owner-editor                                   | Establishes the brief; evaluates comparables; commits to direction | Primary — this is the process persona                                       |
| persona-prospective-client (org evaluator)     | Experiences the committed identity; most demanding evaluator       | Calibration anchor for all design decisions                                 |
| persona-prospective-client (individual leader) | Confirms referral via visual register                              | Accepts institutional register; does not require separate visual expression |
| persona-referral-partner                       | Vets sharability before recommending                               | Implicitly requires no-caveat sharability                                   |

Visual identity is calibrated for the org evaluator (highest credibility bar). All other personas accept and often prefer the institutional register. Copy does segmentation; identity does trust establishment.

---

## Wave: DISCUSS / [REF] JTBD One-Liner

**JOB-VI-001**: When the practice's visual identity needs to be settled, the owner hires a brief-led process to evaluate directions using constraints, not aesthetic preference — so the committed direction does not require a 5th experiment.

---

## Wave: DISCUSS / [REF] H-V4 Gate Resolution

Status: CONDITIONAL PASS — sufficient constraint vocabulary extracted

Owner answer (verbatim): _"I don't know how I should present. I don't have a 'style' or brand. I'm not very good at design so it all looked awful. I couldn't balance Enterprise Arch seriousness, Agile coach facilitator energy, and Individual Coach confidentiality, credibility."_

**Extracted constraint vocabulary — the three-way tension:**

| Dimension                                      | What it must signal                                                                | To whom                                 |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------- |
| Enterprise Architecture seriousness            | Operates at board/CFO/programme-sponsor level                                      | Org evaluator                           |
| Agile coach facilitator energy                 | Works dynamically with teams; not just one-to-one; has a distinct philosophy       | Team-context clients, referral partners |
| Individual Coach confidentiality + credibility | Can be trusted with senior leaders' real challenges; is a real person, not a brand | Individual leader (warm referral)       |

**Derived rejection criterion (testable):** A direction fails if a viewer who knows the practice can identify only one of the three dimensions in the visual language. The test question: _"Looking at this, can you see all three simultaneously — or does one dominate?"_

**Alternative hypothesis (alive):** "I'm not very good at design so it all looked awful" keeps the execution-quality hypothesis live. The brief-led process is the intervention; if it fails to produce a settled direction, DISCOVER must be revisited with the execution-quality hypothesis elevated to primary.

---

## Wave: DISCUSS / [REF] Locked Decisions

| ID    | Decision                                                                                                                                                                                                                                                                       | Reversible                                                   | Source                         |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| LD-01 | Brief-before-tokens                                                                                                                                                                                                                                                            | No                                                           | DISCOVER problem-validation.md |
| LD-02 | One identity for all three tiers                                                                                                                                                                                                                                               | Low — needs counter-evidence                                 | DISCOVER H-V2                  |
| LD-03 | Typography leads, colour follows                                                                                                                                                                                                                                               | Low — only if comparables disconfirm                         | DISCOVER H-V5                  |
| LD-04 | Metaphor-free visual language                                                                                                                                                                                                                                                  | No — failure pattern is unambiguous                          | DISCOVER                       |
| LD-05 | Warm neutral palette (not cool/grey)                                                                                                                                                                                                                                           | Yes — comparables may show exceptions                        | DISCOVER                       |
| LD-06 | Done criterion: 2-week behavioural test                                                                                                                                                                                                                                        | Yes — if stronger criterion emerges                          | DISCOVER H-V4                  |
| LD-07 | Three-way tension (Enterprise/Agile/Individual) is the brief's primary constraint                                                                                                                                                                                              | Yes — comparables exercise may refine                        | H-V4 owner answer              |
| LD-08 | Deep-dive research + peer review before any token decision                                                                                                                                                                                                                     | No — owner decision                                          | DISCUSS                        |
| LD-09 | Minimal walking skeleton: brief → typography → colour+spacing → one page → 2-week test                                                                                                                                                                                         | Yes — if walking skeleton reveals a gap                      | DISCUSS                        |
| LD-10 | "Practitioner, not platform" — visual identity must not read as thought-leader/speaker site                                                                                                                                                                                    | No — owner stated explicitly                                 | C1 evaluation                  |
| LD-11 | "Individual seniority, not institutional scale" — must read as a solo practitioner with depth, not a firm with reach; "corporate-adjacent" credibility without corporate aesthetic                                                                                             | No — owner stated explicitly                                 | C2 evaluation                  |
| LD-12 | "Invitation stance" — the site is present, not reaching; it waits to be found by the right person rather than pursuing the visitor; credentials are placed not foregrounded; CTA offers not demands; whitespace is settled not sparse                                          | No — relational posture of the practice                      | C3 evaluation                  |
| LD-13 | Humanist serif is the typeface category — letterform carries warmth and authority simultaneously; the individual-human quality of humanist design holds the practitioner's position without stating it; geometric and restrained sans-serif eliminated by comparables evidence | No — confirmed by owner using constraint vocabulary after C7 | C1–C7 pattern                  |

---

## Wave: DISCUSS / [REF] Phase 1 — JTBD Analysis

### Primary Job (JOB-VI-001)

_See `docs/product/jobs.yaml` for full job record including four forces._

**Functional:** Document the brief; evaluate comparables; select typeface category; commit all tokens; ship; pass 2-week test; close feature.

**Emotional:** Feel confident the direction is right without relying on aesthetic vocabulary. Know the "done" criterion before starting.

**Social:** Present a practice identity that reflects who the owner is and who they serve — not a generic template, not any of the 4 prior experiments.

**JTBD-to-Story bridge:**

| Job                                          | Stories                                                               |
| -------------------------------------------- | --------------------------------------------------------------------- |
| JOB-VI-001 (owner: brief + process)          | S-VI-001 (brief), S-VI-002 (comparables), S-VI-006 (stability test)   |
| JOB-VI-002 (org evaluator: first impression) | S-VI-003 (typography), S-VI-004 (colour+spacing), S-VI-005 (homepage) |
| JOB-VI-003 (individual leader: confirmation) | S-VI-004, S-VI-005                                                    |
| JOB-VI-004 (referral partner: sharability)   | S-VI-005                                                              |

---

## Wave: DISCUSS / [REF] Phase 1.5 — Scope Assessment

| Oversized signal      | Threshold                              | Actual                                                           | Status          |
| --------------------- | -------------------------------------- | ---------------------------------------------------------------- | --------------- |
| User story count      | >10                                    | 6                                                                | PASS            |
| Bounded contexts      | >3                                     | 3 (brief / token system / rendered pages)                        | BORDERLINE PASS |
| WS integration points | >5                                     | 4 (brief → typography tokens → colour+spacing tokens → homepage) | PASS            |
| Effort estimate       | >2 weeks                               | 3 active days + 14-day stability test                            | PASS            |
| Independent outcomes  | Would ship separately without coupling | Slice 01 (brief+comparables) ships independently                 | PASS            |

**Scope Assessment: PASS.** Feature is right-sized. Deep-dive research extends Slice 01 timeline but does not push into oversized territory.

---

## Wave: DISCUSS / [REF] Phase 2 — Comparables Exercise

### Interactive Gate — Awaiting Owner Evaluation

See comparables evaluation section in the DISCUSS response. Results go in the table below.

The comparables exercise must be completed before any typography decision (LD-01 + LD-03).
Results will be incorporated into this section once owner evaluations are received.

### Analysis framework

For each comparable, record:

1. **Typeface category** — serif / humanist sans-serif / geometric sans-serif / mixed
2. **Weight range** — light-only / light+regular / full range
3. **Colour register** — warm neutrals / cool neutrals / monochrome / accent-led
4. **Visual metaphor presence** — none / subtle / dominant
5. **Trust signal placement** — above fold / integrated into narrative / below fold
6. **Owner response** — `works for this practice` / `principle works, aesthetics wrong` / `does not work — [state why]`
7. **Tensions expressed** — Enterprise seriousness / Agile energy / Individual credibility / two or more

### Proposed comparables

| #   | Site                 | URL                       | Category                           | My analysis                                                                                                                                                                                                                                 |
| --- | -------------------- | ------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | Andy Polaine         | polaine.com/coaching/     | Correct comparable                 | Humanist sans-serif; cool neutral + teal accent; subtle metaphor (cockpit); testimonials woven in; SENIOR PRACTITIONER register; holds rigour + warmth                                                                                      |
| C2  | Reos Partners        | reospartners.com          | Correct comparable (firm)          | Geometric+humanist; cool-dominant palette; network/globe metaphors; mission-led trust signals; resolves slightly toward rigour                                                                                                              |
| C3  | Harthill             | harthill.co.uk            | Adjacent field (adult development) | Clean sans-serif; warm orange accent on neutral; transformation metaphors (butterflies, chrysalis); credentials in narrative; holds rigour + warmth equally                                                                                 |
| C4  | Tavistock Consulting | tavistockconsulting.co.uk | "Close but not right"              | Humanist sans-serif; cool blues/grays; formal; clinical; resolves toward rigour over warmth                                                                                                                                                 |
| C5  | MBS Works            | mbs.works                 | Anti-comparable                    | Humanist sans-serif; warm + vibrant accent; organic imagery (hibiscus, nature); informal/expressive; resolves toward warmth over credibility                                                                                                |
| C6  | Animas Coaching      | animascoaching.com        | Anti-comparable (sector default)   | Contemporary sans-serif; badge-heavy; warm professionalism; marketing-oriented; feels like a school not a practitioner                                                                                                                      |
| C7  | [Owner to source]    |                           | Non-UK, non-coaching               | Required: at least 1 example from a professional services context outside coaching. Suggested starting point: nybooks.com — typographic authority, no decoration, tests whether "confident without trying" translates outside developer UI. |

### Owner evaluation responses

| Site                                     | Verdict                                                                                                             | Tensions expressed                                                                                         | Notes                                                                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1 Andy Polaine                          | does not work — thought-leader/speaker platform; monochrome, no warmth; vanilla typeface                            | Coaching + thought-leader only — not Enterprise/Agile/Individual simultaneously                            | Drawn to his anti-leaderism philosophy, not his visual identity                                                                                           |
| C2 Reos Partners                         | does not work — too corporate; institutional scale (80+ countries) not solo practitioner seniority                  | Institutional scale only — none of the three tensions as individual practice                               | Warmer palette than C1 but heavy/dark; decorative lines without meaning; "corporate-adjacent" needed, this is the wrong side of that line                 |
| C3 Harthill                              | much closer — "who I am"; warm/natural/earthy/calm/(eco)systems                                                     | Enterprise seriousness (systems+complexity) + Individual coaching (calm, growth) — strongest multi-tension | Typeface has "colour"/personality; contrast too low; warmth is photography-dependent (cannot replicate)                                                   |
| C4 Tavistock Consulting                  | does not work / anti-comparable — fully awful; sharp geometry, compressed type, poor execution                      | Institutional formality only; resolves entirely to one axis                                                | Execution-quality failure as well as register failure; "looks like what I might design" — useful negative mirror                                          |
| C5 MBS Works                             | does not work / anti-comparable — personality site; warmth + performance are primary trust carriers                 | Individual warmth only — no enterprise credibility signal                                                  | Works for MBS because reputation anchor (books) exists; requires extroversion as design posture; fails LD-12                                              |
| C6 Animas Coaching                       | does not work — clinical/medical colours, gradient decorative text, simplistic full-width, no text bounding         | Consumer coaching only — no enterprise register                                                            | Fails LD-04 (gradient text = decoration), fails LD-05 (cool/clinical palette), fails LD-11 (school not practitioner)                                      |
| C7 James O'Halloran (jamesohalloran.com) | closest / partially works — warm unhurried rhythm, invitation stance, B Corp + trusted testimonial placed correctly | Enterprise credibility + Individual warmth — language carries trust signal design supports                 | Contemporary sans-serif works because language compensates; warmth is photography-dependent; credential placement model is right for B Corp + 1%FTP + ICF |

### Typeface category pattern — CONFIRMED

**Finding (S-VI-002 AC5):** No purely sans-serif site in the comparable set held all three tensions through typography alone. The two closest (C3 Harthill, C7 James O'Halloran) both rely on photography or language to carry warmth. The site's constraint is harder: typography and spacing must carry the warmth without photography budget.

**Confirmed: LD-13 — Humanist serif typeface category.**

Owner confirmation: _"brings seriousness and warmth to AI leadership questions"_ — constraint vocabulary, not aesthetic preference. Slice 01 learning hypothesis confirmed: the brief is working.

| Eliminated direction            | Evidence                                                                  |
| ------------------------------- | ------------------------------------------------------------------------- |
| Geometric sans-serif            | C1 (Polaine), C6 (Animas) — no warmth register                            |
| Restrained monochrome sans      | C2 (Reos), C4 (Tavistock) — institutional, excludes individual axis       |
| Personality-first / performance | C5 (MBS) — requires external reputation anchor + extroversion             |
| Photography-dependent warmth    | C3, C7 — warmth achieved through imagery, not letterform; cannot transfer |

**Typeface requirements for Slice 02:**

- Humanist serif or mixed serif/sans system
- Warmth in the letterform — humanist proportions, calligraphic influence or visible ink traps
- Strong contrast (Harthill shows warmth ≠ low contrast)
- Compatible with warm cream background + teal/coral logo palette
- Potentially: serif headings / humanist sans body (earthy authority + readable clarity)

**Additional finding:** No direct comparables exist for this practice's intersection (Agile Coach + EA + Individual Leader). Visual register must be originated, not borrowed from a recognisable category.

**Credential placement finding (from C7):** B Corp + trusted testimonial placed without ceremony is the right model. Applies directly to Slice 04 AC2 (credentials above fold as typographic elements, not badges).

---

## Wave: DISCUSS / [REF] User Stories

### S-VI-001 — Brief document completed

```yaml
job_id: JOB-VI-001
```

As the practice owner, when evaluating a candidate visual direction, I want to check it against a documented brief that holds all three professional tensions explicitly, so I can confirm or reject it using constraint vocabulary, not aesthetic preference.

#### Elevator Pitch — S-VI-001

Before: Every direction is evaluated with "does this feel right?" — no testable criterion, abandonment based on unarticulated dissatisfaction.
After: open `docs/feature/daedalus-coaching-visual-identity/discuss/feature-delta.md` → read the three-way tension constraints and 4 DISCOVER brief statements → state whether any candidate direction passes or fails each constraint.
Decision enabled: Whether a candidate direction is worth implementing at all — a go/no-go before any code is written.

**Acceptance Criteria:**

- AC1: The brief holds all three tensions as named, observable constraints — each with at least one rejection signal
- AC2: Owner can read the brief and articulate why a specific example "fails" using constraint vocabulary referencing one of the three tensions by name — e.g. "C5 (MBS Works) fails Enterprise seriousness because warmth is the primary trust carrier and there is no credibility signal for an org evaluator"
- AC3: The 4 DISCOVER evaluation statements are present as supplementary test cases
- AC4: The brief contains explicit "what this is NOT" constraints (no metaphors; no geometric-only; no cool grey)
- AC5: Comparables exercise completed (S-VI-002) before this story is closed — brief is grounded in evidence

---

### S-VI-002 — Comparables exercise completed

```yaml
job_id: JOB-VI-001, JOB-VI-002
```

As the practice owner, when committing to a typographic direction, I want to have evaluated 5-7 comparable sites against the brief framework, so my typography choice is grounded in what works for my specific client tier — not personal aesthetic preference.

#### Elevator Pitch — S-VI-002

Before: Typography chosen from reaction to a single reference (shadcn/ui) — risks producing developer-adjacent or generic-corporate result.
After: review completed comparables analysis in `feature-delta.md` → see pattern across 5-7 evaluated sites → identify which typeface category holds all three tensions simultaneously.
Decision enabled: Typeface category (humanist serif / humanist sans-serif / mixed) — committed before implementation begins.

**Acceptance Criteria:**

- AC1: 5-7 sites evaluated using the 6-dimension framework
- AC2: At least 1 non-UK non-coaching example included
- AC3: At least 1 explicit anti-comparable with stated rejection reason referencing the three-way tension
- AC4: Each site categorised as "works / principle works but wrong aesthetic / does not work" with reason
- AC5: Evaluations reveal a consistent pattern identifying typeface category — documented as a finding in this section
- AC6: Owner peer review of brief completed before typography tokens are written (LD-08)

---

### S-VI-003 — Typography tokens committed

```yaml
job_id: JOB-VI-002, JOB-VI-003
```

As a visitor landing on the site for the first time, I want the typography system to signal senior practitioner credibility before I read any copy, so I can decide within 5 seconds whether this practice is worth my time.

#### Elevator Pitch — S-VI-003

Before: Website uses generic framework typography — no trust signal, no differentiation from any other coach site.
After: navigate to `localhost:3000/` → page loads → typography communicates "serious, warm, unhurried practitioner" without reading copy → holds all three tensions simultaneously.
Decision enabled: Whether to invest 60 seconds reading the content (org evaluator), or whether this is the serious practitioner my colleague described (individual leader).

**Acceptance Criteria:**

- AC1: `assets/tokens.css` contains font-family, font-size scale (min 5 steps), line-height, and font-weight tokens
- AC2: Typeface category was selected via comparables evidence (S-VI-002 closed before S-VI-003 begins)
- AC3: Stylelint passes — no token override violations
- AC4: Typography applied to at least one rendered page
- AC5: Owner reviews rendered typography and confirms it holds all three tensions without resolving toward one

_Note: S-VI-003 is gated on S-VI-002 completion and peer review of brief._

---

### S-VI-004 — Colour and spacing tokens committed

```yaml
job_id: JOB-VI-002, JOB-VI-003
```

As an organisation evaluator landing on the site, I want the colour register and spacing to reinforce the typographic trust signal, so the overall visual system communicates "unhurried, senior practitioner" rather than "trying to look sophisticated."

#### Elevator Pitch — S-VI-004

Before: Site uses default/generic colours and spacing — no premium register, indistinguishable from template sites.
After: navigate to `localhost:3000/` → warm neutral background, near-black text with warm undertone, generous whitespace, functional accent on interactive elements only → colour and spacing reinforce typography without competing with it.
Decision enabled: Whether the full visual system holds the trust register — go/no-go for homepage application.

**Acceptance Criteria:**

- AC1: `assets/tokens.css` contains colour tokens: 2-3 warm neutrals (off-white / warm-white / near-black with brown undertone), 1 functional accent (not decorative)
- AC2: `assets/tokens.css` contains spacing scale (min 8 steps; enforces generous vertical rhythm)
- AC3: Colour register is warm neutral (not cool/grey) — passes check against LD-05
- AC4: Functional accent used only for interactive elements and key credentials — not decorative fills
- AC5: Stylelint passes — no raw hex/rgb values outside token definitions

---

### S-VI-005 — Homepage walking skeleton

```yaml
job_id: JOB-VI-002, JOB-VI-003, JOB-VI-004
```

As the practice owner, evaluating the complete visual direction with all tokens applied to the homepage, I want to assess whether it earns all 4 DISCOVER evaluation statements, so I can make the go/no-go decision for the 2-week stability test.

#### Elevator Pitch — S-VI-005

Before: Tokens are committed but the homepage doesn't consistently use them — the direction cannot be evaluated as a whole.
After: navigate to `localhost:3000/` → homepage renders with all token-driven typography, colour, and spacing → evaluate against the 4 DISCOVER brief statements.
Decision enabled: Whether to start the 2-week stability test clock — or make adjustments before committing.

**Acceptance Criteria:**

- AC1: `pages/index.vue` uses only token-driven CSS values (Stylelint passes)
- AC2: B-Corp, 1%FTP, and ICF credentials are visible above fold using typographic treatment (not icon badges per DISCOVER LD-07)
- AC3: Single CTA (contact) is visible and reachable in ≤2 clicks
- AC4: Owner records evaluation against all 4 DISCOVER brief statements (each rated pass/fail with notes)
- AC5: At least 3 of 4 statements earn a PASS verdict (PASS = "I would recommend this to a peer in my network without caveat"; FAIL = "I would not")
- AC6: No metaphor-driven visual elements (LD-04)

---

### S-VI-006 — 2-week stability test

```yaml
job_id: JOB-VI-001
```

As the practice owner, 14 days after the committed visual direction is live, I want to review the site and find I have no desire to change it — so that the brief-before-tokens intervention is confirmed to have prevented a 5th experiment.

#### Elevator Pitch — S-VI-006

Before: No verifiable done criterion — directions were abandoned after varying periods with no defined endpoint, always based on unarticulated dissatisfaction.
After: visit `daedaluscoaching.com` at day 14 → apply the 4 DISCOVER brief statements → record verdict → confirm "no change desired."
Decision enabled: Whether to close JOB-VI-001 and the visual identity feature — or, if changes are still desired, trigger a DISCOVER re-entry with the execution-quality alternative hypothesis elevated to primary.

**Acceptance Criteria:**

- AC1: Owner records a PASS/FAIL verdict (with specific evidence) against each of the 4 DISCOVER brief statements at day 14 — using the same framework applied at S-VI-005
- AC2: Owner records explicitly: "no changes desired" (binary — yes or no, not "probably"); this is in addition to, not instead of, the four-statement verdicts
- AC3: If changes ARE desired, a DISCOVER re-entry issue is created with the alternative hypothesis (execution quality) elevated to primary — this is not failure, it is the process working correctly
- AC4: Verdict document committed to `docs/feature/daedalus-coaching-visual-identity/stability-test.md`

---

## Wave: DISCUSS / [REF] Story Map

### Backbone activities

```text
Establish Brief → Evaluate Comparables → Commit Typography → Commit Colour+Spacing → Implement Tokens → Evaluate Skeleton → Stability Test
```

### Slices (Elephant Carpaccio — ≤1 day each)

| Slice                  | Stories            | Learning hypothesis                                                                                   | Estimate             |
| ---------------------- | ------------------ | ----------------------------------------------------------------------------------------------------- | -------------------- |
| 01 Brief + Comparables | S-VI-001, S-VI-002 | Disproves execution-quality alternative if owner can evaluate directions using brief vocabulary       | 1–2 days (deep-dive) |
| 02 Typography decision | S-VI-003           | Confirms typography as primary trust carrier if owner distinguishes options using constraint language | ≤1 day               |
| 03 Colour + spacing    | S-VI-004           | Confirms warm neutrals reinforce (not override) typography choice                                     | ≤1 day               |
| 04 Homepage skeleton   | S-VI-005           | Confirms minimal skeleton is sufficient for 2-week stability evaluation                               | ≤1 day               |
| M1 Stability test      | S-VI-006           | Confirms brief-before-tokens prevented a 5th experiment                                               | 14-day clock         |

### Carpaccio taste tests

- Slice 01 ships independently of implementation ✓ — no code, just documents
- Slice 02 depends on Slice 01 complete ✓ — correctly sequenced, not circular
- Each slice disproves a real hypothesis ✓ — not decorative
- Production data: comparables are real external sites; stability test uses live deployed site ✓
- No slice uses only @infrastructure stories ✓ — every slice has owner-visible value

_Slice briefs at `docs/feature/daedalus-coaching-visual-identity/slices/`_

---

## Wave: DISCUSS / [REF] Outcome KPIs

| KPI                     | Measure                                                                                                   | Target                                                    | Method                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------- |
| Primary: stability test | Owner records "no changes desired" at day 14                                                              | Binary YES                                                | Verdict document S-VI-006 AC2         |
| Brief quality           | Owner can state a constraint-based rejection reason for any candidate direction                           | 100% of directions evaluated without aesthetic vocabulary | Observer check during Slice 01 review |
| Visual trust signal     | 3 people with correct profile say "I would not be embarrassed to recommend this practitioner to my board" | ≥2 of 3                                                   | Informal test post-homepage-skeleton  |
| Token system integrity  | Stylelint: zero token override violations                                                                 | 0 violations                                              | CI gate (pre-existing)                |
| Above-fold credentials  | ICF, B-Corp, 1%FTP visible without scroll                                                                 | All 3 above fold on desktop + mobile                      | Playwright assertion on homepage      |

---

## Wave: DISCUSS / [REF] Definition of Done

- [ ] JTBD analysis complete with four forces documented for primary job (JOB-VI-001)
- [ ] All 4 jobs in jobs.yaml with functional/emotional/social dimensions
- [ ] H-V4 gate cleared — constraint vocabulary extracted and documented
- [x] Comparables exercise completed: 7 sites, 6-dimension framework, owner responses
- [x] Typeface category pattern documented from comparables evaluations — humanist serif confirmed (LD-13)
- [ ] Brief peer review completed before any token decision (LD-08)
- [ ] 6 user stories with elevator pitches, ACs, job_id references
- [ ] Story map with 4 slices + milestone; all Carpaccio taste tests passed
- [ ] Slice briefs at docs/feature/.../slices/ (one per slice, ≤100 lines each)
- [ ] Outcome KPIs with numeric targets and measurement methods
- [ ] DoR validation: all 9 items with evidence

---

## Wave: DISCUSS / [REF] Out-of-Scope

| Item                               | Status                 | Rationale                                                                                                                         |
| ---------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Blog                               | OUT                    | Prior discovery: visitors will not read before first call                                                                         |
| Bookshelf                          | OUT                    | Same                                                                                                                              |
| Stock photography                  | OUT                    | Practitioner's presence is the differentiator                                                                                     |
| Tier-specific visual expressions   | OUT                    | LD-02: one identity; copy does segmentation                                                                                       |
| Metaphor-driven elements           | OUT                    | LD-04: failure pattern is unambiguous                                                                                             |
| Geometric-only sans-serif          | OUT                    | Developer-tool signal; wrong for coaching register                                                                                |
| Cool grey neutrals                 | OUT                    | Industrial register; wrong for coaching relationship                                                                              |
| Multi-register design system       | OUT                    | LD-02 confirmed                                                                                                                   |
| Pages beyond homepage              | OUT for WS             | Expand after stability test passes                                                                                                |
| Page transition / view transitions | OUT — deferred         | Valid UX enhancement (CSS @view-transition); separate interaction feature; not a token decision                                   |
| AI positioning as service offering | OUT — content strategy | AI transformation work belongs as practitioner evidence in credentials/work section — placed, not labelled; consistent with LD-12 |

---

## Wave: DISCUSS / [REF] Walking Skeleton Strategy

Strategy A — Slice (vertical end-to-end)

Brief → typography tokens in `assets/tokens.css` → homepage applies tokens → owner evaluates → 2-week stability test.

The skeleton proves: (1) the brief-to-tokens pipeline works, (2) the visual direction earns the DISCOVER brief statements on a real rendered page, (3) the done criterion is verifiable without completing all pages.

The skeleton does NOT prove full site coverage (about, contact, Swoopy embed). Those expand after stability test passes.

---

## Wave: DISCUSS / [REF] Driving Ports

| Port                   | Surface                                                                 | Description                                        |
| ---------------------- | ----------------------------------------------------------------------- | -------------------------------------------------- |
| Brief evaluation       | `feature-delta.md` (this document)                                      | Owner reads and applies to candidate directions    |
| Comparables evaluation | Interactive — owner visits sites and records responses in this document | Inbound signal that grounds the brief              |
| Token commit           | `assets/tokens.css`                                                     | CSS Custom Properties — single design token source |
| Stylelint enforcement  | Pre-commit + CI                                                         | Enforces token usage; violation = commit blocked   |
| Homepage render        | `localhost:3000/` (dev) / `daedaluscoaching.com` (prod)                 | Owner evaluation surface                           |
| Stability test         | `daedaluscoaching.com` at day 14                                        | Final evaluation port                              |

---

## Wave: DISCUSS / [REF] Pre-requisites

| Dependency                         | Status                                             | Blocker?                                    |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------- |
| DISCOVER wave                      | APPROVED FOR HANDOFF                               | —                                           |
| H-V4 gate                          | CONDITIONAL PASS (constraint vocabulary extracted) | Comparables must complete before typography |
| Owner evaluation of comparables    | COMPLETE — C1–C7 evaluated; LD-13 locked           | —                                           |
| Peer review of brief               | PENDING (LD-08)                                    | Yes — blocks Slice 02 (typography)          |
| docs/product/jobs.yaml             | CREATED (this wave)                                | —                                           |
| assets/tokens.css                  | EXISTS — needs content                             | Slice 02–03 output                          |
| stylelint-declaration-strict-value | Installed per architecture brief                   | —                                           |

---

## Wave: DISCUSS / [REF] DoR Validation

| #   | DoR Item                                                      | Status | Evidence                                                                                              |
| --- | ------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| 1   | Story fits in one sprint / bounded scope                      | PASS   | All 6 stories independently completable; largest is Slice 01 (1–2 days)                               |
| 2   | Acceptance criteria testable                                  | PASS   | All ACs reference observable artefacts or binary owner responses                                      |
| 3   | Every story traces to a job_id                                | PASS   | All stories reference JOB-VI-001 through JOB-VI-004                                                   |
| 4   | Elevator pitch valid: real entry point, observable output     | PASS   | All stories reference navigable URLs or readable documents                                            |
| 5   | Dependencies identified                                       | PASS   | S-VI-002 gates S-VI-003; comparables gate all token decisions                                         |
| 6   | Non-functional requirements clear                             | PASS   | Stylelint enforcement, Playwright assertions, warm neutral constraints                                |
| 7   | Definition of Done understood by owner                        | PASS   | 9-item DoD above; done criterion is behavioural (2-week test)                                         |
| 8   | Stories estimated                                             | PASS   | Slice estimates in story map table                                                                    |
| 9   | Slice composition: each slice has ≥1 user-visible value story | PASS   | Slice 01 → brief document owner can use; Slices 02–04 → rendered pages; Milestone → stability verdict |

**DoR: PASS** (conditional on comparables evaluation completing the Slice 01 ACs)

---

## Wave: DISCUSS / [REF] Wave Decisions

```markdown
# DISCUSS Decisions — daedalus-coaching-visual-identity

## Key Decisions

- [LD-07] Three-way tension (Enterprise/Agile/Individual) is the primary brief constraint:
  extracted from H-V4 owner answer — this is constraint vocabulary, not aesthetic preference.
  (see: H-V4 Gate Resolution section above)
- [LD-08] Deep-dive research + peer review before token decisions:
  owner decision; adds 1 round to Slice 01 but is load-bearing given the alternative hypothesis.
- [LD-09] Minimal walking skeleton:
  brief → typography → colour+spacing → one page → 2-week test.
  Proves the brief-to-tokens pipeline without requiring full-site completion.

## Requirements Summary

- Primary job: Owner establishes a brief that holds the three-way tension,
  evaluates comparables, commits tokens, and passes the 2-week stability test.
- Walking skeleton: homepage only, post-comparables.
- Feature type: cross-cutting (design tokens are architectural infrastructure with
  user-visible outcomes — not infrastructure-only).

## Constraints Established

- Comparables exercise must complete before typography decision (non-negotiable gate)
- Peer review of brief before tokens (owner decision, LD-08)
- Execution-quality alternative hypothesis is live — brief-led process is the intervention,
  not a guarantee

## Upstream Changes

- No DISCOVER assumptions changed.
  The H-V4 answer confirmed the DISCOVER framing (brief absence as root cause is still primary).
  The execution-quality alternative hypothesis remains live as documented in problem-validation.md.
```
