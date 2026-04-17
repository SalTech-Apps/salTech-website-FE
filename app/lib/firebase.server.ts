/**
 * Server-side Firebase Admin for operations that need to run in Node (e.g. sitemap).
 *
 * Credentials (pick one):
 * 1. GOOGLE_APPLICATION_CREDENTIALS - path to service account JSON file
 * 2. FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY - from firebase-adminsdk service account
 * 3. On Firebase App Hosting/Cloud Run: Application Default Credentials (no config needed)
 */
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let _db: Firestore | null = null;

/** True when running on Cloud Run (App Hosting uses Cloud Run). */
const isGoogleCloudRun = !!process.env.K_SERVICE;

function getCredential(): ReturnType<typeof cert> | "use-adc" | null {
  // On Cloud Run/App Hosting: use ADC (service identity has Firestore access, no config needed)
  if (isGoogleCloudRun) {
    return "use-adc";
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return "use-adc"; // Use Application Default Credentials from file
  }
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Use explicit cert when valid service account credentials are provided (development)
  if (
    clientEmail &&
    privateKey &&
    (clientEmail.includes("firebase-adminsdk") ||
      clientEmail.includes("firebase-app-hosting-compute"))
  ) {
    return cert({
      projectId:
        process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    });
  }
  return null; // No credentials - avoid ADC lookup (causes timeout/error locally)
}

export function getServerDb(): Firestore | null {
  if (_db) return _db;
  const credential = getCredential();

  if (!credential) return null; // Skip Firebase when no credentials configured
  try {
    if (!getApps().length) {
      const projectId = process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
      initializeApp(
        credential === "use-adc"
          ? (projectId ? { projectId } : undefined)
          : { projectId: projectId || undefined, credential }
      );
    }
    const databaseId =
      process.env.VITE_FIREBASE_DATABASE_ID ||
      process.env.FIREBASE_DATABASE_ID ||
      "default";
    _db = getFirestore(databaseId);
    return _db;
  } catch {
    return null;
  }
}
