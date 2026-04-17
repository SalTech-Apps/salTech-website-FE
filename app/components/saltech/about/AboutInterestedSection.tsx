import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

export function AboutInterestedSection() {
  return (
    <section className="bg-[#faf6ef] pb-16 pt-4 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h2 text-[#111827]">
          Interested in working with us?
        </h2>
        <p className="mt-4 text-body text-[#4b5563]">
          Whether as a client, partner, or team member — we&apos;d like to hear
          from you.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            as={Link}
            to="/contact"
            prefetch="intent"
            radius="full"
            className="bg-primary-gold font-body font-bold text-[#111827] hover:bg-soft-gold-hover-state"
            endContent={<FaArrowRight className="text-xs" aria-hidden />}
          >
            Start a Project
          </Button>
          <Button
            as={Link}
            to="/about#our-team"
            prefetch="intent"
            radius="full"
            variant="bordered"
            className="border-[#111827] font-body font-semibold text-[#111827]"
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
            View Open Roles
          </Button>
        </div>
      </div>
    </section>
  );
}
