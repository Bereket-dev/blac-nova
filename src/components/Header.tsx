"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage, useUi } from "@/lib/language";

type HeaderProps = {
  /** Always use the light solid header (for inner pages without a dark hero). */
  solid?: boolean;
};

export function Header({ solid = false }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLanguage();
  const ui = useUi();

  const nav = [
    { href: "/", label: ui.nav.home },
    { href: "/projects", label: ui.nav.projects },
    { href: "/services", label: ui.nav.services },
    { href: "/about", label: ui.nav.about },
    { href: "/about#inquire", label: ui.nav.inquire },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onLight = solid || scrolled || open || pathname !== "/";
  const text = onLight ? "text-ink-900" : "text-bone-50";
  const hover = onLight ? "hover:text-ink-900/70" : "hover:text-bone-200";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        onLight ? "bg-bone-50/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-14 h-20">
        <Link
          href="/"
          className="relative flex items-center shrink-0 h-12 md:h-14"
          aria-label="Blac Nova Homes home"
        >
          <Image
            src={onLight ? "/logo-mark.png" : "/logo-mark-light.png"}
            alt="Blac Nova Homes"
            width={1019}
            height={790}
            priority
            className="h-12 md:h-14 w-auto object-contain object-left"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] tracking-wide uppercase transition-colors whitespace-nowrap ${text} ${hover}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] tracking-widest-2 uppercase font-medium transition-colors border ${
              onLight
                ? "border-ink-900/15 text-ink-900 hover:border-ink-900/40"
                : "border-bone-50/30 text-bone-50 hover:border-bone-50/60"
            }`}
            aria-label={lang === "en" ? ui.nav.switchToAm : ui.nav.switchToEn}
            title={lang === "en" ? ui.nav.switchToAmTitle : ui.nav.switchToEnTitle}
          >
            <span>{lang === "en" ? "EN" : "አማ"}</span>
            <i className="ri-translate-2 text-sm" />
          </button>

          <Link
            href="/about#inquire"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] tracking-wide uppercase transition-all duration-300 whitespace-nowrap bg-bone-50 text-ink-900 hover:bg-terracotta-500 hover:text-bone-50"
          >
            {ui.nav.projectInquiry}
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>

        <button
          type="button"
          className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full ${text}`}
          aria-label={open ? ui.nav.closeMenu : ui.nav.menu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`text-2xl ${open ? "ri-close-line" : "ri-menu-line"}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-900/8 bg-bone-50 px-6 pb-8 pt-4">
          <nav className="flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide uppercase text-ink-900"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/about#inquire"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-[13px] tracking-wide uppercase text-bone-50"
              onClick={() => setOpen(false)}
            >
              {ui.nav.projectInquiry}
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 px-5 py-2.5 text-[13px] tracking-wide uppercase text-ink-900"
            >
              <i className="ri-translate-2 text-base" />
              {lang === "en" ? ui.nav.amharicLabel : ui.nav.englishLabel}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
