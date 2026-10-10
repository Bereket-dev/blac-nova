import Link from "next/link";
import type { Project } from "@/lib/data";
import { FadeImage } from "./FadeImage";
import { FadeIn } from "./FadeIn";
import { ProjectCard } from "./ProjectCard";

type ProjectDetailProps = {
  project: Project;
  others: Project[];
};

export function ProjectDetail({ project, others }: ProjectDetailProps) {
  return (
    <>
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 bg-bone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[11px] tracking-widest-2 uppercase text-ink-900/55 hover:text-terracotta-500 transition-colors"
            >
              <i className="ri-arrow-left-line text-base" />
              All projects
            </Link>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-px bg-ink-900/40" />
                  <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
                    Project /{project.index} — {project.category}
                  </span>
                </div>
                <h1 className="font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.015em] text-ink-900 font-light text-balance">
                  {project.title}
                </h1>
                <p className="mt-5 text-ink-900/65 text-base md:text-lg font-light max-w-2xl leading-relaxed">
                  {project.summary}
                </p>
              </div>
              <div className="text-right">
                <div className="font-serif-display text-3xl text-ink-900">{project.value}</div>
                <div className="mt-1 text-[12px] tracking-wide text-ink-900/50">
                  {project.location}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delayMs={80} className="mt-10 md:mt-14">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bone-200">
              <FadeImage
                src={project.image}
                alt={project.alt}
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1200px"
                eager
              />
            </div>
          </FadeIn>

          <FadeIn delayMs={120}>
            <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-ink-900/10 py-8">
              {[
                { label: "Location", value: project.location },
                { label: "Year", value: project.year },
                { label: "Area", value: project.area },
                { label: "Status", value: project.status },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm md:text-base text-ink-900">{item.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28 bg-bone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <FadeIn className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-serif-display text-3xl md:text-4xl font-light text-ink-900">
                The brief
              </h2>
              <p className="mt-5 text-ink-900/70 leading-relaxed text-base md:text-[17px]">
                {project.description}
              </p>
            </div>
            <div>
              <h2 className="font-serif-display text-3xl md:text-4xl font-light text-ink-900">
                Approach
              </h2>
              <p className="mt-5 text-ink-900/70 leading-relaxed text-base md:text-[17px]">
                {project.approach}
              </p>
            </div>
          </FadeIn>

          <FadeIn delayMs={100} className="lg:col-span-5 space-y-10">
            <div>
              <h3 className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-4">
                Scope
              </h3>
              <ul className="space-y-3">
                {project.scope.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-ink-900/80"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-terracotta-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-4">
                Materials
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((material) => (
                  <span
                    key={material}
                    className="px-3 py-1.5 rounded-full border border-ink-900/10 text-[12px] tracking-wide text-ink-900/75"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-2">
                Lead
              </h3>
              <p className="text-sm text-ink-900">{project.collaborator}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative bg-bone-100 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <FadeIn className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px bg-ink-900/40" />
                <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
                  More from the practice
                </span>
              </div>
              <h2 className="font-serif-display text-3xl md:text-5xl font-light text-ink-900">
                Other projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-ink-900 hover:text-terracotta-500 transition-colors"
            >
              View all
              <i className="ri-arrow-right-line" />
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {others.slice(0, 3).map((item, i) => (
              <FadeIn key={item.slug} delayMs={i * 80}>
                <ProjectCard project={item} eager={i < 2} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delayMs={120} className="mt-16 md:mt-20 text-center">
            <p className="font-serif-display text-2xl md:text-3xl font-light text-ink-900 mb-6">
              Have a plot, a brief, or a house in mind?
            </p>
            <Link
              href="/about#inquire"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-900 text-bone-50 text-[13px] tracking-wide uppercase hover:bg-terracotta-500 transition-colors"
            >
              Start an inquiry
              <i className="ri-arrow-right-up-line text-base" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
