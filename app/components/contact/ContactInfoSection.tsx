import { useEffect, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import { getSiteConfig } from "@/lib/siteConfig";
import type { SiteConfig } from "@/types/firestore";

const FALLBACK = {
  phone: "2348079328164",
  whatsapp: "2348079328164 – Quick enquiry",
  email: "hello@jesfemmultiservice.com",
  location: "XX, Street Name, Victoria Island, Lagos, Nigeria",
  hours: "Monday - Friday: 9:00 AM - 5:00 PM (WAT) Saturday: By appointment",
};

function formatWorkingDays(workingDays: SiteConfig["workingDays"]): string {
  if (!workingDays?.length) return FALLBACK.hours;

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

  const dayIndex: Record<string, number> = dayOrder.reduce(
    (acc, day, index) => {
      acc[day] = index;
      return acc;
    },
    {} as Record<string, number>,
  );

  const normalized = workingDays
    .filter((d) => d.hours?.trim())
    .filter((d) => d.day in dayIndex)
    .map((d) => ({
      day: d.day,
      hours: d.hours!.trim(),
      key: d.hours!.trim().toLowerCase(),
      index: dayIndex[d.day],
    }))
    .sort((a, b) => a.index - b.index);

  if (!normalized.length) return FALLBACK.hours;

  // Group days by identical hours (case-insensitive comparison)
  const groupsByKey = new Map<
    string,
    { hours: string; days: { day: string; index: number }[] }
  >();

  for (const entry of normalized) {
    const existing = groupsByKey.get(entry.key);
    if (existing) {
      existing.days.push({ day: entry.day, index: entry.index });
    } else {
      groupsByKey.set(entry.key, {
        hours: entry.hours,
        days: [{ day: entry.day, index: entry.index }],
      });
    }
  }

  const shortDay = (day: string) => day.slice(0, 3);

  const formatDayRange = (days: { day: string; index: number }[]) => {
    const sorted = [...days].sort((a, b) => a.index - b.index);
    const indices = sorted.map((d) => d.index);

    const isContiguous = indices.every(
      (idx, i) => i === 0 || idx === indices[i - 1] + 1,
    );

    if (sorted.length > 1 && isContiguous) {
      const first = shortDay(sorted[0].day);
      const last = shortDay(sorted[sorted.length - 1].day);
      return `${first}–${last}`;
    }

    return sorted.map((d) => shortDay(d.day)).join(", ");
  };

  // If all days share the same hours, show a compact range like "Mon–Sat: 9am–5pm"
  if (groupsByKey.size === 1) {
    const onlyGroup = Array.from(groupsByKey.values())[0];
    const label = formatDayRange(onlyGroup.days);
    return `${label}: ${onlyGroup.hours}`;
  }

  // If there is a clear "main" schedule plus one or more exceptions,
  // show the main schedule grouped and exceptions separately.
  if (groupsByKey.size === 2) {
    const allGroups = Array.from(groupsByKey.values());
    const [g1, g2] = allGroups;
    const main = g1.days.length >= g2.days.length ? g1 : g2;
    const exceptions = main === g1 ? g2 : g1;

    if (main.days.length >= 2) {
      const mainLabel = formatDayRange(main.days);
      const mainLine = `${mainLabel}: ${main.hours}`;

      const exceptionLines = exceptions.days
        .sort((a, b) => a.index - b.index)
        .map((d) => `${shortDay(d.day)}: ${exceptions.hours}`);

      return [mainLine, ...exceptionLines].join(" · ");
    }
  }

  // Fallback: show each day individually.
  return normalized.map((d) => `${d.day}: ${d.hours}`).join(" · ");
}

export function ContactInfoSection() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    getSiteConfig()
      .then((c) => setConfig(c))
      .catch(() => setConfig(null));
  }, []);

  const phone = config?.phone?.trim() || FALLBACK.phone;
  const whatsapp = config?.whatsapp?.trim() || FALLBACK.whatsapp;
  const email = config?.email?.trim() || FALLBACK.email;
  const location = config?.location?.trim() || FALLBACK.location;
  const hours = formatWorkingDays(config?.workingDays);

  const items = [
    { icon: FaPhone, heading: "Phone", details: phone, href: null as string | null },
    { icon: FaWhatsapp, heading: "WhatsApp", details: `${whatsapp} – Quick enquiry`, href: null },
    { icon: FaEnvelope, heading: "Email", details: email, href: `mailto:${email}` },
    { icon: FaMapMarkerAlt, heading: "Office", details: location, href: null },
    { icon: FaClock, heading: "Hours", details: hours, href: null },
  ];

  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isLastRow = index >= 3;
            return (
              <div
                key={item.heading}
                className={`border border-soft-divider-line bg-secondary-background p-6 ${isLastRow ? "lg:col-span-3" : "lg:col-span-2"}`}
              >
                <span className="inline-block text-primary-gold" aria-hidden>
                  <Icon className="text-2xl" />
                </span>
                <h3 className="mt-4 text-heading-h4 font-bold text-main-text-headlines">
                  {item.heading}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-2 block text-body text-secondary-text-body-paragraphs hover:text-primary-gold transition-colors"
                  >
                    {item.details}
                  </a>
                ) : (
                  <p className="mt-2 text-body text-secondary-text-body-paragraphs">
                    {item.details}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
