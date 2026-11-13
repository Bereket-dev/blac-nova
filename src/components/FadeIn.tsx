"use client";

import { useEffect, useRef, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "section" | "article" | "p" | "blockquote";
};

export function FadeIn({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: FadeInProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      if (delayMs > 0) {
        window.setTimeout(() => el.classList.add("is-visible"), delayMs);
      } else {
        el.classList.add("is-visible");
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    // If the element is already in the viewport when the observer attaches
    // (e.g. the browser restored scroll position on a normal reload), the
    // intersection callback may not fire because nothing crossed the threshold.
    // Check immediately via getBoundingClientRect so above-fold content is
    // never stuck invisible.
    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.92 && // accounts for the -8% rootMargin
      rect.bottom > 0;
    if (inView) {
      show();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <Tag ref={ref as never} className={`fade-up ${className}`}>
      {children}
    </Tag>
  );
}
