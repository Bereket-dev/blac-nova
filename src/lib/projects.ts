import "server-only";
import type { Project } from "./types";
import { getAdminDb, isAdminConfigured } from "./firebase/admin";

function mapProject(slug: string, data: Record<string, unknown>): Project {
  return {
    slug: (data.slug as string) ?? slug,
    title: (data.title as string) ?? "",
    location: (data.location as string) ?? "",
    category: (data.category as string) ?? "",
    categoryId: (data.categoryId as string) ?? "",
    index: (data.index as string) ?? "",
    collaborator: (data.collaborator as string) ?? "",
    area: (data.area as string) ?? "",
    year: (data.year as string) ?? "",
    image: (data.image as string) ?? "",
    imagePublicId: data.imagePublicId as string | undefined,
    alt: (data.alt as string) ?? "",
    summary: (data.summary as string) ?? "",
    description: (data.description as string) ?? "",
    approach: (data.approach as string) ?? "",
    scope: Array.isArray(data.scope) ? (data.scope as string[]) : [],
    materials: Array.isArray(data.materials) ? (data.materials as string[]) : [],
    details: Array.isArray(data.details) ? (data.details as string[]) : [],
    status: (data.status as string) ?? "",
    order: typeof data.order === "number" ? data.order : 0,
    published: data.published !== false,
  };
}

export async function getProjects(options?: {
  includeUnpublished?: boolean;
}): Promise<Project[]> {
  if (!isAdminConfigured()) return [];

  const db = getAdminDb();
  const snap = await db.collection("projects").orderBy("order", "asc").get();
  const projects = snap.docs.map((doc) =>
    mapProject(doc.id, doc.data() as Record<string, unknown>),
  );

  if (options?.includeUnpublished) return projects;
  return projects.filter((project) => project.published);
}

export async function getProject(
  slug: string,
  options?: { includeUnpublished?: boolean },
): Promise<Project | undefined> {
  if (!isAdminConfigured()) return undefined;

  const db = getAdminDb();
  const doc = await db.collection("projects").doc(slug).get();
  if (!doc.exists) return undefined;

  const project = mapProject(doc.id, doc.data()! as Record<string, unknown>);
  if (!options?.includeUnpublished && !project.published) return undefined;
  return project;
}

export async function getOtherProjects(slug: string): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.slug !== slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((project) => project.slug);
}
