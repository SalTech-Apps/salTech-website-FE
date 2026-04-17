import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/Reveal";
import { homePageAssets } from "@/data/homePageAssets";

/** Home hero — matches marketing hero spec (gold accent, topo background). */
const GOLD = "#E5C05E";
const INK = "#1A1C20";
const MUTED = "#71717A";

export function SalTechHero() {
  return (
    <section className="relative overflow-hidden bg-gray-50 pb-16 pt-14 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
      {/* Grayscale keeps line art neutral (source asset can read blue-gray on some displays / after CDN encode). */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] grayscale"
        style={{ backgroundImage: `url(${homePageAssets.topoPattern})` }}
        aria-hidden
      />

      <FadeIn className="relative mx-auto flex max-w-4xl flex-col items-center gap-7 px-4 text-center sm:gap-9">
        <div className="inline-flex items-center rounded-full bg-[#faf3dc] px-4 py-2">
          <span className="font-saltech-display text-[13px] font-semibold tracking-wide text-[#1A1C20]">
            • Enterprise-Grade. Startup-Speed.
          </span>
        </div>

        <h1 className="font-saltech-display text-4xl font-semibold leading-[1.12] tracking-tight text-[#1A1C20] md:text-5xl md:leading-[1.1] lg:text-[56px] lg:leading-[1.08]">
          <span className="block">Build products that</span>
          <span className="block" style={{ color: GOLD }}>
            scale
          </span>
          <span className="block">from day one.</span>
        </h1>

        <p className="max-w-xl text-base leading-7 text-[#71717A] md:text-[17px] md:leading-[27px]">
          SalTech engineers mission-critical digital products for startups,
          enterprises, and government organizations. From MVP to
          production-grade infrastructure — built for speed, designed for scale.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            to="/contact"
            prefetch="intent"
            className="inline-flex items-center justify-center rounded-[10px] px-7 py-3.5 text-[15px] font-semibold transition-opacity hover:opacity-95"
            style={{ backgroundColor: GOLD, color: INK }}
          >
            Start a Project →
          </Link>
          <Link
            to="/case-studies"
            prefetch="intent"
            className="inline-flex items-center justify-center rounded-[10px] border border-[#e4e4e7] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#1A1C20] transition-colors hover:bg-[#fafafa]"
          >
            View Case Studies
          </Link>
        </div>

        <div className="mt-4 w-full max-w-3xl border-t border-[#e4e4e7] pt-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
            <div className="flex flex-1 flex-col items-center text-center sm:px-6">
              <p
                className="text-3xl font-bold tracking-tight md:text-[34px]"
                style={{ color: INK }}
              >
                50+
              </p>
              <p className="mt-1 text-sm" style={{ color: MUTED }}>
                Products launched
              </p>
            </div>

            <div
              className="hidden h-14 w-px shrink-0 bg-[#e4e4e7] sm:block"
              aria-hidden
            />

            <p
              className="flex flex-1 items-center justify-center px-4 text-center text-sm leading-snug sm:px-6"
              style={{ color: MUTED }}
            >
              Trusted by startups & enterprises
            </p>

            <div
              className="hidden h-14 w-px shrink-0 bg-[#e4e4e7] sm:block"
              aria-hidden
            />

            <p
              className="flex flex-1 items-center justify-center px-4 text-center text-sm leading-snug sm:px-6"
              style={{ color: MUTED }}
            >
              Government-certified partners
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
