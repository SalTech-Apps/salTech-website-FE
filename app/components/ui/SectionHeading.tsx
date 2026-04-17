export interface SectionHeadingProps {
  title: string;
  /** When true, shows a short gold line above the title (centered). */
  goldLineAbove?: boolean;
  /** When true, shows a short gold line below the title (centered). */
  goldLineBelow?: boolean;
  /** Heading level: h1, h2, h3. Maps to text-heading-h1/h2/h3. */
  level?: "h1" | "h2" | "h3";
  /** Text color: gold for accent sections (e.g. By the Numbers), headlines for others. */
  variant?: "headlines" | "gold";
  className?: string;
}

const headingClasses = {
  h1: "text-heading-h1",
  h2: "text-heading-h2",
  h3: "text-heading-h3",
} as const;

export function SectionHeading({
  title,
  goldLineAbove,
  goldLineBelow,
  level = "h2",
  variant = "headlines",
  className = "",
}: SectionHeadingProps) {
  const colorClass =
    variant === "gold" ? "text-primary-gold" : "text-main-text-headlines";
  const Tag = level;

  return (
    <div className={`text-center ${className}`}>
      {goldLineAbove && (
        <div className="mx-auto mb-4 h-0.5 w-16 bg-primary-gold" aria-hidden />
      )}
      <Tag className={`font-heading ${headingClasses[level]} ${colorClass}`}>
        {title}
      </Tag>
      {goldLineBelow && (
        <div className="mx-auto mt-4 h-0.5 w-24 bg-primary-gold" aria-hidden />
      )}
    </div>
  );
}
