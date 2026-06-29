/* Property photography with a graceful gradient fallback.
   If the CDN image is unavailable (offline), the warm gradient
   carries the art direction on its own. While a real photo decodes
   the frame shimmers and the image fades in — the container always
   reserves space, so nothing jumps. */
import { useEffect, useRef, useState } from "react";

export function Photo({
  url,
  alt,
  className = "",
  seed = 0,
}: {
  url?: string;
  alt: string;
  className?: string;
  seed?: number;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const show = url && !failed;

  // Cached images can finish before React attaches onLoad — catch that.
  useEffect(() => {
    setLoaded(false);
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [url]);

  return (
    <div
      className={`photo ${className} ${show ? "" : "photo--fallback"} ${
        show && !loaded ? "photo--loading" : ""
      } ${loaded ? "photo--loaded" : ""}`}
      data-seed={seed % 3}
      role="img"
      aria-label={alt}
    >
      {show && (
        <img
          ref={imgRef}
          src={url}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
