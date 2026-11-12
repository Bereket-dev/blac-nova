"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // When the image is served from the browser cache, the browser may decode
    // it synchronously and never fire the `onLoad` event. Check img.complete
    // after mount so cached images are never stuck invisible.
    const img = imgRef.current;
    if (img?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className={
        fill
          ? // Parent must be position:relative with a real height (aspect-*, h-*, min-h-*).
            "absolute inset-0 overflow-hidden bg-bone-200"
          : "relative overflow-hidden bg-bone-200 w-full"
      }
    >
      {!loaded && (
        <div className="absolute inset-0 shimmer z-10 pointer-events-none" aria-hidden />
      )}
      <Image
        ref={imgRef}
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
