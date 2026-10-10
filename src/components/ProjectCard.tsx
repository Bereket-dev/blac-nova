import Link from "next/link";
import type { Project } from "@/lib/data";
import { FadeImage } from "./FadeImage";

type ProjectCardProps = {
  project: Project;
  eager?: boolean;
};

export function ProjectCard({ project, eager = false }: ProjectCardProps) {
  return (
    <article className="group relative">
      <Link
        href={`/projects/${project.slug}`}
        className="block relative aspect-[4/5] overflow-hidden rounded-xl bg-bone-200"
      >
        <FadeImage
          src={project.image}
          alt={project.alt}
          className="w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 30vw"
          eager={eager}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bone-50/90 backdrop-blur text-[11px] tracking-widest-2 uppercase text-ink-900">
          {project.category}
        </div>
        <div className="absolute top-4 right-4 font-serif-display italic text-bone-50 text-2xl">
          /{project.index}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="text-bone-50">
            <div className="font-serif-display text-2xl md:text-[28px] leading-tight">
              {project.title}
            </div>
            <div className="text-[12px] mt-1 opacity-80 tracking-wide">{project.location}</div>
          </div>
          <span className="w-10 h-10 rounded-full bg-bone-50 text-ink-900 flex items-center justify-center group-hover:bg-terracotta-500 group-hover:text-bone-50 transition-colors">
            <i className="ri-arrow-right-up-line text-base" />
          </span>
        </div>
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4 text-ink-900">
        <div>
          <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/50 mb-1.5">
            {project.collaborator}
          </div>
          <div className="flex items-center gap-3 text-[13px] text-ink-900/70">
            <span>{project.area}</span>
            <span className="w-1 h-1 rounded-full bg-ink-900/30" />
            <span>{project.year}</span>
          </div>
        </div>
        <div className="font-serif-display text-xl text-ink-900">{project.value}</div>
      </div>
    </article>
  );
}
