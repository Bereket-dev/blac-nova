"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  INQUIRY_TELEGRAM,
  findCategoryLabel,
  parseInquirySelection,
  selectionToSearchParams,
  type DesignCategory,
  type DesignOption,
} from "@/lib/services";
import { submitInquiry } from "@/lib/inquiries";
import { useUi } from "@/lib/language";
import { FadeImage } from "./FadeImage";

type InquiryFormProps = {
  categories: DesignCategory[];
  designs: DesignOption[];
};

export function InquiryForm({ categories, designs }: InquiryFormProps) {
  const rawSearchParams = useSearchParams();
  const initialSelection = parseInquirySelection(rawSearchParams, designs);
  const copy = useUi().inquiryForm;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const design = initialSelection.design
    ? designs.find(
        (item) =>
          item.id === initialSelection.design || item.slug === initialSelection.design,
      )
    : undefined;

  const exploreHref = `/services${selectionToSearchParams(initialSelection)}#designs`;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const result = await submitInquiry({
        name,
        phone,
        message: message || undefined,
        designTitle: design?.title,
        designSlug: design?.slug,
        designCategory: design ? findCategoryLabel(categories, design.categoryId) : undefined,
      });

      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong. Please try again or contact us via Telegram.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-ink-900/40" />
            <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
              {copy.eyebrow}
            </span>
          </div>
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light text-ink-900 text-balance leading-[1.05]">
            {copy.successHeadline}
          </h2>
          <p className="mt-5 text-ink-900/60 leading-relaxed max-w-md">{copy.successBody}</p>
          <a
            href={INQUIRY_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2AABEE] text-white px-6 py-3 text-[13px] tracking-wide uppercase hover:bg-[#229ED9] transition-colors"
          >
            <i className="ri-telegram-fill text-base" />
            {copy.telegram}
          </a>
        </div>
        <div className="lg:col-span-7 flex items-center">
          <div className="border border-ink-900/10 bg-bone-50 p-6 md:p-8 w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-terracotta-500 text-bone-50 flex items-center justify-center">
                <i className="ri-check-line text-xl" />
              </span>
              <p className="text-sm font-medium text-ink-900">{copy.received}</p>
            </div>
            <p className="text-sm text-ink-900/60">
              <strong className="text-ink-900">{name}</strong> · {phone}
              {design ? (
                <>
                  <br />
                  {copy.designLabel}: {design.title}
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-ink-900/40" />
          <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/55">
            {copy.eyebrow}
          </span>
        </div>
        <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light text-ink-900 text-balance leading-[1.05]">
          {copy.headline}
        </h2>
        <p className="mt-5 text-ink-900/60 leading-relaxed max-w-md">{copy.body}</p>

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
                {copy.selectedDesign}
              </div>
              <div className="font-serif-display text-2xl font-light text-ink-900">
                {design.title}
              </div>
              <p className="mt-1 text-sm text-ink-900/55">{design.location}</p>
              <Link
                href={exploreHref}
                className="mt-3 inline-block text-[11px] tracking-widest-2 uppercase text-ink-900/55 hover:text-terracotta-500 transition-colors"
              >
                {copy.changeDesign}
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink-900/55 leading-relaxed">
            {copy.noDesign}{" "}
            <Link href="/services#designs" className="underline hover:text-terracotta-500">
              {copy.browseDesigns}
            </Link>{" "}
            {copy.noDesignRest}
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
                {copy.name}
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
                {copy.phone}
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

          <label className="block">
            <span className="text-[11px] tracking-widest-2 uppercase text-ink-900/45">
              {copy.message} <span className="text-ink-900/30">{copy.optional}</span>
            </span>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copy.messagePlaceholder}
              className="mt-2 w-full border border-ink-900/10 bg-bone-50 px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-ink-900/40 resize-none"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-bone-50 px-6 py-3 text-[13px] tracking-wide uppercase hover:bg-terracotta-500 transition-colors disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-bone-50/40 border-t-bone-50 rounded-full animate-spin" />
                  {copy.sending}
                </>
              ) : (
                <>
                  {copy.send}
                  <i className="ri-arrow-right-line text-base" />
                </>
              )}
            </button>
            <a
              href={INQUIRY_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 px-6 py-3 text-[13px] tracking-wide uppercase text-ink-900 hover:border-ink-900/40 transition-colors"
            >
              <i className="ri-telegram-fill text-base" />
              {copy.telegram}
            </a>
          </div>

          <p className="text-[11px] tracking-wide text-ink-900/45 leading-relaxed">
            {design ? copy.privacyWithDesign : copy.privacy}
          </p>
        </form>
      </div>
    </div>
  );
}
