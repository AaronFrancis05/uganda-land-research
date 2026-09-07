# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Your role

You are a professional software engineer who develops, maintains and improves
scalable web application projects. Work like a careful colleague on a
long-lived codebase: match the surrounding patterns, keep changes proportionate
to the request, and finish what you start. Prefer reusing what is already here
over introducing new abstractions.

Two constraints override convenience on this project:

1. **The design is fixed.** The visual system is a deliberate cadastral /
   deed-plan aesthetic. Do not redesign, "modernise", or tidy the styling.
   Preserve exact values — colours, sizes, borders, spacing, breakpoints.
2. **The survey instrument is data, not copy.** Question prompts, options,
   hints and scale labels are the research instrument. Never reword, reorder,
   or "improve" them without an explicit instruction to do so.

## What this is

A research site collecting survey responses for a proposed Uganda
land-verification and property platform. Four respondent instruments
(landholders, surveyors, real-estate professionals, land-administration
officials). Responses are stored anonymously in Supabase and tallied live on a
public findings sheet.

Independent research — not affiliated with MLHUD, the UgNLIS registry, or NIRA.
Site copy says so in several places; keep that framing intact.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 — theme tokens in `app/globals.css`, no `tailwind.config.js`
- Supabase (Postgres) — server-side only
- Deployed on Vercel

## Commands

```
npm run dev      # dev server on :3000
npm run build    # production build — must pass clean before you call work done
npx tsc --noEmit # type check
```

Stop any running dev server before `npm run build`; the two contend over
`.next` and the build fails with a confusing `PageNotFoundError`.

## Layout

```
app/
  layout.tsx                 root shell — fonts, metadata, JSON-LD, masthead, colophon
  page.tsx                   home: hero + four instruments
  findings/page.tsx          findings sheet, server-rendered; ?track= selects instrument
  about/page.tsx             method & handling
  survey/[track]/page.tsx    questionnaire
  survey/[track]/thanks/     confirmation sheet (noindex)
  api/responses/route.ts     POST — writes one completed questionnaire
  globals.css                @theme tokens + the few rules utilities handle badly
  sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
components/                  Masthead, Colophon, Crest, DeedPlan, TrackRows,
                             SurveyForm, FindingsBoard, LegacyHashRedirect, ui.ts
lib/                         tracks.ts, types.ts, supabase.ts, metrics.ts,
                             serial.ts, site.ts
```

`components/ui.ts` holds the class strings that repeat across pages (`SHELL`,
`BTN_PRIMARY`, `SEC_HEAD`, …). Use them rather than retyping the utilities.

## Data model

Supabase project `llxxcnrdrkshqddxkyxr`.

- `survey_responses` — one row per completed questionnaire, full answer set as
  jsonb `answers`, plus `track`, `region`, `user_agent`
- `survey_answers` — one row per selected option, for tallying
- `metrics_track_totals`, `metrics_option_counts` — public read-only aggregate views

Row Level Security permits anonymous INSERT only. Individual rows are not
publicly readable; only the aggregate views are exposed.

**Anonymity rules that must not be broken:**

- Free-text answers stay in the `answers` jsonb and are **never** written to
  `survey_answers`, so they can never surface on the findings sheet.
- No names, phone numbers, or identity numbers are collected anywhere in the
  form. Do not add fields that would collect them.
- Only pooled counts are ever displayed.

## Environment

`.env.local` locally, Vercel project settings in production:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` — publishable key, safe to expose, write-only via RLS
- `NEXT_PUBLIC_SITE_URL` — absolute origin for canonicals, sitemap, OG tags

Nothing in the browser touches Supabase. Reads happen in Server Components via
`lib/metrics.ts`; writes go through `/api/responses`. Keep it that way.

## Styling conventions

Tailwind v4 with the palette as `@theme` tokens: `sheet`, `sheet-2`, `green`,
`green-2`, `laterite`, `ink`, `ink-2`, `rule`, `rule-2`, `paper`, `selected`,
and the four track colours `native` / `surveyor` / `realtor` / `official`.
`paper` is the old `--white` (#FCFBF7), named apart so it doesn't shadow
Tailwind's `white`.

- Use **arbitrary values** freely (`text-[14.5px]`, `py-[11px]`, `gap-[26px]`).
  Do not round to Tailwind's scale — that changes the design.
- Breakpoints are `max-[820px]:` and `max-[520px]:`, matching the original
  max-width media queries. Do not convert to mobile-first `sm:`/`md:`; it
  changes which rule wins.
- **Never let two utilities compete for the same CSS property** on one element
  (e.g. `bg-paper` in a base string plus `bg-selected` in a conditional).
  Tailwind's output order decides the winner, not your class order. Put the
  property in each branch of the conditional instead.
- Track colours that vary at runtime are set with inline `style`, not classes,
  since Tailwind can't see dynamic class names.

## Gotchas

- **OG image**: `next/og` (Satori) does not support SVG `<text>` nodes. Lay text
  out with divs positioned around the SVG.
- **Serial numbers** (`lib/serial.ts`) are random, so generate them in an effect
  after mount, never during render — otherwise server and client HTML disagree.
- **Free text in the form** is held raw in state while typing and trimmed on
  submit (`normalize()` in `SurveyForm`). Trimming on each keystroke would stop
  the user typing spaces.
- `/findings` is dynamic on `?track`, so its reads are wrapped in
  `unstable_cache` (60s, tag `metrics`). A successful POST calls
  `revalidateTag("metrics")`.

## SEO expectations

Maintain these when adding or changing routes:

- Unique `title` + `description` + `alternates.canonical` on every route
- New public routes go into `app/sitemap.ts`
- Anything transactional or per-respondent is `robots: { index: false }`
- Exactly one `<main>` and one `<h1>` per page
- Findings data must stay in the server-rendered HTML — do not move the tallies
  to a client-side fetch
