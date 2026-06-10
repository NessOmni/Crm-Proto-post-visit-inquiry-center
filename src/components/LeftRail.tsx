/* Left rail — depth nav. Present but inert for now. */
import { IconBiens, IconContacts, IconAgenda, IconPerformance } from "./icons";

const items = [
  { label: "Biens", Icon: IconBiens },
  { label: "Contacts", Icon: IconContacts },
  { label: "Agenda", Icon: IconAgenda },
  { label: "Performance", Icon: IconPerformance },
];

export function LeftRail() {
  return (
    <nav className="rail" aria-label="Depth">
      <div className="kicker rail__label">Atelier</div>
      {items.map(({ label, Icon }) => (
        <button key={label} className="rail__item" aria-disabled="true" tabIndex={-1}>
          <Icon className="rail__item-icon" />
          <span className="rail__item-text">{label}</span>
        </button>
      ))}
      <div className="rail__spacer" />
      <div className="rail__foot">
        Omnicasa
        <br />
        Briefing du jour
      </div>
    </nav>
  );
}
