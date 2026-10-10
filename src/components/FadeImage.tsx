"use client";

import Image from "next/image";
import { useState } from "react";

type FadeImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Start fetching as soon as the page loads (even below the fold). */
  eager?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export function FadeImage({
  src,
  alt,
  className = "",
  sizes,
  eager = false,
  fill = true,
  width,
  height,
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={
        fill
          ? // Parent must be position:relative with a real height (aspect-*, h-*, min-h-*).
            "absolute inset-0 overflow-hidden bg-bone-200"
          : "relative overflow-hidden bg-bone-200 w-full h-full"
      }
    >
      {!loaded && (
        <div className="absolute inset-0 shimmer z-10 pointer-events-none" aria-hidden />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
