import { Link } from "react-router-dom";
import { homePageAssets } from "@/data/homePageAssets";

type Stat = { value: string; label: string };

type CaseCard = {
  gradient: string;
  image: string;
  imageClass?: string;
  imageOpacity?: boolean;
  tag: string;
  categoryLabel: string;
  title: string;
  description: string;
  stats: Stat[];
};

const CASES: CaseCard[] = [
  {
    gradient: "linear-gradient(135deg, rgb(240, 253, 244) 0%, rgb(220, 252, 231) 100%)",
    image: homePageAssets.caseDara,
    tag: "Recovery Platform",
    categoryLabel: "Health Tech",
    title: "DARA",
    description:
      "End-to-end HR management platform with AI-driven onboarding flows and performance tracking dashboards.",
    stats: [
      { value: "40%", label: "HR time saved" },
      { value: "3×", label: "Onboarding speed" },
      { value: "8wks", label: "MVP delivery" },
    ],
  },
  {
    gradient:
      "linear-gradient(135deg, rgb(255, 247, 237) 0%, rgb(254, 243, 199) 100%)",
    image: homePageAssets.caseParty,
    tag: "Party",
    categoryLabel: "Entertainment",
    title: "Partywitme",
    description:
      "An intelligent automation platform that integrates with existing enterprise stacks to eliminate repetitive operations workflows.",
    stats: [
      { value: "$2M", label: "ARR at 12 months" },
      { value: "60%", label: "Ops cost cut" },
      { value: "16wks", label: "Full build" },
    ],
  },
  {
    gradient:
      "linear-gradient(135deg, rgb(238, 242, 255) 0%, rgb(224, 231, 255) 100%)",
    image: homePageAssets.caseComing,
    imageOpacity: true,
    tag: "Relationship",
    categoryLabel: "Dating",
    title: "COMING SOON",
    description:
      "A zero-fee digital wallet built for emerging markets launched in 12 weeks from discovery to App Store approval.",
    stats: [
      { value: "120K", label: "Users in 90 days" },
      { value: "4.8★", label: "App store rating" },
      { value: "12wks", label: "Time to launch" },
    ],
  },
];

export function SalTechCaseStudies() {
  return (
    <section className="bg-[#faf7ef] px-4 py-16 md:px-8 md:py-[90px] lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3.5 text-center md:mb-14 md:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c99e2e]">
            Products we’ve built
          </p>
          <h2 className="font-saltech-display text-3xl font-normal tracking-tight text-[#111827] md:text-[42px] md:leading-[1.15]">
            From concept to production — at scale.
          </h2>
          <p className="text-[17px] leading-relaxed text-[#6b7280]">
            Real systems. Measurable outcomes. Every product built to handle
            growth from day one.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="flex flex-col overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white p-px shadow-sm"
            >
              <div
                className="relative h-[180px] overflow-hidden rounded-t-[17px]"
                style={{ background: c.gradient }}
              >
                <div className="flex h-full items-center justify-center overflow-hidden p-2">
                  <img
                    src={c.image}
                    alt=""
                    className={`max-h-[140%] w-auto max-w-[115%] object-contain ${c.imageOpacity ? "opacity-30" : ""} rotate-[3deg]`}
                  />
                </div>
                <span className="absolute bottom-3 left-3 rounded-lg border border-[#e5e7eb] bg-white px-2.5 py-1.5 text-xs font-bold text-[#111827]">
                  {c.categoryLabel}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 px-5 pb-5 pt-6">
                <span className="inline-flex w-fit rounded-full bg-[#faf3dc] px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#7a5e10]">
                  {c.tag}
                </span>
                <h3 className="text-[17px] font-bold leading-snug text-[#111827]">
                  {c.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[#6b7280]">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-5 border-t border-[#e5e7eb] pt-4">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-xl font-bold text-[#111827]">
                        {s.value}
                      </p>
                      <p className="text-[11px] text-[#6b7280]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/case-studies"
            prefetch="intent"
            className="inline-flex h-[52px] items-center justify-center rounded-[10px] border border-[#e5e7eb] px-7 text-[15px] font-semibold text-[#111827] transition-colors hover:bg-white"
          >
            View All Case Studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
