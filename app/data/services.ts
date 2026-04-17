import {
  FaHardHat,
  FaHome,
  FaBuilding,
  FaKey,
  FaBriefcase,
} from "react-icons/fa";
import type { ServiceConfig } from "@/types/services";

export const SERVICES_DATA: ServiceConfig[] = [
  {
    index: "01",
    icon: FaHardHat,
    title: "Residential Construction & Project Delivery",
    description:
      "Jesfem delivers residential construction projects from foundation to finishing. We manage the full build cycle – site preparation, structural works, MEP (mechanical, electrical, plumbing), and interior finishing – with documented progress at every stage.",
    subsections: [
      {
        heading: "What We Handle:",
        items: [
          "New-build residential developments",
          "Individual home construction (build-to-spec)",
          "Project management and site supervision",
          "Quality assurance and compliance checks",
          "Progress reporting (photos, videos, financial updates)",
        ],
      },
      {
        heading: "Our Approach:",
        text: "Fixed timelines. Documented milestones. No hidden costs.",
      },
    ],
    primaryCta: { label: "DISCUSS YOUR PROJECT", to: "/contact" },
    secondaryCta: { label: "BOOK A CONSULTATION", to: "/contact" },
  },
  {
    icon: FaHome,
    title: "Verified Properties for Sale",
    description:
      "Every property listed by Jesfem goes through our verification process. We confirm title, survey, and legal documentation before anything is presented to you – so you see only listings that meet our standard.",
    subsections: [
      {
        heading: "What You Get:",
        items: [
          "Title-verified listings only",
          "Legal documentation support",
          "Guided viewings and transparent pricing",
          "End-to-end transaction support",
        ],
      },
    ],
    primaryCta: { label: "VIEW PROPERTIES FOR SALE", to: "/properties" },
  },
  {
    icon: FaBuilding,
    title: "Off-Plan Investment Opportunities",
    description:
      "We partner with vetted developers to offer off-plan opportunities with structured payment plans and milestone tracking. Early-entry pricing and documented progress keep you informed at every stage.",
    subsections: [
      {
        heading: "What We Provide:",
        items: [
          "Vetted developers and projects",
          "Structured payment plans",
          "Milestone and progress updates",
          "Legal and documentation support",
        ],
      },
    ],
    primaryCta: {
      label: "SEE OFF-PLAN DEALS",
      to: "/properties?type=off-plan",
    },
  },
  {
    icon: FaKey,
    title: "Premium Rental Listings",
    description:
      "Jesfem lists quality rental properties for professionals, families, and corporate tenants across Lagos. Every rental listing is physically inspected and documented before it appears on our platform.",
    subsections: [
      {
        heading: "For Tenants:",
        items: [
          "Verified landlord ownership",
          "Transparent pricing (no hidden agency fees beyond standard)",
          "Guided viewings",
          "Move-in coordination",
        ],
      },
      {
        heading: "For Landlords:",
        items: [
          "Tenant sourcing and vetting",
          "Professional listing with photos and descriptions",
          "Enquiry management",
        ],
      },
    ],
    primaryCta: { label: "BROWSE RENTALS", to: "/rentals" },
    secondaryCta: { label: "LIST YOUR PROPERTY WITH US", to: "/contact" },
  },
  {
    icon: FaBriefcase,
    title: "Professional Property Management for Landlords & Investors",
    description:
      "You own the property. We handle everything else. Jesfem's property management service covers tenant sourcing, rent collection, maintenance coordination, legal compliance, and monthly reporting. Designed for landlords who want income without the headache — and essential for diaspora investors who need eyes on the ground.",
    subsections: [
      {
        heading: "What's Included:",
        items: [
          "Tenant sourcing and background checks",
          "Rent collection and arrears management",
          "Routine and emergency maintenance coordination",
          "Monthly financial and property condition reports",
          "Legal and regulatory compliance",
          "Vacancy management and re-letting",
        ],
      },
      {
        heading: "For Diaspora Investors:",
        text: "Monthly photo and video updates. Financial statements. WhatsApp or email communication on your schedule.",
      },
    ],
    primaryCta: { label: "SPEAK TO A PROPERTY MANAGER", to: "/contact" },
  },
];
