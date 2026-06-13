/* The classic Omnicasa "All contacts" database table, reproduced in
   the AI-first prototype. Same structure and density as the current
   product — a deep detail view reachable one click from the briefing,
   sharing one world with the two flows (the people are the prototype's
   own French fixtures). Filtering is deterministic and client-side. */
import { useEffect, useMemo, useRef, useState } from "react";
import type { ContactColumn, ContactRow } from "../../data/types";
import { contactDirectory } from "../../data/fixtures";
import { useDemo } from "../../state/DemoContext";
import { Avatar } from "../flow2/Avatar";
import {
  IconSearch,
  IconSliders,
  IconFilter,
  IconPlus,
  IconChevronDown,
  IconClose,
} from "../icons";

const COLUMNS: { key: ContactColumn; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "id", label: "ID" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "category", label: "Category" },
  { key: "manager", label: "Manager" },
];

function fieldText(row: ContactRow, key: ContactColumn): string {
  switch (key) {
    case "name":
      return row.name;
    case "id":
      return row.id;
    case "phone":
      return row.phone;
    case "email":
      return row.email;
    case "category":
      return row.category ?? "";
    case "manager":
      return `${row.manager.name} ${row.manager.initials}`;
  }
}

interface Chip {
  id: number;
  field: ContactColumn;
  value: string;
}

export function ContactsView() {
  const { goHome } = useDemo();

  const [search, setSearch] = useState("");
  const [chips, setChips] = useState<Chip[]>([]);
  const [colFilters, setColFilters] = useState<Partial<Record<ContactColumn, string>>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [addOpen, setAddOpen] = useState(false);
  const chipId = useRef(0);

  // Esc returns to the briefing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") goHome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goHome]);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();

    // Group chips by field — OR within a field, AND across fields.
    const chipsByField = new Map<ContactColumn, string[]>();
    for (const ch of chips) {
      const v = ch.value.trim().toLowerCase();
      if (!v) continue;
      const arr = chipsByField.get(ch.field) ?? [];
      arr.push(v);
      chipsByField.set(ch.field, arr);
    }

    return contactDirectory.filter((row) => {
      if (q && !COLUMNS.some((c) => fieldText(row, c.key).toLowerCase().includes(q))) {
        return false;
      }
      for (const c of COLUMNS) {
        const v = colFilters[c.key]?.trim().toLowerCase();
        if (v && !fieldText(row, c.key).toLowerCase().includes(v)) return false;
      }
      for (const [field, vals] of chipsByField) {
        const text = fieldText(row, field).toLowerCase();
        if (!vals.some((v) => text.includes(v))) return false;
      }
      return true;
    });
  }, [search, chips, colFilters]);

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) rows.forEach((r) => next.delete(r.id));
      else rows.forEach((r) => next.add(r.id));
      return next;
    });
  }
  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function addFilter(field: ContactColumn) {
    chipId.current += 1;
    setChips((c) => [...c, { id: chipId.current, field, value: "" }]);
    setAddOpen(false);
  }
  function setChipValue(id: number, value: string) {
    setChips((c) => c.map((ch) => (ch.id === id ? { ...ch, value } : ch)));
  }
  function removeChip(id: number) {
    setChips((c) => c.filter((ch) => ch.id !== id));
  }

  function reset() {
    setSearch("");
    setChips([]);
    setColFilters({});
    setSelected(new Set());
  }

  const label = (key: ContactColumn) => COLUMNS.find((c) => c.key === key)!.label;

  return (
    <section className="contacts" aria-label="All contacts">
      <nav className="crumbs">
        <button className="crumbs__link" onClick={goHome}>
          Contacts
        </button>
        <span className="crumbs__sep">›</span>
        <span className="crumbs__here">All contacts</span>
      </nav>

      <div className="contacts__head">
        <h1 className="contacts__title">All contacts</h1>
        <button className="btn btn--primary">
          <IconPlus /> New contact
        </button>
      </div>

      <div className="contacts__search">
        <span className="searchfield">
          <IconSearch />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            aria-label="Search contacts"
          />
        </span>
        <button className="iconbtn" title="Column settings" aria-label="Column settings">
          <IconSliders />
        </button>
      </div>

      <div className="filterbar">
        <div className="filterbar__chips">
          {chips.map((chip) => (
            <span className="fchip" key={chip.id}>
              <span className="fchip__field">{label(chip.field)}</span>
              <span className="fchip__op">is</span>
              <input
                className="fchip__input"
                value={chip.value}
                onChange={(e) => setChipValue(chip.id, e.target.value)}
                placeholder="value"
                autoFocus
                aria-label={`${label(chip.field)} filter`}
              />
              <button
                className="fchip__x"
                onClick={() => removeChip(chip.id)}
                aria-label="Remove filter"
              >
                <IconClose />
              </button>
            </span>
          ))}

          <div className="addfilter">
            <button
              className="iconbtn iconbtn--sm"
              onClick={() => setAddOpen((o) => !o)}
              aria-label="Add filter"
              aria-expanded={addOpen}
              title="Add filter"
            >
              <IconFilter />
            </button>
            {addOpen && (
              <>
                <div className="menu-scrim" onClick={() => setAddOpen(false)} />
                <div className="menu" role="menu">
                  {COLUMNS.map((c) => (
                    <button
                      key={c.key}
                      className="menu__item"
                      role="menuitem"
                      onClick={() => addFilter(c.key)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="filterbar__right">
          <button className="link-reset" onClick={reset}>
            Reset
          </button>
          <div className="savebtn">
            <span className="savebtn__main">Save</span>
            <span className="savebtn__caret">
              <IconChevronDown />
            </span>
          </div>
        </div>
      </div>

      <div className="ctable-wrap">
        <table className="ctable">
          <colgroup>
            <col style={{ width: "44px" }} />
            <col style={{ width: "26%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "13%" }} />
          </colgroup>
          <thead>
            <tr className="ctable__headrow">
              <th className="ctable__check">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              {COLUMNS.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
            <tr className="ctable__filterrow">
              <th />
              {COLUMNS.map((c) => (
                <th key={c.key}>
                  <span className="colfilter">
                    <input
                      value={colFilters[c.key] ?? ""}
                      onChange={(e) =>
                        setColFilters((f) => ({ ...f, [c.key]: e.target.value }))
                      }
                      aria-label={`Filter ${c.label}`}
                    />
                    <IconFilter className="colfilter__icon" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={selected.has(row.id) ? "is-selected" : ""}
              >
                <td className="ctable__check">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`Select ${row.name}`}
                  />
                </td>
                <td className="ctable__name">{row.name}</td>
                <td className="ctable__muted">{row.id}</td>
                <td>{row.phone}</td>
                <td className="ctable__email" title={row.email}>
                  {row.email}
                </td>
                <td>
                  {row.category && (
                    <span className="cat-pill">{row.category}</span>
                  )}
                </td>
                <td>
                  <span title={row.manager.name}>
                    <Avatar initials={row.manager.initials} size="sm" />
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="ctable__empty" colSpan={COLUMNS.length + 1}>
                  No contacts match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
