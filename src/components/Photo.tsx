/* Property photography with a graceful gradient fallback.
   If the CDN image is unavailable (offline), the warm gradient
   carries the art direction on its own. */
import { useState } from "react";

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
  const show = url && !failed;
  return (
    <div
      className={`photo ${className} ${show ? "" : "photo--fallback"}`}
      data-seed={seed % 3}
      role="img"
      aria-label={alt}
    >
      {show && (
        <img
          src={url}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
