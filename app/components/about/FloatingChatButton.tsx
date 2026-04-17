import { FaCommentDots } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/2340000000000";

export function FloatingChatButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-gold text-main-background shadow-lg transition-colors hover:bg-soft-gold-hover-state focus:outline-none focus:ring-2 focus:ring-primary-gold/50"
      aria-label="Chat with us on WhatsApp"
    >
      <FaCommentDots className="text-xl" />
    </a>
  );
}
