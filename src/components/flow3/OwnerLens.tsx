/* The Owner Lens — the symmetric twin of the Lead Lens. A full-area
   takeover the agent chose to open (from the Mandat nav item, or the owner
   card). Buyer depth ↔ owner depth. List of active mandates sorted by
   health; selecting one opens its detail. Esc returns to the calm briefing
   — it is depth on pull, never an inbox. */
import { useEffect } from "react";
import { useDemo } from "../../state/DemoContext";
import { flow3 } from "../../data/fixtures";
import { MandateRow } from "./MandateRow";
import { MandateDetail } from "./MandateDetail";
import { IconClose } from "../icons";

const HEALTH_ORDER = { overdue: 0, watch: 1, "on-track": 2 } as const;

export function OwnerLens() {
  const { ownerLensOpen, selectedMandateId, selectMandate, closeOwnerLens } =
    useDemo();

  // Esc returns to the briefing.
  useEffect(() => {
    if (!ownerLensOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOwnerLens();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ownerLensOpen, closeOwnerLens]);

  if (!ownerLensOpen) return null;

  // Sorted by health: the overdue one rises to the top.
  const stats = [...flow3.mandates].sort(
    (a, b) =>
      HEALTH_ORDER[a.health] - HEALTH_ORDER[b.health] ||
      b.daysOnMarket - a.daysOnMarket,
  );
  const selected =
    stats.find((s) => s.mandateId === selectedMandateId) ?? stats[0];
  const overdue = stats.filter((s) => s.health === "overdue").length;

  return (
    <section
      className="lens"
      role="dialog"
      aria-modal="true"
      aria-label="Owner Lens"
    >
      <header className="lens__bar">
        <div>
          <span className="kicker">Owner Lens · Mandats</span>
          <h2 className="lens__heading">{stats.length} mandats actifs</h2>
          <span className="lens__split">
            {stats.length - overdue} suivis · {overdue} contact en retard
          </span>
        </div>
        <button className="lens__close" onClick={closeOwnerLens}>
          <IconClose />
          Back to briefing
        </button>
      </header>

      <div className="lens__grid">
        <div className="lens__list">
          {stats.map((s) => (
            <MandateRow
              key={s.mandateId}
              stat={s}
              selected={s.mandateId === selected.mandateId}
              onSelect={() => selectMandate(s.mandateId)}
            />
          ))}
        </div>

        <MandateDetail key={selected.mandateId} stat={selected} />
      </div>
    </section>
  );
}
