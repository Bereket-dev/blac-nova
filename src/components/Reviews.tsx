import { getTestimonials } from "@/lib/testimonials";
import type { Testimonial } from "@/lib/types";
import { ReviewsView } from "./ReviewsView";

export async function Reviews() {
  const testimonials = await getTestimonials();
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  if (!featured) return null;

  const rest = testimonials.filter((t) => t.id !== featured.id);
  return <ReviewsView featured={featured} rest={rest} />;
}

export type { Testimonial };
