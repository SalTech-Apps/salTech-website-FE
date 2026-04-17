import { useState } from "react";
import { OffPlanCard } from "./OffPlanCard";
import { OffPlanWishlistModal } from "./OffPlanWishlistModal";
import type { OffPlan } from "@/types/firestore";

export interface OffPlanGridSectionProps {
  items: OffPlan[];
  loading?: boolean;
  /** When set, shows this message instead of the grid (e.g. no matches for filters). */
  emptyMessage?: string;
}

export function OffPlanGridSection({
  items,
  loading,
  emptyMessage,
}: OffPlanGridSectionProps) {
  const [wishlistItem, setWishlistItem] = useState<OffPlan | null>(null);

  return (
    <section className="bg-main-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-gold border-t-transparent" />
          </div>
        ) : emptyMessage ? (
          <div className="border border-soft-divider-line bg-secondary-background py-16 text-center">
            <p className="text-body text-secondary-text-body-paragraphs">
              {emptyMessage}
            </p>
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-body text-secondary-text-body-paragraphs py-12">
            No off-plan properties at the moment. Check back soon.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <OffPlanCard
                key={item.id}
                id={item.id}
                slug={item.slug}
                image={item.image}
                price={item.price}
                status={item.status}
                title={item.title}
                location={item.location}
                beds={item.beds}
                baths={item.baths}
                garages={item.garages ?? 0}
                completionDate={item.completionDate}
                onAddToWishlist={() => setWishlistItem(item)}
              />
            ))}
          </div>
        )}
      </div>
      {wishlistItem && (
        <OffPlanWishlistModal
          isOpen={!!wishlistItem}
          onClose={() => setWishlistItem(null)}
          offPlanId={wishlistItem.id}
          offPlanTitle={wishlistItem.title}
        />
      )}
    </section>
  );
}
