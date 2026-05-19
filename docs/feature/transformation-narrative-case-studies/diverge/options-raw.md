# Options Raw — Transformation Narrative Presentation

feature_id: transformation-narrative-case-studies
wave: DIVERGE
phase: 3 — Brainstorming
date: 2026-05-19

---

## HMW Question

How might we give a credential-surface visitor immediate sight of all five transformation scope signals while leaving the body text at their discretion?

**Validation**: no embedded solution ("carousel", "accordion"); outcome-oriented; broad enough for categorically different approaches.

---

## SCAMPER Generation

Generation phase — no evaluation language until Phase 4.

### S — Substitute: replace the vertical list mechanism with a horizontal register

Instead of five vertically stacked items, lay the five vignettes side-by-side in a horizontal strip. Each vignette title and first sentence visible as a column. On desktop: five narrow columns in a CSS grid, all visible simultaneously. On mobile: horizontal scroll (scrollable row, not a carousel — no auto-advance, no navigation arrows). Body text is present but requires the visitor to scroll within the column — or the body is omitted from the strip and only available via a "read more" expand.

**Mechanism**: horizontal CSS grid (5 columns, equal width)
**Assumption**: visitors on desktop understand column scanning; mobile visitors accept horizontal scroll for secondary content
**SCAMPER origin**: S — Substitute (replace vertical stacking with horizontal register)
**Closest competitor**: financial services "key metrics" strips (Bloomberg terminal layout)

---

### C — Combine: merge transformation evidence with the credential section it sits beside

Instead of a separate section after the Credly strip, embed vignette signals directly into the credential display. Each Credly badge links to a vignette — clicking a badge ("ICAgile Expert in Agile Coaching") expands an inline vignette below the badge strip: the relevant engagement where that credential was applied. Badges become both credential evidence and transformation evidence. One surface, dual job.

**Mechanism**: badge → inline expand (CSS details/summary or Vue show/hide) — no navigation
**Assumption**: the recruiter who clicks a badge to verify it is also receptive to a vignette in that moment; credential type maps meaningfully to vignette type
**SCAMPER origin**: C — Combine (credential display + transformation evidence surface)
**Closest competitor**: LinkedIn "featured" section pinned to skills/certifications

---

### A — Adapt: borrow the "reading list preview" pattern from editorial sites

Publications like The Atlantic, Aeon, and NYRB display 5-8 articles in a consistent card format: title + first sentence visible; click opens the full article. Adapt for vignettes: each vignette renders as a reading-list card (title + first sentence, no body). The first sentence of each current vignette contains the org-context signal ("A product organisation in consumer technology, around two hundred engineers..."). A visitor scans all five first sentences in one pass. Clicking a card expands the full body inline — no navigation, no new page. h3 problem dissolves: the "title" becomes a styled span, not a heading.

**Mechanism**: card list with inline expand (CSS details/summary, no JS required)
**Assumption**: the first sentence of each vignette carries the org-context signal the recruiter needs (currently true — all five lead with sector/scale); the body is contextual detail, not primary scan content
**SCAMPER origin**: A — Adapt (editorial reading list preview pattern)
**Closest competitor**: Medium, Aeon article lists

---

### M — Modify/Magnify: make the title the entire primary surface; body only on demand

Amplify the scan signal: strip the vignette section down to five titles only. No body text in the rendered page. Each title links to nothing — the title IS the complete primary experience. Body text is revealed only via a hover tooltip (desktop) or tap-to-expand (mobile). The titles as currently written are evocative enough to function as standalone signals: "When the data changed the conversation", "From troubled to exemplar", "135 ideas, one clear direction". A recruiter scans five titles in 3 seconds. An evaluating leader taps the two most relevant and reads the body.

