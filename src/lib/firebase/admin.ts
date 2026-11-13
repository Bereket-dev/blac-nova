import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  if (getApps().length) return getApps()[0]!;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  // Accept both naming conventions (FIREBASE_CLIENT_EMAIL and FIREBASE_ADMIN_CLIENT_EMAIL)
  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ?? process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey =
    process.env.FIREBASE_PRIVATE_KEY ?? process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  const privateKey = rawKey?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL (or FIREBASE_ADMIN_CLIENT_EMAIL), and FIREBASE_PRIVATE_KEY (or FIREBASE_ADMIN_PRIVATE_KEY).",
    );
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      (process.env.FIREBASE_CLIENT_EMAIL ?? process.env.FIREBASE_ADMIN_CLIENT_EMAIL) &&
      (process.env.FIREBASE_PRIVATE_KEY ?? process.env.FIREBASE_ADMIN_PRIVATE_KEY),
  );
}
