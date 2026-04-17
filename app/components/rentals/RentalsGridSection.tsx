import { RentalCard } from "./RentalCard";
import type { Property } from "@/types/firestore";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80";

export interface RentalsGridSectionProps {
  rentals?: Property[];
  loading?: boolean;
  /** WhatsApp URL from site config for enquiry links. */
  whatsappUrl?: string;
  /** Custom message when no rentals match (e.g. after filtering). */
  emptyMessage?: string;
}

export function propertyToRentalCardProps(p: Property) {
  return {
    id: p.id,
    slug: p.slug,
    image: p.image || PLACEHOLDER_IMAGE,
    price: p.price,
    status: p.status || "AVAILABLE",
    title: p.title,
    location: p.location,
    beds: p.beds ?? 0,
    baths: p.baths ?? 0,
    sqm: p.sqm ?? 0,
    features: p.features ?? [],
  };
}

const DEFAULT_EMPTY_MESSAGE = "No rentals listed at the moment. Check back later.";

export function RentalsGridSection({
  rentals = [],
  loading = false,
  whatsappUrl,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
}: RentalsGridSectionProps) {
  return (
    <section className="bg-main-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 border border-soft-divider-line bg-secondary-background animate-pulse"
              />
            ))}
          </div>
        ) : rentals.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rentals.map((rental) => (
              <RentalCard
                key={rental.id}
                {...propertyToRentalCardProps(rental)}
                whatsappUrl={whatsappUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-body text-secondary-text-body-paragraphs text-center py-12">
            {emptyMessage}
          </p>
        )}
      </div>
    </section>
  );
}
