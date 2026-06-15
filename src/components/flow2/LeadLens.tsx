/* The Lead Lens — a full-area takeover the agent chose to open.
   Left rail: a two-level grouping — market tab (Location / Vente) →
   address blocks → leads. Selecting one opens its detail. */
import { useEffect, useState } from "react";
import type { Lead, TransactionType } from "../../data/types";
import { useDemo } from "../../state/DemoContext";
import { flow2, voiceScenarios } from "../../data/fixtures";
import { LeadRow } from "./LeadRow";
import { LeadDetail } from "./LeadDetail";
import { Photo } from "../Photo";
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

  const [tab, setTab] = useState<TransactionType>("rental");

  // Esc returns to the briefing — unless a voice moment is open over it.
  useEffect(() => {
    if (!lensOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !voiceScenario) closeLens();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lensOpen, closeLens, voiceScenario]);

  // Closing (incl. Replay) resets the tab to the default market.
  useEffect(() => {
    if (!lensOpen) setTab("rental");
  }, [lensOpen]);

  if (!lensOpen) return null;

  const byScore = [...substrate.leads].sort((a, b) => b.score - a.score);
  const rental = byScore.filter((l) => l.transactionType === "rental");
  const sale = byScore.filter((l) => l.transactionType === "sale");
  const autoSent = byScore.filter((l) => l.disposition === "auto-sent").length;
  const heldFor = byScore.filter((l) => l.disposition === "held").length;
  const listings = new Set(byScore.map((l) => l.bienId)).size;

  const selected = byScore.find((l) => l.id === selectedLeadId) ?? byScore[0];

  // Group the active tab's leads by listing, ordered by warmth.
  const tabLeads = tab === "rental" ? rental : sale;
  const groupMap = new Map<string, Lead[]>();
  tabLeads.forEach((l) => {
    const arr = groupMap.get(l.bienId) ?? [];
    arr.push(l);
    groupMap.set(l.bienId, arr);
  });
  const groups = [...groupMap.entries()]
    .map(([bienId, leads]) => ({
      bien: substrate.biens.find((b) => b.id === bienId)!,
      leads,
    }))
    .sort((a, b) => b.leads[0].score - a.leads[0].score);

  const switchTab = (t: TransactionType) => {
    if (t === tab) return;
    setTab(t);
    const first = (t === "rental" ? rental : sale)[0];
    if (first) selectLead(first.id);
  };

  const specLine = (b: (typeof substrate.biens)[number]) =>
    b.kind === "rental"
      ? `${b.surfaceM2} m² · ${b.priceEur.toLocaleString("fr-FR")} €/mo`
      : `${b.surfaceM2} m² · ${b.priceEur.toLocaleString("fr-FR")} €`;

  return (
    <section className="lens" role="dialog" aria-modal="true" aria-label="Lead Lens">
      <header className="lens__bar">
        <div>
          <span className="kicker">Lead Lens · Inquiry Center</span>
          <h2 className="lens__heading">{flow2.rankedCount} warm leads</h2>
          <span className="lens__split">
            {autoSent} replied automatically · {heldFor} held for your call ·{" "}
            {listings} listings
          </span>
        </div>
        <button className="lens__close" onClick={closeLens}>
          <IconClose />
          Back to briefing
        </button>
      </header>

      <div className="lens__grid">
        <div className="lens__list">
          {/* Market split — the top-level "which section am I in". */}
          <div className="lens__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === "rental"}
              className={`seg ${tab === "rental" ? "seg--active" : ""}`}
              onClick={() => switchTab("rental")}
            >
              Location · {rental.length}
            </button>
            <button
              role="tab"
              aria-selected={tab === "sale"}
              className={`seg ${tab === "sale" ? "seg--active" : ""}`}
              onClick={() => switchTab("sale")}
            >
              Vente · {sale.length}
            </button>
          </div>

          {groups.map((g) => (
            <div className="lgroup" key={g.bien.id}>
              <div className="lgroup__head">
                <Photo
                  url={g.bien.photoUrl}
                  alt={g.bien.address}
                  className="lgroup__thumb"
                  seed={1}
                />
                <div className="lgroup__meta">
                  <div className="lgroup__addr">{g.bien.address}</div>
                  <div className="lgroup__spec">
                    {specLine(g.bien)} · {g.leads.length} leads
                  </div>
                </div>
              </div>
              <div className="lgroup__leads">
                {g.leads.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    selected={lead.id === selected.id}
                    onSelect={() => selectLead(lead.id)}
                  />
                ))}
              </div>
            </div>
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
