/* Right column — a full "Today" agenda + Assistant activity summary.
   The agenda emphasises the imminent next visit; the rest is quiet. */
import { useState } from "react";
import type { ActivityEntry } from "../state/DemoContext";
import { useDemo } from "../state/DemoContext";
import { SourceChip } from "./SourceChip";
import { TriggeredBy } from "./TriggeredBy";
import { IconCheck } from "./icons";

// How many overnight items show before the rail tucks the rest away.
const OVERNIGHT_PREVIEW = 5;

function ActivityRow({ entry }: { entry: ActivityEntry }) {
  return (
    <div className="activity__row">
      <span
        className={`activity__dot ${
          entry.tier === "drafted" ? "activity__dot--drafted" : ""
        }`}
      />
      <span className="activity__text">
        {entry.text}
        <span className="activity__time">
          <span>
            {/* Concrete clock time only on actions you just approved;
                the ambient feed stays timeless ("Recently"). */}
            {entry.group === "approved"
              ? `${entry.tag} · ${entry.time}`
              : entry.tag}
          </span>
          {entry.source && <SourceChip source={entry.source} />}
          {entry.triggeredBy && <TriggeredBy src={entry.triggeredBy} />}
        </span>
      </span>
    </div>
  );
}

export function RightColumn() {
  const { substrate, activity } = useDemo();
  const roquette = substrate.biens.find((b) => b.id === "bien-roquette")!;

  // Keep the rail calm: approved actions always show; the overnight feed
  // previews a few and tucks the rest behind a quiet "Show more".
  const [expanded, setExpanded] = useState(false);
  const approved = activity.filter((e) => e.group === "approved");
  const overnight = activity.filter((e) => e.group === "overnight");
  const shownOvernight = expanded
    ? overnight
    : overnight.slice(0, OVERNIGHT_PREVIEW);
  const hiddenCount = overnight.length - shownOvernight.length;

  return (
    <aside className="aside" aria-label="Day context">
      <section className="panel card agenda" aria-label="Today's agenda">
        <div className="panel__head">
          <span className="panel__title">Today</span>
          <span className="kicker">4 to come</span>
        </div>

        <div className="agenda__list">
          {/* Past — dimmed, done */}
          <div className="agenda-row agenda-row--past">
            <span className="agenda-row__time">08:30</span>
            <div className="agenda-row__body">
              <span className="agenda-row__eyebrow">Owner call</span>
              <div className="agenda-row__title">M. Bertin</div>
              <div className="agenda-row__done">
                <IconCheck /> Done
              </div>
            </div>
          </div>

          {/* Now indicator — where the agent is in the day */}
          <div className="agenda-now" aria-label="Current time">
            <span className="agenda-now__label">09:30 · now</span>
            <span className="agenda-now__line" />
          </div>

          {/* Next — highlighted + expanded */}
          <div className="agenda-row agenda-row--next">
            <span className="agenda-row__time">11:30</span>
            <div className="agenda-row__body">
              <span className="agenda-row__eyebrow">
                Visit · <em className="agenda-row__soon">in 2h</em>
              </span>
              <div className="agenda-row__title agenda-row__title--lg">
                Sarah Petit
              </div>
              <div className="agenda-row__sub">
                {roquette.address}, {roquette.postalCode} {roquette.city}
              </div>
              <dl className="agenda-detail">
                <div>
                  <dt>Type</dt>
                  <dd>Rental</dd>
                </div>
                <div>
                  <dt>Surface</dt>
                  <dd>{roquette.surfaceM2} m²</dd>
                </div>
                <div>
                  <dt>Rent</dt>
                  <dd>{roquette.priceEur.toLocaleString("fr-FR")} €</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Upcoming — quiet single lines */}
          <div className="agenda-row">
            <span className="agenda-row__time">14:00</span>
            <div className="agenda-row__body">
              <span className="agenda-row__eyebrow">Estimation</span>
              <div className="agenda-row__title">9 rue des Martyrs, Paris 9ᵉ</div>
            </div>
          </div>
          <div className="agenda-row">
            <span className="agenda-row__time">16:00</span>
            <div className="agenda-row__body">
              <span className="agenda-row__eyebrow">Visit</span>
              <div className="agenda-row__title">12 rue Lamartine</div>
            </div>
          </div>
          <div className="agenda-row">
            <span className="agenda-row__time">17:30</span>
            <div className="agenda-row__body">
              <span className="agenda-row__eyebrow">Buyer follow-up</span>
              <div className="agenda-row__title">Calls (3)</div>
            </div>
          </div>
        </div>

        <button type="button" className="agenda__more">
          Open agenda →
        </button>
      </section>

      <section className="panel card activity">
        <div className="panel__head">
          <span className="panel__title">Assistant activity</span>
        </div>
        <div className="activity__feed">
          {/* Approved actions (after Flow 1) always show — they're yours. */}
          {approved.map((entry) => (
            <ActivityRow key={entry.id} entry={entry} />
          ))}

          {overnight.length > 0 && (
            <div className="activity__eyebrow kicker">Recently</div>
          )}
          {shownOvernight.map((entry) => (
            <ActivityRow key={entry.id} entry={entry} />
          ))}

          {overnight.length > OVERNIGHT_PREVIEW && (
            <button
              type="button"
              className="activity__more"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : `Show ${hiddenCount} more`}
            </button>
          )}
        </div>
      </section>

      <div className="keys">
        <span className="keys__label">Presenter keys</span>
        <ul>
          <li>
            <kbd>⌘K</kbd> Assistant
          </li>
          <li>
            <kbd>1</kbd> Voice note
          </li>
          <li>
            <kbd>2</kbd> Lead Lens
          </li>
          <li>
            <kbd>3</kbd> Dictate (global)
          </li>
          <li>
            <kbd>4</kbd> Upload recording
          </li>
          <li>
            <kbd>R</kbd> Replay the scene
          </li>
        </ul>
      </div>
    </aside>
  );
}
