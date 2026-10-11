"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import {
  INQUIRY_EMAIL,
  INQUIRY_TELEGRAM,
  designCategories,
  designsByCategory,
  getDesign,
  parseInquirySelection,
  selectionToSearchParams,
} from "@/lib/services";
import { FadeImage } from "./FadeImage";
import { FadeIn } from "./FadeIn";

export function DesignExplorer() {
  const searchParams = useSearchParams();
  const initial = parseInquirySelection(searchParams);
  const initialDesign = getDesign(initial.design);

  const [categoryId, setCategoryId] = useState(
    () => initialDesign?.categoryId ?? designCategories[0]?.id ?? "residences",
  );
  const [activeId, setActiveId] = useState(
    () => initialDesign?.id ?? designsByCategory(categoryId)[0]?.id ?? "",
  );
  const [selectedId, setSelectedId] = useState(initial.design);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const designs = useMemo(() => designsByCategory(categoryId), [categoryId]);
  const active = designs.find((d) => d.id === activeId) ?? designs[0];
  const selected = selectedId ? getDesign(selectedId) : undefined;

  const inquiryHref = `/about${selectionToSearchParams({ design: selectedId })}#inquire`;

  const switchCategory = (id: string) => {
    setCategoryId(id);
    const next = designsByCategory(id);
    setActiveId(next[0]?.id ?? "");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const design = selectedId ? getDesign(selectedId) : undefined;
    const lines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      "",
      design
        ? `Selected design: ${design.title} (${design.location})`
        : "Selected design: (none — exploring generally)",
      design
        ? `Category: ${designCategories.find((c) => c.id === design.categoryId)?.label ?? ""}`
        : "",
      design ? `Project: /projects/${design.slug}` : "",
    ].filter(Boolean);

    const subject = encodeURIComponent(
      design ? `Inquiry — ${design.title} — ${name}` : `Project inquiry — ${name}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <section id="designs" className="relative bg-bone-100 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <FadeIn className="max-w-3xl mb-12 md:mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-ink-900/40" />
              <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
                Designs by category
              </span>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl font-light text-ink-900 text-balance">
              Browse finished work by type.
            </h2>
            <p className="mt-5 text-ink-900/60 leading-relaxed max-w-2xl">
              Open a design for details, select one if you like, then leave your name and phone —
              we follow up with clear next steps.
            </p>
          </FadeIn>

          <FadeIn>
            <div
              className="flex flex-wrap gap-2 mb-10 md:mb-12"
              role="tablist"
              aria-label="Design categories"
            >
              {designCategories.map((category) => {
                const activeTab = category.id === categoryId;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab}
                    onClick={() => switchCategory(category.id)}
                    className={`px-5 py-2.5 text-[12px] tracking-widest-2 uppercase transition-colors border ${
                      activeTab
                        ? "bg-ink-900 text-bone-50 border-ink-900"
                        : "bg-transparent text-ink-900/70 border-ink-900/15 hover:border-ink-900/40"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
            <p className="mb-8 text-sm text-ink-900/55 max-w-xl">
              {designCategories.find((c) => c.id === categoryId)?.description}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <FadeIn className="lg:col-span-5 space-y-4">
              {designs.map((design) => {
                const isSelected = selectedId === design.id;
                const isActive = active?.id === design.id;
                return (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setActiveId(design.id)}
                    className={`group w-full text-left overflow-hidden border transition-colors ${
                      isActive
                        ? "border-ink-900 bg-bone-50"
                        : "border-ink-900/10 bg-bone-50/60 hover:border-ink-900/30"
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-0">
                      <div className="col-span-5 relative w-full min-h-[140px] aspect-[4/5] self-stretch">
                        <FadeImage
                          src={design.image}
                          alt={design.alt}
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 40vw, 18vw"
                        />
                      </div>
                      <div className="col-span-7 p-4 md:p-5 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] tracking-widest-2 uppercase text-ink-900/45 mb-2">
                            {design.location}
                          </div>
                          <div className="font-serif-display text-xl md:text-2xl font-light text-ink-900 leading-tight">
                            {design.title}
                          </div>
                          <p className="mt-2 text-[13px] text-ink-900/55 leading-relaxed line-clamp-3">
                            {design.tagline}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
                            {isSelected ? "In inquiry" : isActive ? "Viewing" : "View"}
                          </span>
                          {isSelected && (
                            <span className="w-6 h-6 rounded-full bg-terracotta-500 text-bone-50 flex items-center justify-center">
                              <i className="ri-check-line text-sm" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </FadeIn>

            <FadeIn delayMs={80} className="lg:col-span-7">
              {active && (
                <div className="lg:sticky lg:top-28">
                  <div className="relative aspect-[4/5] md:aspect-[5/4] overflow-hidden rounded-2xl mb-8">
                    <FadeImage
                      src={active.image}
                      alt={active.alt}
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      eager
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-bone-50">
                      <div className="text-[11px] tracking-widest-2 uppercase text-bone-50/70 mb-2">
                        {active.location} · {active.year}
                      </div>
                      <h3 className="font-serif-display text-3xl md:text-4xl font-light">
                        {active.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-ink-900/70 leading-relaxed text-lg max-w-2xl">
                    {active.summary}
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-4">
                        Why this design
                      </h4>
                      <ul className="space-y-3">
                        {active.details.map((item) => (
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
                    <div>
                      <h4 className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-4">
                        Materials
                      </h4>
                      <p className="text-sm text-ink-900/70 leading-relaxed">
                        {active.materials.join(" · ")}
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/40 mb-1">
                            Area
                          </div>
                          <div className="font-serif-display text-xl text-ink-900">{active.area}</div>
                        </div>
                        <div>
                          <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/40 mb-1">
                            Year
                          </div>
                          <div className="font-serif-display text-xl text-ink-900">{active.year}</div>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedId((prev) => (prev === active.id ? "" : active.id))
                          }
                          className={`inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase transition-colors ${
                            selectedId === active.id
                              ? "text-terracotta-500"
                              : "text-ink-900 hover:text-terracotta-500"
                          }`}
                        >
                          <i
                            className={
                              selectedId === active.id
                                ? "ri-checkbox-circle-fill"
                                : "ri-add-circle-line"
                            }
                          />
                          {selectedId === active.id
                            ? "Selected for inquiry"
                            : "Select this design"}
                        </button>
                        <Link
                          href={`/projects/${active.slug}`}
                          className="inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-ink-900/55 hover:text-terracotta-500 transition-colors"
                        >
                          Full project
                          <i className="ri-arrow-right-up-line" />
                        </Link>
                        <a
                          href="#inquire"
                          className="inline-flex items-center gap-2 text-[12px] tracking-widest-2 uppercase text-ink-900/55 hover:text-terracotta-500 transition-colors"
                        >
                          Inquire
                          <i className="ri-arrow-down-line" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="inquire" className="relative bg-ink-900 text-bone-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px bg-bone-50/40" />
                <span className="text-[11px] tracking-widest-2 uppercase text-bone-50/55">
                  Finish exploring
                </span>
              </div>
              <h2 className="font-serif-display text-3xl md:text-5xl font-light text-balance leading-[1.05]">
                Ready when you are.
              </h2>
              <p className="mt-5 text-bone-100/60 leading-relaxed max-w-md">
                Leave your name and phone. If you selected a design, we&apos;ll treat it as your
                starting point — optional, never locked in.
              </p>

              {selected ? (
                <div className="mt-8 flex gap-4 items-stretch">
                  <div className="relative w-24 shrink-0 aspect-[3/4] overflow-hidden rounded-xl">
                    <FadeImage
                      src={selected.image}
                      alt={selected.alt}
                      className="object-cover object-top"
                      sizes="96px"
                    />
                  </div>
                  <div className="py-1">
                    <div className="text-[11px] tracking-widest-2 uppercase text-bone-50/45 mb-2">
                      Selected design
                    </div>
                    <div className="font-serif-display text-2xl font-light">{selected.title}</div>
                    <p className="mt-1 text-sm text-bone-100/55">{selected.location}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedId("")}
                      className="mt-3 text-[11px] tracking-widest-2 uppercase text-bone-50/50 hover:text-terracotta-400 transition-colors"
                    >
                      Clear selection
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-8 text-sm text-bone-100/45 leading-relaxed">
                  No design selected — that&apos;s fine. Or{" "}
                  <a href="#designs" className="underline hover:text-terracotta-400">
                    browse designs above
                  </a>{" "}
                  first.
                </p>
              )}
            </FadeIn>

            <FadeIn delayMs={80} className="lg:col-span-7">
              <form
                onSubmit={onSubmit}
                className="border border-bone-50/15 bg-ink-800/50 p-6 md:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[11px] tracking-widest-2 uppercase text-bone-50/45">
                      Name
                    </span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full border border-bone-50/15 bg-ink-900 px-4 py-3 text-sm text-bone-50 placeholder-bone-50/30 focus:outline-none focus:border-bone-50/40"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] tracking-widest-2 uppercase text-bone-50/45">
                      Phone
                    </span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full border border-bone-50/15 bg-ink-900 px-4 py-3 text-sm text-bone-50 placeholder-bone-50/30 focus:outline-none focus:border-bone-50/40"
                      name="phone"
                      autoComplete="tel"
                      placeholder="+251…"
                    />
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-bone-50 text-ink-900 px-6 py-3 text-[13px] tracking-wide uppercase hover:bg-terracotta-500 hover:text-bone-50 transition-colors"
                  >
                    Send inquiry
                    <i className="ri-arrow-right-line text-base" />
                  </button>
                  <a
                    href={INQUIRY_TELEGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-bone-50/20 px-6 py-3 text-[13px] tracking-wide uppercase text-bone-50 hover:border-bone-50/50 transition-colors"
                  >
                    <i className="ri-telegram-fill text-base" />
                    Telegram
                  </a>
                </div>

                {submitted ? (
                  <p className="text-sm text-terracotta-400">
                    Your email client should open with the inquiry ready to send.
                  </p>
                ) : (
                  <p className="text-[11px] tracking-wide text-bone-50/40 leading-relaxed">
                    Sends via email to {INQUIRY_EMAIL}
                    {selectedId ? " with your selected design attached" : ""}. Or open the{" "}
                    <Link href={inquiryHref} className="underline hover:text-terracotta-400">
                      about & inquiry page
                    </Link>
                    .
                  </p>
                )}
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
