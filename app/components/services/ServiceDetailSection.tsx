import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import type { IconType } from "react-icons";
import type { ServiceSubsection } from "@/types/services";

export type { ServiceSubsection } from "@/types/services";

export interface ServiceDetailSectionProps {
  /** Optional 0-based index for alternating background (even = secondary, odd = main). */
  sectionIndex?: number;
  index: number;
  icon: IconType;
  title: string;
  description: string;
  subsections?: ServiceSubsection[];
  primaryCta: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  className?: string;
}

export function ServiceDetailSection({
  index,
  icon: Icon,
  title,
  description,
  subsections = [],
  primaryCta,
  secondaryCta,
  className = "",
}: ServiceDetailSectionProps) {

  const isEven = (num: number) => num % 2 === 0;

  return (
    <motion.section
      className={`border-t border-soft-divider-line ${isEven(index) ? "bg-secondary-background" : "bg-main-background"} py-16 sm:py-24 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 bg-[#14161A] border border-soft-divider-line ">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-4">
            <div className="shrink-0 text-primary-gold">
              <Icon className="text-4xl sm:text-5xl" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-heading-h2 text-main-text-headlines">
                {title}
              </h2>
              <p className="mt-4 text-body text-secondary-text-body-paragraphs">
                {description}
              </p>
            </div>
          </div>

          {subsections.length > 0 && (
            <div className="mt-8 space-y-8">
              {subsections.map((sub) => (
                <div key={sub.heading}>
                  <h3 className="font-body text-body font-bold text-main-text-headlines">
                    {sub.heading}
                  </h3>
                  {sub.items && (
                    <ul className="mt-3 list-disc space-y-2 pl-12 text-body text-secondary-text-body-paragraphs">
                      {sub.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {sub.text && !sub.items && (
                    <p className="mt-3 text-body text-secondary-text-body-paragraphs">
                      {sub.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              radius="none"
              as={Link}
              to={primaryCta.to}
              prefetch="intent"
              size="lg"
              className="bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state px-6 uppercase"
              endContent={<IoArrowForward className="text-lg" />}
            >
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button
                radius="none"
                as={Link}
                to={secondaryCta.to}
                prefetch="intent"
                variant="bordered"
                size="lg"
                className="border-2 border-primary-gold text-primary-gold bg-transparent font-body font-bold hover:bg-primary-gold/10 px-6 uppercase"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
