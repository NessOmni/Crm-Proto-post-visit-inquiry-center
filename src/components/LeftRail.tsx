/* Left sidebar — Attio-style: labelled nav that retracts to a narrow
   icon rail. Two groups in French domain language. Nav items are inert
   placeholders for the demo except the live routes: Accueil (the
   briefing home) and Contacts (the existing database view). */
import type { ComponentType, SVGProps } from "react";
import { useDemo } from "../state/DemoContext";
import {
  IconHome,
  IconAgenda,
  IconActivity,
  IconPerformance,
  IconBuilding2,
  IconFileSignature,
  IconUsers,
  IconHandshake,
  IconSidebar,
  IconChevronLeft,
} from "./icons";

interface NavItem {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
  onClick?: () => void;
}

export function LeftRail({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const { view, goHome, openContacts } = useDemo();

  // Group 1 — surfaces.
  const surfaces: NavItem[] = [
    { id: "accueil", label: "Accueil", Icon: IconHome, active: view === "briefing", onClick: goHome },
    { id: "agenda", label: "Agenda", Icon: IconAgenda },
    { id: "activite", label: "Activité", Icon: IconActivity },
    { id: "performance", label: "Performance", Icon: IconPerformance },
  ];

  // Group 2 — objects (Portefeuille).
  const portfolio: NavItem[] = [
    { id: "biens", label: "Biens", Icon: IconBuilding2 },
    { id: "mandats", label: "Mandats", Icon: IconFileSignature },
    { id: "contacts", label: "Contacts", Icon: IconUsers, active: view === "contacts", onClick: openContacts },
    { id: "transactions", label: "Transactions", Icon: IconHandshake },
  ];

  const renderItem = (item: NavItem) => {
    const live = Boolean(item.onClick);
    return (
      <button
        key={item.id}
        className={`sidebar__item ${item.active ? "sidebar__item--active" : ""}`}
        aria-label={item.label}
        title={collapsed ? item.label : undefined}
        aria-disabled={live ? undefined : "true"}
        aria-current={item.active ? "page" : undefined}
        tabIndex={live ? 0 : -1}
        onClick={item.onClick}
      >
        <item.Icon className="sidebar__item-icon" />
        <span className="sidebar__item-text">{item.label}</span>
      </button>
    );
  };

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

      <div className="sidebar__items">{surfaces.map(renderItem)}</div>

      {collapsed ? (
        <div className="sidebar__divider" />
      ) : (
        <div className="sidebar__group-label">Portefeuille</div>
      )}

      <div className="sidebar__items">{portfolio.map(renderItem)}</div>
    </nav>
  );
}
