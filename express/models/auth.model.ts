import "dotenv/config";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { requireEnv } from "../utils/requireEnv.ts";

function getPrivateKey(): string {
	return requireEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function getAdminDb() {
	const app =
		getApps()[0] ??
		initializeApp({
			credential: cert({
				projectId: requireEnv("FIREBASE_PROJECT_ID"),
				clientEmail: requireEnv("FIREBASE_CLIENT_EMAIL"),
				privateKey: getPrivateKey(),
			}),
		});

	return getFirestore(app);
}

const firebaseAdminDb = getAdminDb();

export const getUserById = async (uid: string) => {
	const snapshot = await firebaseAdminDb.collection("users").doc(uid).get();

	if (!snapshot.exists) return null;

	return snapshot.data();
};
