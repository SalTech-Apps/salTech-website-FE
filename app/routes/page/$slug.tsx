import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { Spinner } from "@heroui/react";
import Markdown from "react-markdown";
import { Hero } from "@/components/ui/Hero";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetaTags, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";

export function meta({
  params,
  location,
}: {
  params: { slug: string };
  location: { pathname: string };
}) {
  const titleFromSlug =
    params.slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Page";
  return buildMetaTags({
    title: titleFromSlug,
    description:
      "SalTech — mission-critical digital products, platform engineering, and product design.",
    path: location.pathname,
  });
}

export default function PageBySlug() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, "pages"), where("slug", "==", slug));
        const snap = await getDocs(q);
        if (cancelled) return;
        const doc = snap.docs[0];
        if (doc?.exists()) {
          const data = doc.data();
          if (data.published === false) {
            if (!cancelled) setNotFound(true);
          } else {
            if (!cancelled) {
              setTitle(data.title ?? slug);
              setSeoTitle(data.seoTitle ?? data.title ?? slug);
              setContent(data.content ?? "");
              setSeoDescription(data.seoDescription ?? "");
              setBannerImageUrl(data.bannerImageUrl ?? null);
            }
          }
        } else {
          if (!cancelled) setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (notFound || loading) return;
    const pageTitle = seoTitle || title;
    const pageDescription = seoDescription;
    document.title = pageTitle
      ? `${pageTitle} | ${SITE_NAME}`
      : `${SITE_NAME} | Mission-Critical Digital Products`;
    const metaDesc = document.querySelector('meta[name="description"]');
    let createdMeta: HTMLMetaElement | null = null;
    if (pageDescription && metaDesc) {
      metaDesc.setAttribute("content", pageDescription);
    } else if (pageDescription) {
      createdMeta = document.createElement("meta");
      createdMeta.setAttribute("name", "description");
      createdMeta.setAttribute("content", pageDescription);
      document.head.appendChild(createdMeta);
    }
    return () => {
      document.title = `${SITE_NAME} | Mission-Critical Digital Products`;
      if (createdMeta?.parentNode) createdMeta.remove();
    };
  }, [loading, notFound, seoTitle, title, seoDescription]);

  if (loading) {
    return (
      <div className="min-h-screen bg-main-background pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-20 flex justify-center items-center">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-main-background pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-20">
        <Reveal className="mx-auto max-w-3xl px-4 sm:px-6 text-center overflow-hidden">
          <h1 className="font-heading text-heading-h1 text-main-text-headlines mb-4">
            Page not found
          </h1>
          <p className="text-secondary-text-body-paragraphs">
            This page does not exist or is not published.
          </p>
        </Reveal>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-main-background pb-12 sm:pb-20 ${!bannerImageUrl ? "pt-20 sm:pt-24 lg:pt-32" : ""}`}>
      <JsonLd
        data={webPageSchema({
          name: seoTitle || title,
          description:
            seoDescription || `${title} — SalTech digital products and engineering`,
          path: `/page/${slug}`,
        })}
      />
      {bannerImageUrl && (
        <Hero
          title={<>{title}</>}
          subtitle={seoDescription}
          backgroundImage={bannerImageUrl}
          overlay="dark"
          size="compact"
          backgroundBlur
          contentMaxWidth="wide"
          titleVariant="headlines"
        />
      )}
      <Reveal className="mx-auto max-w-3xl mt-8 sm:mt-12 px-4 sm:px-6 overflow-hidden">
        {!bannerImageUrl && (
          <h1 className="mb-8 sm:mb-10 font-heading text-heading-h1 text-main-text-headlines">
            {title}
          </h1>
        )}
        {content ? (
          <article className="prose prose-invert max-w-none text-secondary-text-body-paragraphs prose-headings:text-main-text-headlines prose-a:text-primary-gold wrap-break-word">
            <Markdown>{content}</Markdown>
          </article>
        ) : (
          <p className="text-secondary-text-body-paragraphs">
            Content will be available soon.
          </p>
        )}
      </Reveal>
    </div>
  );
}
