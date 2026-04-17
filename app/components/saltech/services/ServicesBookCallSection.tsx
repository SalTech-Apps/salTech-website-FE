import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

export function ServicesBookCallSection() {
  return (
    <section className="border-t border-[#e7e5e4] bg-[#faf6ef] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h2 text-[#111827]">
          Not sure which service fits?
        </h2>
        <p className="mt-4 text-body text-[#4b5563]">
          Tell us the problem. We&apos;ll match the right capability to it — no
          upsell, no bloat.
        </p>
        <Button
          as={Link}
          to="/contact"
          prefetch="intent"
          radius="lg"
          size="lg"
          className="mt-10 bg-primary-gold font-body font-bold text-[#111827] hover:bg-soft-gold-hover-state"
          endContent={<FaArrowRight className="text-sm" aria-hidden />}
        >
          Book a Free Scoping Call
        </Button>
      </div>
    </section>
  );
}
