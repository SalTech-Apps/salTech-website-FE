import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { Spinner } from "@heroui/react";
import Markdown from "react-markdown";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Terms of Service",
    description:
      "SALTECH terms of service and legal agreements for using our real estate and property services.",
    path: location.pathname,
  });
}

export default function TermsPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "pages", "terms"));
        if (snap.exists()) {
          setContent(snap.data().content ?? "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-main-background pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-20">
      <JsonLd
        data={webPageSchema({
          name: "Terms of Service",
          description: "SALTECH terms of service and legal agreements for using our real estate and property services.",
          path: "/terms",
        })}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 overflow-hidden">
        <h1 className="mb-8 sm:mb-10 font-heading text-heading-h1 text-main-text-headlines">
          Terms of Service
        </h1>
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" color="warning" />
          </div>
        ) : content ? (
          <article className="prose prose-invert max-w-none text-secondary-text-body-paragraphs prose-headings:text-main-text-headlines prose-a:text-primary-gold wrap-break-word">
            <Markdown>{content}</Markdown>
          </article>
        ) : (
          <p className="text-secondary-text-body-paragraphs">
            Terms of service content will be available soon.
          </p>
        )}
      </div>
    </div>
  );
}
