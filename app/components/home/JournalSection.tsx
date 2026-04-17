import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import type { Insight } from "@/types/firestore";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

function JournalSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-video rounded border border-soft-divider-line bg-secondary-background" />
          <div className="mt-6 space-y-2">
            <div className="h-3 w-16 bg-secondary-background rounded" />
            <div className="h-5 w-3/4 bg-secondary-background rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function JournalSection() {
  const [posts, setPosts] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView || hasFetched) return;
    setHasFetched(true);
    setLoading(true);
    const q = query(
      collection(db, "insights"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    getDocs(q)
      .then((snap) => {
        const insights = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() } as Insight)
        );
        setPosts(insights);
      })
      .finally(() => setLoading(false));
  }, [isInView, hasFetched]);

  const showSkeleton = !isInView || loading;
  const showPosts = isInView && !loading && posts.length > 0;

  return (
    <section
      ref={sectionRef}
      className="bg-main-background py-20 sm:py-32 border-t border-soft-divider-line"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
          <div>
            <motion.h2
              className="text-heading-h2 text-main-text-headlines font-heading"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              From the Jesfem Journal
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/insights"
              prefetch="intent"
              className="text-buttons text-primary-gold hover:underline uppercase tracking-wider"
            >
              View All Posts
            </Link>
          </motion.div>
        </div>

        {showSkeleton && <JournalSkeleton />}
        {showPosts && (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/insights/${post.slug}`} prefetch="intent">
                  <div className="relative aspect-video overflow-hidden border border-soft-divider-line bg-secondary-background">
                    <img
                      src={post.image || PLACEHOLDER_IMAGE}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-6">
                    <p className="text-buttons text-primary-gold uppercase tracking-widest text-xs mb-2">
                      {post.date}
                    </p>
                    <h3 className="text-heading-h3 text-main-text-headlines font-heading group-hover:text-primary-gold transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
        {isInView && !loading && posts.length === 0 && (
          <p className="text-center text-secondary-text-body-paragraphs py-8">
            More articles coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
