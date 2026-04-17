import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Property } from "@/types/firestore";

export interface SelectedListingsSectionProps {
  /** Featured properties from Firebase (admin-marked). When empty, section still shows heading but no cards. */
  listings?: Property[];
  loading?: boolean;
}

export function SelectedListingsSection({
  listings = [],
  loading = false,
}: SelectedListingsSectionProps) {
  return (
    <section className="bg-main-background py-20 sm:py-32 border-t border-soft-divider-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
          <div>
            <motion.h2
              className="text-heading-h2 text-main-text-headlines font-heading"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Selected Listings
            </motion.h2>
            <motion.p
              className="mt-2 text-body text-secondary-text-body-paragraphs"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Explore our handpicked premium properties.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/properties" prefetch="intent" className="text-buttons text-primary-gold hover:underline uppercase tracking-wider">
              View All Listings
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 border border-soft-divider-line bg-secondary-background animate-pulse"
              />
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing, i) => (
              <motion.div
                key={listing.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/properties/${listing.slug ?? listing.id}`} prefetch="intent" className="block">
                  <div className="relative aspect-[4/3] overflow-hidden border border-soft-divider-line bg-secondary-background">
                    <img
                      src={listing.image || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"}
                      alt={listing.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-primary-gold text-main-background px-3 py-1 text-buttons">
                      {listing.status || "FOR SALE"}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-heading-h3 text-main-text-headlines font-heading group-hover:text-primary-gold transition-colors">
                      {listing.title}
                    </h3>
                    <p className="text-body text-muted-labels mt-1">{listing.location}</p>
                    <p className="text-heading-h3 text-primary-gold mt-2">{listing.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
