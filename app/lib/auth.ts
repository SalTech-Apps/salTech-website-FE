import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebase.client";

/** Comma-separated list from VITE_ADMIN_EMAILS, or fallback defaults. */
function getAllowedAdminEmails(): string[] {
  const env = import.meta.env.VITE_ADMIN_EMAILS;
  if (typeof env === "string" && env.trim()) {
    return env.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  }
  return [
    "emmajnr1000@gmail.com",
    "olubiyoolamide@gmail.com",
  ];
}

const ALLOWED_ADMIN_EMAILS = getAllowedAdminEmails();

export function isAdminEmail(email: string | null): boolean {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function signIn(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  if (!isAdminEmail(credential.user.email)) {
    await firebaseSignOut(auth);
    throw new Error(
      "Access denied. You are not authorized to access this resource.",
    );
  }
  return credential.user;
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
