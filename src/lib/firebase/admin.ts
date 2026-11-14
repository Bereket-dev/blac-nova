import "server-only";

// firebase-admin and its transitive deps (jwks-rsa → jose) are ESM-only.
// Static top-level imports cause Turbopack/webpack to bundle them under CJS,
// which breaks with ERR_REQUIRE_ESM. Dynamic import() defers resolution to
// Node.js at runtime, bypassing the bundler entirely.

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

// Lazily initialized — created once per process, reused on subsequent calls.
let _appPromise: Promise<import("firebase-admin/app").App> | null = null;

async function getAdminApp(): Promise<import("firebase-admin/app").App> {
  if (_appPromise) return _appPromise;

  _appPromise = (async () => {
    const { cert, getApps, initializeApp } = await import("firebase-admin/app");

    if (getApps().length) return getApps()[0]!;

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

    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  })();

  return _appPromise;
}

export async function getAdminDb() {
  const { getFirestore } = await import("firebase-admin/firestore");
  return getFirestore(await getAdminApp());
}

export async function getAdminAuth() {
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth(await getAdminApp());
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
