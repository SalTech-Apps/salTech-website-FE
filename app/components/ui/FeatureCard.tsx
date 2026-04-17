import { type IconType } from "react-icons";

export interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  /** When true, icon is in a circular gold outline (Vision/Goals style). */
  iconCircle?: boolean;
  /** Title color: headlines (default) or gold for accent sections. */
  titleVariant?: "headlines" | "gold";
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconCircle = false,
  titleVariant = "headlines",
  className = "",
}: FeatureCardProps) {
  const titleColorClass =
    titleVariant === "gold"
      ? "text-primary-gold"
      : "text-main-text-headlines";
  return (
    <div
      className={`border border-soft-divider-line bg-secondary-background p-8 text-start ${className}`}
    >
      <div
        className={`mr-auto mb-6 flex items-center justify-center text-primary-gold ${
          iconCircle ? "h-16 w-16 border-2 border-primary-gold" : "h-12 w-12 bg-subtle-gold-background"
        }`}
      >
        <Icon className="text-2xl" />
      </div>
      <h3 className={`font-heading text-heading-h3 ${titleColorClass}`}>
        {title}
      </h3>
      <p className="mt-4 text-body text-secondary-text-body-paragraphs">
        {description}
      </p>
    </div>
  );
}
