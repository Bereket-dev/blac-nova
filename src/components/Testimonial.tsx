import { img } from "@/lib/images";
import { FadeIn } from "./FadeIn";
import { FadeImage } from "./FadeImage";

export function Testimonial() {
  return (
    <section id="journal" className="relative bg-bone-50 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <FadeIn className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-2 h-2 rounded-full bg-ink-900" />
              <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/60">
                Client testimonial — Dream Home Awards 2025
              </span>
            </div>
            <blockquote className="font-serif-display text-3xl md:text-4xl lg:text-5xl leading-[1.18] tracking-[-0.01em] text-ink-900 font-light text-balance">
              <span className="text-terracotta-500 mr-2">“</span>
              Blac Nova does not merely construct buildings — they engineer the homes people
              have carried in their minds for years. Our residence feels inevitable, as if it
              had always belonged to the land.
            </blockquote>
            <div className="mt-10 flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-bone-200">
                  <FadeImage
                    src={img.portraitSm}
                    alt="Portrait of Sir Richard Holloway"
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </div>
                <div className="text-ink-900">
                  <div className="font-medium text-sm">Sir Richard Holloway</div>
                  <div className="text-[12px] text-ink-900/55">Private Client, Cotswolds</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bone-100 border border-ink-900/5">
                <i className="ri-verified-badge-fill text-terracotta-500 text-base" />
                <span className="text-[11px] tracking-wide text-ink-900/70">
                  Verified · Dream Home Award 2025
                </span>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="font-serif-display text-2xl text-ink-900">120+</div>
                <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/50 mt-1">
                  Homes delivered
                </div>
              </div>
              <div>
                <div className="font-serif-display text-2xl text-ink-900">98%</div>
                <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/50 mt-1">
                  On-time delivery
                </div>
              </div>
              <div>
                <div className="font-serif-display text-2xl text-ink-900">12yr</div>
                <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/50 mt-1">
                  Practice
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delayMs={100} className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-bone-100">
              <FadeImage
                src={img.portraitLg}
                alt="Client portrait"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                eager
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-bone-50/90 backdrop-blur text-[11px] tracking-widest-2 uppercase text-ink-900">
                Dream Home Awards · 2025
              </div>
              <div className="absolute bottom-4 right-4 text-bone-50 font-serif-display italic text-xl">
                /R.H.
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
