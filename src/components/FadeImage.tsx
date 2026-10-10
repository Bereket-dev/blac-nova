"use client";

import Image from "next/image";
import { useState } from "react";

type FadeImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export function FadeImage({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
  fill = true,
  width,
  height,
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-bone-200 absolute inset-0">
      {!loaded && <div className="absolute inset-0 shimmer z-10" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
