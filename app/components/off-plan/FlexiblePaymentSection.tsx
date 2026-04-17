import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

const BENEFITS = [
  "Customized payment schedules",
  "Attractive Installment options",
  "Transparent payment terms",
  "Reduced upfront costs",
];

export function FlexiblePaymentSection() {
  return (
    <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h2 text-primary-gold">
          Flexible Payment Structures
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-24 bg-primary-gold" aria-hidden />
        <p className="mt-8 text-body text-secondary-text-body-paragraphs">
          At Jesfem, we provide custom-tailored payment plans that align with
          your financial goals, making property ownership accessible and
          stress-free.
        </p>
        <ul className="mt-10 space-y-3 text-left">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-3 text-body text-main-text-headlines"
            >
              <span className="h-px w-8 shrink-0 bg-primary-gold" />
              {benefit}
            </li>
          ))}
        </ul>
        <Button
          radius="none"
          as={Link}
          to="/contact"
          prefetch="intent"
          size="lg"
          className="mt-10 bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase"
        >
          REQUEST PAYMENT PLAN
        </Button>
      </div>
    </section>
  );
}
