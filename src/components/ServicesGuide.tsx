import Link from "next/link";
import { servicesCatalog } from "@/lib/services";
import { FadeImage } from "./FadeImage";
import { FadeIn } from "./FadeIn";

export function ServicesGuide() {
  return (
    <>
      <section className="relative pt-28 md:pt-32 pb-10 md:pb-14 bg-bone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-ink-900/40" />
              <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
                The practice — Services
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <h1 className="lg:col-span-8 font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.015em] text-ink-900 font-light text-balance">
                See the work. Understand the craft. Want the home.
              </h1>
              <p className="lg:col-span-4 text-ink-900/60 leading-relaxed font-light">
                Architecture, construction, and landscape — shown as finished places, then broken
                down so you know exactly what you receive and how we deliver it.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#designs"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-bone-50 px-6 py-3 text-[13px] tracking-wide uppercase hover:bg-terracotta-500 transition-colors"
              >
                Explore designs
                <i className="ri-arrow-down-line text-base" />
              </Link>
              <Link
                href="/about#inquire"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-6 py-3 text-[13px] tracking-wide uppercase text-ink-900 hover:border-ink-900/40 transition-colors"
              >
                Send a quick inquiry
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative pb-8 md:pb-12 bg-bone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 space-y-20 md:space-y-28">
          {servicesCatalog.map((service, i) => (
            <FadeIn key={service.id} delayMs={i * 40} as="article">
              <div className="border-t border-ink-900/10 pt-12 md:pt-16">
                <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-2xl mb-10 md:mb-12">
                  <FadeImage
                    src={service.image}
                    alt={service.imageAlt}
                    className="object-cover object-center"
                    sizes="100vw"
                    eager={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-bone-50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-9 h-9 rounded-full bg-bone-50/15 backdrop-blur-sm flex items-center justify-center font-serif-display text-lg">
                        {service.roman}
                      </span>
                      <span className="text-[11px] tracking-widest-2 uppercase text-bone-50/70">
                        {service.index} / 03
                      </span>
                    </div>
                    <h2 className="font-serif-display text-3xl md:text-5xl font-light">
                      {service.title}
                    </h2>
                    <p className="mt-2 font-serif-display italic text-lg md:text-xl text-bone-50/80 max-w-xl">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                  <div className="lg:col-span-5">
                    <p className="text-ink-900/70 leading-relaxed text-lg">{service.summary}</p>

                    <div className="mt-8">
                      <h3 className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-4">
                        What you get
                      </h3>
                      <ul className="space-y-3">
                        {service.youGet.map((item) => (
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
                  </div>

                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                      {service.gallery.map((shot) => (
                        <div
                          key={shot.src}
                          className="relative aspect-[4/5] overflow-hidden rounded-2xl"
                        >
                          <FadeImage
                            src={shot.src}
                            alt={shot.alt}
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 50vw, 28vw"
                          />
                        </div>
                      ))}
                    </div>

                    <h3 className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-5">
                      How we implement it
                    </h3>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      {service.process.map((step) => (
                        <li key={step.step} className="border-t border-ink-900/10 pt-4">
                          <div className="font-serif-display text-xl text-terracotta-500 mb-1">
                            {step.step}
                          </div>
                          <div className="font-serif-display text-xl text-ink-900 font-light">
                            {step.title}
                          </div>
                          <p className="mt-2 text-[13px] text-ink-900/60 leading-relaxed">
                            {step.detail}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
