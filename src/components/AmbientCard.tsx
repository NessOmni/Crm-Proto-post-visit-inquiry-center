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
  avatarInitials,
  title,
  body,
  cta,
  source,
  triggers,
  scope,
}: {
  variant: CardVariant;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  workflow: string;
  subject: string;
  thumbUrl?: string;
  /** Teammate-attributed card: an avatar leads instead of an icon tile. */
  avatarInitials?: string;
  title: string;
  body: string;
  cta: string;
  source?: string;
  /** Why each item surfaced now — the proof it's not a timed blast. */
  triggers?: string[];
  /** A subtle visibility-scope cue, e.g. "shared listing". */
  scope?: string;
}) {
  const chips = triggers && triggers.length > 0;
  return (
    <BriefingCard
      variant={variant}
      accent="drafted"
      tag="Drafted · to approve"
      Icon={Icon}
      workflow={workflow}
      subject={subject}
      photoUrl={thumbUrl}
      avatarInitials={avatarInitials}
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
      {(chips || scope) && (
        <div className="trigger-chips">
          {triggers?.map((t) => (
            <span key={t} className="trigger-chip">
              trigger: {t}
            </span>
          ))}
          {scope && <span className="trigger-chip">{scope}</span>}
        </div>
      )}
    </BriefingCard>
  );
}
