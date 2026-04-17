import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { parseUserAgent } from "@/lib/survey-device-info";
import { SURVEY_SUBMISSION_LOCAL_KEY } from "./survey.constants";

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export function getWeekKey(now = Date.now()): number {
  return Math.floor(now / MS_PER_WEEK);
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function emailToDocPart(email: string): string {
  const normalized = normalizeEmail(email);
  try {
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      const bytes = new TextEncoder().encode(normalized);
      let binary = "";
      bytes.forEach((b) => {
        binary += String.fromCharCode(b);
      });
      return window
        .btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
    }
  } catch {
    // Fall through to deterministic plain-text fallback.
  }
  return normalized.replace(/\//g, "_");
}

export function getOrCreateClientDeviceId(): string {
  try {
    if (typeof window === "undefined") return "unknown_device";
    const key = "jesfem_survey_device_id_v1";
    const existing = window.localStorage.getItem(key);
    if (existing) return existing;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());
    window.localStorage.setItem(key, id);
    return id;
  } catch {
    return "unknown_device";
  }
}

function getStoredClientDeviceId(): string | null {
  try {
    if (typeof window === "undefined") return null;
    const key = "jesfem_survey_device_id_v1";
    const existing = window.localStorage.getItem(key);
    return existing || null;
  } catch {
    return null;
  }
}

export function buildDeviceInfoString(deviceIdOverride?: string): string {
  try {
    if (typeof window === "undefined") return "unknown_device_info";
    const ua = navigator.userAgent || "";
    const { os, browser } = parseUserAgent(ua);
    const deviceId =
      deviceIdOverride ?? getStoredClientDeviceId() ?? "unknown_device";
    const raw = `os:${os}; browser:${browser}; deviceId:${deviceId}`;
    return raw.slice(0, 600);
  } catch {
    return "unknown_device_info";
  }
}

export async function getDeviceFingerprint(): Promise<string> {
  try {
    if (typeof window === "undefined") return "unknown_fingerprint";
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId || "unknown_fingerprint";
  } catch {
    return "unknown_fingerprint";
  }
}

export function getStoredSubmittedWeek(): number | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(SURVEY_SUBMISSION_LOCAL_KEY);
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function markWeekAsSubmitted(weekKey: number): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SURVEY_SUBMISSION_LOCAL_KEY, String(weekKey));
  } catch {
    // Ignore storage write failures.
  }
}

export function clearStoredSubmittedWeek(): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(SURVEY_SUBMISSION_LOCAL_KEY);
  } catch {
    // Ignore storage failures.
  }
}
