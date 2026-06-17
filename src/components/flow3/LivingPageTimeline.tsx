/* The Living Page — a mandate's report/communication history. Mirrors the
   Lead Lens timeline: automatic-tier steps tagged, a held (amber) step for
   the one overdue contact. This is what lets the briefing stay sparse —
   everything the assistant knows about the mandate is reachable here. */
import type { LeadEvent } from "../../data/types";

export function LivingPageTimeline({ history }: { history: LeadEvent[] }) {
  return (
    <div className="timeline">
      {history.map((ev) => (
        <div className="tl-row" key={ev.id}>
          <span
            className={`tl-dot ${
              ev.held
                ? "tl-dot--held"
                : ev.tier === "drafted"
                  ? "tl-dot--drafted"
                  : ""
            }`}
          />
          <div className="tl-body">
            <div className="tl-body__label">{ev.label}</div>
            {ev.detail && <div className="tl-body__detail">{ev.detail}</div>}
          </div>
          <div className="tl-meta">
            <span
              className={`badge ${
                ev.held
                  ? "badge--held"
                  : ev.tier === "automatic"
                    ? "badge--auto"
                    : "badge--drafted"
              }`}
            >
              {ev.held ? "À faire" : ev.tier === "automatic" ? "Automatic" : "Drafted"}
            </span>
            <span className="tl-time">{ev.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
