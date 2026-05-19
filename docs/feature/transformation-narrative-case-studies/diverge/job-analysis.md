# Job Analysis — Transformation Narrative Presentation

feature_id: transformation-narrative-case-studies
wave: DIVERGE
phase: 1 — JTBD Analysis
date: 2026-05-19

---

## Raw Request

"How to present 5 anonymised transformation vignettes on the About page without making the page excessively long or introducing style inconsistencies."

---

## Job Extraction — 5 Whys Chain

| Layer       | Statement                                                                                     | Why?                                                                                                           |
| ----------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Tactical    | Present 5 vignettes without making the About page too long                                    | Page is already long; vignettes add ~1500px                                                                    |
| Operational | Prevent visitors from dropping off before reaching transformation evidence                    | Both recruiter and evaluating leader need it; scroll depth is the risk                                         |
| Operational | Transformation evidence is the only org-scope signal on the site                              | Credentials alone do not convey scale, complexity, or context                                                  |
| Strategic   | Both personas need to form a credible scope assessment within the credential scan window      | Recruiter: 10-second scan; evaluating leader: 60 seconds total                                                 |
| Physical    | Enable a visitor to assess the coach's transformation scope during a credential surface visit | No navigation required; no scroll penalty; first-line of each vignette scannable within the credential section |

**Abstraction stop**: further "why" produces "so the business can attract clients" — a life/business goal. Stop here.

---

## Validated Job Statement

**Functional:**
When I arrive at a coaching credential surface (About page), I want to see evidence of org-level transformation scope at a glance, so I can decide whether to investigate further without committing to a full read.

**Emotional:**
I want to feel that the evidence is real, specific, and at the seniority level I expect — without having to work for it.

**Social:**
I want to be able to form an assessment I can trust and, for the recruiter persona, defend to a hiring panel without caveating.

---

## Disruption Check

Is there a higher-level job that would make this entire job unnecessary?

Hypothetically: if the coach were verifiable through LinkedIn endorsements, named publications, or public conference appearances, the vignettes might not be needed. That is not the context — ICF confidentiality precludes named evidence and the site is a validation step, not a discovery channel (VA-08). The job is load-bearing. No disruption available at v1.

---

## ODI Outcome Statements

| #     | Outcome Statement                                                                                                            | Direction |
| ----- | ---------------------------------------------------------------------------------------------------------------------------- | --------- |
| ODI-1 | Minimize the time it takes for a recruiter to identify the org type and scale of at least one transformation engagement      | Minimize  |
| ODI-2 | Minimize the likelihood that a recruiter reaches the bottom of the About page without encountering transformation evidence   | Minimize  |
| ODI-3 | Minimize the scroll depth required to see the first line of the first vignette from the credential display point             | Minimize  |
| ODI-4 | Minimize the likelihood that the vignette section forces a visitor to choose between reading depth and continuing their scan | Minimize  |
| ODI-5 | Minimize the number of new visual concepts introduced to the page by the transformation evidence section                     | Minimize  |

---

## Opportunity Candidates — Most Under-Served Outcomes

**ODI-1** and **ODI-3** are the most under-served given the current implementation:

- ODI-1: the current vertical list renders all five titles, but the recruiter scan depends on first-line visibility within the credential window — currently, the credential strip (Credly) is above the fold; the vignettes start well below it, and the first line of each vignette is buried in a ~1500px block.
- ODI-3: scroll depth to first vignette content is already high; after adding five full-body paragraphs, the distance from Credly strip to the bottom of the vignette section is substantial.

**ODI-4** is under-served by the current implementation: visitors must either read all five (too long) or abandon (no scan path). There is no "scan title, read one, exit" path today.

**ODI-5** is currently failed: the h3 heading tier introduced by vignette titles has no global styling and conflicts with the h1/h2 typographic hierarchy.

---

## Gate G1 Check

- [x] Job at strategic/physical level (not "show a carousel")
- [x] No feature references in job statement
- [x] Minimum 3 ODI outcome statements (5 produced)

### G1: PASS
