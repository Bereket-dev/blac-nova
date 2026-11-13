import { NextResponse } from "next/server";
import { createUploadSignature } from "@/lib/cloudinary";
import { getAdminAuth, isAdminConfigured } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: "Firebase Admin is not configured" },
        { status: 500 },
      );
    }

    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : "";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await getAdminAuth().verifyIdToken(token);

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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
