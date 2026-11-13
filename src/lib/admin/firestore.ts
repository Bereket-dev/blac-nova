"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { getClientDb } from "@/lib/firebase/client";
import type { Project, ProjectCategory, Testimonial } from "@/lib/types";

export async function listCategoriesClient(): Promise<ProjectCategory[]> {
  const snap = await getDocs(
    query(collection(getClientDb(), "categories"), orderBy("order", "asc")),
  );
  return snap.docs.map((item) => {
    const data = item.data();
    return {
      id: (data.id as string) ?? item.id,
      label: (data.label as string) ?? "",
      description: (data.description as string) ?? "",
      order: typeof data.order === "number" ? data.order : 0,
    };
  });
}

export async function saveCategoryClient(category: ProjectCategory) {
  await setDoc(doc(getClientDb(), "categories", category.id), category, {
    merge: true,
  });
}

export async function deleteCategoryClient(id: string) {
  await deleteDoc(doc(getClientDb(), "categories", id));
}

export async function listProjectsClient(): Promise<Project[]> {
  const snap = await getDocs(
    query(collection(getClientDb(), "projects"), orderBy("order", "asc")),
  );
  return snap.docs.map((item) => {
    const data = item.data();
    return {
      slug: (data.slug as string) ?? item.id,
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
      isOngoing: data.isOngoing === true,
      order: typeof data.order === "number" ? data.order : 0,
      published: data.published !== false,
      title_am: data.title_am as string | undefined,
      location_am: data.location_am as string | undefined,
      summary_am: data.summary_am as string | undefined,
      description_am: data.description_am as string | undefined,
      approach_am: data.approach_am as string | undefined,
      status_am: data.status_am as string | undefined,
    } satisfies Project;
  });
}

export async function getProjectClient(slug: string): Promise<Project | null> {
  const snap = await getDoc(doc(getClientDb(), "projects", slug));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    slug: (data.slug as string) ?? snap.id,
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
    isOngoing: data.isOngoing === true,
    order: typeof data.order === "number" ? data.order : 0,
    published: data.published !== false,
    title_am: data.title_am as string | undefined,
    location_am: data.location_am as string | undefined,
    summary_am: data.summary_am as string | undefined,
    description_am: data.description_am as string | undefined,
    approach_am: data.approach_am as string | undefined,
    status_am: data.status_am as string | undefined,
  };
}

export async function saveProjectClient(project: Project) {
  // Firestore rejects undefined values — strip them before writing
  const data = Object.fromEntries(
    Object.entries(project).filter(([, v]) => v !== undefined && v !== ""),
  );
  await setDoc(doc(getClientDb(), "projects", project.slug), data, {
    merge: true,
  });
}

export async function deleteProjectClient(slug: string) {
  await deleteDoc(doc(getClientDb(), "projects", slug));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function listTestimonialsClient(): Promise<Testimonial[]> {
  const snap = await getDocs(
    query(collection(getClientDb(), "testimonials"), orderBy("order", "asc")),
  );
  return snap.docs.map((item) => {
    const data = item.data();
    return {
      id: (data.id as string) ?? item.id,
      quote: (data.quote as string) ?? "",
      name: (data.name as string) ?? "",
      role: (data.role as string) ?? "",
      avatar: (data.avatar as string) ?? "",
      sex: (["male", "female"].includes(data.sex as string)
        ? data.sex
        : "male") as Testimonial["sex"],
      order: typeof data.order === "number" ? data.order : 0,
      featured: data.featured === true,
    } satisfies Testimonial;
  });
}

export async function saveTestimonialClient(testimonial: Testimonial) {
  await setDoc(doc(getClientDb(), "testimonials", testimonial.id), testimonial, {
    merge: true,
  });
}

export async function deleteTestimonialClient(id: string) {
  await deleteDoc(doc(getClientDb(), "testimonials", id));
}
