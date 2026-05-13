# Spike Findings

---

## SPIKE-CB: Composable Content Blocks

feature_id: daedalus-coaching-website-redesign
spike_id: SPIKE-CB
date: 2026-05-12
verdict: WORKS — with known path conventions

---

### Assumption tested

Can a page document carry a `blocks: string[]` frontmatter field (slug list), and can a
composable resolve those slugs into full block documents at SSG time — producing static HTML
that contains the block prose?

---

### Verification result

`nuxt generate` produced `.output/public/about/index.html` containing:

```text
This is the about intro block prose. Spike verification target.
This is the about approach block prose. Second block verification target.
```

Both blocks rendered. `_payload.json` confirmed `useAsyncData` ran server-side and the full
`{ page, blocks }` shape was serialised into the prerender payload.

---

### Composable pattern (confirmed SSG-safe)

The full pages → slugs → blocks chain must live inside **one** `useAsyncData` callback.
Splitting into two separate `useAsyncData` calls causes the second to be skipped during
prerender (Nuxt only drives the first).

```ts
export function useComposedPage(path: string) {
  return useAsyncData(`composed-page:${path}`, async () => {
    const page = await queryCollection("pages").path(path).first();
    if (!page?.blocks) return { page, blocks: [] };
    const blocks = await Promise.all(
      (page.blocks as string[]).map((slug: string) =>
        queryCollection("blocks").path(`/blocks/${slug}`).first(),
      ),
    );
    return { page, blocks: blocks.filter(Boolean) };
  });
}
```

---

### Path conventions discovered

`@nuxt/content` v3 derives document paths from the file path relative to `content/`, keeping
the source subdirectory prefix. Consequence:

| Content file                    | Collection source | Stored path           | Query call                     |
| ------------------------------- | ----------------- | --------------------- | ------------------------------ |
| `content/pages/about.md`        | `pages/**/*.md`   | `/pages/about`        | `.path('/pages/about')`        |
| `content/blocks/about-intro.md` | `blocks/**/*.md`  | `/blocks/about-intro` | `.path('/blocks/about-intro')` |

Slug strings stored in frontmatter (`blocks: [about-intro, about-approach]`) need the
`/blocks/` prefix prepended in the resolver, OR the project can store full paths
(`blocks: [/blocks/about-intro]`) to keep the composable simpler.

**Recommended:** store bare slugs in frontmatter; prepend prefix in the composable.
Frontmatter stays readable; path convention is encapsulated in one place.

---

### Friction points

**1. Path prefix not obvious**
The `stem` field value is `blocks/about-intro` (no leading slash); `.where('stem', '=', slug)`
silently returns nothing. Use `.path('/blocks/${slug}')` for reliable lookup.

**2. `better-sqlite3` build gating**
pnpm v9+ requires explicit `pnpm.onlyBuiltDependencies` in `package.json` for native deps.
Without it, `better-sqlite3` silently skips its build script and `nuxt generate` fails at
startup. Already noted in H3 findings; reinforce in walking skeleton scaffold.

**3. `content.config.ts` collection schema**
`blocks` field on pages must be declared as `z.array(z.string()).optional()` in the schema;
otherwise the frontmatter value is dropped before reaching the composable.

---

### Design implications

- `useComposedPage` is the right abstraction boundary: one composable, one `useAsyncData` key,
  one SSG-safe async chain.
- Page files carry slug arrays; the composable owns the path resolution. Content authors
  write `blocks: [about-intro]`; plumbing is invisible to them.
- `content.config.ts` must declare the `blocks` schema field from day one — add to walking
  skeleton checklist.
- The path convention (`/pages/*`, `/blocks/*`) is a content architecture choice with
  implications for Nuxt routing. Confirm in the walking skeleton whether Nuxt auto-routes from
  `content/pages/` paths or whether page routes are all in `pages/` (Vue files).

---

### Promotion gate

**Verdict: PROMOTE.**

The mechanism is proven. Remaining decisions (path naming, routing convention) are
walking-skeleton work, not spike unknowns. Implement `useComposedPage` in the real project
once the walking skeleton has `content.config.ts` and the `pages`/`blocks` collections
scaffolded.

Spike directory `/tmp/spike_composable_content_blocks/` can be deleted.

---

## H3: @nuxt/content Markdown Edit Workflow

feature_id: daedalus-coaching-website-redesign
spike_id: H3
date: 2026-05-12
verdict: WORKS

---

### H3 — Assumption tested

Can a solo developer/practitioner complete a cold-start-to-change-visible content edit
(paragraph change + image reference swap) in @nuxt/content in under 10 minutes wall-clock?

---

### Measured timings

| Phase                                        | Measured  |
| -------------------------------------------- | --------- |
| `pnpm install` (cold, ~580 packages)         | 8.7s      |
| `pnpm install` (warm pnpm cache)             | 2.5s      |
| `pnpm dev` cold start to first HTTP 200      | 3.6s      |
| Edit `.md` file → content visible in browser | 122ms     |
| Paragraph change detected by watcher         | confirmed |
| Image `src` swap detected by watcher         | confirmed |

**Realistic owner cycle:**

- With deps installed, server cold: ~1–2 minutes
- Full cold start including install: ~3–5 minutes
- Fresh clone + owner new to markdown: ~6–8 minutes (marginal but within budget)

---

### HMR behaviour

@nuxt/content v3 uses `@parcel/watcher` to detect `.md` file changes and re-index the
content collection. Server serves updated content within ~120–200ms of saving. Not a
WebSocket push — a manual F5 is needed to see the change. For VS Code + browser tab: natural.

---

### H3 — Friction points

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

### Performance budget

| Scenario                            | Estimated time | Within 10-min budget? |
| ----------------------------------- | -------------- | --------------------- |
| Deps installed, server running      | <30s           | Yes                   |
| Deps installed, cold start          | ~1 min         | Yes                   |
| Fresh clone, full install + start   | ~3–5 min       | Yes                   |
| Fresh clone + owner new to markdown | ~6–8 min       | Yes (marginal)        |

---

### Owner timing test

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

### H3 — Design implications

- `@nuxt/content` markdown-in-repo is confirmed viable for a developer-owner
- Option C (content adapter) closes IF the owner is always the content editor
- `better-sqlite3` and `content.config.ts` must be included in the walking skeleton scaffold
- Image workflow (drop file into `public/`, edit markdown reference) should be documented
  in the project CLAUDE.md onboarding section
- If a non-developer ever needs to edit content independently, revisit Nuxt Studio overlay
  (zero restructuring required — reads the same `content/` directory)

---

### H3 — Promotion gate

**Promoted on 2026-05-12.** Walking skeleton committed at `57966b0`.
Spike directory `/tmp/spike_h3/` deleted.

Original recommendation: PROMOTE. Verdict was WORKS, mechanism is the real planned stack,
and the walking skeleton had clear scope (content.config.ts + content/ directory in the
real project).
