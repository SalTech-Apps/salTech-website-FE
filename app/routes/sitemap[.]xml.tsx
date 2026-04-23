import { getBaseUrl } from "@/lib/seo";

const BASE = getBaseUrl();

/** Static public pages (excluding console and dynamic routes). */
const STATIC_URLS: Array<{
	loc: string;
	changefreq: string;
	priority: string;
}> = [
	{ loc: `${BASE}/`, changefreq: "weekly", priority: "1.0" },
	{ loc: `${BASE}/about`, changefreq: "monthly", priority: "0.9" },
	{ loc: `${BASE}/case-studies`, changefreq: "monthly", priority: "0.9" },
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

function urlNode(
	loc: string,
	changefreq: string,
	priority: string,
	lastmod?: string,
): string {
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

export async function loader() {
	const urls: string[] = [];

	// Static pages
	for (const u of STATIC_URLS) {
		urls.push(urlNode(u.loc, u.changefreq, u.priority));
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
