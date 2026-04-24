import { signInWithEmailAndPassword } from "firebase/auth";
import { getUserById } from "../models/auth.model.ts";
import { firebaseAuth } from "../firebase/config.ts";

type LoginDto = {
	email: string;
	password: string;
};

export const loginUser = async ({ email, password }: LoginDto) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			firebaseAuth,
			email,
			password,
		);

		const firebaseUser = userCredential.user;

		const user = await getUserById(firebaseUser.uid);

		if (!user) {
			throw new Error("User profile not found");
		}

		return {
			uid: firebaseUser.uid,
			email: firebaseUser.email,
			...user,
		};
	} catch (error) {
		console.error("[auth.service] loginUser error:", error);
		const message = error instanceof Error ? error.message : "Login failed";
		throw new Error(message);
	}
};
