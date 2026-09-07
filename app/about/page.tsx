import type { Metadata } from "next";
import { SHELL_NARROW } from "@/components/ui";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "How the Uganda land tenure field study is run: what it asks, which four respondent groups it surveys, how anonymous responses are stored and pooled, and its independence from MLHUD, UgNLIS and NIRA.";

export const metadata: Metadata = {
  title: "Method & handling",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "Method & handling · Land Tenure Field Study",
    description: DESCRIPTION,
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Respondent tracks", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Method & handling", item: `${SITE_URL}/about` },
  ],
};

const H3 = "mt-[26px] mb-[6px] font-serif text-[17px] font-semibold text-green";
const P = "m-0 max-w-[62ch] text-[15.5px] leading-[1.65] text-ink-2";

export default function AboutPage() {
  return (
    <main className="pt-[52px] pb-[90px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className={SHELL_NARROW}>
        <h1 className="mb-5 text-[30px] text-ink">Method &amp; handling</h1>

        <h2 className={H3}>What this is</h2>
        <p className={P}>
          A short field study behind a proposed land-verification and property platform for
          Uganda. Its purpose is to check the plan against the people it would serve before
          development begins. The aim is to quantify demand, sanity-check assumptions about
          pricing and trust, and learn which problems matter most to which group.
        </p>

        <h2 className={H3}>Who it asks</h2>
        <p className={P}>
          Four groups, four instruments: landholders and buyers; licensed and articled
          surveyors; agents, brokers and developers; and officials in land administration.
          Each question set is written for that group, so the answers can be compared like
          with like.
        </p>

        <h2 className={H3}>How answers are handled</h2>
        <p className={P}>
          Responses are stored anonymously in a research database. No names, phone numbers,
          or identity numbers are collected anywhere in the form. Individual submissions are
          never shown; only pooled counts appear on the findings sheet. Participation is
          voluntary and you may stop at any point.
        </p>

        <h2 className={H3}>What it is not</h2>
        <p className={P}>
          This study is independent. It is not affiliated with the Ministry of Lands, Housing
          and Urban Development, the UgNLIS registry, or NIRA, and it does not verify or
          record anyone&rsquo;s actual land rights.
        </p>
      </div>
    </main>
  );
}
