/* Left sidebar — Attio-style: labelled nav that retracts to a
   narrow icon rail. Nav items are present but inert for now. */
import { IconBiens, IconContacts, IconAgenda, IconPerformance } from "./icons";
import { IconSidebar, IconChevronLeft } from "./icons";

const items = [
  { label: "Biens", Icon: IconBiens },
  { label: "Contacts", Icon: IconContacts },
  { label: "Agenda", Icon: IconAgenda },
  { label: "Performance", Icon: IconPerformance },
];

export function LeftRail({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <nav
      className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}
      aria-label="Navigation"
    >
      <div className="sidebar__head">
        {!collapsed && <span className="sidebar__title">Navigate</span>}
        <button
          className="sidebar__toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <IconSidebar /> : <IconChevronLeft />}
        </button>
      </div>

      <div className="sidebar__items">
        {items.map(({ label, Icon }) => (
          <button
            key={label}
            className="sidebar__item"
            aria-label={label}
            title={collapsed ? label : undefined}
            aria-disabled="true"
            tabIndex={-1}
          >
            <Icon className="sidebar__item-icon" />
            <span className="sidebar__item-text">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
