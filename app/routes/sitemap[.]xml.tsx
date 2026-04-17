import { getServerDb } from "@/lib/firebase.server";
import { getBaseUrl } from "@/lib/seo";

const BASE = getBaseUrl();

/** Static public pages (excluding console and dynamic routes). */
const STATIC_URLS: Array<{ loc: string; changefreq: string; priority: string }> = [
  { loc: `${BASE}/`, changefreq: "weekly", priority: "1.0" },
  { loc: `${BASE}/about`, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE}/services`, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE}/landlords`, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE}/projects`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/insights`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/contact`, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE}/review`, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE}/faq`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/rentals`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/properties`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/off-plan`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/intelligence`, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE}/terms`, changefreq: "monthly", priority: "0.5" },
  { loc: `${BASE}/privacy`, changefreq: "monthly", priority: "0.5" },
];

function urlNode(loc: string, changefreq: string, priority: string, lastmod?: string): string {
  const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
  return `<url><loc>${escapeXml(loc)}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${lastmodTag}</url>`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(ts: unknown): string | undefined {
  if (!ts) return undefined;
  if (typeof ts === "object" && ts !== null && "toDate" in ts && typeof (ts as { toDate: () => Date }).toDate === "function") {
    return (ts as { toDate: () => Date }).toDate().toISOString().slice(0, 10);
  }
  if (typeof ts === "string") return ts.slice(0, 10);
  return undefined;
}

export async function loader() {
  const urls: string[] = [];

  // Static pages
  for (const u of STATIC_URLS) {
    urls.push(urlNode(u.loc, u.changefreq, u.priority));
  }

  const db = getServerDb();
  if (!db) {
    console.warn("[sitemap] Firebase Admin not configured (FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY required); using static URLs only");
  }
  if (db) {
    try {
      // Insights
      const insightsSnap = await db.collection("insights").orderBy("createdAt", "desc").get();
      for (const d of insightsSnap.docs) {
        const data = d.data();
        const slug = data.slug ?? d.id;
        const lastmod = toLastmod(data.updatedAt ?? data.createdAt);
        urls.push(urlNode(`${BASE}/insights/${slug}`, "monthly", "0.8", lastmod));
      }

      // Projects
      const projectsSnap = await db.collection("projects").orderBy("order", "asc").get();
      for (const d of projectsSnap.docs) {
        const data = d.data();
        const lastmod = toLastmod(data.updatedAt ?? data.createdAt);
        urls.push(urlNode(`${BASE}/projects/${d.id}`, "monthly", "0.8", lastmod));
      }

      // Properties (for sale)
      const propertiesSnap = await db.collection("properties").orderBy("createdAt", "desc").get();
      for (const d of propertiesSnap.docs) {
        const data = d.data();
        const slug = data.slug ?? d.id;
        const lastmod = toLastmod(data.updatedAt ?? data.createdAt);
        urls.push(urlNode(`${BASE}/properties/${slug}`, "weekly", "0.8", lastmod));
      }

      // Rentals (properties with isRental=true - same collection, different path)
      for (const d of propertiesSnap.docs) {
        const data = d.data();
        if (data.isRental !== true) continue;
        const slug = data.slug ?? d.id;
        const lastmod = toLastmod(data.updatedAt ?? data.createdAt);
        urls.push(urlNode(`${BASE}/rentals/${slug}`, "weekly", "0.8", lastmod));
      }

      // Off-plan
      const offPlanSnap = await db.collection("offPlan").orderBy("order", "asc").get();
      for (const d of offPlanSnap.docs) {
        const data = d.data();
        const slug = data.slug ?? d.id;
        const lastmod = toLastmod(data.updatedAt ?? data.createdAt);
        urls.push(urlNode(`${BASE}/off-plan/${slug}`, "weekly", "0.8", lastmod));
      }

      // CMS pages
      const pagesSnap = await db.collection("pages").get();
      for (const d of pagesSnap.docs) {
        const data = d.data();
        const slug = data.slug ?? d.id;
        const lastmod = toLastmod(data.updatedAt ?? data.createdAt);
        urls.push(urlNode(`${BASE}/page/${slug}`, "monthly", "0.6", lastmod));
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[sitemap] Firebase fetch failed, using static URLs only:", msg);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
