import { Hero } from "@/components/ui/Hero";
import { saltechAssets } from "@/data/saltechAssets";

export function ProductsPageHero() {
  return (
    <Hero
      eyebrow="OUR PRODUCTS"
      title="Software built to solve real problems."
      subtitle={
        <p className="max-w-3xl text-balance text-white/90">
          A portfolio of proprietary and client products across fintech, govtech,
          healthcare, and enterprise SaaS.
        </p>
      }
      backgroundImage={saltechAssets.productsHero}
      overlay="dark"
      size="full"
      backgroundBlur
      titleVariant="white"
      showDivider={false}
      contentMaxWidth="wide"
    />
  );
}
