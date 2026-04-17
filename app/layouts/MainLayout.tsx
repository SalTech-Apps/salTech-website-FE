import { Outlet } from "react-router-dom";
import { AppHeader } from "@/components/app-header/AppHeader";
import { AppFooter } from "@/components/app-footer/AppFooter";
import { FloatingWhatsAppWidget } from "@/components/common";

export function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-main-background overflow-x-clip">
      <a
        href="#main-content"
        className="absolute -left-[9999px] focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded focus-visible:bg-primary-gold focus-visible:px-4 focus-visible:py-2 focus-visible:text-main-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
      >
        Skip to main content
      </a>
      <AppHeader />
      <main id="main-content" className="flex-1 pt-16">
        <Outlet />
      </main>
      <AppFooter />
      <FloatingWhatsAppWidget />
    </div>
  );
}

export default MainLayout;
