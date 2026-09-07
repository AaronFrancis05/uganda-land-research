import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BTN_LINE, BTN_PRIMARY, HERO_ACTIONS } from "@/components/ui";
import { isTrackKey, TRACKS } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "Response recorded",
  robots: { index: false, follow: true },
};

export default async function ThanksPage({
  params,
  searchParams,
}: {
  params: Promise<{ track: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const [{ track }, { ref }] = await Promise.all([params, searchParams]);
  if (!isTrackKey(track)) notFound();

  const t = TRACKS[track];
  const serial = ref && /^LT\/2026\/[A-Z]\d{4}$/.test(ref) ? ref : "LT/2026/—";

  return (
    <main className="pt-[70px] pb-[100px]">
      {/* .shell.narrow measure, with the plate's own 44/40 padding replacing the gutter. */}
      <div className="mx-auto w-full max-w-[660px] border border-rule-2 bg-paper px-10 py-11">
        <p className="stamp" style={{ color: t.color }}>
          {t.label.toUpperCase()}
        </p>

        <h1 className="mb-3 text-[28px] text-ink">Response entered into the record.</h1>

        <p className="max-w-[52ch] text-[15px] text-ink-2">
          Your answers were added to the shared study pool. Nothing that identifies you was
          collected. You can see how your track is trending on the findings sheet.
        </p>

        <p className="mt-[18px] mb-[26px] font-serif text-[17px] font-semibold text-green">
          {serial}
        </p>

        <div className={HERO_ACTIONS}>
          <Link className={BTN_PRIMARY} href={`/findings?track=${track}`}>
            Read the findings
          </Link>
          <Link className={BTN_LINE} href="/">
            Another questionnaire
          </Link>
        </div>
      </div>
    </main>
  );
}
