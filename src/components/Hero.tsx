"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_IMAGE, teamAvatars } from "@/lib/data";
import { useUi } from "@/lib/language";

export function Hero() {
  const [ready, setReady] = useState(false);
  const ui = useUi();
  const lines = [
    { text: ui.hero.line1, italic: false },
    { text: ui.hero.line2, italic: true },
    { text: ui.hero.line3, italic: false },
  ];

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="top"
      className="relative h-screen min-h-[760px] w-full overflow-hidden bg-ink-900"
      style={{ position: "sticky", top: 0, zIndex: 5 }}
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt={ui.hero.alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className={`object-cover object-[62%_center] sm:object-[58%_center] lg:object-center will-change-transform transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/55 via-ink-900/25 to-ink-900/70" />
        <div className="absolute inset-y-0 right-0 w-[42%] hidden lg:block bg-gradient-to-l from-ink-900/55 via-ink-900/20 to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="pt-28 md:pt-32 px-6 md:px-10 lg:px-14">
          <div
            className={`flex items-center gap-3 text-bone-50/85 transition-all duration-1000 ${
              ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-10 h-px bg-bone-50/60" />
            <span className="text-[11px] tracking-widest-2 uppercase">
              {ui.hero.eyebrow}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center px-6 md:px-10 lg:px-14">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-serif-display text-bone-50 text-[15vw] sm:text-[12vw] lg:text-[9.5vw] xl:text-[8.5vw] leading-[0.92] tracking-[-0.02em] font-light">
                {lines.map((line, i) => (
                  <span
                    key={`${line.text}-${i}`}
                    className={`reveal-line block ${line.italic ? "italic" : ""}`}
                  >
                    <span
                      className={`hero-line-inner ${ready ? "is-visible" : ""}`}
                      style={{ transitionDelay: `${180 + i * 120}ms` }}
                    >
                      {line.text}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-6">
              <p
                className={`text-bone-100 text-base md:text-lg leading-relaxed max-w-md font-light transition-all duration-1000 delay-300 ${
                  ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {ui.hero.body}
              </p>
              <div
                className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-1000 delay-500 ${
                  ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-bone-50 text-ink-900 hover:bg-terracotta-500 hover:text-bone-50 transition-all duration-300 whitespace-nowrap text-sm tracking-wide"
                >
                  {ui.hero.ctaProjects}
                  <span className="w-9 h-9 flex items-center justify-center rounded-full bg-ink-900 text-bone-50 group-hover:bg-bone-50 group-hover:text-ink-900 transition-all">
                    <i className="ri-arrow-right-line text-base" />
                  </span>
                </a>
                <a
                  href="/about"
                  className="text-bone-50/90 hover:text-bone-50 text-sm tracking-wide whitespace-nowrap underline-offset-4 hover:underline"
                >
                  {ui.hero.ctaAbout}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-8 md:pb-10 px-6 md:px-10 lg:px-14">
          <div className="flex items-end justify-between gap-6 text-bone-50/80">
            <div
              className={`flex items-center gap-4 transition-all duration-1000 delay-700 ${
                ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex -space-x-2">
                {teamAvatars.map((src, i) => (
                  <div
                    key={src}
                    className="relative w-9 h-9 rounded-full ring-2 ring-ink-900/40 overflow-hidden bg-ink-700"
                  >
                    <Image
                      src={src}
                      alt="team portrait"
                      fill
                      sizes="36px"
                      className="object-cover object-top"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
              <span className="text-[12px] tracking-wide">{ui.hero.team}</span>
            </div>
            <div
              className={`hidden md:flex items-center gap-2 text-[11px] tracking-widest-2 uppercase transition-all duration-1000 delay-700 ${
                ready ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="block w-2 h-2 rounded-full bg-terracotta-400 animate-pulse" />
              {ui.hero.scroll}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
