export interface User {
	email: string | null;
}

const ALLOWED_ADMIN_EMAILS: string[] = [];

export function isAdminEmail(email: string | null): boolean {
	if (!email) return false;
	if (!ALLOWED_ADMIN_EMAILS.length) return true;
	return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function signIn(email: string, password: string) {
	void password;
	const user: User = { email: email || null };
	if (!isAdminEmail(user.email)) {
		throw new Error(
			"Access denied. You are not authorized to access this resource.",
		);
	}
	return user;
}

export async function signOut() {
	return Promise.resolve();
}

export function onAuthChange(callback: (user: User | null) => void) {
	callback({ email: "admin@local" });
	return () => {};
}
