import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";
import { saltechAssets } from "@/data/saltechAssets";
import { ABOUT_MISSION_STATS } from "@/data/saltechAbout";

export function AboutMissionSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <p className="text-buttons uppercase tracking-widest text-primary-gold">
              OUR MISSION
            </p>
            <h2 className="mt-4 font-heading text-heading-h2 text-[#111827]">
              Technology that closes gaps, not just opens markets.
            </h2>
            <div className="mt-6 space-y-4 text-body leading-relaxed text-[#4b5563]">
              <p>
                SalTech exists to help teams across Africa and the diaspora ship
                software that survives real-world constraints — regulation,
                connectivity, fraud, and the humans on the other side of the
                screen.
              </p>
              <p>
                We work with founders, enterprises, and public-sector partners
                who need more than a deck: working systems, clear ownership, and
                delivery timelines we are willing to put our name on.
              </p>
              <p>
                We stay involved from first commit to production — the same
                engineers, the same bar for quality — so launches are not
                handoffs into a void.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                as={Link}
                to="/about#our-team"
                prefetch="intent"
                radius="full"
                className="bg-primary-gold font-body font-bold text-[#111827] hover:bg-soft-gold-hover-state"
                endContent={<FaArrowRight className="text-xs" aria-hidden />}
              >
                Meet the Team
              </Button>
              <Button
                as={Link}
                to="/contact"
                prefetch="intent"
                radius="full"
                variant="bordered"
                className="border-[#111827] font-body font-semibold text-[#111827]"
              >
                Start a Project
              </Button>
            </div>
          </div>

          <div
            id="our-team"
            className="scroll-mt-28 lg:justify-self-end"
          >
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl bg-primary-gold shadow-lg">
              <img
                src={saltechAssets.odunayoPortrait}
                alt="Odunayo Hassan, Vice President at SalTech"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="rounded-xl border border-white/25 bg-primary-gold/85 px-4 py-3 backdrop-blur-sm">
                  <p className="font-body text-base font-bold text-[#111827]">
                    Odunayo Hassan
                  </p>
                  <p className="font-body text-sm text-[#111827]/90">
                    Vice President
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#e5e7eb] pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {ABOUT_MISSION_STATS.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="font-body text-2xl font-bold text-primary-gold sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[#6b7280]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
