"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROJECT_FILM } from "@/lib/data";
import { FadeIn } from "./FadeIn";

export function ProjectFilm() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    try {
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await play();
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="film"
      className="relative bg-ink-900 text-bone-50 py-24 md:py-32 overflow-hidden z-10"
    >
      <div className="grain absolute inset-0" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <FadeIn className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-bone-50/40" />
              <span className="text-[11px] tracking-widest-2 uppercase text-bone-50/60">
                Project film — {PROJECT_FILM.duration}
              </span>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl leading-[1.02] tracking-tight max-w-2xl font-light">
              See the build{" "}
              <span className="italic">on site</span>, not just on paper.
            </h2>
          </div>
          <p className="text-bone-100/70 text-sm md:text-base max-w-sm font-light">
            {PROJECT_FILM.description}
          </p>
        </FadeIn>

        <FadeIn
          delayMs={120}
          className="relative rounded-xl overflow-hidden border border-bone-50/10 bg-ink-800"
        >
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-900/70 backdrop-blur text-[11px] tracking-widest-2 uppercase">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                playing ? "bg-terracotta-400 animate-pulse" : "bg-bone-50/40"
              }`}
            />
            {playing ? "Playing" : "Short film"}
          </div>

          <div className="absolute top-4 right-4 z-20 text-[11px] tracking-widest-2 uppercase text-bone-50/70">
            {PROJECT_FILM.location}
          </div>

          <div className="relative w-full aspect-[16/10] bg-ink-900">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              preload="metadata"
              poster={PROJECT_FILM.poster}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            >
              <source src={PROJECT_FILM.src} type="video/mp4" />
            </video>

            {!started && (
              <Image
                src={PROJECT_FILM.poster}
                alt={PROJECT_FILM.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
                loading="eager"
                decoding="async"
              />
            )}

            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                playing
                  ? "bg-ink-900/0 opacity-0 pointer-events-none"
                  : "bg-gradient-to-t from-ink-900/70 via-ink-900/25 to-ink-900/35 opacity-100"
              }`}
            />

            <button
              type="button"
              onClick={toggle}
              className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${
                playing ? "opacity-0 hover:opacity-100" : "opacity-100"
              }`}
              aria-label={playing ? "Pause project film" : "Play project film"}
            >
              <span className="inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-bone-50 text-ink-900 shadow-lg transition-transform hover:scale-105">
                <i
                  className={`text-3xl md:text-4xl ${
                    playing ? "ri-pause-fill" : "ri-play-fill translate-x-0.5"
                  }`}
                />
              </span>
            </button>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-7 pointer-events-none">
              <p className="font-serif-display text-xl md:text-3xl font-light tracking-tight">
                {PROJECT_FILM.title}
              </p>
              <p className="mt-1 text-[11px] md:text-xs tracking-widest-2 uppercase text-bone-50/65">
                {PROJECT_FILM.subtitle}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn
          delayMs={200}
          className="mt-3 flex items-center justify-between flex-wrap gap-3 text-[10px] md:text-[11px] tracking-wide text-bone-50/45"
        >
          <span>A short site walkthrough of a finished house in Dire Dawa.</span>
          <span className="uppercase tracking-widest-2">© Blac Nova · No. BN-04812</span>
        </FadeIn>
      </div>
    </section>
  );
}
