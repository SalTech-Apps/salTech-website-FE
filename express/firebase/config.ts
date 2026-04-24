import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { requireEnv } from "../utils/requireEnv.ts";

const firebaseConfig = {
	apiKey: requireEnv("FIREBASE_API_KEY"),
	authDomain: requireEnv("FIREBASE_AUTH_DOMAIN"),
	projectId: requireEnv("PROJECT_ID"),
	storageBucket: requireEnv("STORAGE_BUCKET"),
	messagingSenderId: requireEnv("MESSAGING_SENDER_ID"),
	appId: requireEnv("APP_ID"),
	measurementId: requireEnv("MEASUREMENT_ID"),
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);
