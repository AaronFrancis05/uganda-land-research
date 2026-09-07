import type { Metadata } from "next";
import Link from "next/link";
import DeedPlan from "@/components/DeedPlan";
import TrackRows from "@/components/TrackRows";
import { BTN_LINE, BTN_PRIMARY, HERO_ACTIONS, SEC_HEAD, SEC_HEAD_SUB, SEC_HEAD_TITLE, SHELL } from "@/components/ui";
import { getTrackTotals, sumResponses } from "@/lib/metrics";
import { SITE_DESCRIPTION } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Land Tenure Field Study — Uganda",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Land Tenure Field Study — Uganda",
    description: SITE_DESCRIPTION,
  },
};

export default async function HomePage() {
  const total = sumResponses(await getTrackTotals());

  return (
    <main>
      <section className="pt-[60px] pb-[30px]">
        <div
          className={`${SHELL} grid grid-cols-[1.15fr_0.85fr] items-start gap-[52px] max-[820px]:grid-cols-1 max-[820px]:gap-[34px]`}
        >
          <div>
            <p className="mb-5 border-l-[3px] border-laterite pl-[11px] text-[12.5px] text-ink-2">
              Filing ref. LT/2026 · four instruments · voluntary &amp; anonymous
            </p>

            <h1 className="max-w-[15ch] text-[clamp(32px,4.6vw,50px)] text-ink">
              Before the software is built, the ground gets surveyed.
            </h1>

            <p className="mt-5 mb-[26px] max-w-[52ch] text-[17px] leading-[1.6] text-ink-2">
              This study tests whether a land-verification and property platform is warranted
              in Uganda. It asks the people who live the problem. Landholders, licensed
              surveyors, agents and developers, and the officials who keep the registry each
              answer a set written for them. Responses are pooled anonymously and read on the
              findings sheet.
            </p>

            <div className={HERO_ACTIONS}>
              <a className={BTN_PRIMARY} href="#tracks">
                Begin a questionnaire
              </a>
              <Link className={BTN_LINE} href="/findings">
                Read the findings sheet
              </Link>
            </div>

            <dl className="mt-[34px] flex flex-wrap gap-[34px] border-t border-rule pt-[22px] max-[520px]:gap-[22px]">
              <div className="flex flex-col">
                <dt className="order-2 text-[12px] text-ink-2">Responses on file</dt>
                <dd className="order-1 m-0 font-serif text-[30px] font-semibold leading-none text-green">
                  {total === null ? "—" : total}
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="order-2 text-[12px] text-ink-2">Instruments</dt>
                <dd className="order-1 m-0 font-serif text-[30px] font-semibold leading-none text-green">
                  4
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="order-2 text-[12px] text-ink-2">Time to complete</dt>
                <dd className="order-1 m-0 font-serif text-[30px] font-semibold leading-none text-green">
                  &asymp;4 min
                </dd>
              </div>
            </dl>
          </div>

          <DeedPlan />
        </div>
      </section>

      <section id="tracks" className="pt-9 pb-20">
        <div className={SHELL}>
          <div className={SEC_HEAD}>
            <h2 className={SEC_HEAD_TITLE}>Four instruments</h2>
            <p className={SEC_HEAD_SUB}>
              Pick the one that describes you. Each is ten short questions.
            </p>
          </div>
          <TrackRows />
        </div>
      </section>
    </main>
  );
}
