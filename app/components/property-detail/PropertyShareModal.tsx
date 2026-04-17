import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import {
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { IoLink, IoMailOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const LG_MIN_WIDTH = "(min-width: 1024px)";

interface PropertyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
  location: string;
  price: string;
  imageUrl: string;
}

function shareSummaryText(title: string, location: string, price: string) {
  const parts = [title, location, price].filter(Boolean);
  return parts.join("\n");
}

export function PropertyShareModal({
  isOpen,
  onClose,
  shareUrl,
  title,
  location,
  price,
  imageUrl,
}: PropertyShareModalProps) {
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(LG_MIN_WIDTH);
    const apply = () => setIsLgUp(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const summary = shareSummaryText(title, location, price);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${summary}\n\n${shareUrl}`);
  const encodedDescription = encodeURIComponent(summary);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  }

  const rowClass =
    "flex w-full items-center gap-4 border-b border-soft-divider-line py-4 text-left text-base font-medium text-main-text-headlines transition-colors last:border-b-0 hover:bg-main-background/40";

  const iconWrapClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main-background text-muted-labels";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement={isLgUp ? "center" : "bottom-center"}
      size={isLgUp ? "md" : "full"}
      scrollBehavior="inside"
      backdrop="blur"
      classNames={{
        base: isLgUp
          ? "mb-0 max-h-[min(90dvh,640px)] border border-soft-divider-line bg-secondary-background"
          : "mb-0 max-h-[min(92dvh,720px)] rounded-t-xl rounded-b-none border-x-0 border-t border-b-0 border-soft-divider-line bg-secondary-background sm:rounded-t-2xl",
        body: "py-0",
        header: "flex flex-col gap-1 border-b border-soft-divider-line pb-4",
        closeButton: "text-main-text-headlines",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-center sm:text-center">
          <span className="w-full font-heading text-heading-h3 font-semibold text-main-text-headlines">
            Share this property
          </span>
        </ModalHeader>
        <ModalBody className="gap-0 px-6 pb-6">
          <div className="flex gap-4 border-b border-soft-divider-line py-5">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-soft-divider-line bg-main-background">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-labels">
                  No image
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="font-semibold text-main-text-headlines line-clamp-2">
                {title}
              </p>
              {location ? (
                <p className="text-sm text-muted-labels line-clamp-2">
                  {location}
                </p>
              ) : null}
              {price ? (
                <p className="text-sm text-muted-labels">{price}</p>
              ) : null}
            </div>
          </div>

          <nav aria-label="Share options" className="flex flex-col">
            <button type="button" className={rowClass} onClick={copyLink}>
              <span className={iconWrapClass}>
                <IoLink className="h-5 w-5" aria-hidden />
              </span>
              Copy link
            </button>
            <a
              href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}`}
              className={rowClass}
            >
              <span className={iconWrapClass}>
                <IoMailOutline className="h-5 w-5" aria-hidden />
              </span>
              Email
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-white">
                <FaFacebook className="h-5 w-5" aria-hidden />
              </span>
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main-text-headlines text-main-background">
                <FaXTwitter className="h-5 w-5" aria-hidden />
              </span>
              X
            </a>
            <a
              href={`https://wa.me/?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <FaWhatsapp className="h-5 w-5" aria-hidden />
              </span>
              WhatsApp
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(imageUrl)}&description=${encodedDescription}`}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E60023] text-white">
                <FaPinterest className="h-5 w-5" aria-hidden />
              </span>
              Pinterest
            </a>
          </nav>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
