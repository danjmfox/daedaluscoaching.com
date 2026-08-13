# Wave Decisions — transformation-narrative-elevation

feature_id: transformation-narrative-elevation
wave: DISCUSS
date: 2026-05-20
status: OWNER DECISIONS PENDING — see flagged items below

---

## Scope Assessment: PASS

3 user stories, 1 bounded context (About page IA + content ordering), estimated 2–4 days.
No splitting required. Feature is an IA and content prominence reorganisation, not a new build.

---

## Prior Wave Grounding

DISCOVER (CN-20) and DIVERGE artifacts are present and were read.
All journey work is grounded in JOB-TN-001 (credential-surface transformation scope assessment).
DIVERGE recommended Option 1 (editorial card + inline expand using `<details>`/`<summary>`).
That recommendation was for _format_; this DISCUSS wave addresses _placement and IA_.

---

## IA Options Assessed

### Option A: About page reorganisation (move transformation narrative higher)

Move `about-transformation` block to immediately after `about-certifications` (block 7).
Collapse or condense the four career narrative blocks (`about-career-start`, `about-career-facilitation`,
`about-career-scale`, `about-career-now`) — either into Direction A (three-era sweep) or into a
single accordion/expand below the transformation evidence.

**Persona fit:**

- Recruiter: STRONG. Credentials → transformation evidence in one vertical sweep.
  Career narrative (currently 4 blocks before transformation) is noise at 10-second scan speed.
- Evaluating Leader: STRONG. Philosophy (approach) → credentials → transformation → working-with-me
  is a coherent confirmation sequence. The career narrative can be available but not blocking.

**Risk:** Career narrative is identity content for the owner. Condensing it may feel like losing
something even if both personas do not need it at scan speed.

**Implementation:** Content edit + block reorder only. No new page, no new nav item.
Estimated: 0.5 days. Reversible in minutes.

---

### Option B: Dedicated top-level "Work" page with nav entry

New page at `/work` (or `/transformation`). Nav becomes: About, Work, Services, Contact.
Vignettes move to this page. About page removes `about-transformation` block.

**Persona fit:**

- Recruiter: WEAK. Recruiters go to About. "Work" is not a recognised navigation label for
  a credential-validation journey. The recruiter fails to find transformation evidence in the
  expected location.
- Evaluating Leader: NEUTRAL. May navigate to "Work" if About feels incomplete, but warm-referral
  arrivals typically read top to bottom on a single page, not breadth-first across nav.

**Risk (named in DISCOVER):** CN-20 DISCOVER explicitly identified isolated sub-pages as
an anti-pattern for this site: "A dedicated page only reached after scroll or navigation fails
the 10-second scan" (IA-03). A top-level page is one step better than a sub-page, but the
recruiter still has to know to click "Work" before completing their About-page credential scan.

**Implementation:** New page, new nav item, route, content move. Estimated: 1–2 days.

---

### Option C: Services page integration

Transformation vignettes added to `/services` as proof-of-practice for each service offering.

**Persona fit:**

- Recruiter: VERY WEAK. Recruiters do not visit Services; they validate the person, not the
  offering. Transformation evidence on Services is invisible to the dominant persona.
- Evaluating Leader: WEAK. Leader arrives via referral and reads About. Services page visit
  is secondary and not guaranteed. Putting evidence there requires an extra navigation step
  the leader's 60-second budget does not support.

**Risk:** Splits the evidence across two pages, reducing its density on either surface.
DISCOVER constraint C-07 is explicit: "no dedicated sub-page at v1."

**Verdict:** Does not serve either persona's journey. Eliminated.

---

### Option D: Direction A (three-era sweep) replaces career narrative

The commented-out Direction A structure in `content/about.md` replaces the 4-block career
narrative with 3 image+text era blocks (`about-era-digital`, `about-era-coaching`, `about-era-ai`).
This is a shorter About page by default. However: Direction A _does not include_ `about-transformation`.
The transformation block would still need to be placed, and its position relative to credentials
is still the IA question.

