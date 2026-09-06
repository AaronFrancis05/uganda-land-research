# Land Tenure Field Study — Uganda

A static research site that collects survey responses for a proposed Uganda
land-verification and property platform. Four respondent instruments
(landholders, surveyors, real-estate professionals, land-administration
officials); responses are stored in Supabase and tallied live on the findings sheet.

## Stack
- Static HTML/CSS/JS (no build step)
- Supabase (Postgres) for storage + aggregate views
- Deployed on Vercel

## Files
- `index.html` — markup and views
- `styles.css` — cadastral / deed-plan visual system
- `config.js` — Supabase URL + publishable (anon) key (safe to expose; write-only via RLS)
- `questions.js` — the four question sets
- `app.js` — routing, form logic, Supabase read/write

## Data model (Supabase)
- `survey_responses` — one row per completed questionnaire (jsonb `answers`)
- `survey_answers` — one row per selected option (for tallying)
- `metrics_track_totals`, `metrics_option_counts` — public read-only aggregate views

Row Level Security allows anonymous INSERT only. Individual rows cannot be read
by the public; only aggregate counts are exposed.

## Local preview
Serve the folder with any static server, e.g. `python3 -m http.server`.
