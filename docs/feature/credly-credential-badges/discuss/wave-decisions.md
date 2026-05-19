# Wave Decisions — credly-credential-badges

## DISCUSS wave | 2026-05-19

## Scope Assessment: PASS

2 stories, 1 bounded context (presentation layer only), estimated 2–3 days total.
No new ports, no new core/ pure functions needed. Static data, no runtime fetch.

---

## D1 — Badge data lives in a content YAML file

**Decision**: Badge data is stored at `content/credentials/credly-badges.yaml`.
**Alternatives rejected**:

- Hardcoded in component: owner cannot add/remove badges without touching Vue SFC
- `nuxt.config.ts` runtimeConfig: mixing content with framework config; harder to scan
  **Rationale**: Owner can add a new badge by editing one YAML file and committing. No Vue knowledge required.
  **Owner**: DESIGN wave (solution-architect assigns file shape and Nuxt data-loading strategy).

---

## D2 — Use Credly CDN image URLs directly

**Decision**: `<img src="https://images.credly.com/...">` — no local copies.
**Alternatives rejected**:

- Download and commit PNGs: maintenance burden; badges may be revoked or updated; adds ~1 MB of binary assets to the git repo
- Base64 inline: bloats HTML; no caching benefit
  **Rationale**: Credly CDN is reliable and purpose-built for badge delivery. SSG-compatible — URL is baked into HTML at build time, no runtime fetch. Images are cached by the browser on repeat visits.
  **Constraint**: `img-src` in `public/_headers` must be extended to include `https://images.credly.com`. See D5.

---

## D3 — Two independent slices; about page is the walking skeleton

**Decision**: Ship about page badge display first (Slice 1), homepage second (Slice 2).
**Rationale**: The recruiter persona is more likely to navigate to the about page from a CV link than to land on the homepage. Slice 1 validates the data model and component in production. Slice 2 tests the homepage placement hypothesis independently — it can be deferred or rejected without affecting Slice 1.
**Risk**: If the recruiter consistently lands on the homepage first (CV link goes to `/`), Slice 2 becomes higher priority. This can be observed after Slice 1 is live.

---

## D4 — Group badges by issuer with a visual separator

**Decision**: Badges are grouped ICAgile (4) / Scrum.org (4) with a subtle heading or divider.
**Rationale**: Recruiters familiar with one issuer body but not the other can pattern-match faster. The separator communicates that both issuers are represented (breadth signal), not just one (depth-only signal).
**Implementation note**: Grouping is encoded in the YAML (an `issuer` field per badge). The component reads the issuer group, not a hard-coded list. DESIGN wave decides visual treatment.

---

## D5 — CSP update required before Slice 1 ships

**Decision**: `public/_headers` `img-src` directive must be updated to include `https://images.credly.com` before the badge component can render in production.
**Current value**: `img-src 'self' data:`
**Required value**: `img-src 'self' data: https://images.credly.com`
**Constraint classification**: Blocking dependency for both slices. Recorded as a technical note in each user story.

---

## D6 — No new design system abstraction

**Decision**: The badge strip is a simple flex-row of linked images. No FanEdge, BlockGroup, or slot-based composition pattern.
**Rationale**: CN-15 (design system component library) is a separate, later backlog item. Introducing an abstraction now couples this feature to an unspecified future system. YAGNI applies.
**DESIGN wave note**: Keep the component flat — `<a rel="noopener noreferrer"><img alt="..."></a>` pattern repeated per badge within a flex container.

---

## D7 — Alt text is mandatory, descriptive, and badge-specific

**Decision**: Each badge `<img>` must carry a descriptive `alt` attribute sourced from the YAML badge name field (e.g., `alt="ICAgile Certified Agile Coaching badge"`).
**Rationale**: Screen-reader users and search engines both benefit. Generic alt text (`alt="badge"`) fails WCAG 2.1 SC 1.1.1. The badge name is already captured in the data YAML — no additional authoring required.

---

## Risks noted

| Risk                                       | Likelihood | Impact                                                                             | Mitigation                                                                     |
| ------------------------------------------ | ---------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Credly CDN outage causes broken images     | Low        | Low — SSG renders `<img>` tags that simply fail to load; page layout is unaffected | Accept                                                                         |
| Badge links rot (earner page removed)      | Low        | Medium — recruiter clicks dead link, trust signal broken                           | Out of scope for v1; owner manually reviews links when renewing certifications |
| Recruiter lands on homepage not about page | Medium     | Low — Slice 2 handles this independently                                           | Monitor after Slice 1; prioritise Slice 2 if evidence confirms                 |
| CSP update missed before deploy            | Low        | High — all badge images fail to render silently                                    | Document as blocking AC in both slices                                         |
