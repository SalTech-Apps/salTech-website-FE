import { Link } from "react-router-dom";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import type { Insight } from "@/types/firestore";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80";

export interface FeaturedArticleSectionProps {
  insight: Insight | null;
}

export function FeaturedArticleSection({ insight }: FeaturedArticleSectionProps) {
  if (!insight) return null;

  const imageUrl = insight.image || PLACEHOLDER_IMAGE;

  return (
    <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to={`/insights/${insight.slug}`}
          prefetch="intent"
          className="group grid gap-0 overflow-hidden rounded-lg border border-soft-divider-line bg-secondary-background shadow-sm transition-all duration-300 hover:border-primary-gold/40 hover:shadow-lg hover:shadow-black/20 md:grid-cols-2"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-soft-divider-line md:aspect-auto">
            <img
              src={imageUrl}
              alt={insight.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className="absolute left-4 top-4 rounded bg-primary-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-main-background"
              aria-hidden
            >
              Featured
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
            <p className="text-buttons uppercase tracking-wider text-primary-gold">
              {insight.category}
            </p>
            <h2 className="mt-3 font-heading text-heading-h2 text-main-text-headlines transition-colors duration-200 group-hover:text-primary-gold">
              {insight.title}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-body text-secondary-text-body-paragraphs">
              <span className="flex items-center gap-2 text-sm">
                <IoCalendarOutline className="h-4 w-4 shrink-0 text-primary-gold" />
                {insight.date}
              </span>
              <span className="flex items-center gap-2 text-sm">
                <IoTimeOutline className="h-4 w-4 shrink-0 text-primary-gold" />
                {insight.readTime}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
