/* Resting-state capability hints — quiet ghost chips above the dock so
   the assistant's reach is discoverable without opening ⌘K. Low-contrast
   by design: they must not compete with the briefing. Tapping one summons
   the command surface. Hidden while a voice moment is in flight. */
import { useDemo } from "../state/DemoContext";

const CHIPS = [
  "Estimate 9 rue des Martyrs",
  "Draft owner report — Hélène Fontaine",
  "Draft an offer — 12 rue Lamartine",
];

export function GhostChips() {
  const { phase, commandOpen, openCommand } = useDemo();

  // Stand down once the dock is busy capturing, or the surface is open.
  if (commandOpen || phase === "recording" || phase === "processing") {
    return null;
  }

  return (
    <div className="ghosts" aria-label="Try asking">
      {CHIPS.map((c) => (
        <button
          key={c}
          type="button"
          className="ghost-chip"
          onClick={openCommand}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
