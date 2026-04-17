import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

export function RentalsCtaSection() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-body text-main-text-headlines">
          Own a property in Lagos? Let Jesfem find you the right tenant.
          Professional listing, vetting, and management.
        </p>
        <Button
          radius="none"
          as={Link}
          to="/contact"
          prefetch="intent"
          size="lg"
          className="mt-8 bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase"
        >
          LIST YOUR PROPERTY WITH US
        </Button>
      </div>
    </section>
  );
}
