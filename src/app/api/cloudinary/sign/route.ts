import { NextResponse } from "next/server";
import { createUploadSignature } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const { getAdminAuth, isAdminConfigured } = await import(
      "@/lib/firebase/admin"
    );

    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: "Firebase Admin is not configured" },
        { status: 500 },
      );
    }

    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : "";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await (await getAdminAuth()).verifyIdToken(token);
    } catch (error) {
      console.error("Cloudinary sign auth error", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary is not configured" },
        { status: 500 },
      );
    }

    const signed = createUploadSignature({});
    return NextResponse.json(signed);
  } catch (error) {
    console.error("Cloudinary sign error", error);
    const message =
      error instanceof Error ? error.message : "Failed to sign upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
