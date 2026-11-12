// Server component wrapper — exports `instant = false` so Next.js skips
// instant-navigation validation for this auth-gated client page.
export const instant = false;

export { default } from "./ProjectsPageClient";
