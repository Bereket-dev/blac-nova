import Link from "next/link";
import { img } from "@/lib/images";
import { FadeIn } from "./FadeIn";
import { FadeImage } from "./FadeImage";

export function Services() {
  return (
    <section id="services" className="relative bg-bone-100 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <FadeIn className="lg:col-span-3">
            <p className="text-[11px] tracking-widest-2 uppercase text-ink-900/60 leading-relaxed">
              What we do <br />
              No. 02 — Services
            </p>
          </FadeIn>
          <FadeIn delayMs={80} className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.015em] text-ink-900 font-light text-balance">
              Design, build &amp; outdoor works — <span className="italic">one team</span> from
              drawing to handover.
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <FadeIn
            as="article"
            className="group relative bg-ink-900 text-bone-50 rounded-2xl p-7 md:p-8 min-h-[420px] flex flex-col justify-between overflow-hidden transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-full bg-ink-700 flex items-center justify-center text-bone-50 font-serif-display text-lg">
                I
              </div>
              <span className="text-[10px] tracking-widest-2 uppercase text-bone-50/40">
                01 / 03
              </span>
            </div>
            <div>
              <h3 className="font-serif-display text-3xl md:text-4xl leading-tight font-light mb-5">
                Architecture & Design
              </h3>
              <p className="text-[13px] text-bone-100/60 leading-relaxed max-w-xs">
                House and G+ design from concept to working drawings — plans that fit the
                plot, the climate, and how your family lives.
              </p>
              <Link
                href="/services"
                className="mt-7 flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-bone-50/70 group-hover:text-terracotta-400 transition-colors"
              >
                See how we work
                <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn
            as="article"
            delayMs={100}
            className="group relative rounded-2xl overflow-hidden min-h-[420px] transition-transform duration-500 hover:-translate-y-1"
          >
            <Link href="/services" className="absolute inset-0 z-10" aria-label="Construction management">
              <span className="sr-only">View construction management</span>
            </Link>
            <FadeImage
              src={img.stoneDetail}
              alt="Construction site in progress"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              eager
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-900/60 backdrop-blur-sm text-bone-50 text-[11px] tracking-widest-2 uppercase">
              <i className="ri-compass-3-line text-sm" />
              Construction Management
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 text-bone-50">
              <h3 className="font-serif-display text-2xl md:text-3xl leading-tight font-light max-w-xs">
                Site supervision from foundation to final fixing — on time and to drawing.
              </h3>
            </div>
          </FadeIn>

          <FadeIn
            as="article"
            delayMs={180}
            className="group relative bg-bone-50 rounded-2xl p-7 md:p-8 min-h-[420px] flex flex-col justify-between overflow-hidden transition-transform duration-500 hover:-translate-y-1 border border-ink-900/5"
          >
            <div>
              <span className="text-[10px] tracking-widest-2 uppercase text-ink-900/40">
                03 / 03
              </span>
              <h3 className="font-serif-display text-3xl md:text-4xl leading-tight font-light mt-3 text-ink-900">
                Landscape & Pools
              </h3>
              <p className="text-[13px] text-ink-900/55 leading-relaxed max-w-xs mt-4">
                Compound paths, terraces, planting, and pools planned with the main house —
                so the outdoor space works from day one.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-ink-900/60 group-hover:text-terracotta-500 transition-colors"
              >
                View services
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
            <div className="relative h-44 -mx-7 -mb-7 md:-mx-8 md:-mb-8 mt-6 overflow-hidden rounded-b-2xl">
              <FadeImage
                src={img.landscapeCard}
                alt="Landscape and pool detail"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                eager
              />
            </div>
          </FadeIn>
        </div>

        <FadeIn delayMs={120} className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-ink-900 hover:text-terracotta-500 transition-colors"
          >
            View all services &amp; start an inquiry
            <i className="ri-arrow-right-line" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
