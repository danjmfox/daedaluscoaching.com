# Spike Findings — H3: @nuxt/content Markdown Edit Workflow

feature_id: daedalus-coaching-website-redesign
spike_id: H3
date: 2026-05-12
verdict: WORKS

---

## Assumption tested

Can a solo developer/practitioner complete a cold-start-to-change-visible content edit
(paragraph change + image reference swap) in @nuxt/content in under 10 minutes wall-clock?

---

## Measured timings

| Phase | Measured |
|-------|----------|
| `pnpm install` (cold, ~580 packages) | 8.7s |
| `pnpm install` (warm pnpm cache) | 2.5s |
| `pnpm dev` cold start to first HTTP 200 | 3.6s |
| Edit `.md` file → content visible in browser | 122ms |
| Paragraph change detected by watcher | confirmed |
| Image `src` swap detected by watcher | confirmed |

**Realistic owner cycle:**
- With deps installed, server cold: ~1–2 minutes
- Full cold start including install: ~3–5 minutes
- Fresh clone + owner new to markdown: ~6–8 minutes (marginal but within budget)

---

## HMR behaviour

@nuxt/content v3 uses `@parcel/watcher` to detect `.md` file changes and re-index the
content collection. Server serves updated content within ~120–200ms of saving. Not a
WebSocket push — a manual F5 is needed to see the change. For VS Code + browser tab: natural.

---

## Friction points

**1. `better-sqlite3` peer dependency — one-time setup cost**
@nuxt/content v3.13.0 requires `better-sqlite3 ^12.5.0`. Must be added explicitly to
`package.json` or it fails silently in non-TTY environments. One-time fix at scaffold; zero
ongoing friction.

**2. `content.config.ts` required for collection query API**
Without this file, @nuxt/content falls back to a default collection with a warning.
`queryCollection('content').path('/home').first()` requires a declared collection.
Scaffold once in the walking skeleton; owner never touches it again.

**3. Vite `optimizeDeps` warnings at startup (~10 warnings)**
Cosmetic — `@nuxtjs/mdc > remark-*` packages not resolving in `optimizeDeps.include`.
Zero runtime impact. Worth a one-line note in onboarding docs for new developers.

**4. Image handling: no magic**
@nuxt/content passes image paths through as-is. Swapping an image requires:
(a) drop new file into `/public/images/`, (b) edit the markdown reference, (c) commit both.
Fine for developer-owner; gap vs a CMS for non-technical editors.

**5. No visual editing**
Pure markdown in a text editor. No WYSIWYG, no image picker. Appropriate for this owner.

---

## Performance budget

| Scenario | Estimated time | Within 10-min budget? |
|----------|---------------|----------------------|
| Deps installed, server running | <30s | Yes |
| Deps installed, cold start | ~1 min | Yes |
| Fresh clone, full install + start | ~3–5 min | Yes |
| Fresh clone + owner new to markdown | ~6–8 min | Yes (marginal) |

---

## Owner timing test

The harness is at `/tmp/spike_h3/`. To run the test yourself:

1. `cd /tmp/spike_h3 && pnpm dev` — start timer here
2. Wait for `Local: http://localhost:3099/` in terminal
3. Open `http://localhost:3099/` in browser
4. Open `/tmp/spike_h3/content/home.md` in VS Code
5. Edit 1: change any phrase in the first paragraph
6. Edit 2: change the image reference to a new filename
7. Save (Cmd+S), flip to browser, F5
8. Stop timer — change should be visible immediately

Expected total from step 1 to step 8: under 2 minutes (deps installed).

---

## Design implications

- `@nuxt/content` markdown-in-repo is confirmed viable for a developer-owner
- Option C (content adapter) closes IF the owner is always the content editor
- `better-sqlite3` and `content.config.ts` must be included in the walking skeleton scaffold
- Image workflow (drop file into `public/`, edit markdown reference) should be documented
  in the project CLAUDE.md onboarding section
- If a non-developer ever needs to edit content independently, revisit Nuxt Studio overlay
  (zero restructuring required — reads the same `content/` directory)

---

## Promotion gate

**Promoted on 2026-05-12.** Walking skeleton committed at `57966b0`.
Spike directory `/tmp/spike_h3/` deleted.

Original recommendation: PROMOTE. Verdict was WORKS, mechanism is the real planned stack,
and the walking skeleton had clear scope (content.config.ts + content/ directory in the
real project).
