import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Testimonial } from "./types";
import { getAdminDb, isAdminConfigured } from "./firebase/admin";

function mapTestimonial(id: string, data: Record<string, unknown>): Testimonial {
  return {
    id: (data.id as string) ?? id,
    quote: (data.quote as string) ?? "",
    name: (data.name as string) ?? "",
    role: (data.role as string) ?? "",
    avatar: (data.avatar as string) ?? "",
    sex: (["male", "female"].includes(data.sex as string)
      ? data.sex
      : "male") as Testimonial["sex"],
    order: typeof data.order === "number" ? data.order : 0,
    featured: data.featured === true,
  };
}

/** Returns testimonials from Firestore only, ordered by `order` asc. */
export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("testimonials");

  if (!isAdminConfigured()) return [];

  try {
    const db = getAdminDb();
    const snap = await db.collection("testimonials").orderBy("order", "asc").get();
    return snap.docs.map((doc) =>
      mapTestimonial(doc.id, doc.data() as Record<string, unknown>),
    );
  } catch {
    return [];
  }
}
