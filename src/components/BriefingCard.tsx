/* The one briefing-card shell. A single `variant` drives the whole
   hierarchy — and ONLY the leading media + title size:
     spotlight → full-bleed property photo + larger title
     standard  → 52px leading token + normal title
   Everything else (eyebrow → title → body → outputs → footer) is the
   shared anatomy. The tier (accent) drives the accent line + tag, as
   it always has. Colour = autonomy tier only. */
import type { ComponentType, ReactNode, SVGProps } from "react";
import { Photo } from "./Photo";
import { CardThumb } from "./CardThumb";
import { CardOutputs, type CardOutput } from "./CardOutputs";
import { SourceChip } from "./SourceChip";

export type CardVariant = "spotlight" | "standard";
export type CardAccent = "drafted" | "automatic";

export interface BriefingCardProps {
  variant: CardVariant;
  accent: CardAccent;
  tag: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  workflow: string;
  subject: string;
  /** Listing photo: a full-bleed banner (spotlight) or a 52px thumb
   *  (standard). When absent on a standard card, a workflow-icon tile
   *  stands in. */
  photoUrl?: string;
  title: string;
  body?: ReactNode;
  outputs?: CardOutput[];
  /** Extra content between body and outputs (e.g. a warmest-lead row). */
  children?: ReactNode;
  /** Footer content — the CTA(s) + any meta. Styling kept per-card. */
  footer?: ReactNode;
  /** Provenance chip in the footer, when the card was enriched. */
  source?: string;
  ariaLabel?: string;
}

function Eyebrow({
  Icon,
  workflow,
  subject,
}: Pick<BriefingCardProps, "Icon" | "workflow" | "subject">) {
  return (
    <span className="card-eyebrow">
      <Icon className="card-eyebrow__icon" />
      <span className="card-eyebrow__wf">{workflow} ·</span>
      <span className="card-eyebrow__subject">{subject}</span>
    </span>
  );
}

export function BriefingCard({
  variant,
  accent,
  tag,
  Icon,
  workflow,
  subject,
  photoUrl,
  title,
  body,
  outputs,
  children,
  footer,
  source,
  ariaLabel,
}: BriefingCardProps) {
  const badgeClass = accent === "drafted" ? "badge--drafted" : "badge--auto";
  const spotlight = variant === "spotlight";

  return (
    <article
      className={`bcard bcard--${variant} bcard--${accent}`}
      aria-label={ariaLabel ?? title}
    >
      {spotlight && (
        <Photo url={photoUrl} alt={subject} className="bcard__banner" seed={2} />
      )}

      <div className="bcard__body">
        {spotlight ? (
          // Full photo carries the subject; eyebrow + tag row, title below.
          <>
            <div className="bcard__top">
              <Eyebrow Icon={Icon} workflow={workflow} subject={subject} />
              <span className={`badge ${badgeClass}`}>{tag}</span>
            </div>
            <h2 className="bcard__title">{title}</h2>
          </>
        ) : (
          // Leading token left; eyebrow + title beside it; tag right.
          <div className="bcard__top">
            <CardThumb url={photoUrl} Icon={Icon} alt={subject} seed={3} />
            <div className="bcard__heading">
              <Eyebrow Icon={Icon} workflow={workflow} subject={subject} />
              <h3 className="bcard__title">{title}</h3>
            </div>
            <span className={`badge ${badgeClass}`}>{tag}</span>
          </div>
        )}

        {body && <div className="bcard__text">{body}</div>}
        {children}
        <CardOutputs outputs={outputs} />
        {(footer || source) && (
          <div className="bcard__footer">
            {source && <SourceChip source={source} />}
            {footer}
          </div>
        )}
      </div>
    </article>
  );
}
