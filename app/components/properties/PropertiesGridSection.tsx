import { Spinner } from "@heroui/react";
import { PropertyCard } from "./PropertyCard";
import type { Property } from "@/types/firestore";

export interface PropertiesGridSectionProps {
  properties: Property[];
  loading?: boolean;
  emptyMessage?: string;
}

export function PropertiesGridSection({
  properties,
  loading = false,
  emptyMessage,
}: PropertiesGridSectionProps) {
  return (
    <section className="bg-main-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" color="warning" />
          </div>
        ) : emptyMessage ? (
          <div className="border border-soft-divider-line bg-secondary-background py-16 text-center">
            <p className="text-body text-secondary-text-body-paragraphs">
              {emptyMessage}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                slug={property.slug}
                image={property.image ?? ""}
                title={property.title}
                location={property.location}
                price={property.price}
                status={property.status}
                beds={property.beds ?? 0}
                baths={property.baths ?? 0}
                sqm={property.sqm ?? 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
