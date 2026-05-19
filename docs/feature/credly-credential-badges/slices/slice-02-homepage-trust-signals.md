<!-- markdownlint-disable MD024 -->

# Slice 2 — Homepage Trust Signals

feature_id: credly-credential-badges
slice_id: slice-02
backlog_ref: CN-23
job_id: JOB-CB-001
wave: DISCUSS | 2026-05-19
status: Ready
depends_on: slice-01 (CredlyBadgeStrip component and CSP update must be shipped first)

---

## Purpose

Validates the hypothesis that the recruiter persona lands on the homepage (e.g., from a LinkedIn
profile URL pointing to `/`) and needs to see credential badges there, not only on the about page.
Reuses `CredlyBadgeStrip.vue` from Slice 1 — no new data model or component required.

---

## Problem

Marcus Webb (agency recruiter) receives a LinkedIn message from a candidate with a website link.
The link goes to `daedaluscoaching.com` (the homepage). Marcus scans the page for credentials
in the first 10 seconds. He sees the TrustSignals strip (B-Corp, 1%FTP) but no professional
certifications. He cannot immediately validate the seniority claim without navigating elsewhere.
He proceeds to the next candidate whose homepage shows PSM II and ICP-ACC badges above the fold.

## Who

- Recruiter / Hiring Manager arriving at the homepage (from LinkedIn profile, not a CV link)
- Referral Partner checking the site before sharing the URL
- Prospective client doing a first-pass credibility check

## Elevator Pitch

**Before**: The homepage TrustSignals strip shows values badges (B-Corp, 1%FTP) but no
professional certifications. Visitors who land here and scan for 10 seconds before clicking
through have no credential signal — they must navigate to the about page first.

**After**: The homepage includes the `CredlyBadgeStrip` component (already built in Slice 1),
placing credential badges alongside the existing trust signals. Visitors get the credibility
signal at the entry point, regardless of which URL they arrived from.

**Decision enabled**: This slice is separable. If Slice 1 analytics show that recruiters
consistently navigate to the about page from the homepage, Slice 2 is a nice-to-have. If
recruiters bounce from the homepage without navigating further, Slice 2 is critical.
Ship Slice 1 first; evaluate Slice 2 placement based on observed behaviour.

---

## Domain Examples

### 1: LinkedIn homepage arrival — credential visible immediately

Marcus Webb opens `daedaluscoaching.com` from a LinkedIn profile. On the first scroll, he sees
the existing trust signals (B-Corp, 1%FTP) followed by the credential badge strip: four ICAgile
badges and four Scrum.org badges. He recognises the PSM II badge. He does not need to navigate
to the about page. He clicks through to the Credly evidence page, confirms the issue date is
current, and adds the candidate to his shortlist.

### 2: Referral partner pre-share check

Sophie Lambert (referral partner, organisational development consultant) visits the site before
forwarding the URL to a CHRO contact. She opens the homepage. She sees the badge strip with
grouping labels. She identifies the "Enterprise Agile Coaching" badge from ICAgile — the CHRO
she is sending the link to specifically asked about enterprise-level agile credentials. She
forwards the URL without caveats.

### 3: Homepage badge strip coexists with existing TrustSignals

The existing `TrustSignals.vue` component (B-Corp, 1%FTP, accreditations) is above fold. The
badge strip is added in the same visual zone or immediately below without disrupting the existing
layout. No existing homepage element is removed or repositioned in a way that degrades the
current visual hierarchy.

---

## UAT Scenarios (BDD)

### Scenario: Credential badges appear on the homepage within the trust signals zone

```gherkin
Given Marcus Webb opens the daedaluscoaching.com homepage
When the page finishes loading
Then 8 Credly badge icons are visible on the page
And they are positioned in or adjacent to the trust signals section
And all badges are visible without scrolling past the hero section on a 1280px viewport
```

### Scenario: Homepage badge strip reuses the same data source as the about page

```gherkin
Given the CredlyBadgeStrip component is rendered on both the homepage and the about page
When a badge is added to content/credentials/credly-badges.yaml
Then the new badge appears on both pages without any component code change
```

### Scenario: Homepage badge links open in new tabs with security attributes

```gherkin
Given Marcus Webb views the badge strip on the homepage
When he clicks the "Professional Scrum Master II (PSM II)" badge
Then a new browser tab opens to https://www.credly.com/earner/earned/share/4fd1bb98-6f0d-4d09-9248-debd48eb4634
And the link carries rel="noopener noreferrer"
```

### Scenario: Existing TrustSignals component is unaffected

```gherkin
Given the homepage renders with the credential badge strip added
When a Playwright test checks for the existing TrustSignals component
Then the TrustSignals component is present and renders its content correctly
And no existing homepage acceptance test regressions
```

---

## Acceptance Criteria

- [ ] `CredlyBadgeStrip.vue` renders on `pages/index.vue` in the trust signals zone
- [ ] All 8 badges render from the same `content/credentials/credly-badges.yaml` source as Slice 1 (no data duplication)
- [ ] All Slice 1 AC for the component itself (alt text, links, CSP, rel attributes) remain satisfied — no regression
- [ ] Existing `TrustSignals.vue` component is visually and functionally unaffected
- [ ] Badge strip is visible on desktop (1280px) without scrolling past the hero
- [ ] No horizontal overflow on mobile (375px)
- [ ] Playwright e2e: navigate to `/`, assert 8 `<img>` elements inside the badge component

---

## Technical Notes

- **Component reuse**: `CredlyBadgeStrip.vue` built in Slice 1 is placed in `pages/index.vue` or the relevant homepage layout section. No new component code.
- **Data reuse**: `composables/useCredentials.ts` from Slice 1 is reused — identical data source. If the composable is already used on the about page, importing it on the homepage adds no new pattern.
- **CSP already updated**: Slice 1 updates `public/_headers`. Slice 2 has no CSP work.
- **Placement**: The exact DOM position (above/below `TrustSignals`, inside a grid row, etc.) is a DESIGN wave decision. The requirement is: visible within first scroll on desktop, not hidden behind a tab or accordion.
- **No new composables, no new core/ functions**: This slice is component placement only.

## Dependencies

- slice-01 shipped (CredlyBadgeStrip component and CSP update complete)
- `pages/index.vue` — existing file, requires badge strip inclusion point

## Outcome KPIs

- **Who**: Recruiter / Hiring Manager arriving at the homepage
- **Does what**: Identifies credential badges and clicks through to verify without navigating to the about page first
- **By how much**: Qualitative — post-launch, assess whether enquiries from recruiters come via homepage-only visitors (no about page navigation in session). If homepage badge strip makes about page visit rate decrease among recruiters who do convert, hypothesis is confirmed.
- **Measured by**: Post-launch session review (manual, given no analytics installed); enquiry form response content
- **Baseline**: Slice 1 shipped — recruiter credential path exists on about page. Slice 2 extends it to the homepage entry point.
