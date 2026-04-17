import { saltechAssets } from "@/data/saltechAssets";

/**
 * Static paths for Figma-exported home page raster assets (see public/assets/saltech/home).
 * Case-study tiles reuse saltech portfolio art where it matches (single file on disk).
 */
export const homePageAssets = {
  topoPattern: "/assets/saltech/home/topo-pattern.webp",
  showcaseBg: "/assets/saltech/home/showcase-bg.webp",
  showcaseMain: "/assets/saltech/home/showcase-main.webp",
  showcaseFloatRight: "/assets/saltech/home/showcase-float-right.webp",
  showcaseFloatLeft: "/assets/saltech/home/showcase-float-left.webp",
  caseDara: saltechAssets.dara,
  caseParty: "/assets/saltech/home/showcase-main.webp",
  caseComing: saltechAssets.comingSoon,
  testimonialAvatar: "/assets/saltech/home/testimonial-avatar.webp",
} as const;
