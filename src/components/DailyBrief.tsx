/* The daily brief — a structured, categorized digest the agent reads
   first: work grouped by class (handled / needs you / your day) + the
   one priority. Each category line is a terse summary that can disclose
   the specific items it summarizes (default collapsed, calm). Doubles as
   the morning message pushed to their phone. Not a dashboard. */
import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import {
  IconUsers,
  IconSparkles,
  IconPhone,
  IconMic,
  IconFileText,
  IconFileSignature,
  IconBellRing,
  IconRadar,
  IconAgenda,
  IconChevronDown,
  IconChevronUp,
} from "./icons";

const COLLAPSED =
  "Routine already cleared · your judgment calls are teed up · next: Sarah Petit, 11:30";

interface Row {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  cat: string;
  rest: string;
  /** The specific items this line summarizes — revealed on disclosure. */
  items?: string[];
}

const HANDLED: Row[] = [
  {
    Icon: IconUsers,
    cat: "New leads",
    rest: "7 enquiries",
    items: [
      "Margaux Bonnet (SeLoger) — answered",
      "Antoine David (Bien'ici) — answered",
      "Camille Leroy (Leboncoin) — answered",
      "Thomas M. (Logic-Immo) — answered",
      "Inès Girard (SeLoger) — answered",
      "Sarah Petit (PAP) — held for your call",
      "1 duplicate — merged",
    ],
  },
  {
    Icon: IconSparkles,
    cat: "Records",
    rest: "2 enriched",
    items: [
      "Margaux Bonnet — employer + 2nd phone (source: inbox)",
      "Hélène Fontaine — note updated (source: inbox)",
    ],
  },
  {
    Icon: IconPhone,
    cat: "Calls",
    rest: "1 logged",
    items: ["M. Bertin — 8 min, 3 actions detected (source: call)"],
  },
];

const NEEDS: Row[] = [
  {
    Icon: IconMic,
    cat: "Write-up",
    rest: "Mercier",
    items: [
      "Owner update · Buyer follow-up · Objections logged · Second transaction detected",
    ],
  },
  {
    Icon: IconFileText,
    cat: "Owner reports",
    rest: "3",
    items: ["Hélène Fontaine · Marc Lefèvre · Sophie Nguyen"],
  },
  {
    Icon: IconFileSignature,
    cat: "Mandate",
    rest: "Sedaine",
    items: ["8 rue Sedaine · exclusive · expires in 19 days · renewal brief ready"],
  },
  {
    Icon: IconBellRing,
    cat: "Dormant leads",
    rest: "2",
    items: [
      "Julien Caron — new matching listing",
      "Mme Lefèvre — matching buyers + comparable sold",
    ],
  },
  {
    Icon: IconUsers,
    cat: "From your team",
    rest: "Karim",
    items: ["11 rue Oberkampf (exclusive) — matches Mme Durand's search"],
  },
  {
    Icon: IconRadar,
    cat: "Prospecting",
    rest: "3 openings spotted (drafted approaches)",
    items: [
      "5 rue Bichat — your February estimate, now listed 5% below",
      "2 new DPEs in your sector — likely future sellers",
    ],
  },
];

const DAY: Row[] = [
  { Icon: IconAgenda, cat: "4 appointments", rest: "next: Sarah Petit, 11:30 (visit)" },
];

const EXPANDABLE = [...HANDLED, ...NEEDS]
  .filter((r) => r.items?.length)
  .map((r) => r.cat);

function BriefRow({
  row,
  open,
  onToggle,
}: {
  row: Row;
  open: boolean;
  onToggle: () => void;
}) {
  const { Icon, cat, rest, items } = row;
  const line = (
    <>
      <Icon className="brief-row__icon" />
      <span>
        <span className="brief-row__cat">{cat}</span> — {rest}
        {items?.length ? (
          <IconChevronDown
            className={`brief-row__chev ${open ? "brief-row__chev--open" : ""}`}
          />
        ) : null}
      </span>
    </>
  );

  if (!items?.length) {
    return (
      <div className="brief-row">
        <div className="brief-row__line">{line}</div>
      </div>
    );
  }

  return (
    <div className="brief-row">
      <button
        type="button"
        className="brief-row__line brief-row__head"
        onClick={onToggle}
        aria-expanded={open}
      >
        {line}
      </button>
      {open && (
        <ul className="brief-sub">
          {items.map((it) => (
            <li key={it}>
              {/* Inert deep-link to the record in the prototype. */}
              <button type="button" className="brief-sub__link">
                {it}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DailyBrief() {
  const [expanded, setExpanded] = useState(true);
  const [openRows, setOpenRows] = useState<Set<string>>(new Set());

  const toggleRow = (cat: string) =>
    setOpenRows((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });

  const allOpen = EXPANDABLE.every((k) => openRows.has(k));
  const toggleAll = () =>
    setOpenRows(allOpen ? new Set() : new Set(EXPANDABLE));

  if (!expanded) {
    return (
      <button
        type="button"
        className="brief brief--collapsed"
        onClick={() => setExpanded(true)}
      >
        <span className="brief__summary">{COLLAPSED}</span>
        <span className="brief__read">Read today's brief</span>
      </button>
    );
  }

  const section = (label: string, rows: Row[]) => (
    <div className="brief__section">
      <span className="brief__label">{label}</span>
      <div className="brief__rows">
        {rows.map((r) => (
          <BriefRow
            key={r.cat}
            row={r}
            open={openRows.has(r.cat)}
            onToggle={() => toggleRow(r.cat)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="brief">
      <p className="brief__lead">
        Since you were last here, I cleared the routine and teed up what
        actually needs your judgment.
      </p>

      {section("Already handled", HANDLED)}
      {section("Needs your ok", NEEDS)}
      {section("Your day", DAY)}

      <p className="brief__priority">
        Start here: approve the Mercier write-up — it unblocks an estimation.
      </p>

      <div className="brief__foot">
        <span className="brief__phone">
          <span className="brief__channel-dot" />
          Envoyé sur WhatsApp · 7:30 ·{" "}
          <button type="button" className="brief__replay">
            Replay
          </button>
        </span>
        <span className="brief__controls">
          <button type="button" className="brief__toggle" onClick={toggleAll}>
            {allOpen ? "Hide details" : "Details"}
          </button>
          <button
            type="button"
            className="brief__toggle"
            onClick={() => setExpanded(false)}
          >
            Today's brief <IconChevronUp />
          </button>
        </span>
      </div>
    </div>
  );
}
