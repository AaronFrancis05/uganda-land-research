/** Canonical origin for metadata, sitemap and structured data. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Land Tenure Field Study";

export const SITE_DESCRIPTION =
  "A structured field study behind a proposed land-verification and property platform for Uganda. Four respondent groups: landholders, surveyors, real-estate professionals, and land administrators.";
