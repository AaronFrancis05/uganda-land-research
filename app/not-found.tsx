import Link from "next/link";
import { BTN_PRIMARY, SHELL_NARROW } from "@/components/ui";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="pt-[70px] pb-[100px]">
      <div className={SHELL_NARROW}>
        <p className="mb-5 border-l-[3px] border-laterite pl-[11px] text-[12.5px] text-ink-2">
          Filing ref. LT/2026 · no such sheet
        </p>
        <h1 className="mb-3 text-[30px] text-ink">That page isn&rsquo;t in the record.</h1>
        <p className="mb-[26px] max-w-[52ch] text-[15px] text-ink-2">
          The address you followed doesn&rsquo;t match any part of this study. The four
          questionnaires and the findings sheet are all reachable from the tracks page.
        </p>
        <Link className={BTN_PRIMARY} href="/">
          Back to the respondent tracks
        </Link>
      </div>
    </main>
  );
}
