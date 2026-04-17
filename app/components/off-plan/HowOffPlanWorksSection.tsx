import { FaChevronDown } from "react-icons/fa";

const STEPS = [
  "Discuss your needs and risk type.",
  "Get our property expert to provide legal documents ready.",
  "Secure your property with a deposit.",
  "Track constructional progress through weekly reports.",
  "Receive your completed home, or earn rental income.",
];

export function HowOffPlanWorksSection() {
  return (
    <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h2 text-primary-gold">
          How Off-Plan Works
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-24 bg-primary-gold" aria-hidden />
        <ul className="mt-12 space-y-6 text-left">
          {STEPS.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-4 text-body text-main-text-headlines"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border-2 border-primary-gold text-buttons font-bold text-primary-gold">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
