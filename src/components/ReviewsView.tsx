"use client";

import type { Testimonial } from "@/lib/types";
import { useUi } from "@/lib/language";
import { FadeIn } from "./FadeIn";
import { TestimonialAvatar } from "./TestimonialAvatar";

type ReviewsViewProps = {
  featured: Testimonial;
  rest: Testimonial[];
};

export function ReviewsView({ featured, rest }: ReviewsViewProps) {
  const ui = useUi();
  const copy = ui.reviews;

  return (
    <section id="reviews" className="relative bg-bone-50 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-20">
          <FadeIn className="lg:col-span-3">
            <p className="text-[11px] tracking-widest-2 uppercase text-ink-900/60 leading-relaxed">
              {copy.eyebrow} <br />
              {copy.eyebrowSub}
            </p>
          </FadeIn>
          <FadeIn delayMs={80} className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.015em] text-ink-900 font-light text-balance">
              {copy.headlineBefore} <span className="italic">{copy.headlineItalic}</span>{" "}
              {copy.headlineAfter}
            </h2>
          </FadeIn>
        </div>

        <FadeIn>
          <blockquote className="font-serif-display text-2xl md:text-4xl lg:text-5xl leading-[1.18] tracking-[-0.01em] text-ink-900 font-light text-balance max-w-4xl">
            <span className="text-terracotta-500 mr-2">&quot;</span>
            {featured.quote}
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <TestimonialAvatar testimonial={featured} size={48} />
            <div>
              <div className="font-medium text-sm text-ink-900">{featured.name}</div>
              <div className="text-[12px] text-ink-900/55">{featured.role}</div>
            </div>
          </div>
        </FadeIn>

        {rest.length > 0 && (
          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 border-t border-ink-900/10 pt-12 md:pt-16">
            {rest.map((item, i) => (
              <FadeIn key={item.id} delayMs={i * 80} as="article">
                <p className="text-ink-900/75 leading-relaxed text-lg font-light">
                  &quot;{item.quote}&quot;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <TestimonialAvatar testimonial={item} size={40} />
                  <div>
                    <div className="font-medium text-sm text-ink-900">{item.name}</div>
                    <div className="text-[12px] text-ink-900/55">{item.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn delayMs={100} className="mt-14 md:mt-16 grid grid-cols-2 gap-6 max-w-xs">
          <div>
            <div className="font-serif-display text-2xl text-ink-900">98%</div>
            <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/50 mt-1">
              {copy.onTime}
            </div>
          </div>
          <div>
            <div className="font-serif-display text-2xl text-ink-900">
              {copy.experienceValue}
            </div>
            <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/50 mt-1">
              {copy.experienceLabel}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
