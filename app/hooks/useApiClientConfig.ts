import { useEffect } from "react";

import { client } from "@/client/client.gen";

export const AUTH_TOKEN_STORAGE_KEY = "admin_token";
const JWT_EXPIRY_SKEW_MS = 5_000;

let cachedAuthToken: string | null = null;
let tokenStoreHydrated = false;

function isBrowser(): boolean {
	return typeof window !== "undefined";
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
	const segments = token.split(".");
	if (segments.length < 2) return null;
	try {
		const base64 = segments[1].replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
		const decoded = atob(padded);
		const payload = JSON.parse(decoded) as unknown;

		if (payload && typeof payload === "object") {
			return payload as Record<string, unknown>;
		}
		return null;
	} catch {
		return null;
	}
}

function isTokenExpired(token: string): boolean {
	const payload = decodeJwtPayload(token);
	const expValue = payload?.exp;
	if (typeof expValue !== "number") return false;
	const expiresAt = expValue * 1000;
	return expiresAt <= Date.now() + JWT_EXPIRY_SKEW_MS;
}

function persistToken(token: string | null): void {
	if (!isBrowser()) return;
	if (!token) {
		window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
		return;
	}
	window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function setAuthTokenInStore(token: string | null): void {
	tokenStoreHydrated = true;
	cachedAuthToken = token;
	persistToken(token);
}

export function getAuthTokenFromStore(): string | null {
	if (!isBrowser()) return cachedAuthToken;

	if (!tokenStoreHydrated) {
		tokenStoreHydrated = true;
		cachedAuthToken = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
	}

	if (!cachedAuthToken) {
		return null;
	}

	if (isTokenExpired(cachedAuthToken)) {
		setAuthTokenInStore(null);
		return null;
	}

	return cachedAuthToken;
}

function getBaseUrl(): string {
	return import.meta.env.VITE_API_URL || "http://localhost:8081";
}

export function configureApiClient(authToken?: string | null): void {
	if (typeof authToken !== "undefined") {
		setAuthTokenInStore(authToken);
	}
	if (typeof authToken === "undefined") {
		getAuthTokenFromStore();
	}
	client.setConfig({
		baseURL: getBaseUrl(),
		withCredentials: true,
		auth: async () => getAuthTokenFromStore() ?? undefined,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
}

export function useApiClientConfig(token?: string | null): void {
	useEffect(() => {
		const resolvedToken = token ?? getAuthTokenFromStore();
		if (typeof token !== "undefined") {
			setAuthTokenInStore(token);
		}
		configureApiClient(resolvedToken);
	}, [token]);

	useEffect(() => {
		if (!isBrowser()) return;

		const handleStorage = (event: StorageEvent) => {
			if (event.key !== AUTH_TOKEN_STORAGE_KEY) return;
			cachedAuthToken = event.newValue;
			tokenStoreHydrated = true;
			configureApiClient(cachedAuthToken);
		};

		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);
}
