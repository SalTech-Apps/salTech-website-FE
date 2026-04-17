import { Link } from "react-router-dom";
import { homePageAssets } from "@/data/homePageAssets";

const ACCENT = "#e2ba51";

export function SalTechHero() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa] pb-6 pt-10 md:pb-10 md:pt-14 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
      >
        <img
          src={homePageAssets.topoPattern}
          alt=""
          className="h-[120%] w-full max-w-none object-cover object-top"
        />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:gap-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#faf3dc] px-3.5 py-1.5">
          <span
            className="size-1.5 rounded-sm"
            style={{ backgroundColor: ACCENT }}
            aria-hidden
          />
          <span className="text-[13px] font-semibold tracking-wide text-[#7a5e10]">
            Enterprise-Grade. Startup-Speed.
          </span>
        </div>

        <h1 className="font-saltech-display text-4xl font-normal leading-tight tracking-tight text-[#111827] md:text-5xl lg:text-[56px] lg:leading-[1.1]">
          Build products that{" "}
          <span style={{ color: ACCENT }} className="italic">
            scale
          </span>{" "}
          from day one.
        </h1>

        <p className="max-w-lg text-base leading-7 text-[#6b7280] md:text-[17px] md:leading-[27px]">
          SalTech engineers mission-critical digital products for startups,
          enterprises, and government organizations. From MVP to production-grade
          infrastructure — built for speed, designed for scale.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            to="/contact"
            prefetch="intent"
            className="inline-flex items-center justify-center rounded-[10px] px-7 py-3.5 text-[15px] font-semibold text-[#111827] transition-opacity hover:opacity-95"
            style={{ backgroundColor: ACCENT }}
          >
            Start a Project →
          </Link>
          <Link
            to="/case-studies"
            prefetch="intent"
            className="inline-flex items-center justify-center rounded-[10px] border border-[#e5e7eb] px-7 py-3.5 text-[15px] font-semibold text-[#111827] transition-colors hover:bg-white/80"
          >
            View Case Studies
          </Link>
        </div>

        <div className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-4 border-t border-[#f3f4f6] pt-4 text-sm md:gap-6">
          <div className="text-center">
            <p className="text-xl font-bold text-[#111827]">50+</p>
            <p className="text-xs text-[#9ca3af]">Products launched</p>
          </div>
          <span className="hidden h-8 w-px bg-[#e5e7eb] sm:block" aria-hidden />
          <p className="max-w-[200px] text-center text-xs text-[#9ca3af] sm:max-w-none">
            Trusted by startups & enterprises
          </p>
          <span className="hidden h-8 w-px bg-[#e5e7eb] sm:block" aria-hidden />
          <p className="max-w-[200px] text-center text-xs text-[#9ca3af] sm:max-w-none">
            Government-certified partners
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl border-y border-[#f3f4f6] bg-[#fafafa] px-4 py-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          <p className="shrink-0 text-xs text-[#9ca3af]">
            Trusted by forward-thinking organizations
          </p>
          <div className="hidden h-px flex-1 bg-[#e5e7eb] lg:block" aria-hidden />
          <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-end lg:gap-10">
            <TrustMark
              icon={
                <img
                  src={homePageAssets.trustDaraMark}
                  alt=""
                  className="h-8 w-6 object-contain"
                />
              }
              label="DARA"
            />
            <TrustMark
              icon={
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded bg-white">
                  <img
                    src={homePageAssets.trustPartyMark}
                    alt=""
                    className="h-7 w-7 object-contain"
                  />
                </div>
              }
              label="PARTYWITME"
            />
            <TrustMark
              icon={
                <img
                  src={homePageAssets.trustLuvIcon}
                  alt=""
                  className="size-6 object-contain"
                />
              }
              label="LUV’R"
            />
            <div className="flex items-center gap-2">
              <span className="text-[#e2ba51]" aria-hidden>
                ●
              </span>
              <span className="text-sm font-semibold tracking-[0.15em] text-[#555]">
                agapemate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustMark({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-semibold tracking-[0.12em] text-[#555]">
        {label}
      </span>
    </div>
  );
}
