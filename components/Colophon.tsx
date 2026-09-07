import Link from "next/link";
import Crest from "./Crest";

const LINKS = [
  { href: "/", label: "Respondent tracks" },
  { href: "/findings", label: "Findings sheet" },
  { href: "/about", label: "Method & handling" },
];

const H = "mb-[14px] text-[11px] uppercase tracking-[0.1em] text-[rgba(247,246,241,0.5)]";
const NOTE = "m-0 text-[12.5px] leading-[1.6] text-[rgba(247,246,241,0.72)]";

export default function Colophon() {
  return (
    <footer className="mt-10 border-t-2 border-green bg-green text-sheet">
      <div className="mx-auto w-full max-w-[1040px] px-[30px]">
        <div className="grid grid-cols-[1.6fr_1fr_1.3fr_1.3fr] gap-10 pt-[46px] pb-[38px] max-[820px]:grid-cols-2 max-[820px]:gap-8 max-[520px]:grid-cols-1 max-[520px]:gap-7">
          <div className="max-[820px]:col-span-2 max-[520px]:col-auto">
            <span className="inline-flex text-sheet opacity-90">
              <Crest size={30} dot={1.6} />
            </span>
            <p className="mt-3 mb-2 font-serif text-[18px] font-semibold text-sheet">
              Land Tenure Field Study
            </p>
            <p className="m-0 max-w-[38ch] text-[13px] leading-[1.6] text-[rgba(247,246,241,0.72)]">
              A field study behind a proposed land-verification and property platform for
              Uganda, built on evidence from the people the sector serves.
            </p>
          </div>

          <nav className="flex flex-col" aria-label="Footer">
            <p className={H}>Sections</p>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-fit border-b border-transparent py-[5px] text-[14px] text-[rgba(247,246,241,0.85)] hover:border-laterite hover:text-sheet"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className={H}>Your data</p>
            <p className={NOTE}>
              Responses are anonymous. No names, phone numbers, or identity numbers are
              collected. Only pooled counts appear on the findings sheet, visible to all
              participants.
            </p>
          </div>

          <div>
            <p className={H}>Independence</p>
            <p className={NOTE}>
              Not affiliated with the Ministry of Lands, Housing and Urban Development, the
              UgNLIS registry, or NIRA. This study does not verify or record anyone&rsquo;s
              actual land rights.
            </p>
          </div>
        </div>

        <div className="tabular flex flex-wrap gap-7 border-t border-[rgba(247,246,241,0.16)] pt-4 pb-10 text-[11.5px] tracking-[0.04em] text-[rgba(247,246,241,0.6)] max-[520px]:gap-[14px]">
          <span>Instrument LT/2026</span>
          <span>Grid ARC 1960 / UTM 36N</span>
          <span>Independent research · Uganda</span>
        </div>
      </div>
    </footer>
  );
}
