"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

const explore = [
  { href: "#residences", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#journal", label: "Journal" },
  { href: "#inquiry", label: "Inquiry" },
];

const social = [
  {
    href: "https://www.tiktok.com/@blacnova6",
    icon: "ri-tiktok-fill",
    label: "TikTok",
  },
  {
    href: "https://t.me/+251911369200",
    icon: "ri-telegram-fill",
    label: "Telegram",
  },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-bone-50 px-3 md:px-5 pb-5 pt-12 relative z-10">
      <div className="relative bg-ink-900 text-bone-50 rounded-3xl overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="relative px-8 md:px-12 lg:px-16 pt-16 md:pt-20 pb-44 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Image
              src="/logo-light.png"
              alt="Blac Nova"
              width={1019}
              height={942}
              className="h-28 md:h-32 w-auto object-contain object-left"
            />
            <p className="mt-8 text-bone-100/55 text-sm max-w-sm leading-relaxed">
              Blac Nova is a construction and design company delivering residences,
              landscapes, and refined spaces. Crafted with precision — lived in with pride.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] tracking-widest-2 uppercase text-bone-50/45 mb-5">
              Explore
            </div>
            <ul className="space-y-3 text-sm">
              {explore.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-bone-100/85 hover:text-terracotta-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] tracking-widest-2 uppercase text-bone-50/45 mb-5">
              Follow
            </div>
            <ul className="space-y-3 text-sm">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-bone-100/85 hover:text-terracotta-400 transition-colors"
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      <i className={`${item.icon} text-base`} />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] tracking-widest-2 uppercase text-bone-50/45 mb-3">
              The quarterly letter
            </div>
            <p className="text-sm text-bone-100/65 mb-5 leading-relaxed">
              Four times a year. New projects, essays on materials and method, and homes we
              cannot stop thinking about.
            </p>
            {subscribed ? (
              <p className="text-sm text-terracotta-400">Thank you — you&apos;re on the list.</p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 bg-ink-700 rounded-full p-1.5 border border-bone-50/8"
              >
                <input
                  required
                  placeholder="Your email"
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-bone-50 placeholder-bone-50/40 focus:outline-none"
                  type="email"
                  name="email"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-bone-50 text-ink-900 hover:bg-terracotta-500 hover:text-bone-50 transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <i className="ri-arrow-right-line text-lg" />
                </button>
              </form>
            )}
            <div className="mt-6 flex items-center gap-3 text-[11px] tracking-wide text-bone-50/45">
              <i className="ri-shield-check-line" /> No sharing, ever. Unsubscribe in one
              click.
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
          <div className="font-serif-display text-[18vw] md:text-[14vw] leading-[0.85] tracking-[-0.04em] text-bone-50/[0.04] text-center select-none whitespace-nowrap">
            Blac Nova
          </div>
        </div>

        <div className="relative border-t border-bone-50/8 px-8 md:px-12 lg:px-16 py-6 flex items-center justify-between flex-wrap gap-3 text-[11px] tracking-wide text-bone-50/40">
          <div>© 2026 Blac Nova Construction & Design Ltd.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-bone-50">
              Privacy
            </a>
            <a href="#" className="hover:text-bone-50">
              Terms
            </a>
            <a href="#" className="hover:text-bone-50">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
