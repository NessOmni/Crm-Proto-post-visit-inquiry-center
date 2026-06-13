/* The overnight-burst card — calm, Automatic · handled. A small
   listing thumbnail (subject) + users workflow icon (work-type).
   "See the 6" opens the Lead Lens on demand. */
import { useDemo } from "../../state/DemoContext";
import { flow2 } from "../../data/fixtures";
import { Avatar } from "./Avatar";
import { CardThumb } from "../CardThumb";
import { IconUsers, IconArrow } from "../icons";

export function BurstCard() {
  const { substrate, openLens } = useDemo();
  const bien = substrate.biens.find((b) => b.id === flow2.bienId)!;
  // Ranked warmest-first; the preview shows the top lead.
  const ranked = [...substrate.leads].sort((a, b) => b.score - a.score);
  const top = ranked[0];
  const autoSent = ranked.filter((l) => l.disposition === "auto-sent").length;
  const heldFor = ranked.filter((l) => l.disposition === "held").length;

  return (
    <article className="card burst" aria-label="Overnight lead burst">
      <div className="burst__head">
        <CardThumb url={bien.photoUrl} Icon={IconUsers} alt={bien.address} seed={1} />
        <div className="burst__heading">
          <span className="card-eyebrow">
            <IconUsers className="card-eyebrow__icon" />
            <span className="card-eyebrow__wf">Overnight ·</span>
            <span className="card-eyebrow__subject">{bien.address}</span>
          </span>
          <h2 className="burst__title">
            {flow2.rankedCount} new leads, sorted before you woke up.
          </h2>
        </div>
        <span className="badge badge--auto">Automatic · handled</span>
      </div>

      <p className="burst__summary">
        {flow2.arrivedCount} enquiries arrived overnight. Your assistant
        deduplicated {flow2.dedupedCount}, answered {autoSent} warm leads on its
        own, and held {heldFor} for your call — ranked and ready to review.
      </p>

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

      <div className="burst__actions">
        <button className="btn btn--primary" onClick={openLens}>
          <IconUsers width={16} height={16} />
          See the {flow2.rankedCount}
          <IconArrow />
        </button>
        <span className="kicker">{flow2.acknowledgedAt}</span>
      </div>
    </article>
  );
}
