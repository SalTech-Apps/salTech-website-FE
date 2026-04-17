import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

export function CaseStudiesCtaSection() {
  return (
    <section className="border-t border-[#e7e5e4] bg-[#faf6ef] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h2 text-[#111827]">
          Want results like these?
        </h2>
        <p className="mt-4 text-body text-[#4b5563]">
          Most of our best projects started with a founder who just wanted to
          talk through the problem.
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
          Book a 20-Min Call
        </Button>
      </div>
    </section>
  );
}
