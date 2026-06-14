/* Right column — a full "Today" agenda + Assistant activity summary.
   The agenda emphasises the imminent next visit; the rest is quiet. */
import { Fragment } from "react";
import { useDemo } from "../state/DemoContext";
import { SourceChip } from "./SourceChip";
import { IconCheck } from "./icons";

export function RightColumn() {
  const { substrate, activity } = useDemo();
  const roquette = substrate.biens.find((b) => b.id === "bien-roquette")!;

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
        {/* Ties the handled activity + the to-approve cards to the familiar
            task-list mental model — no new surface. */}
        <div className="activity__summary">
          Today · 7 tasks — <strong>4 handled</strong>, 3 need you.
        </div>
        <div className="activity__feed">
          {activity.map((entry, i) => {
            // The "Overnight" eyebrow precedes the first overnight item —
            // so it sits under the header on load, and below the approved
            // actions once the feed has grown.
            const firstOvernight =
              entry.group === "overnight" &&
              (i === 0 || activity[i - 1].group !== "overnight");
            return (
              <Fragment key={entry.id}>
                {firstOvernight && (
                  <div className="activity__eyebrow kicker">Overnight</div>
                )}
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
                        {entry.tag} · {entry.time}
                      </span>
                      {entry.source && <SourceChip source={entry.source} />}
                    </span>
                  </span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </section>

      <div className="keys">
        <span className="keys__label">Presenter keys</span>
        <ul>
          <li>
            <kbd>1</kbd> Voice note
          </li>
          <li>
            <kbd>2</kbd> Lead Lens
          </li>
          <li>
            <kbd>R</kbd> Replay the scene
          </li>
        </ul>
      </div>
    </aside>
  );
}
