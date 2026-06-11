/* The overnight-burst card — collapsed, calm, Automatic · handled.
   "See the 6" opens the Lead Lens on demand. */
import { useDemo } from "../../state/DemoContext";
import { flow2 } from "../../data/fixtures";
import { Avatar } from "./Avatar";
import { IconUsers, IconArrow } from "../icons";

export function BurstCard() {
  const { substrate, openLens } = useDemo();
  // Ranked warmest-first; the preview shows the top lead.
  const ranked = [...substrate.leads].sort((a, b) => b.score - a.score);
  const top = ranked[0];

  return (
    <article className="card burst" aria-label="Overnight lead burst">
      <div className="burst__top">
        <span className="kicker">Overnight · {substrate.biens.find((b) => b.id === flow2.bienId)?.address}</span>
        <span className="badge badge--auto">Automatic · handled</span>
      </div>

      <h2 className="burst__title">
        {flow2.rankedCount} new leads, sorted before you woke up.
      </h2>
      <p className="burst__summary">
        {flow2.arrivedCount} enquiries arrived overnight. Your assistant
        deduplicated {flow2.dedupedCount}, acknowledged each one, and ranked the{" "}
        {flow2.rankedCount} warmest by likelihood to convert.
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
