import { saltechAssets } from "@/data/saltechAssets";

export type SaltechIndustryTag = {
  label: string;
  /** Tailwind classes for pill background/text */
  className: string;
};

export type SaltechProductCard = {
  id: string;
  imageSrc: string;
  industryTags: SaltechIndustryTag[];
  title: string;
  description: string;
  techTags: string[];
  comingSoon?: boolean;
};

export const SALTECH_PRODUCTS_PORTFOLIO_EYEBROW = "PRODUCTS PORTFOLIO";
export const SALTECH_PRODUCTS_PORTFOLIO_HEADING =
  "Tools and platforms we've engineered.";
export const SALTECH_PRODUCTS_PORTFOLIO_SUB =
  "Each product below is built and maintained by SalTech. Some are available as white-label solutions.";

export const SALTECH_PRODUCTS: SaltechProductCard[] = [
  {
    id: "dara",
    imageSrc: saltechAssets.dara,
    industryTags: [
      { label: "Health Tech", className: "bg-emerald-500/15 text-emerald-800" },
    ],
    title: "DARA",
    description:
      "A HIPAA-aligned recovery and care coordination platform for treatment centers and clinicians—scheduling, outcomes tracking, and secure messaging in one place.",
    techTags: ["Vue.js", "PostgreSQL", "HIPAA-aligned"],
  },
  {
    id: "partywitme",
    imageSrc: saltechAssets.partywitme,
    industryTags: [
      { label: "Entertainment", className: "bg-violet-500/15 text-violet-800" },
    ],
    title: "Partywitme",
    description:
      "Event discovery and ticketing with identity-verified entry, biometric check-in options, and real-time capacity controls for venues and organizers.",
    techTags: ["Python", "Biometric API", "ISO 27001"],
  },
  {
    id: "soon-1",
    imageSrc: saltechAssets.comingSoon,
    industryTags: [
      { label: "Logistics", className: "bg-sky-500/15 text-sky-900" },
    ],
    title: "COMING SOON",
    description:
      "A zero-fee digital wallet and payout rail for cross-border logistics partners—FX-aware settlements, escrow, and audit-ready ledgers.",
    techTags: ["Next.js", "PWA", "PostgreSQL"],
    comingSoon: true,
  },
  {
    id: "soon-2",
    imageSrc: saltechAssets.comingSoon,
    industryTags: [
      { label: "B2B SaaS", className: "bg-amber-500/15 text-amber-900" },
    ],
    title: "COMING SOON",
    description:
      "A zero-fee digital wallet and payout rail for cross-border logistics partners—FX-aware settlements, escrow, and audit-ready ledgers.",
    techTags: ["React", "Node.js", "AWS"],
    comingSoon: true,
  },
  {
    id: "soon-3",
    imageSrc: saltechAssets.comingSoon,
    industryTags: [
      { label: "GovTech", className: "bg-slate-500/15 text-slate-800" },
    ],
    title: "COMING SOON",
    description:
      "A zero-fee digital wallet and payout rail for cross-border logistics partners—FX-aware settlements, escrow, and audit-ready ledgers.",
    techTags: ["TypeScript", "Microservices", "Kubernetes"],
    comingSoon: true,
  },
  {
    id: "soon-4",
    imageSrc: saltechAssets.comingSoon,
    industryTags: [
      { label: "Fintech", className: "bg-rose-500/15 text-rose-900" },
    ],
    title: "COMING SOON",
    description:
      "A zero-fee digital wallet and payout rail for cross-border logistics partners—FX-aware settlements, escrow, and audit-ready ledgers.",
    techTags: ["Flutter", "GraphQL", "Terraform"],
    comingSoon: true,
  },
];
