/* Left sidebar — Attio-style: labelled nav that retracts to a
   narrow icon rail. "Contacts" opens the database view; the other
   items are present but inert for now. */
import { useDemo } from "../state/DemoContext";
import { IconBiens, IconContacts, IconAgenda, IconPerformance } from "./icons";
import { IconSidebar, IconChevronLeft } from "./icons";

const items = [
  { id: "biens", label: "Biens", Icon: IconBiens, live: false },
  { id: "contacts", label: "Contacts", Icon: IconContacts, live: true },
  { id: "agenda", label: "Agenda", Icon: IconAgenda, live: false },
  { id: "performance", label: "Performance", Icon: IconPerformance, live: false },
];

export function LeftRail({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const { view, openContacts } = useDemo();

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
        {items.map(({ id, label, Icon, live }) => {
          const active = live && id === "contacts" && view === "contacts";
          return (
            <button
              key={id}
              className={`sidebar__item ${active ? "sidebar__item--active" : ""}`}
              aria-label={label}
              title={collapsed ? label : undefined}
              aria-disabled={live ? undefined : "true"}
              aria-current={active ? "page" : undefined}
              tabIndex={live ? 0 : -1}
              onClick={live && id === "contacts" ? openContacts : undefined}
            >
              <Icon className="sidebar__item-icon" />
              <span className="sidebar__item-text">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
