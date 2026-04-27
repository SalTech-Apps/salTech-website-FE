import { firebaseAdminDb } from "../firebase/admin-db.ts";

export const getUserById = async (uid: string) => {
	const snapshot = await firebaseAdminDb.collection("users").doc(uid).get();

	if (!snapshot.exists) return null;

	return snapshot.data();
};

export type LoginDto = {
	email: string;
	password: string;
};
