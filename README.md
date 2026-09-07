# Land Tenure Field Study — Uganda

A research site that collects survey responses for a proposed Uganda
land-verification and property platform. Four respondent instruments
(landholders, surveyors, real-estate professionals, land-administration
officials); responses are stored in Supabase and tallied live on the findings sheet.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (theme tokens in `app/globals.css`)
- Supabase (Postgres) for storage + aggregate views
- Deployed on Vercel

## Routes
| Path | What it is |
| --- | --- |
| `/` | Hero and the four respondent tracks |
| `/survey/[track]` | One questionnaire — `native`, `surveyor`, `realtor`, `official` |
| `/survey/[track]/thanks` | Confirmation sheet (not indexed) |
| `/findings` | Findings sheet, server-rendered; `?track=` selects the instrument |
| `/about` | Method & handling |
| `/api/responses` | POST endpoint that writes a completed questionnaire |

## Layout
- `app/` — routes, root layout, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- `components/` — masthead, colophon, deed plan, track rows, survey form, findings board
- `lib/tracks.ts` — the four question sets
- `lib/supabase.ts`, `lib/metrics.ts` — server-side client and the aggregate reads

## Environment
Copy `.env.example` to `.env.local` (and set the same values in the Vercel project):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` — the publishable key; safe to expose, write-only via RLS
- `NEXT_PUBLIC_SITE_URL` — absolute origin, used for canonical URLs and the sitemap

## Data model (Supabase)
- `survey_responses` — one row per completed questionnaire (jsonb `answers`)
- `survey_answers` — one row per selected option (for tallying)
- `metrics_track_totals`, `metrics_option_counts` — public read-only aggregate views

Row Level Security allows anonymous INSERT only. Individual rows cannot be read
by the public; only aggregate counts are exposed. Free-text answers are kept in the
`answers` jsonb and are never written to `survey_answers`, so they cannot surface
on the findings sheet.

## Local development
```
npm install
npm run dev
```
