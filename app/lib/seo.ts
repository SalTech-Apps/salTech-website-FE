/**
 * SEO helpers, defaults, and meta tag builders for Lighthouse and SEO compliance.
 */

export const SITE_NAME = "SalTech";
export const DEFAULT_TITLE = "SalTech | Mission-Critical Digital Products";
export const DEFAULT_DESCRIPTION =
  "SalTech engineers mission-critical digital products for startups, enterprises, and governments — MVP delivery, platform engineering, and product design.";

const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://jesfemmultiservice.com";
const DEFAULT_OG_IMAGE = "/assets/logo/logo-transparent.webp";

/** Build absolute URL for a path (no leading slash required). */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL.replace(/\/$/, "")}${normalized}`;
}

/** Build canonical URL for current pathname. */
export function canonicalUrl(pathname: string): string {
  return absoluteUrl(pathname || "/");
}

/** Build Open Graph image URL (absolute). */
export function ogImageUrl(imagePath?: string | null): string {
  if (imagePath?.startsWith("http")) return imagePath;
  if (imagePath?.startsWith("/")) return absoluteUrl(imagePath);
  return absoluteUrl(imagePath || DEFAULT_OG_IMAGE);
}

export interface MetaInput {
  title?: string;
  description?: string;
  image?: string | null;
  path?: string;
  type?: "website" | "article";
}

/** Build meta tag descriptors for React Router Meta component. */
export function buildMetaTags(input: MetaInput): Array<Record<string, unknown>> {
  const title = input.title
    ? `${input.title} | ${SITE_NAME}`
    : DEFAULT_TITLE;
  const description = input.description || DEFAULT_DESCRIPTION;
  const url = canonicalUrl(input.path || "/");
  const image = ogImageUrl(input.image);
  const type = input.type || "website";

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

/** Get base URL for sitemap, robots, etc. */
export function getBaseUrl(): string {
  return BASE_URL.replace(/\/$/, "");
}
