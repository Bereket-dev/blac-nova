import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function readPrivateKey(): string | undefined {
  const raw =
    process.env.FIREBASE_PRIVATE_KEY ?? process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!raw) return undefined;

  let key = raw.trim();

  // Vercel / dotenv sometimes wrap the value in quotes
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Common paste formats: literal \n, real newlines, or escaped \\n
  key = key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");

  return key.trim();
}

function getAdminApp(): App {
  if (getApps().length) return getApps()[0]!;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  // Accept both naming conventions (FIREBASE_CLIENT_EMAIL and FIREBASE_ADMIN_CLIENT_EMAIL)
  const clientEmail = (
    process.env.FIREBASE_CLIENT_EMAIL ??
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  )?.trim();
  const privateKey = readPrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL (or FIREBASE_ADMIN_CLIENT_EMAIL), and FIREBASE_PRIVATE_KEY (or FIREBASE_ADMIN_PRIVATE_KEY).",
    );
  }

  if (!privateKey.includes("BEGIN") || !privateKey.includes("PRIVATE KEY")) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY looks malformed (expected a PEM private key). On Vercel, paste the full key with \\n for newlines.",
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
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() &&
      (process.env.FIREBASE_CLIENT_EMAIL ?? process.env.FIREBASE_ADMIN_CLIENT_EMAIL)?.trim() &&
      (process.env.FIREBASE_PRIVATE_KEY ?? process.env.FIREBASE_ADMIN_PRIVATE_KEY)?.trim(),
  );
}
