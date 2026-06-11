/* One lead in the ranked list — status dot, avatar, portal badge,
   warmth signals, score. */
import type { Lead } from "../../data/types";
import { Avatar } from "./Avatar";

export function LeadRow({
  lead,
  rank,
  selected,
  onSelect,
}: {
  lead: Lead;
  rank: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const dotClass =
    lead.warmth === "hot"
      ? "lead-row__dot--hot"
      : lead.warmth === "tepid"
        ? "lead-row__dot--tepid"
        : "";

  return (
    <button
      className={`lead-row ${selected ? "lead-row--selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="lead-row__rank">{rank}</span>
      <span
        className={`lead-row__dot ${dotClass}`}
        title={`Status: ${lead.status}`}
      />
      <Avatar initials={lead.initials} size="sm" />
      <span className="lead-row__main">
        <span className="lead-row__name">
          {lead.firstName} {lead.lastName}
          <span className="portal">{lead.portal}</span>
        </span>
        <span className="lead-row__sig">{lead.signals.join(" · ")}</span>
      </span>
      <span className="lead-row__score">{lead.score}</span>
    </button>
  );
}
