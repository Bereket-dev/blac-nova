import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const ensureStatic = "navigation";
import { Header } from "@/components/Header";
import { ProjectsPageContent } from "@/components/ProjectsPageContent";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Houses, G+ buildings, guest houses, and compound works by Blac Nova Construction & Design.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="bg-bone-50 text-ink-900 overflow-hidden">
      <Header solid />
      <ProjectsPageContent projects={projects} />
      <Footer />
    </main>
  );
}
