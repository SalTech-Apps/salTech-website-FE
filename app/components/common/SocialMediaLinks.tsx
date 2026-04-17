import { FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { SiteConfig } from "@/types/firestore";

export function hasSocialMediaLinks(config: SiteConfig | null | undefined): boolean {
  if (!config) return false;
  return !!(
    config.facebook?.trim() ||
    config.instagram?.trim() ||
    config.tiktok?.trim() ||
    config.x?.trim() ||
    config.linkedin?.trim() ||
    config.whatsappChannel?.trim()
  );
}

type SocialMediaLinksProps = {
  siteConfig: SiteConfig | null;
  iconSize?: number;
  className?: string;
};

export function SocialMediaLinks({
  siteConfig,
  iconSize = 28,
  className = "flex items-center gap-3",
}: SocialMediaLinksProps) {
  if (!hasSocialMediaLinks(siteConfig)) return null;

  const c = siteConfig!;

  return (
    <div className={className}>
      {c.facebook?.trim() && (
        <a
          href={c.facebook.trim()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-main-text-headlines hover:text-primary-gold transition-colors"
        >
          <FaFacebook size={iconSize} />
        </a>
      )}
      {c.instagram?.trim() && (
        <a
          href={c.instagram.trim()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-main-text-headlines hover:text-primary-gold transition-colors"
        >
          <FaInstagram size={iconSize} />
        </a>
      )}
      {c.tiktok?.trim() && (
        <a
          href={c.tiktok.trim()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-main-text-headlines hover:text-primary-gold transition-colors"
        >
          <FaTiktok size={iconSize} />
        </a>
      )}
      {c.x?.trim() && (
        <a
          href={c.x.trim()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="text-main-text-headlines hover:text-primary-gold transition-colors"
        >
          <FaXTwitter size={iconSize} />
        </a>
      )}
      {c.linkedin?.trim() && (
        <a
          href={c.linkedin.trim()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-main-text-headlines hover:text-primary-gold transition-colors"
        >
          <FaLinkedinIn size={iconSize} />
        </a>
      )}
      {c.whatsappChannel?.trim() && (
        <a
          href={c.whatsappChannel.trim()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp channel"
          className="text-main-text-headlines hover:text-primary-gold transition-colors"
        >
          <FaWhatsapp size={iconSize} />
        </a>
      )}
    </div>
  );
}
