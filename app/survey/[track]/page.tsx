import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SurveyForm from "@/components/SurveyForm";
import { isTrackKey, TRACK_ORDER, TRACKS } from "@/lib/tracks";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return TRACK_ORDER.map((track) => ({ track }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  if (!isTrackKey(track)) return {};
  const t = TRACKS[track];

  const description = `${t.sub} Ten short questions on tenure, titling, boundaries and land fraud in Uganda. Voluntary and anonymous — part of the LT/2026 land tenure field study.`;

  return {
    title: t.title,
    description,
    alternates: { canonical: `/survey/${track}` },
    openGraph: {
      url: `/survey/${track}`,
      title: `${t.title} · Land Tenure Field Study`,
      description,
    },
  };
}

export default async function SurveyPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  if (!isTrackKey(track)) notFound();

  const t = TRACKS[track];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Respondent tracks", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: t.title, item: `${SITE_URL}/survey/${track}` },
    ],
  };

  return (
    <main className="pt-11 pb-[90px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SurveyForm track={track} />
    </main>
  );
}
