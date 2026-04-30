import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { getUserById } from "../models/auth.model.ts";
import { firebaseAuth } from "../firebase/config.ts";
import { getFirebaseAdminApp } from "../firebase/admin-db.ts";
import type { LoginDto, LoginResponseData } from "../schemas/auth.schema.ts";

export const loginUser = async ({
	email,
	password,
}: LoginDto): Promise<LoginResponseData> => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			firebaseAuth,
			email,
			password,
		);

		const firebaseUser = userCredential.user;
		const accessToken = await firebaseUser.getIdToken();
		const idTokenResult = await firebaseUser.getIdTokenResult();
		const refreshToken = firebaseUser.refreshToken;

		const user = await getUserById(firebaseUser.uid);

		if (!user) {
			throw new Error("User profile not found");
		}

		return {
			accessToken,
			refreshToken,
			tokenType: "Bearer",
			expiresAt: idTokenResult.expirationTime,
			user: {
				uid: firebaseUser.uid,
				email: firebaseUser.email,
				...user,
			},
		};
	} catch (error) {
		console.error("[auth.service] loginUser error:", error);
		const message = error instanceof Error ? error.message : "Login failed";
		throw new Error(message);
	}
};

export async function verifyAccessToken(
	token: string,
): Promise<DecodedIdToken> {
	const auth = getAuth(getFirebaseAdminApp());

	return auth.verifyIdToken(token);
}

export async function logoutUser(uid: string): Promise<void> {
	const auth = getAuth(getFirebaseAdminApp());
	await auth.revokeRefreshTokens(uid);
}
