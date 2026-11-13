import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { ProjectCategory } from "./types";
import { getAdminDb, isAdminConfigured } from "./firebase/admin";

function mapCategory(id: string, data: Record<string, unknown>): ProjectCategory {
  return {
    id: (data.id as string) ?? id,
    label: (data.label as string) ?? "",
    description: (data.description as string) ?? "",
    order: typeof data.order === "number" ? data.order : 0,
  };
}

export async function getCategories(): Promise<ProjectCategory[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  if (!isAdminConfigured()) return [];

  const db = getAdminDb();
  const snap = await db.collection("categories").orderBy("order", "asc").get();
  return snap.docs.map((doc) =>
    mapCategory(doc.id, doc.data() as Record<string, unknown>),
  );
}

export async function getCategory(id: string): Promise<ProjectCategory | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories", `category-${id}`);

  if (!isAdminConfigured()) return undefined;

  const db = getAdminDb();
  const doc = await db.collection("categories").doc(id).get();
  if (!doc.exists) return undefined;
  return mapCategory(doc.id, doc.data()! as Record<string, unknown>);
}
