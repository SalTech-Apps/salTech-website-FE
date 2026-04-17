import { IoChevronUp } from "react-icons/io5";
import { Button } from "@heroui/react";

export function ScrollToTopButton() {
  return (
    <Button
      radius="none"
      isIconOnly
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-40 rounded-full bg-primary-gold text-main-background hover:bg-soft-gold-hover-state shadow-lg md:right-12"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <IoChevronUp className="text-xl" />
    </Button>
  );
}
