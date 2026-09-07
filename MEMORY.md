# Change record

A running log of substantive changes to this project — what changed, and why.
Newest first. Add an entry when you change architecture, data handling, the
survey instrument, or the deployment setup. Routine edits don't need one.

---

## 2026-09-07 — Ported the static site to Next.js

**Why:** The site was a single-URL static SPA. `index.html` held five
`<main data-view>` blocks that `app.js` showed and hid on hash change
(`#/`, `#/findings`, `#/about`). Two consequences: the findings sheet and the
method page were invisible to search engines, and the findings numbers only
existed after a client-side fetch, so crawlers saw "Loading the record…" instead
of the study's actual data. The document also shipped five `<main>` elements,
which is invalid HTML.

**Outcome:** Same site — same design, same copy, same database — on Next.js 15
App Router, with real routes, server-rendered findings, and a proper SEO surface.

### Routing

Hash views became real routes:

| Was | Now |
| --- | --- |
| `#/` | `/` |
| `#/findings` | `/findings` (+ `?track=` per instrument) |
| `#/about` | `/about` |
| JS-swapped survey view | `/survey/[track]` |
| JS-swapped thanks view | `/survey/[track]/thanks` (noindex) |

The four findings tracks are now four crawlable URLs rather than one
client-toggled view. `components/LegacyHashRedirect.tsx` translates old
`#/findings` and `#/about` links, so previously shared URLs still land.

### Data layer

Reads moved server-side (`lib/metrics.ts`, wrapped in `unstable_cache`, 60s,
tag `metrics`), so the tallies are in the delivered HTML. Writes moved to
`POST /api/responses`, which reproduces the original two-table insert and adds
validation: unknown tracks rejected, answer keys not belonging to the
instrument dropped, options checked against the declared list, required
questions enforced server-side. `user_agent` now comes from the request header.
A successful write calls `revalidateTag("metrics")`.

**No schema, policy, or table change.** Same Supabase project, same RLS.
Credentials moved out of the browser-loaded `config.js` into `SUPABASE_URL` /
`SUPABASE_ANON_KEY` env vars; nothing client-side touches Supabase any more, and
the supabase-js CDN `<script>` is gone.

### Styling

`styles.css` retired. Its custom properties became Tailwind v4 `@theme` tokens
in `app/globals.css`; every rule was re-expressed as utilities using exact
arbitrary values, with `max-[820px]:` / `max-[520px]:` variants preserving the
original cascade. Only the grid plate, rotated stamp, meter fill, focus rings
and the reduced-motion reset stayed as CSS. The old `--white` token is now
`paper`, so it doesn't shadow Tailwind's `white`.

### Survey instrument

`questions.js` became the typed `lib/tracks.ts`. The port was diffed against the
original in a sandbox: **4 tracks, 54 questions, identical after
normalisation.** No prompt, option, hint or scale label changed.

### SEO

Per-route title / description / canonical; `title.template`; `metadataBase`;
`app/sitemap.ts` (7 public URLs); `app/robots.ts` disallowing `/api/` and
`/survey/*/thanks`; WebSite + ResearchProject JSON-LD site-wide with
BreadcrumbList on inner routes; `opengraph-image.tsx` share card; `icon.svg`;
Spectral and Archivo self-hosted via `next/font` (removing the render-blocking
Google Fonts stylesheet); one `<main>` and one `<h1>` per page; `noindex` on the
thanks route.

### Files removed

`index.html`, `app.js`, `config.js`, `questions.js`, `styles.css`, `vercel.json`
(its two security headers moved into `next.config.ts`). Git history keeps them.

### Verified

Clean `npm run build` and `tsc --noEmit`; all routes return expected status
codes; database connected and reading (2 responses on file at the time of the
port, tallies present in raw HTML with no JS); titles, canonicals, robots
directives, sitemap and JSON-LD confirmed per route; design compared against the
original side by side and confirmed exact.

**Not verified:** the write path end-to-end. Testing it would have written rows
into the live research database, which was deliberately avoided. The insert
logic is a faithful port and type-checks, but no submission has gone through the
new code. Worth confirming with the first real response after deploy.

### Also

`.mcp.json` added for the Supabase MCP server (project scope). It needs
authenticating once via `/mcp` in a regular terminal.

---

## Open items

- `uganda-land-research.html` (a 39KB single-file copy of the site from the
  first commit) is deleted in the working tree but the deletion is unstaged and
  predates this work. Decide whether to commit the deletion or restore it.
- Set `SUPABASE_URL`, `SUPABASE_ANON_KEY` and `NEXT_PUBLIC_SITE_URL` in the
  Vercel project before the next deploy — the build reads them at request time
  and the findings sheet renders its "database isn't reachable" state without.
