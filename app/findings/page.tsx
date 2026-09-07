import type { Metadata } from "next";
import FindingsBoard from "@/components/FindingsBoard";
import { SEC_HEAD, SEC_HEAD_SUB, SEC_HEAD_TITLE, SHELL } from "@/components/ui";
import { getOptionCounts, getTrackTotals } from "@/lib/metrics";
import { isTrackKey } from "@/lib/tracks";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;

const DESCRIPTION =
  "Live pooled results from the Uganda land tenure field study — tenure security, land fraud exposure, title verification and demand for a verification platform, tallied across landholders, surveyors, agents and land administration officials.";

export const metadata: Metadata = {
  title: "Findings sheet",
  description: DESCRIPTION,
  alternates: { canonical: "/findings" },
  openGraph: {
    url: "/findings",
    title: "Findings sheet · Land Tenure Field Study",
    description: DESCRIPTION,
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Respondent tracks", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Findings sheet", item: `${SITE_URL}/findings` },
  ],
};

export default async function FindingsPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>;
}) {
  const { track } = await searchParams;
  const active = isTrackKey(track) ? track : "native";

  const [totals, counts] = await Promise.all([getTrackTotals(), getOptionCounts()]);

  return (
    <main className="pt-11 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className={SHELL}>
        <div className={SEC_HEAD}>
          <h1 className={SEC_HEAD_TITLE}>Findings sheet</h1>
          <p className={SEC_HEAD_SUB}>
            Tallied live from every response on file. Counts are of respondents who answered
            each question within the selected track.
          </p>
        </div>

        <FindingsBoard active={active} totals={totals} counts={counts} />
      </div>
    </main>
  );
}
