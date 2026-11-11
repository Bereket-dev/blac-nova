import { config } from "dotenv";
import { resolve } from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { seedCategories, seedProjects } from "../src/lib/seed-data";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

function initAdmin() {
  if (getApps().length) return getApps()[0]!;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials in .env.local (NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY).",
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

  if (!categoriesSnap.empty && !projectsSnap.empty) {
    console.log("Firestore already has categories and projects — skipping seed.");
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

  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
