import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Testimonial } from "./types";
import { getAdminDb, isAdminConfigured } from "./firebase/admin";
// import { reviews } from "./data";

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

/** Returns testimonials ordered by `order` asc. Falls back to static data if Firestore is unavailable. */
export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("testimonials");

  if (!isAdminConfigured()) return staticFallback();

  try {
    const db = getAdminDb();
    const snap = await db.collection("testimonials").orderBy("order", "asc").get();
    if (snap.empty) return staticFallback();
    return snap.docs.map((doc) =>
      mapTestimonial(doc.id, doc.data() as Record<string, unknown>),
    );
  } catch {
    return staticFallback();
  }
}

function staticFallback(): Testimonial[] {
  return reviews.map((r, i) => ({
    id: r.name.toLowerCase().replace(/\s+/g, "-"),
    quote: r.quote,
    name: r.name,
    role: r.role,
    avatar: r.avatar,
    sex: "male" as Testimonial["sex"],
    order: i + 1,
    featured: i === 0,
  }));
}