**Mechanism**: title list with hover/tap body reveal (CSS-only on desktop: :hover; JS-minimal on mobile)
**Assumption**: the titles carry sufficient org-context signal for the recruiter scan WITHOUT the first sentence (currently partially true — titles are evocative but do not name sector/scale; the body's first sentence does)
**SCAMPER origin**: M — Magnify (amplify the title signal to full primary surface)
**Closest competitor**: book chapter contents page; product changelog titles

---

### P — Put to other use: position vignettes as proof for the services page, not the about page

The recruiter lands on About. The evaluating leader may arrive via services page. Instead of solving the About page length problem by compressing presentation, move the vignettes to the services page as evidence nodes adjacent to each service type. Each service block ("Organisational Transformation", "Leadership Coaching") gains an inline vignette as its "proof point". The About page is shortened by removal; the services page gains substantiation. About page links to services page for those who want evidence.

**Mechanism**: relocate content (no new UI pattern); inline prose on services page
**Assumption**: the evaluating leader navigates to services before or alongside About; About can signal transformation scope by reference without hosting the full vignettes; the recruiter's 10-second credential scan on About is not broken by the absence of vignettes (a link would need to be added)
**SCAMPER origin**: P — Put to other use (evidence serves a different surface)
**Closest competitor**: product landing pages with proof-point sidebars adjacent to feature claims

---

### E — Eliminate: remove the body text entirely from the About page; titles + first sentence only; no expand

Radical simplification. The About page renders five items: each is a two-line entry — title (styled as inline label, not h3) + first sentence only. Body text is cut from the About page entirely. If the evaluating leader wants more, they email. The vignettes are the credential surface; the full prose is a future deliverable (PDF on request, or a future case studies page). The h3 problem disappears (no h3). The height problem disappears (5 × ~50px = 250px total). Nothing new to learn.

**Mechanism**: static content edit — two lines per entry, five entries, thin rule separator
**Assumption**: the first sentence of each vignette is sufficient proof texture for the evaluating leader at this stage of their journey ("assess whether to enquire"); full narrative is only needed post-enquiry
**SCAMPER origin**: E — Eliminate (remove body text from About page entirely)
**Closest competitor**: law firm matter lists (cross-domain, competitive research)

---

### R — Reverse: visitor declares interest first; vignettes respond

Instead of all five vignettes pre-rendered, the visitor selects context before vignettes appear. A minimal two-option selector ("I'm evaluating an Agile Coach" / "I'm evaluating an Executive Coach") renders the two or three most relevant vignettes for that frame. The page is shorter by default. Matched vignettes render fully. Non-matched vignettes disappear. The recruiter selects "Agile Coach", sees the three org-transformation vignettes. The leader selects "Executive Coach", sees the two leadership-coaching vignettes.

**Mechanism**: JS toggle (Vue ref, no router); two buttons control a computed filtered list; SSG-compatible (no server state)
**Assumption**: visitors can self-classify in one click; the division maps cleanly to the vignette set; the two-button UI is not confusing to a visitor who is neither a recruiter nor a prospective client but a referral partner
**SCAMPER origin**: R — Reverse (visitor declares intent; content responds)
**Closest competitor**: job board skill-filter; Intercom "I am a..." onboarding selector

---

## Crazy 8s Supplements

### Supplement C8-1: NarrativeEdge animation as navigation spine

The owner's "super-cool" idea formalised as a distinct option. The five vignettes are presented sequentially (one visible at a time — carousel-like). Navigation is not arrows — it IS the NarrativeEdge bezier connector between content blocks. Clicking or swiping the edge line morphs it to a different bezier shape and reveals the next vignette. The edge animation becomes the affordance. The page section height is one vignette + the animated edge. The user's mental model: the edge is a thread, and pulling it reveals the next story.

**Mechanism**: JS carousel with SVG morphing (GSAP SVG morph or CSS path transition); NarrativeEdge `from`/`to` props change on navigation
**Assumption**: the visitor discovers the edge as a navigation affordance (discoverability risk); the animation is not distracting or confusing; JS budget is acceptable; GSAP or equivalent adds acceptable dependency weight
**SCAMPER origin**: Crazy 8s supplement (builds on owner's stated direction)
**Closest competitor**: Stripe's animated gradient nav; Apple product page scroll-driven reveals

---

### Supplement C8-2: Inline tab strip — label-driven navigation

Five short tab labels at the top of the section (truncated vignette titles or single-word topic labels: "Forecasting" / "Team Turnaround" / "Open Space" / "Leadership Offsite" / "Coaching"). Active tab renders the full vignette below. Default: first tab active — full vignette visible on load; no content hidden on initial render. Tab strip is ~40px. Full vignette below is one entry only. Total section height: ~40px (tabs) + ~200px (one vignette) = ~240px. Recruiter sees all five tab labels simultaneously; can read one title in full on the active tab.

**Mechanism**: CSS-only tab pattern (radio inputs or :target pseudo-class); or minimal Vue ref toggle
**Assumption**: the recruiter understands that the tab labels represent five separate entries (not five sections of one document); the evaluating leader is willing to click through tabs to find relevant entries
**SCAMPER origin**: Crazy 8s supplement
**Closest competitor**: MDN documentation tab panels; GitHub repository tab nav

---

## Option Curation — Converge to 6

### Pre-curation assessment

| Option                             | Mechanism                      | Assumption                                 | Cost profile                     |
| ---------------------------------- | ------------------------------ | ------------------------------------------ | -------------------------------- |
| S — Horizontal grid                | CSS grid layout                | Desktop column scan                        | Low (CSS only)                   |
| C — Badge-linked expand            | Credential + narrative merged  | Badge → vignette map meaningful            | Medium (Vue event + CSS)         |
| A — Editorial card + inline expand | Card list, CSS details/summary | First sentence = scan signal               | Low (CSS details/summary)        |
| M — Titles only, body on hover     | Title list, CSS :hover         | Title alone sufficient for scan            | Low-medium (CSS + JS for mobile) |
| P — Relocate to services page      | Content move, no new pattern   | Recruiter not harmed by About page absence | Low (edit only)                  |
| E — First sentence only, no body   | Static edit                    | First sentence = sufficient proof          | Zero (no code change)            |
| R — Intent selector                | Vue computed filter            | Visitor self-classifies accurately         | Medium (Vue + CSS)               |
| C8-1 — NarrativeEdge animation     | SVG morph + carousel           | Edge is discovered as nav affordance       | High (GSAP/animation)            |
| C8-2 — Tab strip                   | CSS tabs or Vue toggle         | Tab labels carry orientation signal        | Low-medium                       |

### Merge analysis

- S (horizontal grid) and C8-2 (tab strip) are structurally distinct: different mechanism (layout vs. sequential disclosure), different assumption (all-visible vs. one-at-a-time), different cost. Keep both.
- C (badge-linked expand) is structurally distinct from all others: it changes which surface hosts the vignettes, not how they display.
- M (titles only) and E (first sentence only) share a similar direction (radical content reduction) but have different mechanisms (hover reveal vs. static truncation) and different assumptions about title sufficiency. Keep both — they bracket a design decision about whether the title alone is sufficient.
- P (relocate) is unique in mechanism and cost. Keep.
- C8-1 (NarrativeEdge animation) is the owner's stated direction — unique mechanism, highest cost. Keep.
- R (intent selector) is unique. Keep.

Nine distinct options: must converge to 6. Drop three by diversity test failure or feasibility.

**Dropped — not diversity failures, but weakest on combined feasibility + job fit:**

- P (relocate to services page): solves the About page length problem by removal, but breaks the 10-second recruiter scan on About (they land there first and need to see transformation evidence immediately — DISCOVER IA-03). Job mismatch is severe.
- S (horizontal grid): parallel concept to C8-2 (tab strip) in that both aim for simultaneous title visibility; but horizontal grid on mobile requires horizontal scroll — a known usability failure for primary content (Nielsen 2019). The tab strip achieves the same "all labels visible" goal without the mobile regression.
- M (titles only, body on hover): hover is not available on touch. A title-only pattern on mobile shows nothing useful to the evaluating leader. Merged into A (editorial card expand) which achieves the same scan signal via always-visible first sentence without relying on hover.

### Curated 6

| #   | Name                                       | SCAMPER Origin |
| --- | ------------------------------------------ | -------------- |
| 1   | Editorial card + inline expand (read-more) | A — Adapt      |
| 2   | First-sentence-only static list            | E — Eliminate  |
| 3   | Badge-linked credential expand             | C — Combine    |
| 4   | Intent selector (two-button filter)        | R — Reverse    |
| 5   | Tab strip — one at a time                  | C8-2 Crazy 8s  |
| 6   | NarrativeEdge animation carousel           | C8-1 Crazy 8s  |

---

## Diversity Test — Curated 6

| Option                    | Different mechanism?                | Different assumption?                             | Different cost? |
| ------------------------- | ----------------------------------- | ------------------------------------------------- | --------------- |
| 1 Editorial expand        | CSS details/summary — inline expand | First sentence = org-context scan signal          | Low             |
| 2 First-sentence static   | Zero code — content edit only       | First sentence + title = sufficient proof texture | Zero            |
| 3 Badge-linked expand     | Vue event binding + CSS expand      | Credential type maps to vignette type             | Medium          |
| 4 Intent selector         | Vue computed filter                 | Visitor self-classifies                           | Medium          |
| 5 Tab strip               | CSS :target or Vue toggle           | Tab labels carry orientation                      | Low-medium      |
| 6 NarrativeEdge animation | SVG path morph + carousel           | Edge is discovered as nav affordance              | High            |

All six pass: each has a different mechanism, a different assumption about user behaviour, and a different cost/effort profile.

---

## Gate G3 Check

- [x] 6 curated options
- [x] SCAMPER coverage: S/C/A/M/P/E/R all applied; C8-1 and C8-2 generated; curated 6 drawn from all lenses
- [x] Diversity test passed for all 6
- [x] No evaluation language in generation section (above curation line)
- [x] options-raw.md generated

### G3: PASS
