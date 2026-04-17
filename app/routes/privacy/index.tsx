import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { Spinner } from "@heroui/react";
import Markdown from "react-markdown";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Privacy Policy",
    description:
      "SalTech privacy policy. Learn how we collect, use, and protect your personal information.",
    path: location.pathname,
  });
}

export default function PrivacyPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "pages", "privacy"));
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
          name: "Privacy Policy",
          description:
            "SalTech privacy policy. Learn how we collect, use, and protect your personal information.",
          path: "/privacy",
        })}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" color="warning" />
          </div>
        ) : (
          <Reveal>
            <h1 className="mb-8 sm:mb-10 font-heading text-heading-h1 text-main-text-headlines">
              Privacy Policy
            </h1>
            {content ? (
              <article className="prose prose-invert max-w-none text-secondary-text-body-paragraphs prose-headings:text-main-text-headlines prose-a:text-primary-gold wrap-break-word">
                <Markdown>{content}</Markdown>
              </article>
            ) : (
              <p className="text-secondary-text-body-paragraphs">
                Privacy policy content will be available soon.
              </p>
            )}
          </Reveal>
        )}
      </div>
    </div>
  );
}
