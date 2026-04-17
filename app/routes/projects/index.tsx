import {
  ProductsCtaSection,
  ProductsPageHero,
  ProductsPortfolioSection,
} from "@/components/saltech/products";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetaTags } from "@/lib/seo";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";

export function meta({ location }: { location: { pathname: string } }) {
  return buildMetaTags({
    title: "Products",
    description:
      "Explore SalTech-built tools and platforms across fintech, govtech, healthcare, and enterprise SaaS.",
    path: location.pathname,
  });
}

export default function Projects() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd
        data={webPageSchema({
          name: "Products",
          description:
            "A portfolio of proprietary and client products engineered by SalTech.",
          path: "/projects",
        })}
      />
      <ProductsPageHero />
      <Reveal>
        <ProductsPortfolioSection />
      </Reveal>
      <Reveal>
        <ProductsCtaSection />
      </Reveal>
    </div>
  );
}
