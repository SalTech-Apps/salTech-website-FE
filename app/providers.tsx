import { StrictMode, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./index.css";
import { Provider as JotaiProvider } from "jotai";
import { registerPwaClient } from "@/lib/registerPwa";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerPwaClient();
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
