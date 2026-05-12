# Discovery Seed — Daedalus Coaching Website Redesign

Evidence gathered from the previous Gatsby + Contentful site and prior design iterations.
This is input for the DISCOVER wave, not requirements. Let it inform questions, not answers.

## What past iterations signal was important

**Trust and legitimacy signals were paramount.**
B-Corp status, 1% for the Planet membership, VAT registration, Companies House link, iubenda
GDPR consent banner — all carefully wired into the footer. This is a coaching practice building
credibility with prospective clients, not just presenting services.

**Content editing without code deploys was valued.**
Contentful (headless CMS) was chosen so copy could be updated without touching code. Relevant
for a solo practitioner. The new stack replaces this with `@nuxt/content` (markdown files in
the repo) — validate whether that trade-off still holds.

**Visual identity was worked on but never settled.**
Multiple experiments: PaperFrame, BoxFrame, PostIt-style nav, skewed footer. None landed.
The site has never felt right. This is the primary motivation for the redesign.

**Features were intended but never launched.**
Blog and bookshelf sections existed behind feature flags (`enableBlog`, `enableBookshelf`) —
both permanently off. Scope inflation that never shipped. Worth asking why before reintroducing.

**Tests were absent in practice.**
Existing tests were stale scaffolding — wrong component structure, not run. TDD was not
happening. The redesign starts with a clean TDD commitment via nWave.

## Confirmed technical decisions (pre-DISCOVER)

- **Framework**: Nuxt 3 (Vue + Vite + SSG) — owner is learning Vue; real project as learning harness
- **Content**: `@nuxt/content` replacing Contentful
- **Testing**: Vitest (unit/integration) + Playwright (e2e)
- **Deployment**: Netlify
- **Validation**: Zod at system boundaries (contact form, env vars)

## Open architectural question

**Sub-directory mounting**: The owner wants to mount other repos at sub-paths
(e.g. `/tools/`, `/resources/`). Nuxt Layers is the candidate mechanism. This needs a spike
before the DESIGN wave commits to an approach. DISCOVER should surface *what* would be mounted
and *why* before DESIGN decides *how*.

## What DISCOVER should pressure-test

- Who is the site actually for? (Prospective clients? Referrals? Institutional partners?)
- What job are they hiring the site to do?
- Does the current site fail at that job, or just look wrong?
- Is the sub-directory mounting a real near-term requirement or aspirational scope?
- Should the blog and bookshelf be in scope this time, and if so, what changed?
- Is markdown-in-repo (`@nuxt/content`) the right trade-off vs a CMS for this owner's workflow?
