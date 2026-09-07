import Link from "next/link";
import { TRACK_ORDER, TRACKS } from "@/lib/tracks";
import type { OptionCount, TrackKey, TrackTotal } from "@/lib/types";
import { EMPTY_Q } from "./ui";

type Props = {
  active: TrackKey;
  totals: TrackTotal[] | null;
  counts: OptionCount[] | null;
};

/** Rows for one question: the label plus how many respondents chose it. */
function rowsFor(track: TrackKey, counts: OptionCount[]) {
  const t = TRACKS[track];
  const mine = counts.filter((c) => c.track === track);

  return t.questions
    .filter((q) => q.type !== "text") // free text isn't tallied, to protect anonymity
    .map((q) => {
      let rows: { label: string; count: number }[];

      if (q.type === "scale") {
        rows = [1, 2, 3, 4, 5].map((n) => {
          const r = mine.find(
            (c) => c.question_id === q.id && String(c.answer_value) === String(n),
          );
          return {
            label: n + (n === 1 ? " · " + q.labels[0] : n === 5 ? " · " + q.labels[1] : ""),
            count: r ? r.responses : 0,
          };
        });
      } else {
        rows = q.options.map((opt) => {
          const r = mine.find((c) => c.question_id === q.id && c.answer_value === opt);
          return { label: opt, count: r ? r.responses : 0 };
        });
      }

      const total = rows.reduce((a, r) => a + r.count, 0);
      return { id: q.id, prompt: q.prompt, rows, total };
    });
}

export default function FindingsBoard({ active, totals, counts }: Props) {
  const t = TRACKS[active];
  const hasData = counts !== null && counts.some((c) => c.track === active);

  return (
    <>
      <div className="mb-[30px] grid grid-cols-4 border border-rule-2 max-[820px]:grid-cols-2">
        {TRACK_ORDER.map((k, i) => {
          const row = totals?.find((r) => r.track === k);
          return (
            <div
              key={k}
              className={`bg-paper px-[18px] py-4 border-rule-2 ${
                i === TRACK_ORDER.length - 1 ? "" : "border-r"
              } ${i === 1 ? "max-[820px]:border-r-0" : ""}`}
            >
              <b className="block font-serif text-[28px] font-semibold leading-none text-green">
                {totals ? (row ? row.total_responses : 0) : "—"}
              </b>
              <span className="text-[12.5px] text-ink-2">{TRACKS[k].title}</span>
            </div>
          );
        })}
      </div>

      <nav
        className="mb-7 flex flex-wrap border-b border-rule"
        aria-label="Respondent track"
      >
        {TRACK_ORDER.map((k) => (
          <Link
            key={k}
            href={k === "native" ? "/findings" : `/findings?track=${k}`}
            scroll={false}
            aria-current={k === active ? "true" : undefined}
            className={`border-b-2 px-4 py-[10px] text-[14px] ${
              k === active
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-2"
            }`}
          >
            {TRACKS[k].title}
          </Link>
        ))}
      </nav>

      {counts === null ? (
        <p className={EMPTY_Q}>
          The results database isn&rsquo;t reachable from here. Once the site is deployed with
          its Supabase connection, live tallies appear on this sheet.
        </p>
      ) : !hasData ? (
        <p className={EMPTY_Q}>
          No responses in this track yet. Be the first. Pick this instrument from the tracks
          page.
        </p>
      ) : (
        <div>
          {rowsFor(active, counts).map((q) => (
            <div key={q.id} className="mb-[30px] pb-2">
              <h3 className="mb-[14px] font-serif text-[16px] font-semibold text-ink">
                {q.prompt}
              </h3>
              {q.rows.map((r) => {
                const pct = q.total ? Math.round((r.count / q.total) * 100) : 0;
                return (
                  <div
                    key={r.label}
                    className="mb-2 grid grid-cols-[210px_1fr_40px] items-center gap-3 text-[13.5px] max-[820px]:grid-cols-[130px_1fr_34px]"
                  >
                    <div className="text-right leading-[1.3] text-ink-2">{r.label}</div>
                    <div className="h-4 overflow-hidden border border-rule bg-sheet-2">
                      <div
                        className="h-full"
                        style={{ width: `${pct}%`, background: t.color }}
                      />
                    </div>
                    <div className="tabular text-[12.5px] text-ink-2">{r.count}</div>
                  </div>
                );
              })}
            </div>
          ))}
          <p className={EMPTY_Q}>
            Open-text answers are stored with each response but are not shown here, to keep
            individual responses anonymous.
          </p>
        </div>
      )}
    </>
  );
}
