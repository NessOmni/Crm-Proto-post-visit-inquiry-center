/* The daily brief — a structured, categorized digest the agent reads
   first: work grouped by class (handled / needs you / your day) + the
   one priority. Written in the assistant's voice. Doubles as the morning
   message pushed to their phone. Not a dashboard — one digest block,
   light section labels, clean one-line category rows, no boxes/tiles. */
import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import {
  IconUsers,
  IconMail,
  IconSparkles,
  IconPhone,
  IconMic,
  IconFileText,
  IconFileSignature,
  IconBellRing,
  IconAgenda,
  IconChevronUp,
} from "./icons";

const COLLAPSED =
  "Routine cleared overnight · your judgment calls are teed up · next: Sarah Petit, 11:30";

type Row = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  cat: string;
  rest: string;
};

const HANDLED: Row[] = [
  { Icon: IconUsers, cat: "New leads", rest: "7 enquiries: 5 answered, 1 held for your call, 1 duplicate merged" },
  { Icon: IconMail, cat: "Inbox", rest: "5 emails sorted, none need you" },
  { Icon: IconSparkles, cat: "Records", rest: "2 enriched (Margaux Bonnet, Hélène Fontaine)" },
  { Icon: IconPhone, cat: "Calls", rest: "1 logged & transcribed (M. Bertin)" },
];

const NEEDS: Row[] = [
  { Icon: IconMic, cat: "Write-up", rest: "Mercier visit (I caught a second transaction)" },
  { Icon: IconFileText, cat: "Owner reports", rest: "3 ready to send" },
  { Icon: IconFileSignature, cat: "Mandate", rest: "Sedaine renewal, expires in 19 days" },
  { Icon: IconBellRing, cat: "Dormant leads", rest: "2 worth waking, drafted on real triggers" },
  { Icon: IconUsers, cat: "From your team", rest: "Karim's new listing matches one of your buyers" },
];

const DAY: Row[] = [
  { Icon: IconAgenda, cat: "4 appointments", rest: "next: Sarah Petit, 11:30 (visit)" },
];

function BriefRow({ Icon, cat, rest }: Row) {
  return (
    <div className="brief-row">
      <Icon className="brief-row__icon" />
      <span>
        <span className="brief-row__cat">{cat}</span> — {rest}
      </span>
    </div>
  );
}

function Section({ label, rows }: { label: string; rows: Row[] }) {
  return (
    <div className="brief__section">
      <span className="brief__label">{label}</span>
      <div className="brief__rows">
        {rows.map((r) => (
          <BriefRow key={r.cat + r.rest} {...r} />
        ))}
      </div>
    </div>
  );
}

export function DailyBrief() {
  const [expanded, setExpanded] = useState(true);

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

  return (
    <div className="brief">
      <p className="brief__lead">
        Quiet night — I cleared the routine and teed up what actually needs your
        judgment.
      </p>

      <Section label="Handled overnight" rows={HANDLED} />
      <Section label="Needs your ok" rows={NEEDS} />
      <Section label="Your day" rows={DAY} />

      <p className="brief__priority">
        Start here: approve the Mercier write-up — it unblocks an estimation.
      </p>

      <div className="brief__foot">
        <span className="brief__phone">
          <IconPhone />
          Sent to your phone at 7:30 ·{" "}
          <button type="button" className="brief__replay">
            Replay
          </button>
        </span>
        <button
          type="button"
          className="brief__toggle"
          onClick={() => setExpanded(false)}
        >
          Today's brief <IconChevronUp />
        </button>
      </div>
    </div>
  );
}
