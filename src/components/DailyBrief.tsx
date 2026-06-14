/* The daily brief — a narrative digest the agent reads first: what was
   handled, what needs them, their day, and the one priority + why. It
   doubles as the morning message pushed to their phone. Prose, not a
   dashboard or a card. Expanded on first load; collapses to one line
   (which subsumes the old day-summary). */
import { useState } from "react";
import { IconPhone, IconChevronUp } from "./icons";

const COLLAPSED =
  "Overnight handled · 7 waiting for you · next: Sarah Petit, 11:30";

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
      <p className="brief__text">
        Overnight I handled 7 new enquiries, sorted your inbox, enriched two
        records and prepared your follow-ups — nothing there needs redoing.
        Today, 7 things are waiting for your ok: the Mercier visit write-up (I
        caught a second transaction in it), three owner reports, and the Sedaine
        mandate expiring in 19 days. Your day: 4 appointments, next is Sarah
        Petit at 11:30.{" "}
        <strong>
          If you do one thing first — approve the Mercier write-up; it unblocks
          an estimation.
        </strong>
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
