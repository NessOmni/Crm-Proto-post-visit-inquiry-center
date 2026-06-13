/* The Lead Lens — a full-area takeover the agent chose to open.
   A ranked list of the warm leads; selecting one opens its detail.
   Closing returns to the calm briefing. It is not an inbox. */
import { useEffect } from "react";
import { useDemo } from "../../state/DemoContext";
import { flow2 } from "../../data/fixtures";
import { LeadRow } from "./LeadRow";
import { LeadDetail } from "./LeadDetail";
import { IconClose } from "../icons";

export function LeadLens() {
  const { substrate, lensOpen, selectedLeadId, selectLead, closeLens } = useDemo();

  // Esc returns to the briefing.
  useEffect(() => {
    if (!lensOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLens();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lensOpen, closeLens]);

  if (!lensOpen) return null;

  const ranked = [...substrate.leads].sort((a, b) => b.score - a.score);
  const selected =
    ranked.find((l) => l.id === selectedLeadId) ?? ranked[0];

  const autoSent = ranked.filter((l) => l.disposition === "auto-sent").length;
  const heldFor = ranked.filter((l) => l.disposition === "held").length;

  return (
    <section className="lens" role="dialog" aria-modal="true" aria-label="Lead Lens">
      <header className="lens__bar">
        <div>
          <span className="kicker">Lead Lens · Inquiry Center</span>
          <h2 className="lens__heading">
            {flow2.rankedCount} warm leads, ranked
          </h2>
          <span className="lens__split">
            {autoSent} replied automatically · {heldFor} held for your call
          </span>
        </div>
        <button className="lens__close" onClick={closeLens}>
          <IconClose />
          Back to briefing
        </button>
      </header>

      <div className="lens__grid">
        <div className="lens__list">
          <div className="kicker lens__list-label">Ranked</div>
          {ranked.map((lead, i) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              rank={i + 1}
              selected={lead.id === selected.id}
              onSelect={() => selectLead(lead.id)}
            />
          ))}
        </div>

        <LeadDetail key={selected.id} lead={selected} />
      </div>
    </section>
  );
}
