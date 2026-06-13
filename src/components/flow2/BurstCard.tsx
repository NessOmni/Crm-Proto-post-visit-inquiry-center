/* The overnight-burst card — a standard card via the shared shell.
   Keeps its internal warmest-lead row; not a second spotlight. */
import type { CardVariant } from "../BriefingCard";
import { BriefingCard } from "../BriefingCard";
import { useDemo } from "../../state/DemoContext";
import { flow2 } from "../../data/fixtures";
import { Avatar } from "./Avatar";
import { IconUsers, IconArrow } from "../icons";

export function BurstCard({ variant }: { variant: CardVariant }) {
  const { substrate, openLens } = useDemo();
  const bien = substrate.biens.find((b) => b.id === flow2.bienId)!;
  // Ranked warmest-first; the preview shows the top lead.
  const ranked = [...substrate.leads].sort((a, b) => b.score - a.score);
  const top = ranked[0];
  const autoSent = ranked.filter((l) => l.disposition === "auto-sent").length;
  const heldFor = ranked.filter((l) => l.disposition === "held").length;

  return (
    <BriefingCard
      variant={variant}
      accent="automatic"
      tag="Automatic · handled"
      Icon={IconUsers}
      workflow="Overnight"
      subject="across your listings"
      photoUrl={bien.photoUrl}
      title={`${flow2.rankedCount} new leads, sorted before you woke up.`}
      body={`${flow2.arrivedCount} enquiries arrived overnight. Your assistant deduplicated ${flow2.dedupedCount}, answered ${autoSent} warm leads on its own, and held ${heldFor} for your call — ranked and ready to review.`}
      ariaLabel="Overnight lead burst"
      footer={
        <>
          <button className="btn btn--primary" onClick={openLens}>
            <IconUsers width={16} height={16} />
            See the {flow2.rankedCount}
            <IconArrow />
          </button>
          <span className="kicker">{flow2.acknowledgedAt}</span>
        </>
      }
    >
      <div className="burst__preview">
        <Avatar initials={top.initials} size="sm" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="burst__preview-label">Warmest lead</span>
          <div>
            <span className="burst__preview-name">
              {top.firstName} {top.lastName}
            </span>{" "}
            <span className="burst__preview-sig">— {top.signals[0]}</span>
          </div>
        </div>
        <span className="lead-row__score">{top.score}</span>
      </div>
    </BriefingCard>
  );
}
