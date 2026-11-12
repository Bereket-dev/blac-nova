import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Inquiry } from "@/components/Inquiry";
import { Marquee } from "@/components/Marquee";
import { Owner } from "@/components/Owner";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { ProjectFilm } from "@/components/ProjectFilm";
import { Reviews } from "@/components/Reviews";
import { getProjects } from "@/lib/projects";

// Thin async server wrapper — fetches projects (cached) then passes to the
// client carousel. Isolates the Suspense boundary so only the Projects section
// shows a skeleton, not the whole page.
async function ProjectsSection() {
  const projects = await getProjects();
  return <Projects projects={projects} />;
}

function ProjectsSkeleton() {
  return (
    <section className="relative bg-bone-50 py-24 md:py-32 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="h-8 w-2/3 max-w-lg bg-bone-200 rounded-lg mb-6 animate-pulse" />
        <div className="flex gap-6 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="shrink-0 w-[78vw] sm:w-[58vw] md:w-[44vw] lg:w-[30vw] aspect-[16/10] rounded-xl bg-bone-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSkeleton() {
  return (
    <section className="relative bg-bone-50 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="h-12 w-2/3 max-w-xl bg-bone-200 rounded-lg mb-8 animate-pulse" />
        <div className="h-28 w-full max-w-3xl bg-bone-200 rounded-xl animate-pulse" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-bone-50 text-ink-900 overflow-hidden">
      <Header />
      <Hero />
      <Marquee />
      <ProjectFilm />
      <Services />
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <Owner />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews />
      </Suspense>
      <Inquiry />
      <Footer />
    </main>
  );
}
