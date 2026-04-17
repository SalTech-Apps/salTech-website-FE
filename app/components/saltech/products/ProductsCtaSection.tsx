import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

export function ProductsCtaSection() {
  return (
    <section className="border-t border-[#e7e5e4] bg-[#faf6ef] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h2 text-[#111827]">
          Need a custom product built?
        </h2>
        <p className="mt-4 text-body text-[#4b5563]">
          Our products are available for white-label licensing, or we can build
          something entirely new for your use case.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Button
            radius="lg"
            as={Link}
            to="/contact"
            prefetch="intent"
            className="bg-primary-gold font-body font-bold text-[#111827] hover:bg-soft-gold-hover-state"
            endContent={<FaArrowRight className="text-sm" aria-hidden />}
          >
            Start the Conversation
          </Button>
          <Button
            radius="lg"
            as={Link}
            to="/services"
            prefetch="intent"
            variant="bordered"
            className="border-[#111827] font-body font-bold text-[#111827] bg-white"
          >
            See Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
