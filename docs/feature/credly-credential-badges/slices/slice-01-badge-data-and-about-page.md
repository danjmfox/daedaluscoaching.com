<!-- markdownlint-disable MD024 -->

# Slice 1 — Badge Data Structure and About Page Display

feature_id: credly-credential-badges
slice_id: slice-01
backlog_ref: CN-23
job_id: JOB-CB-001
wave: DISCUSS | 2026-05-19
status: Ready

---

## Purpose

Walking skeleton for the `credly-credential-badges` feature. Proves the full data-to-render path:
YAML data file → Nuxt data loading → Vue component → rendered linked badge images on the about page.
End-to-end value: a recruiter visiting the about page sees all 8 badges grouped by issuer, each
linked to its Credly evidence page, without scrolling past the introductory section.

---

## Problem

Alex Chen (recruiter, executive search) opens the about page from a candidate's LinkedIn
profile expecting to see verifiable credentials. The page contains only prose. There are no badge
icons. To verify the "ICAgile Certified" claim in the CV, Alex has to leave the site, search
Credly separately, and cross-reference. This friction is enough to skip the verification step
entirely and progress a different candidate who provided badges on their site.

## Who

- Recruiter / Hiring Manager arriving from CV or LinkedIn link
- Arrival context: professional evaluation, time-constrained (< 60 seconds for initial scan)
- Need: see familiar badge icons, identify issuer bodies at a glance, click one to verify authenticity

## Elevator Pitch

**Before**: Recruiters visiting the about page see credential claims in prose only. Verification
requires leaving the site and searching Credly manually — a step most skip, disadvantaging the
candidate against peers who display verifiable badges.

**After**: The about page displays 8 Credly badge icons grouped by issuer (ICAgile, Scrum.org),
each linking directly to the earner's evidence page. Recruiters can verify a credential in one
click without leaving the assessment flow.

**Decision enabled**: Ship this as the walking skeleton — validates the data model, component,
and CSP configuration before committing to the homepage placement (Slice 2).

---

## Domain Examples

### 1: Credential scan — happy path

Alex Chen opens `daedaluscoaching.com/about` from a PDF CV link. Within the first viewport
scroll, she sees two rows of badge icons: four labelled "ICAgile" (Agile Coaching, Agile Team
Facilitation, Coaching Agile Transformations, Enterprise Agile Coaching) and four labelled
"Scrum.org" (PSM II, PSM I, PSPO I, PSK I). She recognises the ICAgile Agile Coaching badge
immediately — it matches the badge shape she has seen on other senior practitioners' profiles.
She clicks it. The Credly earner page opens in a new tab showing the verified badge with
issue date and competency details. Satisfied, she returns to the about page and progresses the
candidate.

### 2: Issuer-unfamiliar recruiter

Jordan Okafor (internal HR, less familiar with agile certification bodies) opens the about page.
She does not recognise either issuer logo. She clicks the PSM II badge icon. The Credly page
opens, showing "Professional Scrum Master II — Scrum.org" with the earner's name, issue date,
and a "Verify" link. She forwards the Credly URL to her hiring manager to validate the seniority
level. She did not need to understand the certification hierarchy herself — the Credly evidence
page communicates it.

### 3: Badge image fails to load (Credly CDN unavailable)

The Credly CDN returns a 503 during a brief outage. Alex visits the about page. The badge images
do not render, but the `alt` text is visible inline: "ICAgile Certified Agile Coaching badge",
"Professional Scrum Master II (PSM II) badge", etc. The links remain functional. Alex can still
click through to Credly to view the evidence pages. The about page layout does not break — the
badge container collapses gracefully around the missing images.

---

## UAT Scenarios (BDD)

### Scenario: Credential badges are visible on the about page without scrolling

```gherkin
Given Alex Chen opens the about page at daedaluscoaching.com/about
When the page finishes loading
Then 8 badge icons are displayed in the page
And the badges are grouped under "ICAgile" (4 badges) and "Scrum.org" (4 badges)
And all badge icons are visible without scrolling past the introductory paragraph
```

### Scenario: Each badge links to its Credly evidence page

