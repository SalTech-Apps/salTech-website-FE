/**
 * Parse User-Agent strings and legacy `deviceInfo` blobs from survey submissions.
 */

export function parseUserAgent(ua: string): { os: string; browser: string } {
  const u = ua.trim();
  if (!u) return { os: "Unknown", browser: "Unknown" };

  let os = "Unknown";
  if (/Android\s+([\d._]+)/i.test(u)) {
    const m = u.match(/Android\s+([\d._]+)/i);
    os = m ? `Android ${m[1].replace(/_/g, ".")}` : "Android";
  } else if (/(?:CPU )?iPhone OS ([\d_]+)/i.test(u)) {
    const m = u.match(/(?:CPU )?iPhone OS ([\d_]+)/i);
    os = m ? `iOS ${m[1].replace(/_/g, ".")}` : "iOS";
  } else if (/iPad.*CPU OS ([\d_]+)/i.test(u)) {
    const m = u.match(/CPU OS ([\d_]+)/i);
    os = m ? `iPadOS ${m[1].replace(/_/g, ".")}` : "iPadOS";
  } else if (/Windows NT 10/i.test(u)) {
    os = "Windows 10/11";
  } else if (/Windows NT 6\.3/i.test(u)) {
    os = "Windows 8.1";
  } else if (/Windows NT 6\.2/i.test(u)) {
    os = "Windows 8";
  } else if (/Windows NT 6\.1/i.test(u)) {
    os = "Windows 7";
  } else if (/Mac OS X ([\d._]+)/i.test(u)) {
    const m = u.match(/Mac OS X ([\d._]+)/i);
    os = m ? `macOS ${m[1].replace(/_/g, ".")}` : "macOS";
  } else if (/CrOS/i.test(u)) {
    os = "Chrome OS";
  } else if (/Linux/i.test(u) && !/Android/i.test(u)) {
    os = "Linux";
  }

  let browser = "Unknown";
  if (/Edg(?:e|A|iOS)?\/([\d.]+)/i.test(u)) {
    const m = u.match(/Edg(?:e|A|iOS)?\/([\d.]+)/i);
    browser = m ? `Edge ${m[1].split(".")[0]}` : "Edge";
  } else if (/CriOS\/([\d.]+)/i.test(u)) {
    const m = u.match(/CriOS\/([\d.]+)/i);
    browser = m ? `Chrome ${m[1].split(".")[0]}` : "Chrome";
  } else if (/FxiOS\/([\d.]+)/i.test(u)) {
    const m = u.match(/FxiOS\/([\d.]+)/i);
    browser = m ? `Firefox ${m[1].split(".")[0]}` : "Firefox";
  } else if (/OPR\/([\d.]+)/i.test(u) || /Opera\/([\d.]+)/i.test(u)) {
    const m = u.match(/OPR\/([\d.]+)/i) ?? u.match(/Opera\/([\d.]+)/i);
    browser = m ? `Opera ${m[1].split(".")[0]}` : "Opera";
  } else if (/SamsungBrowser\/([\d.]+)/i.test(u)) {
    const m = u.match(/SamsungBrowser\/([\d.]+)/i);
    browser = m ? `Samsung Internet ${m[1]}` : "Samsung Internet";
  } else if (/Chrome\/([\d.]+)/i.test(u) && !/Edg/i.test(u)) {
    const m = u.match(/Chrome\/([\d.]+)/i);
    browser = m ? `Chrome ${m[1].split(".")[0]}` : "Chrome";
  } else if (/Firefox\/([\d.]+)/i.test(u)) {
    const m = u.match(/Firefox\/([\d.]+)/i);
    browser = m ? `Firefox ${m[1]}` : "Firefox";
  } else if (/Version\/([\d.]+).*Safari/i.test(u) && !/Chrome/i.test(u)) {
    const m = u.match(/Version\/([\d.]+)/i);
    browser = m ? `Safari ${m[1].split(".")[0]}` : "Safari";
  }

  return { os, browser };
}

/** Legacy `deviceInfo` format: `ua:...;platform:...;lang:...` */
function extractLegacyUserAgent(raw: string): string | null {
  if (!raw.startsWith("ua:")) return null;
  const platformMarker = ";platform:";
  const idx = raw.indexOf(platformMarker);
  if (idx === -1) {
    const langMarker = ";lang:";
    const li = raw.indexOf(langMarker);
    return li === -1 ? raw.slice(3) : raw.slice(3, li);
  }
  return raw.slice(3, idx);
}

function parseStoredOsBrowserFormat(raw: string): { os: string; browser: string } | null {
  const osMatch = raw.match(/^os:([^;]+)/);
  const browserMatch = raw.match(/;\s*browser:([^;]+)/);
  if (!osMatch || !browserMatch) return null;
  return { os: osMatch[1].trim(), browser: browserMatch[1].trim() };
}

/** Readable line for console and exports: "Android 10 · Chrome 146" */
export function formatDeviceInfoSummary(raw: string | undefined | null): string {
  if (!raw?.trim()) return "—";

  const trimmed = raw.trim();
  const fromKeys = parseStoredOsBrowserFormat(trimmed);
  if (fromKeys) {
    return `${fromKeys.os} · ${fromKeys.browser}`;
  }

  const legacyUa = extractLegacyUserAgent(trimmed);
  if (legacyUa) {
    const { os, browser } = parseUserAgent(legacyUa);
    return `${os} · ${browser}`;
  }

  return trimmed.length > 100 ? `${trimmed.slice(0, 100)}…` : trimmed;
}
