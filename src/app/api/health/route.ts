import { NextResponse } from "next/server";

/** Non-secret diagnostics for production env / admin wiring. */
export async function GET() {
  const present = (name: string) => Boolean(process.env[name]?.trim());

  const env = {
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: present("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    FIREBASE_CLIENT_EMAIL: present("FIREBASE_CLIENT_EMAIL"),
    FIREBASE_PRIVATE_KEY: present("FIREBASE_PRIVATE_KEY"),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: present("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
    CLOUDINARY_API_KEY: present("CLOUDINARY_API_KEY"),
    CLOUDINARY_API_SECRET: present("CLOUDINARY_API_SECRET"),
    TELEGRAM_BOT_TOKEN: present("TELEGRAM_BOT_TOKEN"),
    TELEGRAM_CHAT_ID: present("TELEGRAM_CHAT_ID"),
  };

  let admin: { ok: boolean; error?: string } = { ok: false };
  try {
    const { getAdminAuth, isAdminConfigured } = await import(
      "@/lib/firebase/admin"
    );
    if (!isAdminConfigured()) {
      admin = { ok: false, error: "not_configured" };
    } else {
      // Touch auth client without verifying a token
      getAdminAuth();
      admin = { ok: true };
    }
  } catch (error) {
    admin = {
      ok: false,
      error: error instanceof Error ? error.message : "admin_init_failed",
    };
  }

  let cloudinarySign: { ok: boolean; error?: string } = { ok: false };
  try {
    const { createUploadSignature } = await import("@/lib/cloudinary");
    createUploadSignature({ timestamp: 1 });
    cloudinarySign = { ok: true };
  } catch (error) {
    cloudinarySign = {
      ok: false,
      error: error instanceof Error ? error.message : "sign_failed",
    };
  }

  const ok = admin.ok && cloudinarySign.ok;
  return NextResponse.json(
    { ok, env, admin, cloudinarySign },
    { status: ok ? 200 : 500 },
  );
}