Direction A reduces page length but does not itself resolve the transformation prominence question.
It is a prerequisite condition (fewer blocks = less scrolling before reaching transformation),
not a solution in isolation.

**Assessment:** Direction A is compatible with Option A. If the owner switches to Direction A AND
moves transformation evidence to immediately post-certifications, the page becomes:
`approach → era-digital → era-coaching → era-ai → certifications → transformation → working-with-me → daedalus`.
That is 8 blocks vs the current 11. A meaningful reduction.

---

## Recommended Direction

**Option A with Direction A as an optional enhancement.**

The core recommendation: reorder the About page so that `about-transformation` follows
`about-certifications` directly. This puts transformation evidence in the credential-validation
zone for both personas without adding navigation, pages, or dev complexity.

If the owner also wants to reduce page length, switching from Direction B (current 4-block career
narrative) to Direction A (3-block era sweep) achieves that simultaneously and is already
built in the codebase (commented out).

The two moves are independent and can be shipped separately.

---

## Owner Decision Flags

### D-01 — IA Direction

🤔 OWNER DECISION REQUIRED: Should the About page be reorganised so transformation evidence
follows certifications directly? — Options: (A) Yes, reorder now; (B) No, keep current order;
(C) Yes, and also switch to Direction A career narrative to reduce page length — What happens if
deferred: DESIGN wave cannot begin; the current IA buries transformation evidence below 4 career
blocks, which is the problem this feature was initiated to solve.

### D-02 — Direction A Career Narrative

🤔 OWNER DECISION REQUIRED: Should the current 4-block career narrative (start, facilitation,
scale, now) be replaced with the Direction A three-era sweep already in the codebase? —
Options: (A) Yes, switch to Direction A; (B) No, keep Direction B (current 4 blocks);
(C) Yes, but condense the 4 blocks differently (owner to specify) — What happens if deferred:
Acceptable; D-02 is independent of D-01. D-01 can ship without resolving D-02. Flag: if D-01
ships without D-02, the page will still be 11 blocks; transformation evidence will be more
prominent but the page remains long.

### D-03 — `about-site` block retention

🤔 OWNER DECISION REQUIRED: The `about-site` meta-note block currently ends the About page.
Both personas will not read this far. Should it be retained, moved, or removed? —
Options: (A) Retain as-is (only curious visitors reach it); (B) Remove (tighten the page end);
(C) Move to footer or privacy page — What happens if deferred: No impact on D-01 or the
transformation narrative. Low urgency; flag for next About page pass.

---

## Scope Boundary

This feature does NOT include:

- Any change to the TransformationNarrative.vue component itself (that is CN-20 DISCUSS scope)
- New page creation at `/work` or `/transformation` (eliminated by persona analysis)
- Services page content changes
- Navigation changes (no new nav items)
- Vignette content editing (P-01–P-05 from CN-20 DISCOVER are pre-requisites, not this scope)

---

## Shared Artifacts

| Artifact                              | Source                                   | Consumers                           |
| ------------------------------------- | ---------------------------------------- | ----------------------------------- |
| `about-certifications` block position | `content/about.md` block order           | About page render sequence          |
| `about-transformation` block position | `content/about.md` block order           | About page render sequence          |
| TransformationNarrative.vue           | `components/TransformationNarrative.vue` | `about-transformation` block        |
| Direction A blocks                    | `content/blocks/about-era-*.md`          | Commented out in `content/about.md` |

---

## Risk Register

| Risk                                                         | Probability | Impact | Mitigation                                                                 |
| ------------------------------------------------------------ | ----------- | ------ | -------------------------------------------------------------------------- |
| Owner prefers "Work" page despite persona evidence           | Medium      | Medium | Present persona analysis; offer D-01 trial as content edit only            |
| Direction A era blocks are incomplete or need content work   | Low         | Low    | They exist in codebase; check content before committing                    |
| Reorder exposes a gap in the `about-working-with-me` block   | Low         | Low    | `about-working-with-me` is standalone; reorder does not affect its content |
| Career narrative condensation loses content the owner values | Medium      | Medium | Keep Direction B as default; D-02 is optional and reversible               |
