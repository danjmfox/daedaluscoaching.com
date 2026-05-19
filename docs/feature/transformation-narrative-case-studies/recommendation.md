# Recommendation — Transformation Narrative Presentation

feature_id: transformation-narrative-case-studies
wave: DIVERGE
date: 2026-05-19
status: READY FOR DISCUSS

---

## Top 3 Options

### Option 1: Editorial Card + Inline Expand — Score 4.68

**Why it scores well:** Serves the recruiter scan (all five titles + first sentences visible simultaneously) and the evaluating leader (body text available on expand). Eliminates the h3 problem — the `<details>`/`<summary>` element is the title, styleable as a span without heading semantics. Zero new JS dependency — native HTML. Passes ODI-1 (org context in first sentence), ODI-2 (transformation evidence at the credential surface), ODI-3 (compact), ODI-4 (scan without read obligation), ODI-5 (zero new visual concepts beyond a disclosure widget).

**Core trade-off:** Introduces one interaction — expand. Visitors who never expand see all five first sentences but not the body. This is the correct trade-off for the recruiter; it may feel slightly incomplete to the evaluating leader who wants to read the full vignette immediately. A fallback: first vignette expanded by default on load.

**Key risk:** The first sentence of each vignette must carry the org-context scan signal. All five current vignettes do this. If content is revised and a future vignette buries the org context in sentence three, the scan fails. The content discipline must be maintained.

**Hire criteria:** Choose this when the dual-audience constraint is real (it is), the SSG constraint is real (it is), and the design system's "nothing new unless essential" principle applies (it does).

---

### Option 2: First-Sentence-Only Static List — Score 4.68 (tie-broken to second)

**Why it scores well:** Maximum simplicity. Zero code change — a pure content edit. Eliminates the h3 problem (no headings at all). The page height impact is negligible (~250px for all five entries). The recruiter scan is fully served. No new visual or interaction concept.

**Core trade-off:** The evaluating leader's body text is not available on the About page. The full vignettes exist only in the component — the body would need to live somewhere else (a future case studies page, a PDF, or they'd only be accessible after direct enquiry). For the current site scope (no blog, no sub-pages at v1), this is a real loss of approach-texture for the evaluating leader.

**Key risk:** If the evaluating leader needs more than the first sentence to feel confident enough to enquire, this option fails them. The DISCOVER wave noted "assess approach" as Step 3 in the warm-referral journey — a single sentence per vignette may not carry enough weight for that step.

**Hire criteria:** Choose this if you decide the evaluating leader's approach-texture need is satisfied by the surrounding prose on the About page (biography, philosophy) and the vignettes only need to provide the scan signal, not the full narrative.

---

### Option 5: Tab Strip — Score 4.10

**Why it scores well:** All five tab labels simultaneously visible (recruiter scan satisfied). Full vignette body rendered for the active tab (evaluating leader satisfied). Compact page height: ~240px total for the section. Clean progressive disclosure.

**Core trade-off:** One vignette visible at a time. A recruiter who scans five titles (Option 1) also gets the first sentence of each. A recruiter who scans five tab labels (Option 5) gets only the label — the first sentence is hidden behind the tab. This is a scan-quality regression vs. Option 1. The recruiter sees labels ("When the data changed the conversation") but not the org-context first sentence ("A product organisation in consumer technology, around two hundred engineers...").

**Key risk:** Tab labels must be orientating without the first sentence. Current vignette titles are evocative but not org-typed. "From troubled to exemplar" does not signal "engineering team, scaling tech company" without reading further. If the recruiter scans labels only, they may not get the sector/scale signal the DISCOVER wave identified as required (VA-03).

**Hire criteria:** Choose this if the visual compactness of one-at-a-time display is a stronger constraint than parallel first-sentence scanning — e.g., if the About page length is the top priority and tab UX is acceptable.

---

## Recommendation

**Proceed with Option 1: Editorial Card + Inline Expand.**

The dual-audience constraint is the binding design requirement from DISCOVER. Option 1 is the only solution that serves both the recruiter's parallel-scan need (all five first sentences visible) and the evaluating leader's approach-texture need (body available on expand) without introducing JS dependencies, design system debt, or new interaction concepts that have no precedent on the site.

The implementation is a `<details>`/`<summary>` refactor of the existing `TransformationNarrative.vue`. The `h3` becomes the `<summary>` element — styled as an inline label or span, not a heading — resolving the typographic hierarchy problem. The body text is wrapped in the `<details>` content, collapsed by default. The first sentence of each vignette stays outside the `<details>` (always visible), serving as the scan signal. This is approximately 30 minutes of implementation work.

The first vignette should render with `open` by default so the evaluating leader arriving on the page sees immediately that body text is available.

---

## Dissenting Case

The strongest case for Option 2 (first-sentence static) over Option 1 is this: the About page is already long, and adding any interaction — even a lightweight expand — is a concept the site has never had. The site's current design has zero interactive elements except links. A disclosure widget, however standard, is a new pattern. If the evaluating leader's approach-texture need is already served by the surrounding biography and philosophy prose, then Option 2 achieves the recruiter scan goal at zero cost and zero interaction debt.

The counter-argument that tips toward Option 1: the vignettes are not supplementary — they are the only transformation evidence. The DISCOVER wave explicitly identified the evaluating leader's Step 3 ("assess approach") as relying on vignette texture, not prose philosophy alone. A single sentence per vignette does not carry enough narrative weight to complete that step. The body text is load-bearing for the evaluating leader; omitting it from the About page forces them to inquire before they have sufficient confidence — a friction the site is specifically designed to remove.

If the owner's read of the evaluating leader's needs changes, Option 2 is one content edit away and requires no code rollback.

---

## Decision for DISCUSS Wave

Proceed with Option 1 (editorial card expand using `<details>`/`<summary>`), first vignette open by default, assuming the content discipline holds: each vignette's first sentence must carry the org-type and scale signal. Resolve the h3 issue by replacing the current `h3` element with the `<summary>` element, styled to match the existing heading register without carrying heading semantics.

The NarrativeEdge animation variant (Option 6) scores 2.03 — below the noise floor for this site's constraints. It is a high-cost, high-concept addition that conflicts with the site's restraint principle and the SSG no-heavy-JS constraint. The owner should be aware that the "super-cool" idea scores poorly against the validated job and the site's own design values. It is not killed — it is appropriate for a future, more playful surface (homepage, a speaking/facilitation showcase page) where animation is contextually earned.
