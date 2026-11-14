import "server-only";
import { createRequire } from "node:module";

// firebase-admin's ESM entry pulls in jwks-rsa → jose (ESM-only).
// When Turbopack bundles `await import("firebase-admin/auth")` it mangles the
// specifier to a hashed ID (e.g. "firebase-admin-a14c8a5423a75469/auth") that
// only resolves inside the dev Turbopack runtime — not in Vercel's Lambda.
//
// createRequire forces Node to use the "require" condition in firebase-admin's
// package.json exports map, which points to the CJS build (./lib/auth/index.js),
// bypassing the ESM path entirely. Turbopack cannot statically analyze a
// require() call buried inside a function, so it never mangles the specifier.
const req = createRequire(import.meta.url);

function readPrivateKey(): string | undefined {
  const raw =
    process.env.FIREBASE_PRIVATE_KEY ?? process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!raw) return undefined;

  let key = raw.trim();

  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  key = key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
  return key.trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _app: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAdminApp(): any {
  if (_app) return _app;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cert, getApps, initializeApp } = req("firebase-admin/app") as any;

  if (getApps().length) {
    _app = getApps()[0];
    return _app;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
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

  _app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return _app;
}

export function getAdminDb() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { getFirestore } = req("firebase-admin/firestore") as any;
  return getFirestore(getAdminApp());
}

export function getAdminAuth() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { getAuth } = req("firebase-admin/auth") as any;
  return getAuth(getAdminApp());
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() &&
      (
        process.env.FIREBASE_CLIENT_EMAIL ??
        process.env.FIREBASE_ADMIN_CLIENT_EMAIL
      )?.trim() &&
      (
        process.env.FIREBASE_PRIVATE_KEY ??
        process.env.FIREBASE_ADMIN_PRIVATE_KEY
      )?.trim(),
  );
}
