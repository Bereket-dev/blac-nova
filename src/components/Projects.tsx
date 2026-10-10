"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/lib/data";
import { FadeIn } from "./FadeIn";
import { FadeImage } from "./FadeImage";

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const amount = card ? card.clientWidth + 24 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
    setActive((prev) => Math.min(projects.length - 1, Math.max(0, prev + dir)));
  };

  return (
    <section id="residences" className="relative bg-bone-50 py-24 md:py-32 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-ink-900/40" />
              <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
                Featured projects — 2023–2026
              </span>
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.015em] text-ink-900 font-light text-balance">
              Projects that <span className="italic">refuse</span> to be ordinary.
            </h2>
          </FadeIn>
          <FadeIn delayMs={80} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="w-12 h-12 rounded-full border border-ink-900/15 bg-bone-50 hover:bg-ink-900 hover:text-bone-50 transition-colors flex items-center justify-center"
              aria-label="Previous project"
            >
              <i className="ri-arrow-left-line text-lg" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="w-12 h-12 rounded-full border border-ink-900/15 bg-bone-50 hover:bg-ink-900 hover:text-bone-50 transition-colors flex items-center justify-center"
              aria-label="Next project"
            >
              <i className="ri-arrow-right-line text-lg" />
            </button>
          </FadeIn>
        </div>

        <FadeIn delayMs={120}>
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-2 px-2"
          >
            {projects.map((project, i) => (
              <article
                key={project.slug}
                className="group relative shrink-0 w-[78vw] sm:w-[58vw] md:w-[44vw] lg:w-[30vw] xl:w-[26vw] snap-start"
              >
                <Link
                  href={`#residences`}
                  className="block relative aspect-[4/5] overflow-hidden rounded-xl bg-bone-200"
                >
                  <FadeImage
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 78vw, 30vw"
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
                      <div className="text-[12px] mt-1 opacity-80 tracking-wide">
                        {project.location}
                      </div>
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
                {i === 0 && (
                  <div className="mt-3 h-px bg-ink-900/15 overflow-hidden">
                    <div className="h-full w-1/3 bg-terracotta-500 transition-all duration-500" />
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <div className="text-[12px] tracking-wide text-ink-900/55">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}{" "}
              — <span className="font-serif-display italic">{projects[active]?.title}</span>
            </div>
            <a
              href="#residences"
              className="inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-ink-900 hover:text-terracotta-500 transition-colors whitespace-nowrap"
            >
              View all projects
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
