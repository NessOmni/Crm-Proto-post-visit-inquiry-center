/* Leading card thumbnail — the SUBJECT recognition channel.
   A small rounded property photo when one exists, otherwise a
   workflow-icon tile on a neutral grey square (never a tier colour). */
import type { ComponentType, SVGProps } from "react";
import { Photo } from "./Photo";

export function CardThumb({
  url,
  Icon,
  alt = "",
  seed = 0,
}: {
  url?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  alt?: string;
  seed?: number;
}) {
  if (url) {
    return <Photo url={url} alt={alt} className="cardthumb" seed={seed} />;
  }
  return (
    <span className="cardthumb cardthumb--tile" aria-hidden="true">
      <Icon />
    </span>
  );
}
