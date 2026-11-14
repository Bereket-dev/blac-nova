import "server-only";
import { createRequire } from "node:module";

// Turbopack statically scans string literals for package specifiers and emits
// them as externals — sync (x/externalRequire) for require(), async (y/externalImport)
// for import(). Either path breaks on Vercel's Lambda when the specifier resolves
// to an ESM-only package (jose/jwks-rsa) because:
//   - sync: ERR_REQUIRE_ESM
//   - async: the mangled hashed ID ("firebase-admin-<hash>/auth") doesn't exist in node_modules
//
// Fix: build the specifier strings at runtime from fragments so Turbopack's
// static scanner never sees the full "firebase-admin/X" string. Node resolves
// them fine at runtime; createRequire forces the "require" condition in
// firebase-admin's exports map → CJS build → no jose/jwks-rsa.

const _pkg = ["firebase", "admin"].join("-"); // "firebase-admin"
const req = createRequire(import.meta.url);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function load(sub: string): any {
  return req(`${_pkg}/${sub}`);
}

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

  const { cert, getApps, initializeApp } = load("app");

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
  const { getFirestore } = load("firestore");
  return getFirestore(getAdminApp());
}

export function getAdminAuth() {
  const { getAuth } = load("auth");
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
