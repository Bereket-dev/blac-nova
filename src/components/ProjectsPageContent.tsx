"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";
import { useUi } from "@/lib/language";
import { FadeIn } from "./FadeIn";
import { ProjectCard } from "./ProjectCard";

export function ProjectsPageContent({ projects }: { projects: Project[] }) {
  const ui = useUi();
  const copy = ui.projectsPage;

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <FadeIn>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-ink-900/40" />
            <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
              {copy.eyebrow}
            </span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
            <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.015em] text-ink-900 font-light text-balance max-w-3xl">
              {copy.headlineBefore} <span className="italic">{copy.headlineItalic}</span>
              {copy.headlineAfter}
            </h1>
            <p className="text-sm md:text-base text-ink-900/60 max-w-sm font-light leading-relaxed">
              {copy.body}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {projects.map((project, i) => (
            <FadeIn key={project.slug} delayMs={Math.min(i, 4) * 60}>
              <ProjectCard project={project} eager={i < 3} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delayMs={100} className="mt-16 flex justify-center">
          <Link
            href="/about#inquire"
            className="inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-ink-900 hover:text-terracotta-500 transition-colors"
          >
            {copy.discuss}
            <i className="ri-arrow-right-line" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
