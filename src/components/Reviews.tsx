import { reviews } from "@/lib/data";
import { FadeIn } from "./FadeIn";
import { FadeImage } from "./FadeImage";

export function Reviews() {
  const [featured, ...rest] = reviews;

  return (
    <section id="reviews" className="relative bg-bone-50 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-20">
          <FadeIn className="lg:col-span-3">
            <p className="text-[11px] tracking-widest-2 uppercase text-ink-900/60 leading-relaxed">
              Client reviews <br />
              Homes delivered with care
            </p>
          </FadeIn>
          <FadeIn delayMs={80} className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.015em] text-ink-900 font-light text-balance">
              Words from people who <span className="italic">live</span> in the work.
            </h2>
          </FadeIn>
        </div>

        <FadeIn>
          <blockquote className="font-serif-display text-2xl md:text-4xl lg:text-5xl leading-[1.18] tracking-[-0.01em] text-ink-900 font-light text-balance max-w-4xl">
            <span className="text-terracotta-500 mr-2">“</span>
            {featured.quote}
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-bone-200">
              <FadeImage
                src={featured.avatar}
                alt={featured.name}
                className="object-cover object-top"
                sizes="48px"
              />
            </div>
            <div>
              <div className="font-medium text-sm text-ink-900">{featured.name}</div>
              <div className="text-[12px] text-ink-900/55">{featured.role}</div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 border-t border-ink-900/10 pt-12 md:pt-16">
          {rest.map((review, i) => (
            <FadeIn key={review.name} delayMs={i * 80} as="article">
              <p className="text-ink-900/75 leading-relaxed text-lg font-light">
                “{review.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-bone-200">
                  <FadeImage
                    src={review.avatar}
                    alt={review.name}
                    className="object-cover object-top"
                    sizes="40px"
                  />
                </div>
                <div>
                  <div className="font-medium text-sm text-ink-900">{review.name}</div>
                  <div className="text-[12px] text-ink-900/55">{review.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delayMs={100} className="mt-14 md:mt-16 grid grid-cols-3 gap-6 max-w-lg">
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
        </FadeIn>
      </div>
    </section>
  );
}
