"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  INQUIRY_EMAIL,
  INQUIRY_TELEGRAM,
  designCategories,
  getDesign,
  selectionToSearchParams,
  type InquirySelection,
} from "@/lib/services";
import { FadeImage } from "./FadeImage";

type InquiryFormProps = {
  initialSelection: InquirySelection;
};

export function InquiryForm({ initialSelection }: InquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const design = initialSelection.design ? getDesign(initialSelection.design) : undefined;
  const exploreHref = `/services${selectionToSearchParams(initialSelection)}#designs`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-ink-900/40" />
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
            Project inquiry
          </span>
        </div>
        <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light text-ink-900 text-balance leading-[1.05]">
          Name, phone, and an optional design.
        </h2>
        <p className="mt-5 text-ink-900/60 leading-relaxed max-w-md">
          That&apos;s all we need to start. We reply within 48 hours — with clearer next steps
          if you&apos;ve already picked a design.
        </p>

        {design ? (
          <div className="mt-10 flex gap-4 items-stretch">
            <div className="relative w-28 shrink-0 aspect-[3/4] overflow-hidden rounded-xl">
              <FadeImage
                src={design.image}
                alt={design.alt}
                className="object-cover object-top"
                sizes="112px"
              />
            </div>
            <div className="py-1">
              <div className="text-[11px] tracking-widest-2 uppercase text-ink-900/45 mb-2">
                Selected design
              </div>
              <div className="font-serif-display text-2xl font-light text-ink-900">
                {design.title}
              </div>
              <p className="mt-1 text-sm text-ink-900/55">{design.location}</p>
              <Link
                href={exploreHref}
                className="mt-3 inline-block text-[11px] tracking-widest-2 uppercase text-ink-900/55 hover:text-terracotta-500 transition-colors"
              >
                Change design
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink-900/55 leading-relaxed">
            No design selected.{" "}
            <Link href="/services#designs" className="underline hover:text-terracotta-500">
              Browse designs on services
            </Link>{" "}
            first, or continue below.
          </p>
        )}
      </div>

      <div className="lg:col-span-7">
        <form
          onSubmit={onSubmit}
          className="border border-ink-900/10 bg-bone-50 p-6 md:p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
                Name
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border border-ink-900/10 bg-bone-50 px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-ink-900/40"
                name="name"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
                Phone
              </span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full border border-ink-900/10 bg-bone-50 px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-ink-900/40"
                name="phone"
                autoComplete="tel"
                placeholder="+251…"
              />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-bone-50 px-6 py-3 text-[13px] tracking-wide uppercase hover:bg-terracotta-500 transition-colors"
            >
              Send inquiry
              <i className="ri-arrow-right-line text-base" />
            </button>
            <a
              href={INQUIRY_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 px-6 py-3 text-[13px] tracking-wide uppercase text-ink-900 hover:border-ink-900/40 transition-colors"
            >
              <i className="ri-telegram-fill text-base" />
              Message on Telegram
            </a>
          </div>

          {submitted ? (
            <p className="text-sm text-terracotta-500">
              Your email client should open with the inquiry ready to send.
            </p>
          ) : (
            <p className="text-[11px] tracking-wide text-ink-900/45 leading-relaxed">
              Submitting opens your email to {INQUIRY_EMAIL}
              {design ? " with your selected design included" : ""}. We never share inquiry details
              outside the company.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
