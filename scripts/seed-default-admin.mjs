import "dotenv/config";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

function requireEnv(name) {
	const value = process.env[name];
	if (!value) {
		throw new Error(
			`[seed:admin] Missing required environment variable: ${name}`,
		);
	}
	return value;
}

function getPrivateKey() {
	return requireEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function getFirebaseAdminApp() {
	if (getApps().length) return getApps()[0];

	return initializeApp({
		credential: cert({
			projectId: requireEnv("FIREBASE_PROJECT_ID"),
			clientEmail: requireEnv("FIREBASE_CLIENT_EMAIL"),
			privateKey: getPrivateKey(),
		}),
	});
}

async function upsertDefaultAdmin() {
	const app = getFirebaseAdminApp();
	const auth = getAuth(app);
	const db = getFirestore(app);

	const email = requireEnv("DEFAULT_ADMIN_EMAIL").toLowerCase();
	const password = requireEnv("DEFAULT_ADMIN_PASSWORD");
	const displayName = process.env.DEFAULT_ADMIN_NAME || "Default Admin";

	let userRecord;

	try {
		userRecord = await auth.getUserByEmail(email);
		console.log(`[seed:admin] Found existing auth user for ${email}`);
		userRecord = await auth.updateUser(userRecord.uid, {
			email,
			password,
			displayName,
			emailVerified: true,
			disabled: false,
		});
	} catch (error) {
		if (error?.code !== "auth/user-not-found") {
			throw error;
		}

		userRecord = await auth.createUser({
			email,
			password,
			displayName,
			emailVerified: true,
			disabled: false,
		});
		console.log(`[seed:admin] Created auth user for ${email}`);
	}

	await auth.setCustomUserClaims(userRecord.uid, {
		admin: true,
		role: "admin",
	});

	const userDocRef = db.collection("users").doc(userRecord.uid);
	const existingUserDoc = await userDocRef.get();

	await userDocRef.set(
		{
			uid: userRecord.uid,
			email,
			displayName,
			role: "admin",
			isAdmin: true,
			status: "active",
			updatedAt: FieldValue.serverTimestamp(),
			...(existingUserDoc.exists
				? {}
				: { createdAt: FieldValue.serverTimestamp() }),
		},
		{ merge: true },
	);

	console.log(
		`[seed:admin] Firestore profile upserted at users/${userRecord.uid}`,
	);
	console.log(`[seed:admin] Admin ready for login: ${email}`);
}

upsertDefaultAdmin().catch((error) => {
	console.error("[seed:admin] Failed to seed default admin", error);
	process.exitCode = 1;
});
