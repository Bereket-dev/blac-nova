import { createHash } from "node:crypto";

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

/** Cloudinary signed upload params — pure Node crypto (no SDK in the serverless bundle). */
export function createUploadSignature(params: {
  folder?: string;
  timestamp?: number;
}) {
  const cloudName = requiredEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
  const apiKey = requiredEnv("CLOUDINARY_API_KEY");
  const apiSecret = requiredEnv("CLOUDINARY_API_SECRET");
  const timestamp = params.timestamp ?? Math.floor(Date.now() / 1000);
  const folder =
    params.folder ?? process.env.CLOUDINARY_UPLOAD_FOLDER ?? "blac-nova/projects";

  // Cloudinary api_sign_request: sort params as key=value&, append API secret,
  // then SHA-1 hex digest (NOT HMAC).
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(toSign).digest("hex");

  return {
    timestamp,
    folder,
    signature,
    cloudName,
    apiKey,
  };
}

/** Optional helper kept for scripts that still use the Cloudinary SDK. */
export function cloudinaryPublicIdHash(input: string): string {
  return createHash("sha1").update(input).digest("hex").slice(0, 12);
}
