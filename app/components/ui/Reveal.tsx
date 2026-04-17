import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const easeOut = [0.25, 0.1, 0.25, 1] as const;

const viewport = { once: true, margin: "-64px 0px -48px 0px" as const };

type RevealProps = Omit<
  ComponentPropsWithoutRef<typeof motion.div>,
  "children" | "initial" | "animate" | "whileInView"
> & {
  children: ReactNode;
  /** Extra delay in seconds (staggered sections). */
  delay?: number;
};

/** Scroll-triggered fade + slight rise. Respects reduced motion. */
export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  const reduceMotion = useReducedMotion();

  const mergedClass = ["w-full", className].filter(Boolean).join(" ");

  if (reduceMotion) {
    return <div className={mergedClass}>{children}</div>;
  }

  return (
    <motion.div
      className={mergedClass}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: easeOut, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type FadeInProps = Omit<
  ComponentPropsWithoutRef<typeof motion.div>,
  "children" | "initial" | "animate"
> & {
  children: ReactNode;
  delay?: number;
};

/** One-shot entrance (e.g. hero) on mount — not scroll-based. */
export function FadeIn({ children, className, delay = 0, ...rest }: FadeInProps) {
  const reduceMotion = useReducedMotion();

  const mergedClass = ["w-full", className].filter(Boolean).join(" ");

  if (reduceMotion) {
    return <div className={mergedClass}>{children}</div>;
  }

  return (
    <motion.div
      className={mergedClass}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
