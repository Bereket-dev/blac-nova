/**
 * Avatar for a testimonial. Shows the uploaded photo when available, or a
 * sex-appropriate illustrated fallback when it is missing / fails to load.
 */

"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/types";

// --- SVG fallback illustrations -----------------------------------------

function MaleAvatar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#D1C7BC" />
      {/* torso / shirt */}
      <path
        d="M8 44c0-8.837 7.163-14 16-14s16 5.163 16 14"
        fill="#7C6C5B"
      />
      {/* head */}
      <circle cx="24" cy="18" r="9" fill="#C4A882" />
      {/* hair */}
      <path
        d="M15 17c0-5 4-9 9-9s9 4 9 9"
        fill="#4A3728"
      />
    </svg>
  );
}

function FemaleAvatar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#E8D5CC" />
      {/* torso / blouse */}
      <path
        d="M8 44c0-8.837 7.163-14 16-14s16 5.163 16 14"
        fill="#C47B8A"
      />
      {/* head */}
      <circle cx="24" cy="18" r="9" fill="#D4A882" />
      {/* hair */}
      <path
        d="M15 17c0-5.5 4-10 9-10s9 4.5 9 10c0 0 1 3-1 4-2-5-14-5-16 0-2-1-1-4-1-4z"
        fill="#3D2314"
      />
    </svg>
  );
}

function NeutralAvatar({ size, initial }: { size: number; initial: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#D6D0C8" />
      {/* torso */}
      <path d="M8 44c0-8.837 7.163-14 16-14s16 5.163 16 14" fill="#9E9488" />
      {/* head */}
      <circle cx="24" cy="18" r="9" fill="#B8A898" />
      {/* initial */}
      <text
        x="24"
        y="23"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fontWeight="600"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
      >
        {initial.toUpperCase()}
      </text>
    </svg>
  );
}

// --- Component ----------------------------------------------------------

type Props = {
  testimonial: Pick<Testimonial, "name" | "avatar" | "sex">;
  /** px diameter — same value used for width/height */
  size?: number;
  className?: string;
};

export function TestimonialAvatar({ testimonial, size = 40, className = "" }: Props) {
  const [imgError, setImgError] = useState(false);

  const showImage = testimonial.avatar && !imgError;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        width={size}
        height={size}
        onError={() => setImgError(true)}
        className={`rounded-full object-cover object-top bg-gray-100 shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={`rounded-full overflow-hidden shrink-0 inline-flex ${className}`}
      style={{ width: size, height: size }}
    >
      {testimonial.sex === "female" ? (
        <FemaleAvatar size={size} />
      ) : (
        <MaleAvatar size={size} />
      )}
    </span>
  );
}
