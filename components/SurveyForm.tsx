"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TRACKS } from "@/lib/tracks";
import { makeSerial } from "@/lib/serial";
import type { Answers, AnswerValue, Question, TrackKey } from "@/lib/types";
import { BTN_PRIMARY, SHELL_NARROW } from "./ui";

const SERIAL_PLACEHOLDER = "LT/2026/—";

function isAnswered(v: AnswerValue | undefined): boolean {
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.trim() !== "";
  return v !== undefined;
}

/** Free text is held raw while typing so spaces survive; it is trimmed on the
 *  way out, as the original form did. */
function normalize(answers: Answers): Answers {
  const out: Answers = {};
  for (const [k, v] of Object.entries(answers)) {
    const val = typeof v === "string" ? v.trim() : v;
    if (Array.isArray(val) ? val.length : val !== "" && val !== undefined) out[k] = val;
  }
  return out;
}

export default function SurveyForm({ track }: { track: TrackKey }) {
  const router = useRouter();
  const t = TRACKS[track];

  const [serial, setSerial] = useState(SERIAL_PLACEHOLDER);
  const [answers, setAnswers] = useState<Answers>({});
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fieldRefs = useRef<Record<string, HTMLFieldSetElement | null>>({});

  // Generated after mount so server and client markup agree.
  useEffect(() => setSerial(makeSerial()), []);

  const required = useMemo(() => t.questions.filter((q) => !q.optional), [t]);
  const progress = required.length
    ? Math.round(
        (required.filter((q) => isAnswered(answers[q.id])).length / required.length) * 100,
      )
    : 0;

  function set(id: string, value: AnswerValue) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setBad((b) => (b[id] ? { ...b, [id]: false } : b));
  }

  function toggleMulti(id: string, opt: string, checked: boolean) {
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? (a[id] as string[]) : [];
      return { ...a, [id]: checked ? [...cur, opt] : cur.filter((v) => v !== opt) };
    });
    setBad((b) => (b[id] ? { ...b, [id]: false } : b));
  }

  async function submit() {
    const missing: Record<string, boolean> = {};
    let firstBad: string | null = null;
    for (const q of t.questions) {
      if (q.optional) continue;
      if (!isAnswered(answers[q.id])) {
        missing[q.id] = true;
        if (!firstBad) firstBad = q.id;
      }
    }
    setBad(missing);
    if (firstBad) {
      fieldRefs.current[firstBad]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track, answers: normalize(answers) }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      router.push(`/survey/${track}/thanks?ref=${encodeURIComponent(serial)}`);
    } catch (e) {
      console.error(e);
      setSaving(false);
      setError(
        "We couldn't save your response just now. Please check your connection and try again.",
      );
    }
  }

  return (
    <div className={SHELL_NARROW}>
      <div className="mb-[22px] inline-flex border border-green">
        <div className="flex flex-col border-r border-green px-4 py-2">
          <span className="text-[10.5px] uppercase tracking-[0.08em] text-ink-2">
            Instrument
          </span>
          <span className="font-serif text-[15px] font-semibold" style={{ color: t.color }}>
            {t.label}
          </span>
        </div>
        <div className="flex flex-col px-4 py-2">
          <span className="text-[10.5px] uppercase tracking-[0.08em] text-ink-2">Serial</span>
          <span className="font-serif text-[15px] font-semibold text-green">{serial}</span>
        </div>
      </div>

      <h1 className="mb-2 text-[30px] text-ink">{t.title}</h1>
      <p className="mb-[22px] max-w-[56ch] text-[15px] text-ink-2">{t.sub}</p>

      <div className="mb-[38px] h-1 bg-rule">
        <span className="meter-fill" style={{ width: `${progress}%` }} />
      </div>

      <form noValidate onSubmit={(e) => e.preventDefault()}>
        {t.questions.map((q, i) => (
          <Field
            key={q.id}
            q={q}
            index={i}
            bad={!!bad[q.id]}
            value={answers[q.id]}
            onSet={set}
            onToggle={toggleMulti}
            innerRef={(el) => {
              fieldRefs.current[q.id] = el;
            }}
          />
        ))}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[13px] text-ink-2">
            Answers save to the shared study pool when you submit.
          </span>
          <button type="button" className={BTN_PRIMARY} disabled={saving} onClick={submit}>
            {saving ? "Saving…" : "Submit response"}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-[13px] text-laterite">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

function Field({
  q,
  index,
  bad,
  value,
  onSet,
  onToggle,
  innerRef,
}: {
  q: Question;
  index: number;
  bad: boolean;
  value: AnswerValue | undefined;
  onSet: (id: string, v: AnswerValue) => void;
  onToggle: (id: string, opt: string, checked: boolean) => void;
  innerRef: (el: HTMLFieldSetElement | null) => void;
}) {
  // Background and border colour are set per state so no two utilities compete
  // for the same property.
  const optBase =
    "field-focus flex cursor-pointer items-center gap-[11px] border px-[13px] py-[11px] text-[14.5px] transition-[border-color,background-color] duration-[120ms]";

  return (
    <fieldset ref={innerRef} className="mb-[30px] border-b border-rule pb-7">
      <legend
        className={`flex items-baseline gap-[10px] p-0 font-serif text-[18px] font-medium ${
          bad ? "text-laterite" : "text-ink"
        }`}
      >
        <span className="text-[14px] font-semibold text-laterite">{index + 1}</span>
        <span>{q.prompt}</span>
      </legend>

      {q.hint && <p className="mt-[7px] text-[13px] text-ink-2">{q.hint}</p>}

      {(q.type === "single" || q.type === "multi") && (
        <div className="mt-[14px] flex flex-col gap-2">
          {q.options.map((opt) => {
            const on =
              q.type === "single"
                ? value === opt
                : Array.isArray(value) && value.includes(opt);
            return (
              <label
                key={opt}
                className={`${optBase} ${
                  on
                    ? "border-green bg-selected"
                    : "border-rule-2 bg-paper hover:border-ink-2"
                }`}
              >
                <input
                  className="opt-input field-focus h-4 w-4 shrink-0"
                  type={q.type === "single" ? "radio" : "checkbox"}
                  name={q.id}
                  value={opt}
                  checked={on}
                  onChange={(e) =>
                    q.type === "single"
                      ? onSet(q.id, opt)
                      : onToggle(q.id, opt, e.target.checked)
                  }
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      )}

      {q.type === "scale" && (
        <>
          <div className="mt-[14px] flex gap-[7px]">
            {[1, 2, 3, 4, 5].map((n) => {
              const on = value === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onSet(q.id, n)}
                  aria-pressed={on}
                  className={`field-focus flex-1 cursor-pointer border px-1 py-[13px] text-center font-serif text-[15px] ${
                    on
                      ? "border-green bg-selected font-semibold text-green"
                      : "border-rule-2 bg-paper"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <div className="mt-[7px] flex justify-between text-[12px] text-ink-2">
            <span>{q.labels[0]}</span>
            <span>{q.labels[1]}</span>
          </div>
        </>
      )}

      {q.type === "text" && (
        <textarea
          className="field-focus mt-[14px] min-h-[82px] w-full resize-y border border-rule-2 bg-paper px-3 py-[11px] font-sans text-[14.5px]"
          placeholder={q.optional ? "Optional" : "Your answer"}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onSet(q.id, e.target.value)}
        />
      )}

      {bad && (
        <p className="mt-[9px] text-[13px] text-laterite">
          Please answer this, or leave it blank if it&rsquo;s optional.
        </p>
      )}
    </fieldset>
  );
}
