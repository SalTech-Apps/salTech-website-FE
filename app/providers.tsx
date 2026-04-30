import { StrictMode, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./index.css";
import { Provider as JotaiProvider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerPwaClient } from "@/lib/registerPwa";
import { useApiClientConfig } from "@/hooks/useApiClientConfig";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	useApiClientConfig();

	useEffect(() => {
		registerPwaClient();
	}, []);

	return (
		<JotaiProvider>
			<StrictMode>
				<QueryClientProvider client={queryClient}>
					<HeroUIProvider>
						<NextThemesProvider attribute="class" defaultTheme="dark">
							{children}
						</NextThemesProvider>
					</HeroUIProvider>
				</QueryClientProvider>
			</StrictMode>{" "}
		</JotaiProvider>
	);
}
