import { useEffect, useState } from "react";
import { getSiteConfig, isGoogleMapsEmbedUrl } from "@/lib/siteConfig";

/** Used when Site Configuration has no map URL or an invalid value. */
const DEFAULT_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d644.8086492252155!2d3.553369904984004!3d6.449428241586278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf72f477bb401%3A0xc832251c93182f1d!2sMega%20Chicken%20Restaurant%20Ltd!5e0!3m2!1sen!2sng!4v1776153859304!5m2!1sen!2sng";

function mapSrcFromConfig(url: string | undefined): string {
  const trimmed = url?.trim();
  if (trimmed && isGoogleMapsEmbedUrl(trimmed)) return trimmed;
  return DEFAULT_MAP_EMBED_URL;
}

export function ContactMapSection() {
  const [mapSrc, setMapSrc] = useState<string>(DEFAULT_MAP_EMBED_URL);

  useEffect(() => {
    getSiteConfig()
      .then((c) => setMapSrc(mapSrcFromConfig(c?.mapEmbedUrl)))
      .catch(() => setMapSrc(DEFAULT_MAP_EMBED_URL));
  }, []);

  return (
    <section className="border-t border-soft-divider-line bg-main-background py-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[320px] w-full overflow-hidden rounded-lg border border-soft-divider-line bg-secondary-background">
          <iframe
            src={mapSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google map showing Jesfem location"
          />
        </div>
      </div>
    </section>
  );
}
