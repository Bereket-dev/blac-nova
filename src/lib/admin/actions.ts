"use server";

import { updateTag } from "next/cache";

/** Call after any project create / update / delete in the admin panel. */
export async function revalidateProjects(slug?: string) {
  updateTag("projects");
  if (slug) updateTag(`project-${slug}`);
}

/** Call after any category create / update / delete in the admin panel. */
export async function revalidateCategories(id?: string) {
  updateTag("categories");
  if (id) updateTag(`category-${id}`);
}

/** Call after any testimonial create / update / delete in the admin panel. */
export async function revalidateTestimonials() {
  updateTag("testimonials");
}
