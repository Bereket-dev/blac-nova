import { FadeIn } from "./FadeIn";
import { FadeImage } from "./FadeImage";

export function Services() {
  return (
    <section id="services" className="relative bg-bone-100 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <FadeIn className="lg:col-span-3">
            <p className="text-[11px] tracking-widest-2 uppercase text-ink-900/60 leading-relaxed">
              The Practice <br />
              No. 02 — Services
            </p>
          </FadeIn>
          <FadeIn delayMs={80} className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.015em] text-ink-900 font-light text-balance">
              Three disciplines, <span className="italic">one quiet</span> obsession with
              proportion, material, and permanence.
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
                Full architectural services from concept to completion. We design homes that
                respond to their context, respect their materials, and outlast their brief.
              </p>
              <a
                href="#services"
                className="mt-7 flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-bone-50/70 group-hover:text-terracotta-400 transition-colors"
              >
                Read approach
                <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </FadeIn>

          <FadeIn
            as="article"
            delayMs={100}
            className="group relative rounded-2xl overflow-hidden min-h-[420px] transition-transform duration-500 hover:-translate-y-1"
          >
            <FadeImage
              src="https://readdy.ai/api/search-image?query=intimate%20detail%20of%20warm%20travertine%20stone%20wall%20with%20soft%20directional%20sunlight%20casting%20long%20shadow%20of%20olive%20branch%2C%20bronze%20door%20handle%2C%20editorial%20architectural%20photography%2C%20pure%20simple%20background%20of%20warm%20beige%20stone%20texture&width=640&height=800&seq=phil-card-02&orientation=portrait"
              alt="Construction detail"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-900/60 backdrop-blur-sm text-bone-50 text-[11px] tracking-widest-2 uppercase">
              <i className="ri-compass-3-line text-sm" />
              Construction Management
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 text-bone-50">
              <h3 className="font-serif-display text-2xl md:text-3xl leading-tight font-light max-w-xs">
                Built with accountability from foundation to final fixture.
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
                Gardens, terraces, courtyards, and water. We treat landscape as architecture
                without a roof — spatial design at ground level, using stone, water, planting,
                and light to shape outdoor rooms.
              </p>
            </div>
            <div className="relative h-44 -mx-7 -mb-7 md:-mx-8 md:-mb-8 mt-6 overflow-hidden rounded-b-2xl">
              <FadeImage
                src="https://readdy.ai/api/search-image?query=modern%20landscape%20garden%20with%20stone%20terrace%20and%20reflecting%20pool%2C%20mature%20planting%2C%20warm%20natural%20light%2C%20editorial%20landscape%20architectural%20photography%2C%20pure%20simple%20background%20of%20soft%20sky%20and%20green%20foliage&width=640&height=390&seq=phil-card-03&orientation=landscape"
                alt="Landscape and pool detail"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
