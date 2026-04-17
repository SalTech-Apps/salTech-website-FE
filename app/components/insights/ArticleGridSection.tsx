import { useState } from "react";
import { Link } from "react-router-dom";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import type { Insight } from "@/types/firestore";

export interface ArticleItem {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

function ArticleCard({ article }: { article: ArticleItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/insights/${article.slug}`}
      prefetch="intent"
      className="group block overflow-hidden rounded-lg border border-soft-divider-line bg-secondary-background shadow-sm transition-all duration-300 hover:border-primary-gold/40 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-soft-divider-line">
        {!imgError ? (
          <img
            src={article.image || PLACEHOLDER_IMAGE}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full bg-secondary-background" aria-hidden />
        )}
        <span className="absolute left-4 top-4 rounded bg-primary-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-main-background">
          {article.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-heading-h3 text-main-text-headlines line-clamp-2 transition-colors duration-200 group-hover:text-primary-gold">
          {article.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-secondary-text-body-paragraphs">
          <span className="flex items-center gap-1.5">
            <IoCalendarOutline className="h-4 w-4 shrink-0 text-primary-gold" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <IoTimeOutline className="h-4 w-4 shrink-0 text-primary-gold" />
            {article.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

function insightToArticleItem(insight: Insight): ArticleItem {
  return {
    slug: insight.slug,
    category: insight.category,
    title: insight.title,
    date: insight.date,
    readTime: insight.readTime,
    image: insight.image || PLACEHOLDER_IMAGE,
  };
}

/** Vercel-style crosshair at grid line intersections (decorative). */
function GridCrosshair({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 font-mono text-xl leading-none text-white/40 ${className ?? ""}`}
      aria-hidden
    >
      +
    </span>
  );
}

const GRID_LINE = "border-white/[0.1]";

export interface ArticleGridSectionProps {
  articles: Insight[];
  loading?: boolean;
}

export function ArticleGridSection({
  articles,
  loading = false,
}: ArticleGridSectionProps) {
  const items = articles.map(insightToArticleItem);

  if (loading) {
    return (
      <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`relative border-t border-l ${GRID_LINE}`}>
            <GridCrosshair className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
            <GridCrosshair className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
            <GridCrosshair className="left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 sm:block lg:hidden" />
            <GridCrosshair className="left-1/3 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
            <GridCrosshair className="left-2/3 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
            <GridCrosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
            <GridCrosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`border-r border-b ${GRID_LINE} p-4 sm:p-6`}
                >
                  <div
                    className="h-80 animate-pulse bg-secondary-background"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`relative border px-6 py-16 sm:px-10 ${GRID_LINE}`}>
            <GridCrosshair className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
            <GridCrosshair className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
            <GridCrosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
            <GridCrosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
            <p className="text-center text-body text-secondary-text-body-paragraphs">
              More articles coming soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`relative border-t border-l ${GRID_LINE}`}>
          <GridCrosshair className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
          <GridCrosshair className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
          <GridCrosshair className="left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 sm:block lg:hidden" />
          <GridCrosshair className="left-1/3 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
          <GridCrosshair className="left-2/3 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
          <GridCrosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <GridCrosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((article) => (
              <div
                key={article.slug}
                className={`border-r border-b ${GRID_LINE} p-4 sm:p-6`}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
