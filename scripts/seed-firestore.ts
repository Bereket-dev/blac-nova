import { config } from "dotenv";
import { resolve } from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { seedCategories, seedProjects, seedTestimonials } from "../src/lib/seed-data";

config({ path: resolve(process.cwd(), ".env.local"), override: true });
config({ path: resolve(process.cwd(), ".env"), override: true });

function initAdmin() {
  if (getApps().length) return getApps()[0]!;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials in .env.local (NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).",
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

async function seed() {
  initAdmin();
  const db = getFirestore();

  const categoriesSnap = await db.collection("categories").limit(1).get();
  const projectsSnap = await db.collection("projects").limit(1).get();
  const testimonialsSnap = await db.collection("testimonials").limit(1).get();

  if (!categoriesSnap.empty && !projectsSnap.empty && !testimonialsSnap.empty) {
    console.log("Firestore already has categories, projects and testimonials — skipping seed.");
    return;
  }

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

  if (projectsSnap.empty) {
    const batch = db.batch();
    for (const project of seedProjects) {
      batch.set(db.collection("projects").doc(project.slug), project);
    }
    await batch.commit();
    console.log(`Seeded ${seedProjects.length} projects.`);
  } else {
    console.log("Projects already present — skipping projects.");
  }

  if (testimonialsSnap.empty) {
    const batch = db.batch();
    for (const testimonial of seedTestimonials) {
      batch.set(db.collection("testimonials").doc(testimonial.id), testimonial);
    }
    await batch.commit();
    console.log(`Seeded ${seedTestimonials.length} testimonials.`);
  } else {
    console.log("Testimonials already present — skipping testimonials.");
  }

  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
