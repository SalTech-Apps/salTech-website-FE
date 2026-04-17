/**
 * JSON-LD schema builders for all page types.
 * @see https://schema.org
 */

import { getBaseUrl, absoluteUrl } from "./seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SalTech Innovations LLC",
    url: getBaseUrl(),
    logo: `${getBaseUrl()}/assets/logo/logo-transparent.png`,
    description:
      "Mission-critical digital products for startups, enterprises, and governments — platform engineering, MVP delivery, and product design.",
  };
}

export function webSiteSchema(pathname = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SalTech",
    url: getBaseUrl(),
    description:
      "SalTech builds scalable digital products for regulated industries — from discovery to launch and scale.",
    publisher: organizationSchema(),
    inLanguage: "en",
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: webSiteSchema(input.path),
    publisher: organizationSchema(),
  };
}

export function contactPageSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact JESFEM",
    description: "Get in touch with JESFEM for property inquiries and consultations.",
    url: absoluteUrl(path),
    isPartOf: webSiteSchema(path),
    publisher: organizationSchema(),
  };
}

export function itemListSchema(input: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; url: string; image?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: item.name,
        url: item.url,
        image: item.image,
      },
    })),
  };
}

export function productSchema(input: {
  name: string;
  description?: string;
  image: string;
  price: string;
  path: string;
  location?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description || `${input.name} - Real estate listing from JESFEM`,
    image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
    url: absoluteUrl(input.path),
    offers: {
      "@type": "Offer",
      price: input.price.replace(/[^\d.]/g, "") || undefined,
      priceCurrency: "NGN",
    },
    ...(input.location && { address: { "@type": "PostalAddress", addressLocality: input.location } }),
  };
}

export function articleSchema(input: {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    url: absoluteUrl(input.path),
    publisher: organizationSchema(),
    author: organizationSchema(),
  };
}

export function projectSchema(input: {
  name: string;
  description?: string;
  image: string;
  location: string;
  path: string;
  status?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
    url: absoluteUrl(input.path),
    location: { "@type": "Place", name: input.location },
    ...(input.status && { creativeWorkStatus: input.status }),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
