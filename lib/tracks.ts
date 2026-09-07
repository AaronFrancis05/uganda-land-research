import type { Track, TrackKey } from "./types";

/* Question sets for the four respondent instruments. This is the survey
   instrument itself — prompts, options, hints and scale labels are reproduced
   exactly and must not be reworded. */

export const TRACKS: Record<TrackKey, Track> = {
  native: {
    label: "Community",
    title: "Landholders & buyers",
    color: "#9C4A2E",
    sub: "For anyone who owns, rents, farms, or has tried to buy land in Uganda.",
    questions: [
      {
        id: "region",
        type: "single",
        prompt: "Which region is the land you own or are interested in located in?",
        options: ["Central", "Kampala Metro", "Eastern", "Northern", "Western", "Not applicable / researching generally"],
      },
      {
        id: "tenure_type",
        type: "single",
        prompt: "Under which land tenure system is the land you hold or are seeking?",
        options: ["Mailo", "Freehold", "Leasehold", "Customary", "I don't know which", "Not applicable"],
      },
      {
        id: "title_status",
        type: "single",
        prompt: "Does the land your family holds have a registered title?",
        options: [
          "Yes, fully titled (freehold / leasehold / mailo)",
          "Partially, or the process is underway",
          "No, customary tenure only",
          "Not sure",
          "I don't currently own land",
        ],
      },
      {
        id: "tenure_security",
        type: "scale",
        prompt: "How secure do you feel your rights are under that tenure?",
        labels: ["Very insecure", "Very secure"],
      },
      {
        id: "tenure_problem",
        type: "single",
        prompt: "What is the main problem you associate with your tenure?",
        options: [
          "Can't get a formal title",
          "Boundary or demarcation disputes",
          "Family or inheritance conflict",
          "Can't use it as loan collateral",
          "Threat of eviction or land grabbing",
          "Overlapping claims (e.g. owner vs. occupant)",
          "None",
        ],
      },
      {
        id: "tenure_security_need",
        type: "single",
        prompt: "If your land is customary or untitled, what would most help you feel secure?",
        options: [
          "A formal title / certificate",
          "Recognition of customary ownership (CCO)",
          "Clear recorded boundaries",
          "A cheaper, faster titling process",
          "Protection from eviction",
          "Not applicable, my land is titled",
        ],
      },
      {
        id: "fraud_exposure",
        type: "single",
        prompt: "Have you or someone close to you experienced land fraud, a land grab, or a double-titled parcel?",
        options: ["Yes, it happened to me directly", "Yes, to someone close to me", "No", "Not sure"],
      },
      {
        id: "fraud_story",
        type: "text",
        optional: true,
        prompt: "If yes, briefly describe what happened.",
        hint: "Optional. A sentence or two is plenty.",
      },
      {
        id: "verify_confidence",
        type: "scale",
        prompt: "How confident are you that you could verify a parcel's true ownership before buying it today?",
        labels: ["Not at all", "Very confident"],
      },
      {
        id: "most_valuable",
        type: "single",
        prompt: "What would be most valuable to you in a land-verification app?",
        options: [
          "Instant title / ownership check",
          "Full ownership and split history",
          "Accurate boundary map",
          "Verified listings for sale or rent",
          "Fraud and scam alerts",
          "Price and area-growth predictions",
        ],
      },
      {
        id: "phone_access",
        type: "single",
        prompt: "What is your access to a smartphone and the internet?",
        options: ["Smartphone, daily internet", "Smartphone, occasional internet", "Feature phone only", "No phone access"],
      },
      {
        id: "willing_to_pay",
        type: "single",
        prompt: "Would you pay a small fee to verify a title before a purchase?",
        options: ["Yes, definitely", "Yes, if under ~20,000 UGX", "Only for large purchases", "No, it should be free", "Not sure"],
      },
      {
        id: "diaspora_link",
        type: "single",
        prompt: "Do you have relatives abroad interested in buying land or property in Uganda?",
        options: ["Yes", "No", "Not sure"],
      },
      {
        id: "other_problem",
        type: "text",
        optional: true,
        prompt: "Any other land problem you'd want this to solve?",
      },
    ],
  },

  surveyor: {
    label: "Surveying",
    title: "Land surveyors & GIS staff",
    color: "#1F3D2B",
    sub: "For licensed and articled surveyors, and GIS / mapping professionals.",
    questions: [
      {
        id: "srb_status",
        type: "single",
        prompt: "Are you registered with the Surveyors Registration Board of Uganda?",
        options: ["Yes, fully licensed", "In training / articled", "No", "Prefer not to say"],
      },
      {
        id: "work_setting",
        type: "single",
        prompt: "What is your primary work setting?",
        options: [
          "Private surveying firm",
          "Government / Ministry Zonal Office",
          "District land office",
          "Freelance / independent",
          "Real estate company",
        ],
      },
      {
        id: "tech_used",
        type: "single",
        prompt: "What technology do you rely on most for demarcation?",
        options: [
          "GNSS / RTK GPS",
          "Total station",
          "Satellite imagery plus manual work",
          "Traditional chain / tape",
          "A combination of these",
        ],
      },
      {
        id: "tenure_hardest",
        type: "single",
        prompt: "Which tenure type is hardest to demarcate accurately?",
        options: ["Mailo", "Freehold", "Leasehold", "Customary", "They're broadly similar"],
      },
      {
        id: "customary_difficulty",
        type: "single",
        prompt: "What makes customary land hardest to survey and register?",
        options: [
          "No documented boundaries",
          "Communal / clan ownership disputes",
          "Absence of beacons",
          "Reluctance or cost on the owner's side",
          "Overlap with mailo or public land",
          "Customary land isn't especially hard",
        ],
      },
      {
        id: "conversion_bottleneck",
        type: "scale",
        prompt: "How significant a bottleneck is customary-to-freehold conversion in your work?",
        labels: ["Not a bottleneck", "A major bottleneck"],
      },
      {
        id: "dispute_cause",
        type: "single",
        prompt: "The most common cause of boundary disputes you encounter?",
        options: [
          "Inaccurate historical survey",
          "Encroachment",
          "Multiple or conflicting titles",
          "Unclear customary boundaries",
          "Missing beacons or markers",
        ],
      },
      {
        id: "ugnlis_accuracy",
        type: "scale",
        prompt: "How reliable is the parcel data currently held in UgNLIS?",
        labels: ["Poor", "Excellent"],
      },
      {
        id: "partner_interest",
        type: "single",
        prompt: "Would you partner with a private platform to provide on-demand demarcation for its users?",
        options: ["Yes, very interested", "Possibly, depends on terms", "No", "Need more information first"],
      },
      {
        id: "blockchain_view",
        type: "single",
        prompt: "Given only the government title is legally conclusive, does blockchain add real value to demarcation records?",
        options: ["Yes", "No", "Only as an internal audit trail", "Not sure"],
      },
      {
        id: "bottleneck",
        type: "text",
        prompt: "The single biggest bottleneck in getting a parcel accurately surveyed and registered today?",
      },
      {
        id: "monthly_volume",
        type: "single",
        prompt: "Roughly how many surveys / demarcations do you complete per month?",
        options: ["1–5", "6–15", "16–30", "30+"],
      },
      {
        id: "advice",
        type: "text",
        optional: true,
        prompt: "Advice for a platform combining accurate demarcation with digital verification?",
      },
    ],
  },

  realtor: {
    label: "Real estate",
    title: "Agents, brokers & developers",
    color: "#A87C2C",
    sub: "For anyone who lists, sells, manages, or develops property.",
    questions: [
      {
        id: "role",
        type: "single",
        prompt: "What best describes your role?",
        options: [
          "Independent agent / broker",
          "Agency or firm staff",
          "Property developer",
          "Property manager",
          "Diaspora-relations specialist",
        ],
      },
      {
        id: "platforms_used",
        type: "multi",
        prompt: "Which platforms do you use to list or find property? (Select all that apply)",
        options: [
          "Real Estate Database (RED)",
          "Lamudi Uganda",
          "Realtor.ug",
          "Rentalynk",
          "Ekyaapa",
          "Social media (Facebook / WhatsApp)",
          "Word of mouth only",
          "Other",
        ],
      },
      {
        id: "tenure_hardest_sell",
        type: "single",
        prompt: "Which tenure type is hardest to sell or transact?",
        options: ["Mailo", "Freehold", "Leasehold", "Customary", "They transact about equally"],
      },
      {
        id: "buyers_avoid_customary",
        type: "single",
        prompt: "Do buyers in your experience avoid customary or untitled land?",
        options: [
          "Yes, they avoid it strongly",
          "Somewhat, they discount the price",
          "No, it sells normally",
          "It depends on the buyer",
        ],
      },
      {
        id: "tenure_price_effect",
        type: "scale",
        prompt: "How much does the tenure type affect a property's price or saleability?",
        labels: ["No effect", "Very strong effect"],
      },
      {
        id: "verify_steps",
        type: "single",
        prompt: "How do you verify a title before listing or closing?",
        options: [
          "Formal UgNLIS search",
          "Physical visit to the land office",
          "Lawyer or notary check",
          "Rely on the seller's documents",
          "No formal process",
        ],
      },
      {
        id: "fraud_frequency",
        type: "scale",
        prompt: "How often do you meet fake titles, fraudulent listings, or scam buyers/sellers?",
        labels: ["Never", "Very often"],
      },
      {
        id: "diaspora_share",
        type: "single",
        prompt: "What share of your clients are diaspora Ugandans buying remotely?",
        options: ["None", "Up to 25%", "25–50%", "Over 50%", "Not sure"],
      },
      {
        id: "diaspora_pain",
        type: "single",
        prompt: "What do diaspora clients struggle with most?",
        options: [
          "Verifying the land is legitimate",
          "Trusting a local agent",
          "Making secure payment",
          "Getting accurate photos / maps",
          "Understanding area & price trends",
        ],
      },
      {
        id: "ml_value",
        type: "single",
        prompt: "Would a tool predicting area development and price trends change how you advise clients?",
        options: ["Yes, significantly", "Somewhat useful", "Not really", "Not sure"],
      },
      {
        id: "pay_for_verified",
        type: "single",
        prompt: "Would you pay for verified, fraud-checked listings with built-in escrow?",
        options: ["Yes", "Only if affordable", "No", "Not sure"],
      },
      {
        id: "biggest_obstacle",
        type: "text",
        prompt: "The biggest obstacle stopping more transactions from closing successfully?",
      },
      {
        id: "realtor_feedback",
        type: "text",
        optional: true,
        prompt: "Anything else this platform should prioritise?",
      },
    ],
  },

  official: {
    label: "Government",
    title: "Land administration officials",
    color: "#3A5A6B",
    sub: "For staff of MLHUD, the Land Information Centre, Zonal Offices, District Land Boards, the Land Commission, or NIRA.",
    questions: [
      {
        id: "institution",
        type: "single",
        prompt: "Which institution or office do you represent?",
        options: [
          "MLHUD / National Land Information Centre",
          "Ministry Zonal Office",
          "District Land Board",
          "Uganda Land Commission",
          "NIRA",
          "Other government body",
        ],
      },
      {
        id: "office_role",
        type: "single",
        prompt: "Your role in relation to land records?",
        options: [
          "Registration / titling",
          "Surveying / mapping",
          "Valuation",
          "Data / IT / systems",
          "Policy / administration",
        ],
      },
      {
        id: "tenure_most_disputes",
        type: "single",
        prompt: "Which tenure system generates the most disputes or complaints at your office?",
        options: ["Mailo", "Freehold", "Leasehold", "Customary", "Fairly evenly spread"],
      },
      {
        id: "tenure_common_issue",
        type: "single",
        prompt: "What is the most common tenure-related issue you handle?",
        options: [
          "Owner vs. occupant (bona-fide occupant) conflict",
          "Customary boundary disputes",
          "Fraudulent conversion of tenure",
          "Inheritance / succession disputes",
          "Overlapping or double allocations",
          "Public vs. private land claims",
        ],
      },
      {
        id: "customary_priority",
        type: "scale",
        prompt: "How high a priority should formalizing customary tenure be?",
        labels: ["Low priority", "High priority"],
      },
      {
        id: "customary_barrier",
        type: "single",
        prompt: "What is the biggest barrier to registering customary land at scale?",
        options: [
          "Cost to landholders",
          "Lack of surveyors / capacity",
          "Community or clan resistance",
          "Weak legal framework for CCOs",
          "Political or administrative will",
          "Poor public awareness",
        ],
      },
      {
        id: "api_access",
        type: "single",
        prompt: "How would you describe private-company access to UgNLIS data (API or bulk)?",
        options: [
          "Fully open",
          "Available via formal MOU only",
          "Very restricted, case by case",
          "Not available at all",
          "Not sure / not my area",
        ],
      },
      {
        id: "barrier",
        type: "single",
        prompt: "The biggest institutional barrier to sharing land data with vetted private platforms?",
        options: [
          "Data-protection / privacy law",
          "No technical API infrastructure",
          "Policy or legal framework unfinished",
          "Political or administrative caution",
          "Revenue or fee-model concerns",
        ],
      },
      {
        id: "fraud_complaints",
        type: "single",
        prompt: "What share of complaints your office receives relate to fraud or multiple titling?",
        options: ["Under 10%", "10–30%", "30–50%", "Over 50%", "Not sure"],
      },
      {
        id: "mou_support",
        type: "single",
        prompt: "Would your office support a structured data-sharing pilot (MOU) with a vetted private platform?",
        options: ["Yes, strongly", "Yes, with conditions", "Neutral", "Opposed", "Not my decision"],
      },
      {
        id: "safeguards",
        type: "text",
        prompt: "What safeguards would you require before any data partnership?",
      },
      {
        id: "blockchain_official",
        type: "single",
        prompt: "Does blockchain have a meaningful role in land administration, given the title stays legally conclusive?",
        options: ["Yes", "No", "Possibly as an internal tool", "Not sure"],
      },
      {
        id: "top_reform",
        type: "text",
        prompt: "The single reform or investment that would most improve land administration today?",
      },
      {
        id: "official_comments",
        type: "text",
        optional: true,
        prompt: "Any other comments on private-sector involvement in land technology?",
      },
    ],
  },
};

export const TRACK_ORDER: TrackKey[] = ["native", "surveyor", "realtor", "official"];

export function isTrackKey(value: unknown): value is TrackKey {
  return typeof value === "string" && (TRACK_ORDER as string[]).includes(value);
}
