export const requireEnv = (name: string): string => {
	const value = process.env[name];
	if (!value) {
		throw new Error(
			`[firebase-admin] Missing required environment variable: ${name}`,
		);
	}
	return value;
};
