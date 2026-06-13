/* Right column — next-visit block + Assistant activity summary.
   Pre-populated with the overnight session; grows on approval. */
import { Fragment } from "react";
import { useDemo } from "../state/DemoContext";

export function RightColumn() {
  const { substrate, activity } = useDemo();
  const roquette = substrate.biens.find((b) => b.id === "bien-roquette")!;

  return (
    <aside className="aside" aria-label="Day context">
      <section className="panel card next-visit">
        <div className="panel__head">
          <span className="panel__title">Next visit</span>
          <span className="kicker">Today</span>
        </div>
        <div className="next-visit__when">11:30 · in 2h</div>
        <div className="next-visit__who serif">Sarah Petit</div>
        <div className="next-visit__where">
          {roquette.address}, {roquette.postalCode} {roquette.city}
        </div>
        <dl className="next-visit__meta">
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
      </section>

      <section className="panel card activity">
        <div className="panel__head">
          <span className="panel__title">Assistant activity</span>
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
                      {entry.tag} · {entry.time}
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
