export type SaltechServiceStatusVariant =
  | "gold"
  | "blue"
  | "green"
  | "orange";

export type SaltechServiceId =
  | "mvp"
  | "platform"
  | "ai"
  | "design"
  | "compliance";

export type SaltechServiceCard = {
  id: SaltechServiceId;
  title: string;
  statusTag: { label: string; variant: SaltechServiceStatusVariant };
  description: string;
  features: string[];
  techTags: string[];
  /** When set, card spans full width with testimonial beside content */
  testimonial?: { quote: string; attribution: string };
};

export const SALTECH_SERVICES_CORE_EYEBROW = "CORE SERVICES";
export const SALTECH_SERVICES_CORE_HEADING =
  "Every engagement starts with a clear outcome in mind.";
export const SALTECH_SERVICES_CORE_SUB =
  "Each product below is built and maintained by SalTech. Some are available as white-label solutions.";

export const SALTECH_SERVICES: SaltechServiceCard[] = [
  {
    id: "mvp",
    title: "Rapid MVP Delivery",
    statusTag: { label: "Most Requested", variant: "gold" },
    description:
      "From discovery to production in 8–12 weeks: thin vertical slices, weekly demos, and a launch checklist your team can own.",
    features: [
      "Product discovery & technical scoping in Week 1",
      "Weekly working demos",
      "Deployment to production with full documentation",
      "Post-launch support for first 30 days",
    ],
    techTags: [
      "React / Next.js",
      "React Native",
      "Node.js",
      "PostgreSQL",
      "AWS / GCP",
    ],
  },
  {
    id: "platform",
    title: "Scalable Platform Engineering",
    statusTag: { label: "Enterprise", variant: "blue" },
    description:
      "Cloud-native backends, observability, and cost-aware scaling patterns—so your product survives traffic spikes and audit season.",
    features: [
      "Microservices architecture design",
      "High-availability infrastructure with 99.9% SLA",
      "Security audits and penetration testing",
      "Database optimisation",
    ],
    techTags: ["Kubernetes", "Docker", "Redis", "Kafka", "Terraform"],
  },
  {
    id: "ai",
    title: "AI & Automation Systems",
    statusTag: { label: "All clients", variant: "green" },
    description:
      "Practical LLM features grounded in your data, plus workflow automation that removes toil without creating shadow IT.",
    features: [
      "Custom AI feature integration",
      "Process automation",
      "Chatbot and conversational AI development",
      "Predictive analytics and reporting pipelines",
    ],
    techTags: ["OpenAI API", "LangChain", "Python", "FastAPI", "Vector DBs"],
  },
  {
    id: "design",
    title: "Product Design & UX Systems",
    statusTag: { label: "Foundation First", variant: "gold" },
    description:
      "Research-backed UX, accessible components, and a Figma system your engineers can implement without guesswork.",
    features: [
      "User research, journey mapping, and prototyping",
      "Design systems built in Figma",
      "Usability testing",
      "Accessibility audits (WCAG 2.1 AA)",
    ],
    techTags: [
      "Figma",
      "React Native",
      "Node.js",
      "PostgreSQL",
      "AWS / GCP",
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Security Engineering",
    statusTag: { label: "Government & Enterprise", variant: "blue" },
    description:
      "Security architecture, SSDLC practices, and documentation packs aligned to procurement and enterprise risk teams.",
    features: [
      "NDPR, GDPR, ISO 27001, SOC 2 alignment",
      "Secure software development lifecycle (SSDLC)",
      "Data residency and sovereignty",
      "Government procurement-ready documentation",
    ],
    techTags: ["Vault", "KMS", "SIEM hooks", "Policy-as-code"],
    testimonial: {
      quote:
        "SalTech was the only vendor that came in with a compliance-first architecture proposal. They understood our data sovereignty requirements before we had to explain them.",
      attribution: "— Director of Digital Services, State Ministry of Finance",
    },
  },
];

export const statusTagClassName: Record<
  SaltechServiceStatusVariant,
  string
> = {
  gold: "bg-primary-gold/25 text-[#5c4a1a] border border-primary-gold/40",
  blue: "bg-blue-500/10 text-blue-900 border border-blue-500/25",
  green: "bg-emerald-500/10 text-emerald-900 border border-emerald-500/25",
  orange: "bg-orange-500/10 text-orange-900 border border-orange-500/25",
};
