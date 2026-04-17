import { Link } from "react-router-dom";
import { homePageAssets } from "@/data/homePageAssets";

const CAPABILITIES = [
  {
    title: "Rapid MVP Delivery",
    description:
      "From validated brief to production-ready product in 6–10 weeks. No bloat, no guesswork — just a working system in users' hands.",
    wide: true,
    iconIndex: 0,
  },
  {
    title: "Scalable Platform Engineering",
    description:
      "Mission-critical backend systems, API infrastructure, and cloud-native architectures designed for high-load, regulated environments.",
    wide: false,
    iconIndex: 1,
  },
  {
    title: "AI & Automation Systems",
    description:
      "Intelligent workflows, LLM integrations, and process automation that reduce operational overhead and unlock measurable efficiency gains.",
    wide: false,
    iconIndex: 2,
  },
  {
    title: "Product Design & UX Systems",
    description:
      "End-to-end design from research to pixel-perfect handoff. Design systems that scale across products and reduce engineering inconsistency.",
    wide: true,
    iconIndex: 3,
  },
] as const;

export function SalTechCapabilities() {
  return (
    <section className="bg-white px-4 py-16 md:px-10 md:py-[72px] lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex max-w-3xl flex-col gap-3.5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c99e2e]">
            How We Help You Win
          </p>
          <h2 className="font-saltech-display text-3xl font-normal tracking-tight text-[#111827] md:text-[42px] md:leading-[1.15]">
            The Capabilities that Drive Real Outcomes.
          </h2>
          <p className="text-[17px] leading-relaxed text-[#6b7280]">
            Not a service catalog. A set of proven capabilities applied to
            problems that matter.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 lg:grid-cols-12">
            <CapabilityCard {...CAPABILITIES[0]} className="lg:col-span-7" />
            <CapabilityCard {...CAPABILITIES[1]} className="lg:col-span-5" />
          </div>
          <div className="grid gap-4 lg:grid-cols-12">
            <CapabilityCard {...CAPABILITIES[2]} className="lg:col-span-5" />
            <CapabilityCard {...CAPABILITIES[3]} className="lg:col-span-7" />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/services"
            prefetch="intent"
            className="inline-flex h-[52px] items-center justify-center rounded-[10px] border border-[#e5e7eb] px-7 text-[15px] font-semibold text-[#111827] transition-colors hover:bg-[#fafafa]"
          >
            See All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  title,
  description,
  wide: _wide,
  iconIndex,
  className = "",
}: {
  title: string;
  description: string;
  wide: boolean;
  iconIndex: number;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-[18px] border border-[#e5e7eb] bg-white p-6 shadow-sm ${className}`}
    >
      <div className="flex size-9 items-center justify-center rounded-lg border border-[#edd98a] bg-[#faf7ef] p-px">
        <img
          src={homePageAssets.capabilityIcons[iconIndex]}
          alt=""
          className="size-4"
        />
      </div>
      <h3 className="text-sm font-semibold text-[#111827]">{title}</h3>
      <p className="text-[13px] leading-relaxed text-[#6b7280]">{description}</p>
      <Link
        to="/services"
        prefetch="intent"
        className="text-[15px] font-medium text-[#e2ba51] hover:underline"
      >
        Explore →
      </Link>
    </div>
  );
}
