import type { Metadata } from "next";
import { Spectral, Archivo } from "next/font/google";
import Masthead from "@/components/Masthead";
import Colophon from "@/components/Colophon";
import LegacyHashRedirect from "@/components/LegacyHashRedirect";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-spectral",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Land Tenure Field Study — Uganda",
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Uganda land tenure",
    "mailo land",
    "customary land Uganda",
    "land title verification",
    "UgNLIS",
    "land fraud Uganda",
    "land survey Uganda",
    "land administration research",
  ],
  authors: [{ name: "Land Tenure Field Study" }],
  creator: "Land Tenure Field Study",
  publisher: "Land Tenure Field Study",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_UG",
    url: SITE_URL,
    title: "Land Tenure Field Study — Uganda",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Land Tenure Field Study — Uganda",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "research",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ResearchProject",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "An independent field study assessing demand for a land-verification and property platform in Uganda, surveying landholders, licensed surveyors, real-estate professionals, and land administration officials.",
      areaServed: { "@type": "Country", name: "Uganda" },
      knowsAbout: [
        "Land tenure",
        "Mailo tenure",
        "Customary tenure",
        "Land registration",
        "Cadastral surveying",
        "Land fraud",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${spectral.variable} ${archivo.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grid-bg" aria-hidden="true" />
        <LegacyHashRedirect />
        <Masthead />
        {children}
        <Colophon />
      </body>
    </html>
  );
}
