import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

export function PropertiesCtaSection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-body text-secondary-text-body-paragraphs">
          Can&apos;t find what you&apos;re looking for? Tell us your
          requirements and we&apos;ll match you with verified listings —
          including off-market options.
        </p>
        <Button
          radius="none"
          as={Link}
          to="/contact"
          prefetch="intent"
          size="lg"
          className="mt-8 bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase"
        >
          REQUEST VERIFIED LISTINGS
        </Button>
      </div>
    </section>
  );
}
