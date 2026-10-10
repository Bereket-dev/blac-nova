import Link from "next/link";
import { OWNER } from "@/lib/data";
import { FadeIn } from "./FadeIn";
import { FadeImage } from "./FadeImage";

type OwnerProps = {
  /** Fuller copy and no “read more” link — used on the About page. */
  variant?: "home" | "about";
};

export function Owner({ variant = "home" }: OwnerProps) {
  const isAbout = variant === "about";

  return (
    <section
      id={isAbout ? "about" : "founder"}
      className={`relative z-10 ${isAbout ? "bg-bone-50 pt-28 md:pt-32 pb-16 md:pb-20" : "bg-bone-100 py-24 md:py-32"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <FadeIn className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone-200">
              <FadeImage
                src={OWNER.image}
                alt={`${OWNER.role}, Blac Nova`}
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                eager
              />
            </div>
          </FadeIn>

          <FadeIn delayMs={80} className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-ink-900/40" />
              <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
                {OWNER.eyebrow}
              </span>
            </div>
            <p className="text-[11px] tracking-widest-2 uppercase text-terracotta-500 mb-4">
              {OWNER.role}
            </p>
            <h2
              className={`font-serif-display font-light text-ink-900 text-balance leading-[1.05] ${
                isAbout
                  ? "text-4xl md:text-5xl lg:text-6xl"
                  : "text-3xl md:text-5xl lg:text-[3.25rem]"
              }`}
            >
              {isAbout ? OWNER.aboutHeadline : OWNER.homeHeadline}
            </h2>
            <p className="mt-6 text-ink-900/65 leading-relaxed text-lg max-w-xl">
              {isAbout ? OWNER.aboutSummary : OWNER.homeSummary}
            </p>

            {isAbout && (
              <div className="mt-8 space-y-5 max-w-xl">
                {OWNER.aboutBody.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-ink-900/60 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {!isAbout && (
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-ink-900 hover:text-terracotta-500 transition-colors"
              >
                About us & inquire
                <i className="ri-arrow-right-line" />
              </Link>
            )}

            {isAbout && (
              <a
                href="#inquire"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink-900 text-bone-50 px-6 py-3 text-[13px] tracking-wide uppercase hover:bg-terracotta-500 transition-colors"
              >
                Start an inquiry
                <i className="ri-arrow-down-line text-base" />
              </a>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
