/**
 * Merge polished EN/AM copy + enhanced Cloudinary images into live project docs.
 * Does not wipe unrelated fields. Run: npx tsx scripts/update-project-copy.ts
 */
import { config } from "dotenv";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { seedProjects } from "../src/lib/seed-data";

config({ path: resolve(process.cwd(), ".env.local"), override: true });
config({ path: resolve(process.cwd(), ".env"), override: true });

function initAdmin() {
  if (getApps().length) return getApps()[0]!;

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = (
    process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_ADMIN_PRIVATE_KEY
  )?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin credentials in .env.local");
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

function configureCloudinary() {
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error("Missing Cloudinary credentials in .env.local");
  }
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
}

async function uploadLocalImage(localPath: string, publicId: string) {
  const absolute = resolve(process.cwd(), localPath.replace(/^\//, "public/"));
  if (!existsSync(absolute)) {
    throw new Error(`Local image missing: ${absolute}`);
  }
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER ?? "blac-nova/projects";
  const result = await cloudinary.uploader.upload(absolute, {
    folder,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  return {
    url: result.secure_url as string,
    publicId: result.public_id as string,
  };
}

function stripUndefined(data: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined && v !== ""),
  );
}

async function main() {
  initAdmin();
  configureCloudinary();
  const db = getFirestore();

  for (const project of seedProjects) {
    if (!project.image.startsWith("/designs/")) {
      throw new Error(`${project.slug} image must be a local /designs path`);
    }

    console.log(`Uploading ${project.slug} ← ${project.image}`);
    const { url, publicId } = await uploadLocalImage(project.image, project.slug);
    console.log(`  → ${url}`);

    const patch = stripUndefined({
      title: project.title,
      title_am: project.title_am,
      location: project.location,
      location_am: project.location_am,
      category: project.category,
      categoryId: project.categoryId,
      area: project.area,
      year: project.year,
      alt: project.alt,
      summary: project.summary,
      summary_am: project.summary_am,
      description: project.description,
      description_am: project.description_am,
      approach: project.approach,
      approach_am: project.approach_am,
      scope: project.scope,
      materials: project.materials,
      details: project.details,
      status: project.status,
      status_am: project.status_am,
      isOngoing: project.isOngoing === true,
      order: project.order,
      published: project.published !== false,
      image: url,
      imagePublicId: publicId,
      index: project.index,
      collaborator: project.collaborator,
    });

    await db.collection("projects").doc(project.slug).set(patch, { merge: true });
    console.log(`  merged Firestore doc ${project.slug}`);
  }

  console.log("Done — project copy + enhanced images updated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
