import {
  HiArrowTrendingUp,
  HiBolt,
  HiChartBar,
  HiDocumentText,
  HiShieldCheck,
} from "react-icons/hi2";
import { FaClock, FaLock, FaUsers } from "react-icons/fa";

const ENTERPRISE_CARD_ICONS = [
  HiShieldCheck,
  HiDocumentText,
  HiBolt,
  HiArrowTrendingUp,
] as const;

const PILL_COPY = [
  { icon: "shield" as const, label: "ISO 27001 Aligned" },
  { icon: "file" as const, label: "NDPR / GDPR Compliant" },
  { icon: "chart" as const, label: "99.9% Uptime SLA" },
  { icon: "lock" as const, label: "NDA Available" },
  { icon: "clock" as const, label: "24/7 Production Support" },
  { icon: "users" as const, label: "Government Certified Partners" },
];

const CARDS = [
  {
    title: "Security-First Architecture",
    body: "End-to-end encryption, penetration-tested codebases, and zero-trust access models built into every layer of our stack.",
    iconIndex: 0,
  },
  {
    title: "Regulatory Compliance",
    body: "Our teams are versed in NDPR, GDPR, ISO 27001, SOC 2, and sector-specific frameworks including CBN and HIPAA equivalents.",
    iconIndex: 1,
  },
  {
    title: "High-Availability Infrastructure",
    body: "99.9% uptime SLAs backed by multi-region deployments, automated failover, and proactive load-testing before every release.",
    iconIndex: 2,
  },
  {
    title: "Scalable from Day One",
    body: "Microservices architecture and cloud-native design means systems built for 1,000 users scale to 1,000,000 without rearchitecting.",
    iconIndex: 3,
  },
];

export function SalTechEnterprise() {
  return (
    <section className="bg-[#111827] px-4 py-16 md:px-10 md:py-[72px] lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-[rgba(226,186,81,0.1)] px-3.5 py-1.5 text-[13px] font-semibold tracking-wide text-[#e2ba51]">
            Enterprise & Government Ready
          </span>
          <h2 className="font-saltech-display max-w-3xl text-2xl font-normal leading-snug text-[#f9fafb] md:text-[30px]">
            Enterprise & Government Ready
            <br />
            Built to the standards that matter.
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-[#9ca3af]">
            Every product we ship meets the security, compliance, and resilience
            requirements of regulated industries and government systems.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => {
            const CardIcon = ENTERPRISE_CARD_ICONS[card.iconIndex];
            return (
            <div
              key={card.title}
              className="flex flex-col gap-4 rounded-2xl border border-[#374151] bg-[#1f2937] p-6"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-[rgba(226,186,81,0.13)]">
                <CardIcon className="size-4 text-[#e2ba51]" aria-hidden />
              </div>
              <h3 className="text-sm font-semibold text-[#f3f4f6]">
                {card.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[#6b7280]">
                {card.body}
              </p>
            </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {PILL_COPY.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-3 rounded-xl border border-[#374151] bg-[#1f2937] px-3 py-3"
            >
              <PillIcon type={p.icon} />
              <span className="text-xs text-[#6b7280]">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillIcon({ type }: { type: (typeof PILL_COPY)[number]["icon"] }) {
  const className = "size-4 text-[#e2ba51]";
  switch (type) {
    case "shield":
      return <HiShieldCheck className={className} aria-hidden />;
    case "file":
      return <HiDocumentText className={className} aria-hidden />;
    case "chart":
      return <HiChartBar className={className} aria-hidden />;
    case "lock":
      return <FaLock className={className} aria-hidden />;
    case "clock":
      return <FaClock className={className} aria-hidden />;
    case "users":
      return <FaUsers className={className} aria-hidden />;
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}
