import type { ReactNode } from "react";
import type { IconType } from "react-icons";

export interface IntelligenceCardProps {
  icon: IconType;
  title: string;
  description: string;
  children?: ReactNode;
  placeholder?: string;
}

export function IntelligenceCard({
  icon: Icon,
  title,
  description,
  children,
  placeholder = "Enter property details to view...",
}: IntelligenceCardProps) {
  return (
    <div className="border border-soft-divider-line bg-secondary-background p-6">
      <div className="flex items-start gap-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center bg-subtle-gold-background text-primary-gold"
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-heading-h3 text-main-text-headlines">{title}</h3>
          <p className="mt-2 text-body text-secondary-text-body-paragraphs">
            {description}
          </p>
          {children != null ? (
            <div className="mt-4 text-body text-main-text-headlines">
              {children}
            </div>
          ) : (
            <p className="mt-4 text-body text-muted-labels">{placeholder}</p>
          )}
        </div>
      </div>
    </div>
  );
}
