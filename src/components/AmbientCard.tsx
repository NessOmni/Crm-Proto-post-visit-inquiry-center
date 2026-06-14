/* Ambient breadth card — a standard card via the shared shell, with a
   ghost/text CTA. Present to show range; its CTA is inert. */
import type { ComponentType, SVGProps } from "react";
import type { CardVariant } from "./BriefingCard";
import { BriefingCard } from "./BriefingCard";
import { IconArrow } from "./icons";

export function AmbientCard({
  variant,
  Icon,
  workflow,
  subject,
  thumbUrl,
  title,
  body,
  cta,
  source,
  triggers,
}: {
  variant: CardVariant;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  workflow: string;
  subject: string;
  thumbUrl?: string;
  title: string;
  body: string;
  cta: string;
  source?: string;
  /** Why each item surfaced now — the proof it's not a timed blast. */
  triggers?: string[];
}) {
  return (
    <BriefingCard
      variant={variant}
      accent="drafted"
      tag="Drafted · to approve"
      Icon={Icon}
      workflow={workflow}
      subject={subject}
      photoUrl={thumbUrl}
      title={title}
      body={body}
      source={source}
      footer={
        // Inert — exists to be seen, not clicked, in this demo.
        <button type="button" className="bcard__cta">
          {cta} <IconArrow />
        </button>
      }
    >
      {triggers && triggers.length > 0 && (
        <div className="trigger-chips">
          {triggers.map((t) => (
            <span key={t} className="trigger-chip">
              trigger: {t}
            </span>
          ))}
        </div>
      )}
    </BriefingCard>
  );
}
