/* One lead in a listing group. The status dot and tag read the
   assistant's disposition — auto-sent (green) vs held for you (amber).
   No rank number and no market chip: the tab + address now carry the
   market and listing; the warmth score stays. */
import type { Lead } from "../../data/types";
import { Avatar } from "./Avatar";

export function LeadRow({
  lead,
  selected,
  onSelect,
}: {
  lead: Lead;
  selected: boolean;
  onSelect: () => void;
}) {
  const held = lead.disposition === "held";

  return (
    <button
      className={`lead-row ${selected ? "lead-row--selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span
        className={`lead-row__dot ${held ? "lead-row__dot--held" : "lead-row__dot--sent"}`}
        title={held ? "Held for you" : "Reply sent automatically"}
      />
      <Avatar initials={lead.initials} size="sm" />
      <span className="lead-row__main">
        <span className="lead-row__name">
          <span className="lead-row__person">
            {lead.firstName} {lead.lastName}
          </span>
          <span className="portal">{lead.portal}</span>
        </span>
        <span className="lead-row__sig">{lead.signals.join(" · ")}</span>
      </span>
      <span className="lead-row__end">
        <span className="lead-row__score">{lead.score}</span>
        <span className={`lead-tag ${held ? "lead-tag--held" : "lead-tag--sent"}`}>
          {held ? "Held for you" : "Sent"}
        </span>
      </span>
    </button>
  );
}
