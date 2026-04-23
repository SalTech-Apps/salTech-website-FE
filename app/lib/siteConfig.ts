import type { SiteConfig, WorkingDayHours } from "@/types/firestore";

const SITE_CONFIG_STORE: Record<string, unknown> = {};

const DEFAULT_SITE_CONFIG: SiteConfig = {
	phone: "",
	whatsapp: "",
	email: "",
	location: "",
	workingDays: [],
	facebook: "",
	instagram: "",
	tiktok: "",
	x: "",
	linkedin: "",
	whatsappChannel: "",
	mapEmbedUrl: "",
	updatedAt: null,
};

/**
 * Get site configuration (phone, email, location, working hours). For public pages.
 */
export async function getSiteConfig(): Promise<SiteConfig | null> {
	const data = SITE_CONFIG_STORE as Partial<SiteConfig>;
	return {
		phone: data?.phone ?? DEFAULT_SITE_CONFIG.phone,
		whatsapp: data?.whatsapp ?? DEFAULT_SITE_CONFIG.whatsapp,
		email: data?.email ?? DEFAULT_SITE_CONFIG.email,
		location: data?.location ?? DEFAULT_SITE_CONFIG.location,
		workingDays:
			(data?.workingDays as WorkingDayHours[] | undefined) ??
			DEFAULT_SITE_CONFIG.workingDays,
		facebook: data?.facebook ?? DEFAULT_SITE_CONFIG.facebook,
		instagram: data?.instagram ?? DEFAULT_SITE_CONFIG.instagram,
		tiktok: data?.tiktok ?? DEFAULT_SITE_CONFIG.tiktok,
		x: data?.x ?? DEFAULT_SITE_CONFIG.x,
		linkedin: data?.linkedin ?? DEFAULT_SITE_CONFIG.linkedin,
		whatsappChannel:
			data?.whatsappChannel ?? DEFAULT_SITE_CONFIG.whatsappChannel,
		mapEmbedUrl: data?.mapEmbedUrl ?? DEFAULT_SITE_CONFIG.mapEmbedUrl,
		updatedAt: null,
	};
}

/** Accepts only HTTPS Google Maps embed URLs (contact page iframe). */
export function isGoogleMapsEmbedUrl(url: string): boolean {
	const trimmed = url.trim();
	if (!trimmed) return false;
	try {
		const u = new URL(trimmed);
		if (u.protocol !== "https:") return false;
		const host = u.hostname.toLowerCase();
		const isGoogleMapsHost =
			host === "www.google.com" ||
			host === "google.com" ||
			host === "maps.google.com";
		if (!isGoogleMapsHost) return false;
		return u.pathname.startsWith("/maps/embed");
	} catch {
		return false;
	}
}

export interface SiteConfigFormValues {
	phone: string;
	whatsapp: string;
	email: string;
	location: string;
	workingDays: WorkingDayHours[];
	facebook: string;
	instagram: string;
	tiktok: string;
	x: string;
	linkedin: string;
	whatsappChannel: string;
	mapEmbedUrl: string;
}

/**
 * Update site configuration. Call from console only.
 */
export async function updateSiteConfig(
	values: SiteConfigFormValues,
): Promise<void> {
	Object.assign(SITE_CONFIG_STORE, values);
}

/** Build WhatsApp URL from number (strip non-digits, add country code if needed). */
export function whatsappUrlFromNumber(whatsapp: string | undefined): string {
	if (!whatsapp?.trim()) return "https://wa.me/2340000000000";
	const digits = whatsapp.replace(/\D/g, "");
	const withCode = digits.length <= 10 ? `234${digits}` : digits;
	return `https://wa.me/${withCode}`;
}
