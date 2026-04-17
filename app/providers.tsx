import { StrictMode, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./index.css";
import { Provider as JotaiProvider } from "jotai";
import { initPwaClient } from "@/lib/pwa.client";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPwaClient();
  }, []);

  return (
    <JotaiProvider>
      <StrictMode>
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </StrictMode>{" "}
    </JotaiProvider>
  );
}
