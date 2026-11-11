import "server-only";
import { getCategories } from "./categories";
import { getProjects } from "./projects";
import type { DesignCategory, DesignOption, Project } from "./types";

export function projectToDesign(project: Project): DesignOption {
  return {
    id: project.slug,
    slug: project.slug,
    categoryId: project.categoryId,
    title: project.title,
    location: project.location,
    tagline: project.summary,
    summary: project.description,
    details: project.details.length ? project.details : project.scope,
    materials: project.materials,
    area: project.area,
    year: project.year,
    image: project.image,
    alt: project.alt,
    project,
  };
}

export async function getDesignCategories(): Promise<DesignCategory[]> {
  const categories = await getCategories();
  return categories.map(({ id, label, description }) => ({
    id,
    label,
    description,
  }));
}

export async function getDesignCatalog(): Promise<DesignOption[]> {
  const projects = await getProjects();
  return projects.map(projectToDesign);
}

export async function getDesign(id: string): Promise<DesignOption | undefined> {
  const catalog = await getDesignCatalog();
  return catalog.find((design) => design.id === id || design.slug === id);
}

export function designsByCategory(
  designs: DesignOption[],
  categoryId: string,
): DesignOption[] {
  return designs.filter((design) => design.categoryId === categoryId);
}

export function findDesign(
  designs: DesignOption[],
  id: string,
): DesignOption | undefined {
  return designs.find((design) => design.id === id || design.slug === id);
}
