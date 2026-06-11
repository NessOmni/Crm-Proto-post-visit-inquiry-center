/* Left rail — a narrow icon rail. Present but inert for now.
   Labels surface as tooltips; icon-only is the back-office idiom. */
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
      {items.map(({ label, Icon }) => (
        <button
          key={label}
          className="rail__item"
          aria-label={label}
          title={label}
          aria-disabled="true"
          tabIndex={-1}
        >
          <Icon className="rail__item-icon" />
          <span className="rail__item-text">{label}</span>
        </button>
      ))}
      <div className="rail__spacer" />
    </nav>
  );
}
