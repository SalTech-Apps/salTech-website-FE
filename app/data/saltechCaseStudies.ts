import { saltechAssets } from "@/data/saltechAssets";

export type CaseStudyStat = {
  value: string;
  label: string;
};

export type SaltechCaseStudy = {
  id: string;
  badge: string;
  title: string;
  description: string;
  techTags: string[];
  imageSrc: string;
  imageAlt: string;
  /** Small label on the mockup (e.g. Health Tech). */
  industryLabel: string;
  /** Tint behind the screenshot panel. */
  panelClassName: string;
  /** When omitted or empty, the metrics row is hidden (e.g. unreleased work). */
  stats?: CaseStudyStat[];
};

export const CASE_STUDIES_INTRO_EYEBROW = "CORE SERVICES";
export const CASE_STUDIES_INTRO_HEADING =
  "Every engagement starts with a clear outcome in mind.";
export const CASE_STUDIES_INTRO_SUB =
  "Each product below is built and maintained by SalTech. Some are available as white-label solutions.";

/** Shared benchmark row used on shipped products in marketing (Figma reference). */
const SHIPPED_PRODUCT_STATS: CaseStudyStat[] = [
  { value: "120k", label: "Monthly active users" },
  { value: "$2.4M", label: "Monthly volume" },
  { value: "8 weeks", label: "Delivered" },
  { value: "14", label: "Countries" },
  { value: "99.7%", label: "Uptime (12mo)" },
];

export const SALTECH_CASE_STUDIES: SaltechCaseStudy[] = [
  {
    id: "dara",
    badge: "Recovery Platform",
    title: "DARA",
    description:
      "A HIPAA-aligned recovery and care coordination platform for treatment centers and clinicians — scheduling, outcomes tracking, and secure messaging in one place.",
    stats: SHIPPED_PRODUCT_STATS,
    techTags: ["Vue.js", "PostgreSQL", "HIPAA-aligned"],
    imageSrc: saltechAssets.dara,
    imageAlt: "DARA recovery platform dashboard preview",
    industryLabel: "Health Tech",
    panelClassName: "bg-emerald-50",
  },
  {
    id: "partywitme",
    badge: "Party",
    title: "Partywitme",
    description:
      "Event discovery and ticketing with identity-verified entry, biometric check-in options, and real-time capacity controls for venues and organizers.",
    stats: SHIPPED_PRODUCT_STATS,
    techTags: ["Python", "Biometric API", "ISO 27001"],
    imageSrc: saltechAssets.partywitme,
    imageAlt: "Partywitme app preview",
    industryLabel: "Entertainment",
    panelClassName: "bg-amber-50",
  },
  {
    id: "dating-soon",
    badge: "Relationship",
    title: "COMING SOON",
    description:
      "A zero-fee digital wallet built for emerging markets — launched in 12 weeks from discovery to App Store approval.",
    techTags: ["React Native", "Node.js", "PCI DSS"],
    imageSrc: saltechAssets.comingSoon,
    imageAlt: "Product preview placeholder",
    industryLabel: "Dating",
    panelClassName: "bg-indigo-50",
  },
];
