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
        className="block relative aspect-[16/10] overflow-hidden rounded-xl bg-bone-200"
      >
        <FadeImage
          src={project.image}
          alt={project.alt}
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 30vw"
          eager={eager}
        />
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bone-50/90 text-[11px] tracking-widest-2 uppercase text-ink-900">
          {project.category}
        </div>
        <div className="absolute top-4 right-4 font-serif-display italic text-bone-50 text-2xl mix-blend-difference">
          /{project.index}
        </div>
        <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-bone-50 text-ink-900 flex items-center justify-center group-hover:bg-terracotta-500 group-hover:text-bone-50 transition-colors shadow-sm">
          <i className="ri-arrow-right-up-line text-base" />
        </span>
      </Link>
      <div className="mt-5 text-ink-900">
        <Link href={`/projects/${project.slug}`} className="block group/title">
          <div className="font-serif-display text-2xl md:text-[28px] leading-tight group-hover/title:text-terracotta-500 transition-colors">
            {project.title}
          </div>
          <div className="text-[12px] mt-1 text-ink-900/55 tracking-wide">{project.location}</div>
        </Link>
        <div className="mt-3 text-[11px] tracking-widest-2 uppercase text-ink-900/50 mb-1.5">
          {project.collaborator}
        </div>
        <div className="flex items-center gap-3 text-[13px] text-ink-900/70">
          <span>{project.area}</span>
          <span className="w-1 h-1 rounded-full bg-ink-900/30" />
          <span>{project.year}</span>
        </div>
      </div>
    </article>
  );
}
