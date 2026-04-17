import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import type { SiteConfig, WorkingDayHours } from "@/types/firestore";

const SITE_CONFIG_COLLECTION = "meta";
const SITE_CONFIG_DOC_ID = "siteConfig";

const DEFAULT_WORKING_DAYS: WorkingDayHours[] = [
  { day: "Monday", hours: "" },
  { day: "Tuesday", hours: "" },
  { day: "Wednesday", hours: "" },
  { day: "Thursday", hours: "" },
  { day: "Friday", hours: "" },
  { day: "Saturday", hours: "" },
  { day: "Sunday", hours: "" },
];

/**
 * Get site configuration (phone, email, location, working hours). For public pages.
 */
export async function getSiteConfig(): Promise<SiteConfig | null> {
  const snap = await getDoc(
    doc(db, SITE_CONFIG_COLLECTION, SITE_CONFIG_DOC_ID)
  );
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    phone: data?.phone ?? "",
    whatsapp: data?.whatsapp ?? "",
    email: data?.email ?? "",
    location: data?.location ?? "",
    workingDays: (data?.workingDays as WorkingDayHours[] | undefined) ?? DEFAULT_WORKING_DAYS,
    facebook: data?.facebook ?? "",
    instagram: data?.instagram ?? "",
    tiktok: data?.tiktok ?? "",
    x: data?.x ?? "",
    linkedin: data?.linkedin ?? "",
    whatsappChannel: data?.whatsappChannel ?? "",
    mapEmbedUrl: data?.mapEmbedUrl ?? "",
    updatedAt: data?.updatedAt ?? null,
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
  values: SiteConfigFormValues
): Promise<void> {
  await setDoc(
    doc(db, SITE_CONFIG_COLLECTION, SITE_CONFIG_DOC_ID),
    {
      ...values,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Build WhatsApp URL from number (strip non-digits, add country code if needed). */
export function whatsappUrlFromNumber(whatsapp: string | undefined): string {
  if (!whatsapp?.trim()) return "https://wa.me/2340000000000";
  const digits = whatsapp.replace(/\D/g, "");
  const withCode = digits.length <= 10 ? `234${digits}` : digits;
  return `https://wa.me/${withCode}`;
}