```gherkin
Given Alex Chen is viewing the badge strip on the about page
When she clicks the "Agile Coaching" badge icon
Then a new browser tab opens to https://www.credly.com/earner/earned/share/7beeace9-a560-44b5-93f8-689f58501bfa
And the link carries rel="noopener noreferrer"
```

### Scenario: Every badge has descriptive alt text

```gherkin
Given the about page renders the badge strip
When a screen-reader user navigates through the badge images
Then each image has a non-empty alt attribute describing the badge name
And no alt attribute is generic (e.g., "badge" or "image")
```

### Scenario: Badge images are served from the Credly CDN

```gherkin
Given the about page is rendered
When the browser loads the badge strip
Then each badge image src points to images.credly.com
And the Content-Security-Policy img-src directive permits images.credly.com
And all 8 badge images render without console CSP errors
```

### Scenario: Page layout is stable when badge images are unavailable

```gherkin
Given the Credly CDN is returning errors for image requests
When Alex views the about page
Then the badge container is present in the DOM
And alt text is visible in place of each missing image
And no layout shifts or overflow errors occur
And the badge links remain clickable
```

---

## Acceptance Criteria

- [ ] 8 badge icons render on the about page, sourced from `content/credentials/credly-badges.yaml`
- [ ] Badges are grouped visually by issuer: ICAgile (4) then Scrum.org (4)
- [ ] Every badge `<img>` has a descriptive `alt` attribute matching the badge name in the YAML
- [ ] Every badge `<a>` links to the correct Credly share URL with `rel="noopener noreferrer"` and `target="_blank"`
- [ ] `public/_headers` `img-src` directive includes `https://images.credly.com`
- [ ] No CSP violations in browser console on page load
- [ ] Badge strip is visible above the first scroll breakpoint on desktop (1280px viewport)
- [ ] Badge strip is visible on mobile (375px viewport) — wraps to multiple rows if needed, no horizontal overflow
- [ ] Playwright e2e: navigate to `/about`, assert 8 `<img>` elements inside the badge component, assert first badge link href matches expected Credly URL

---

## Technical Notes

- **CSP blocker**: `public/_headers` currently allows `img-src 'self' data:` only. Must be updated to `img-src 'self' data: https://images.credly.com` before deploy or badge images will be silently blocked. This is a blocking dependency for this slice.
- **Data loading**: Badge YAML lives in `content/credentials/credly-badges.yaml`. Nuxt 3 with `@nuxt/content` v3 can query YAML files via `queryContent()`. The solution-architect should confirm the loading strategy (composable vs `useAsyncData` in page, vs build-time `nuxt generate` data injection).
- **Component boundary**: `components/CredlyBadgeStrip.vue` → imports data via a composable (`composables/useCredentials.ts`), not directly from `content/`. Consistent with `components-no-core` boundary rule. The composable wraps `queryContent()` or equivalent.
- **No `core/` involvement**: Badge display is pure presentation. No business logic requiring pure function extraction. Dependency-cruiser rules are unaffected.
- **External link security**: `rel="noopener noreferrer"` on all Credly links (standard for `target="_blank"` — prevents tab-napping, removes Referer header).
- **No local image copies**: PNGs are not downloaded or committed. Image src values reference Credly CDN directly.

## Dependencies

- `content/credentials/credly-badges.yaml` — new file, created as part of this slice
- `components/CredlyBadgeStrip.vue` — new component, created as part of this slice
- `composables/useCredentials.ts` — new composable, created as part of this slice
- `public/_headers` — existing file, requires `img-src` amendment
- `content/about.md` or `pages/about.vue` — existing file, requires badge strip inclusion point

## Outcome KPIs

- **Who**: Recruiter / Hiring Manager arriving at the about page
- **Does what**: Clicks at least one badge to verify credentials (instead of leaving without verifying)
- **By how much**: Qualitative signal — owner receives enquiries from recruiters who specifically reference the credentials; zero badge-related errors in Netlify deploy logs post-launch
- **Measured by**: Enquiry form responses (do they mention credentials?); post-launch manual review of CSP headers; Playwright CI gate (no badge rendering failures)
- **Baseline**: Currently zero — no badges on site; no recruiter verification path exists
