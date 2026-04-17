import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Button } from "@heroui/react";

import { db } from "@/lib/firebase.client";
import { mapReviewDoc, REVIEWS_PAGE_SIZE } from "@/lib/reviews";
import type { SiteReview } from "@/types/firestore";

/** Above this length, show a collapsed preview with read more / show less. */
const TESTIMONIAL_COLLAPSE_THRESHOLD = 220;

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: SiteReview;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle =
    testimonial.text.trim().length > TESTIMONIAL_COLLAPSE_THRESHOLD;

  return (
    <motion.div
      className="flex h-full flex-col rounded-lg border border-soft-divider-line bg-secondary-background p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="text-primary-gold mb-4 text-4xl leading-none">“</div>
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <p
          className={[
            "text-body text-secondary-text-body-paragraphs italic wrap-break-word",
            needsToggle && !expanded && "line-clamp-7",
            needsToggle &&
              expanded &&
              "max-h-[min(28rem,55vh)] overflow-y-auto overscroll-y-contain pr-1 [scrollbar-gutter:stable]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {testimonial.text}
        </p>
        {needsToggle ? (
          <button
            type="button"
            className="text-left text-sm font-bold uppercase tracking-wider text-primary-gold underline decoration-primary-gold/40 underline-offset-4 transition-colors hover:decoration-primary-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-background"
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Show less" : "Read full review"}
          </button>
        ) : null}
      </div>
      <div className="mt-6 border-t border-soft-divider-line/60 pt-6">
        <p className="text-buttons font-bold uppercase tracking-wider text-main-text-headlines">
          {testimonial.authorName}
        </p>
        {testimonial.role ? (
          <p className="text-body mt-1 text-sm text-muted-labels">
            {testimonial.role}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<SiteReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("moderationStatus", "==", "approved"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setReviews(snap.docs.map((d) => mapReviewDoc(d.id, d.data())));
        setLoading(false);
      },
      () => {
        setReviews([]);
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const totalPages =
    reviews.length === 0 ? 0 : Math.ceil(reviews.length / REVIEWS_PAGE_SIZE);
  const maxPage = Math.max(0, totalPages - 1);
  const safePage = Math.min(page, maxPage);

  useEffect(() => {
    if (page > maxPage) setPage(maxPage);
  }, [page, maxPage]);

  const pageItems = reviews.slice(
    safePage * REVIEWS_PAGE_SIZE,
    safePage * REVIEWS_PAGE_SIZE + REVIEWS_PAGE_SIZE,
  );

  const rangeStart = reviews.length === 0 ? 0 : safePage * REVIEWS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    (safePage + 1) * REVIEWS_PAGE_SIZE,
    reviews.length,
  );

  return (
    <section className="bg-main-background py-20 sm:py-32 border-t border-soft-divider-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-heading-h2 text-main-text-headlines font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {loading ? (
          <p className="text-center text-body text-muted-labels">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <div className="text-center max-w-lg mx-auto">
            <p className="text-body text-secondary-text-body-paragraphs mb-8">
              No reviews yet. Be the first to share your experience with JESFEM.
            </p>
            <Button
              radius="none"
              as={Link}
              to="/review"
              prefetch="intent"
              size="lg"
              className="bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state px-8 uppercase"
            >
              Leave a review
            </Button>
          </div>
        ) : (
          <>
            <div className="grid auto-rows-fr gap-8 md:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((testimonial, i) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={i}
                />
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
                <p className="text-body text-muted-labels text-sm order-2 sm:order-1">
                  Showing {rangeStart}–{rangeEnd} of {reviews.length}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 order-1 sm:order-2">
                  <Button
                    radius="none"
                    variant="bordered"
                    isDisabled={safePage <= 0}
                    onPress={() => setPage((p) => Math.max(0, p - 1))}
                    className="min-w-[120px] border-soft-divider-line font-body font-bold uppercase text-main-text-headlines"
                  >
                    Previous
                  </Button>
                  <Button
                    radius="none"
                    variant="bordered"
                    isDisabled={safePage >= maxPage}
                    onPress={() => setPage((p) => Math.min(maxPage, p + 1))}
                    className="min-w-[120px] border-soft-divider-line font-body font-bold uppercase text-main-text-headlines"
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
