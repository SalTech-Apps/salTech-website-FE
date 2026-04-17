import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/2340000000000";

export interface CtaSectionProps {
  /** Override default heading (e.g. for About page). */
  heading?: string;
  /** Primary button label (default: "BOOK A CONSULTATION"). */
  primaryButtonLabel?: string;
  /** Primary button link (default: "/contact"). */
  primaryButtonTo?: string;
  /** When false, only the primary button is shown (e.g. About "GET STARTED TODAY"). */
  showSecondaryButton?: boolean;
  /** "default" = secondary background, serif heading; "dark" = main background, sans-serif heading (e.g. Landlords CTA). */
  variant?: "default" | "dark";
}

const DEFAULT_HEADING = "Ready to Make Your Next Property Move?";
const DEFAULT_PRIMARY_LABEL = "BOOK A CONSULTATION";
const DEFAULT_PRIMARY_TO = "/contact";

export function CtaSection({
  heading = DEFAULT_HEADING,
  primaryButtonLabel = DEFAULT_PRIMARY_LABEL,
  primaryButtonTo = DEFAULT_PRIMARY_TO,
  showSecondaryButton = true,
}: CtaSectionProps = {}) {
  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-heading-h2 text-main-text-headlines"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {heading}
        </motion.h2>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Button
            radius="none"
            as={Link}
            to={primaryButtonTo}
            prefetch="intent"
            size="lg"
            className="bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state px-8 uppercase"
          >
            {primaryButtonLabel}
          </Button>
          {showSecondaryButton && (
            <Button
              radius="none"
              as="a"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="bordered"
              size="lg"
              className="border-2 border-primary-gold text-primary-gold bg-transparent font-body font-bold hover:bg-primary-gold/10 px-8 uppercase"
            >
              CHAT ON WHATSAPP
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
