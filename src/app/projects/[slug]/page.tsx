import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectDetail } from "@/components/ProjectDetail";
import { getOtherProjects, getProject, projects } from "@/lib/data";

type ProjectPageProps = PageProps<"/projects/[slug]">;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project — Blac Nova" };
  }
  return {
    title: `${project.title} — Blac Nova`,
    description: project.summary,
  };
}

function ProjectDetailFallback() {
  return (
    <div className="pt-28 md:pt-32 pb-24 px-6 md:px-10 lg:px-14 max-w-7xl mx-auto">
      <div className="h-3 w-28 bg-bone-200 rounded-full mb-8" />
      <div className="h-12 md:h-16 w-2/3 max-w-xl bg-bone-200 rounded-lg mb-6" />
      <div className="h-5 w-full max-w-lg bg-bone-200 rounded mb-10" />
      <div className="aspect-[16/10] w-full bg-bone-200 rounded-2xl shimmer" />
    </div>
  );
}

async function ProjectPageContent({
  params,
}: Pick<ProjectPageProps, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} others={getOtherProjects(slug)} />;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <main className="bg-bone-50 text-ink-900 overflow-hidden">
      <Header solid />
      <Suspense fallback={<ProjectDetailFallback />}>
        <ProjectPageContent params={params} />
      </Suspense>
      <Footer />
    </main>
  );
}
