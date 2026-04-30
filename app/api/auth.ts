import {
	postApiAuthLogin,
	postApiAuthLogout,
	type LoginResponseData,
} from "@/client";
import {
	configureApiClient,
	setAuthTokenInStore,
} from "@/hooks/useApiClientConfig";

type LoginPayload = {
	email: string;
	password: string;
};

export async function loginWithPassword(
	payload: LoginPayload,
): Promise<LoginResponseData> {
	const response = await postApiAuthLogin({
		body: payload,
		throwOnError: true,
	});

	const loginData = response.data.data;
	setAuthTokenInStore(loginData.accessToken);
	configureApiClient(loginData.accessToken);

	return loginData;
}

export function clearAuthSession(): void {
	setAuthTokenInStore(null);
	configureApiClient(null);
}

export async function logoutWithRevoke(): Promise<void> {
	try {
		await postApiAuthLogout({ throwOnError: true });
	} finally {
		clearAuthSession();
	}
}
