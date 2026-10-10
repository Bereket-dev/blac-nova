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
    <div className="relative overflow-hidden bg-bone-200 absolute inset-0">
      {!loaded && <div className="absolute inset-0 shimmer z-10 pointer-events-none" />}
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
        className={`transition-opacity duration-500 ease-out opacity-100 ${className}`}
      />
    </div>
  );
}
