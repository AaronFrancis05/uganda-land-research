"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Crest from "./Crest";

const NAV = [
  { href: "/", label: "Respondent tracks" },
  { href: "/findings", label: "Findings" },
  { href: "/about", label: "Method" },
];

export default function Masthead() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b-2 border-green bg-[rgba(247,246,241,0.94)] backdrop-blur-[6px]">
      <div className="mx-auto flex w-full max-w-[1040px] items-center justify-between px-[30px] py-[14px]">
        <Link href="/" className="flex items-center gap-3 text-green">
          <span className="flex">
            <Crest />
          </span>
          <span className="flex flex-col leading-[1.15]">
            <strong className="font-serif text-[17px] font-semibold text-ink">
              Land Tenure Field Study
            </strong>
            <em className="not-italic text-[11.5px] tracking-[0.02em] text-ink-2 max-[820px]:hidden">
              Uganda · Instrument LT/2026
            </em>
          </span>
        </Link>

        <nav className="flex gap-[26px] max-[820px]:gap-4">
          {NAV.map((item) => {
            const on =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={on ? "page" : undefined}
                className={`border-b-2 pb-[3px] text-[14px] hover:border-laterite hover:text-ink ${
                  on ? "border-laterite text-ink" : "border-transparent text-ink-2"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
