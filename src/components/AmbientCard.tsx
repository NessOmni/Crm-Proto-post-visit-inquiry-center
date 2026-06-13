/* Ambient breadth card — a compact variant of the hero decision card.
   Subject channel: leading 52px thumbnail (photo or workflow-icon tile).
   Work-type channel: workflow icon + label in the eyebrow.
   Autonomy channel: the accent line + tier tag (unchanged).
   Present to show range; its CTA is inert. */
import type { ComponentType, SVGProps } from "react";
import { CardThumb } from "./CardThumb";
import { IconArrow } from "./icons";

export function AmbientCard({
  Icon,
  workflow,
  subject,
  thumbUrl,
  title,
  body,
  cta,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  workflow: string;
  subject: string;
  thumbUrl?: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <article className="ambient" aria-label={title}>
      <div className="ambient__top">
        <CardThumb url={thumbUrl} Icon={Icon} alt={subject} seed={3} />
        <div className="ambient__heading">
          <span className="card-eyebrow">
            <Icon className="card-eyebrow__icon" />
            <span className="card-eyebrow__wf">{workflow} ·</span>
            <span className="card-eyebrow__subject">{subject}</span>
          </span>
          <h3 className="ambient__title">{title}</h3>
        </div>
        <span className="badge badge--drafted">Drafted · to approve</span>
      </div>
      <p className="ambient__body">{body}</p>
      {/* Inert — exists to be seen, not clicked, in this demo. */}
      <button type="button" className="ambient__cta">
        {cta} <IconArrow />
      </button>
    </article>
  );
}
