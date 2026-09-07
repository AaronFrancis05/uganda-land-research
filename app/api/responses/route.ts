import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import { isTrackKey, TRACKS } from "@/lib/tracks";
import type { Answers, AnswerValue } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Writes one completed questionnaire:
     survey_responses — a single row carrying the whole answer set as jsonb
     survey_answers   — one row per selected option, for tallying
   Free-text answers stay in the jsonb and are never written to the tallied
   table, so the findings sheet can never surface an individual's words. */

export async function POST(req: Request) {
  let body: { track?: unknown; answers?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  const { track } = body;
  if (!isTrackKey(track)) {
    return NextResponse.json({ error: "Unknown respondent track." }, { status: 400 });
  }

  const raw = body.answers;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Answers must be an object." }, { status: 400 });
  }

  const t = TRACKS[track];
  const byId = new Map(t.questions.map((q) => [q.id, q]));

  // Keep only keys this instrument actually asks about, in the declared shape.
  const answers: Answers = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const q = byId.get(key);
    if (!q) continue;

    if (q.type === "multi") {
      if (!Array.isArray(value)) continue;
      const opts = value.filter(
        (v): v is string => typeof v === "string" && q.options.includes(v),
      );
      if (opts.length) answers[key] = opts;
    } else if (q.type === "single") {
      if (typeof value === "string" && q.options.includes(value)) answers[key] = value;
    } else if (q.type === "scale") {
      const n = typeof value === "number" ? value : Number(value);
      if (Number.isInteger(n) && n >= 1 && n <= 5) answers[key] = n;
    } else {
      if (typeof value === "string" && value.trim()) answers[key] = value.trim().slice(0, 4000);
    }
  }

  // Every required question must be present, mirroring the client-side check.
  const missing = t.questions
    .filter((q) => !q.optional)
    .filter((q) => {
      const v = answers[q.id];
      return Array.isArray(v) ? v.length === 0 : v === undefined || v === "";
    });
  if (missing.length) {
    return NextResponse.json(
      { error: "Some required questions are unanswered.", missing: missing.map((q) => q.id) },
      { status: 400 },
    );
  }

  const sb = getSupabase();
  if (!sb) {
    return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  }

  const region =
    (typeof answers.region === "string" && answers.region) ||
    (typeof answers.institution === "string" && answers.institution) ||
    null;

  const { data, error } = await sb
    .from("survey_responses")
    .insert({
      track,
      answers,
      region,
      user_agent: (req.headers.get("user-agent") || "").slice(0, 240),
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("survey_responses insert failed", error);
    return NextResponse.json({ error: "Could not save the response." }, { status: 502 });
  }

  const responseId = data.id;
  const rows: {
    response_id: string;
    track: string;
    question_id: string;
    answer_value: string;
  }[] = [];

  for (const q of t.questions) {
    if (q.type === "text") continue; // free text stays in the jsonb, not the tallied table
    const v: AnswerValue | undefined = answers[q.id];
    if (v === undefined || v === "" || (Array.isArray(v) && !v.length)) continue;

    const values = Array.isArray(v) ? v : [v];
    for (const opt of values) {
      rows.push({
        response_id: responseId,
        track,
        question_id: q.id,
        answer_value: String(opt),
      });
    }
  }

  if (rows.length) {
    const { error: answersError } = await sb.from("survey_answers").insert(rows);
    if (answersError) {
      // The response itself is safely on file; only the tally rows failed.
      console.error("survey_answers insert failed", answersError);
      return NextResponse.json({ error: "Could not save the response." }, { status: 502 });
    }
  }

  // Let the findings sheet pick the new response up without waiting out the TTL.
  revalidateTag("metrics");

  return NextResponse.json({ ok: true, id: responseId }, { status: 201 });
}
