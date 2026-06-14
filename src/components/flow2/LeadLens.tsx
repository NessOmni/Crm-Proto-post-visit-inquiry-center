/* The Lead Lens — a full-area takeover the agent chose to open.
   A ranked list of the warm leads; selecting one opens its detail.
   Closing returns to the calm briefing. It is not an inbox. */
import { useEffect } from "react";
import { useDemo } from "../../state/DemoContext";
import { flow2, voiceScenarios } from "../../data/fixtures";
import { LeadRow } from "./LeadRow";
import { LeadDetail } from "./LeadDetail";
import { ConversationBar } from "../ConversationBar";
import { IconClose } from "../icons";

export function LeadLens() {
  const {
    substrate,
    lensOpen,
    selectedLeadId,
    selectLead,
    closeLens,
    voiceScenario,
    startVoice,
  } = useDemo();

  // Esc returns to the briefing — unless a voice moment is open over it.
  useEffect(() => {
    if (!lensOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !voiceScenario) closeLens();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lensOpen, closeLens, voiceScenario]);

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

      {/* Record-scoped voice — the same persistent dock, pre-scoped to the
          selected lead. The scripted dictation is wired for Antoine David. */}
      <div className="dock">
        <ConversationBar
          placeholder={`Dictate a note or update for ${selected.firstName} ${selected.lastName}…`}
          onDictate={
            voiceScenarios[`record-${selected.id.replace("lead-", "")}`]
              ? () => startVoice(`record-${selected.id.replace("lead-", "")}`)
              : undefined
          }
        />
      </div>
    </section>
  );
}
