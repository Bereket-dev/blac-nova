import { config } from "dotenv";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { seedCategories, seedProjects, seedTestimonials } from "../src/lib/seed-data";
import type { Project } from "../src/lib/types";

config({ path: resolve(process.cwd(), ".env.local"), override: true });
config({ path: resolve(process.cwd(), ".env"), override: true });

const force = process.argv.includes("--force");

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
    throw new Error(
      "Missing Firebase Admin credentials in .env.local (NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).",
    );
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
    throw new Error(
      "Missing Cloudinary credentials in .env.local (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).",
    );
  }

  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
}

function stripUndefined<T extends Record<string, unknown>>(data: T): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined && v !== ""),
  );
}

async function uploadLocalImage(localPath: string, publicId: string) {
  const absolute = resolve(process.cwd(), localPath.replace(/^\//, "public/"));
  if (!existsSync(absolute)) {
    throw new Error(`Local image missing for upload: ${absolute}`);
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

async function uploadProjects(): Promise<Project[]> {
  const uploaded: Project[] = [];

  for (const project of seedProjects) {
    if (!project.image.startsWith("/designs/")) {
      throw new Error(
        `Project ${project.slug} image must be a local /designs path before Cloudinary upload (got ${project.image}).`,
      );
    }

    console.log(`Uploading ${project.slug} ← ${project.image}`);
    const { url, publicId } = await uploadLocalImage(project.image, project.slug);
    uploaded.push({
      ...project,
      image: url,
      imagePublicId: publicId,
    });
    console.log(`  → ${url}`);
  }

  return uploaded;
}

async function uploadTestimonials() {
  const uploaded = [];

  for (const testimonial of seedTestimonials) {
    if (!testimonial.avatar.startsWith("/designs/")) {
      uploaded.push(testimonial);
      continue;
    }

    console.log(`Uploading avatar ${testimonial.id} ← ${testimonial.avatar}`);
    const { url } = await uploadLocalImage(
      testimonial.avatar,
      `avatars/${testimonial.id}`,
    );
    uploaded.push({ ...testimonial, avatar: url });
    console.log(`  → ${url}`);
  }

  return uploaded;
}

async function seed() {
  initAdmin();
  configureCloudinary();
  const db = getFirestore();

  const categoriesSnap = await db.collection("categories").limit(1).get();
  const projectsSnap = await db.collection("projects").limit(1).get();
  const testimonialsSnap = await db.collection("testimonials").limit(1).get();

  if (categoriesSnap.empty) {
    const batch = db.batch();
    for (const category of seedCategories) {
      batch.set(db.collection("categories").doc(category.id), category);
    }
    await batch.commit();
    console.log(`Seeded ${seedCategories.length} categories.`);
  } else {
    console.log("Categories already present — skipping categories.");
  }

  const shouldSeedProjects = projectsSnap.empty || force;
  if (shouldSeedProjects) {
    const projects = await uploadProjects();
    const batch = db.batch();
    for (const project of projects) {
      batch.set(
        db.collection("projects").doc(project.slug),
        stripUndefined(project as unknown as Record<string, unknown>),
        { merge: true },
      );
    }
    await batch.commit();
    console.log(
      `${force && !projectsSnap.empty ? "Updated" : "Seeded"} ${projects.length} projects with Cloudinary images.`,
    );
  } else {
    console.log("Projects already present — skipping (pass --force to re-upload).");
  }

  const shouldSeedTestimonials = testimonialsSnap.empty || force;
  if (shouldSeedTestimonials) {
    const testimonials = await uploadTestimonials();
    const batch = db.batch();
    for (const testimonial of testimonials) {
      batch.set(
        db.collection("testimonials").doc(testimonial.id),
        stripUndefined(testimonial as unknown as Record<string, unknown>),
        { merge: true },
      );
    }
    await batch.commit();
    console.log(
      `${force && !testimonialsSnap.empty ? "Updated" : "Seeded"} ${testimonials.length} testimonials.`,
    );
  } else {
    console.log("Testimonials already present — skipping (pass --force to re-upload).");
  }

  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
