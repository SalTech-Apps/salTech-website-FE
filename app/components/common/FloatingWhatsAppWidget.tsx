import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "@digicroz/react-floating-whatsapp";
import { getSiteConfig } from "@/lib/siteConfig";

const FALLBACK_PHONE = "2340000000000";
const ACCOUNT_NAME = "Jesfem";

/** Convert site config WhatsApp string to digits-only international format (e.g. 2348012345678). */
function phoneNumberFromWhatsApp(whatsapp: string | undefined): string {
  if (!whatsapp?.trim()) return FALLBACK_PHONE;
  const digits = whatsapp.replace(/\D/g, "");
  return digits.length <= 10 ? `234${digits}` : digits;
}

export function FloatingWhatsAppWidget() {
  const [phoneNumber, setPhoneNumber] = useState(FALLBACK_PHONE);

  useEffect(() => {
    getSiteConfig()
      .then((c) => setPhoneNumber(phoneNumberFromWhatsApp(c?.whatsapp)))
      .catch(() => setPhoneNumber(FALLBACK_PHONE));
  }, []);

  // Fix: aria-hidden containers must not have focusable descendants (Lighthouse a11y)
  useEffect(() => {
    const focusableSelector =
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusableOrHiddenSelector =
      'a[href], button, textarea, input, select, [tabindex]';

    const updateFocusableInHidden = () => {
      // Set tabindex="-1" on focusables inside aria-hidden containers
      document.querySelectorAll("[aria-hidden='true']").forEach((el) => {
        el.querySelectorAll(focusableSelector).forEach((focusable) => {
          (focusable as HTMLElement).setAttribute("tabindex", "-1");
        });
      });
      // Restore focusability for elements no longer inside aria-hidden
      document.querySelectorAll(focusableOrHiddenSelector).forEach((focusable) => {
        const el = focusable as HTMLElement;
        if (el.closest("[aria-hidden='true']")) return;
        if (el.getAttribute("tabindex") === "-1") {
          el.removeAttribute("tabindex");
        }
      });
    };

    const observer = new MutationObserver(updateFocusableInHidden);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["aria-hidden"],
      subtree: true,
    });

    const t = setTimeout(updateFocusableInHidden, 1000);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return (
    <div aria-label="WhatsApp chat widget">
      <FloatingWhatsApp
      phoneNumber={phoneNumber}
      accountName={ACCOUNT_NAME}
      statusMessage="Typically replies within 24 hours"
      chatMessage="Hello! How can we help you today?"
      allowEsc={true}
      darkMode={true}
      notification={false}
      messageDelay={2}
      buttonClassName="!bg-primary-gold text-main-background after:shadow-none!"
    />
    </div>
  );
}
