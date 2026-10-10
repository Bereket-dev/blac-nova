"use client";

import { useEffect, useRef, useState } from "react";
import { CTA_IMAGE } from "@/lib/data";
import { FadeIn } from "./FadeIn";

export function Inquiry() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inquiry"
      className="relative h-[680px] md:h-[760px] w-full overflow-hidden z-10"
    >
      <div
        className={`absolute inset-0 scale-110 transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url("${CTA_IMAGE}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/55 via-ink-900/15 to-ink-900/35" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 content-between py-20 md:py-24">
        <FadeIn className="lg:col-span-7 self-start">
          <div className="flex items-center gap-3 mb-7 text-bone-50/80">
            <span className="w-10 h-px bg-bone-50/50" />
            <span className="text-[11px] tracking-widest-2 uppercase">
              Project inquiry — Reply within 48h
            </span>
          </div>
          <h2 className="font-serif-display text-bone-50 text-5xl md:text-7xl lg:text-[88px] leading-[0.98] tracking-[-0.02em] font-light text-balance">
            begin a <span className="italic">quiet</span> <br /> conversation.
          </h2>
        </FadeIn>

        <FadeIn delayMs={100} className="lg:col-span-5 self-end ml-auto w-full max-w-md">
          <div className="bg-bone-50/95 backdrop-blur-md rounded-2xl p-6 md:p-7 border border-bone-50/40">
            <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/55 mb-5">
              Blac Nova · Project Inquiry
            </div>
            <p className="text-sm text-ink-900/70 leading-relaxed mb-6">
              Every dream home begins with a conversation. Tell us what you are building, and
              a director will craft a proposal within 48 hours.
            </p>
            <a
              href="/inquiry"
              className="group w-full inline-flex items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-full bg-ink-900 text-bone-50 hover:bg-terracotta-500 transition-colors text-sm tracking-wide whitespace-nowrap"
            >
              Start your inquiry
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-bone-50 text-ink-900 group-hover:bg-ink-900 group-hover:text-bone-50 transition-colors">
                <i className="ri-arrow-right-line text-base" />
              </span>
            </a>
            <a
              href="/services#designs"
              className="mt-3 block text-center text-[11px] tracking-widest-2 uppercase text-ink-900/50 hover:text-terracotta-500 transition-colors"
            >
              Or explore designs first
            </a>
            <p className="mt-4 text-[10px] tracking-wide text-ink-900/45 leading-relaxed">
              Your inquiry is handled by a director. We never share details outside the
              practice.
            </p>
          </div>
        </FadeIn>

        <div className="lg:col-span-12 flex items-end justify-between text-bone-50/85 flex-wrap gap-4">
          <FadeIn as="p" className="text-sm md:text-base max-w-md font-light leading-relaxed">
            Or visit by appointment — our studios are open to clients introduced by a member.
          </FadeIn>
          <FadeIn
            delayMs={80}
            className="flex items-center gap-5 text-[12px] tracking-widest-2 uppercase"
          >
            <span>London · Manchester · Edinburgh</span>
            <span className="w-1 h-1 rounded-full bg-bone-50/50" />
            <span>+44 20 7946 0234</span>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
