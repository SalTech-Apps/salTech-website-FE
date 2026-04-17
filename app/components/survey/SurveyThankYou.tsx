import { Button } from "@heroui/react";
import { Link } from "react-router";

export function SurveyThankYou() {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="bg-main-background border border-soft-divider-line p-6 sm:p-8">
          <h2 className="font-heading text-heading-h3 text-main-text-headlines text-center mb-2">
            Thank you for your feedback
          </h2>
          <p className="text-body text-secondary-text-body-paragraphs text-center mb-6">
            Your honest input helps JESFEM improve the Lagos real estate
            investment experience as we grow.
          </p>
          <p className="text-body text-secondary-text-body-paragraphs text-center">
            I&apos;m looking for people who are actually &apos;up to the task&apos; -
            the kind of competent folks who spot the details others miss. Help
            us build the future of Lagos real estate tech.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              radius="none"
              as={Link}
              to="/"
              prefetch="intent"
              className="bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state uppercase"
            >
              Back to JESFEM
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
