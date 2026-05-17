# Slice 02 — Cookie notice + privacy page

```yaml
slice_id: slice-02
feature_id: launch-readiness
story: S-LR-002
estimate: 1h
execution_order: 1
```

## Goal

Add a dismissible `CookieNotice.vue` that tells visitors the site uses no cookies and links to `/privacy`. Verify the existing privacy page renders correctly. Remove iubenda from the CSP and architecture.

## DESIGN decisions

- D-LR-D04: iubenda removed from stack — custom component preferred. See feature-delta.md.
- D-LR-02 (revised): privacy page and content already exist (`pages/privacy.vue`, `content/privacy.md`). No page creation needed.
- Future analytics: if added, a privacy-first tool (Fathom, Plausible, Umami) will be consent-exempt under GDPR — no consent management platform required.

## IN scope

- `components/CookieNotice.vue` — first-visit dismissible banner, `localStorage` flag, links to `/privacy`
- Mount in `app.vue`
- Strip iubenda entries from `public/_headers` CSP
- Verify `/privacy` resolves and renders correctly

## OUT scope

- Cookie policy page (separate — PL-3)
- iubenda integration (removed from stack)
- Consent management flows (not needed — no non-essential cookies)

## Learning hypothesis

Disproves: "removing iubenda from CSP will break anything."
Confirms: CSP with iubenda entries removed is cleaner and nothing depends on those domains.

## Acceptance criteria

- AC-LR-002-1: `/privacy` resolves with 200 ✓ (already satisfied — verify)
- AC-LR-002-2: Privacy policy content renders ✓ (already satisfied — verify)
- AC-LR-002-3: Site header and footer present ✓ (already satisfied — verify)
- AC-LR-002-4: Page title is "Privacy Policy | Daedalus Coaching" ✓ (already satisfied — verify)
- AC-LR-002-5: `CookieNotice.vue` appears on first visit across all pages
- AC-LR-002-6: Dismissing the notice persists across page navigation (localStorage)
- AC-LR-002-7: Notice does not reappear after dismiss + reload
- AC-LR-002-8: Notice links to `/privacy`
- AC-LR-002-9: iubenda domains absent from `Content-Security-Policy` in `public/_headers`

## Dependencies

None.

## Pre-slice SPIKE

None needed.
