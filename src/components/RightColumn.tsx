/* Right column — next-visit block + Assistant activity summary.
   The activity log fills in as Flow 1 actions are approved. */
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
          <span className="kicker">Today</span>
        </div>
        {activity.length === 0 ? (
          <p className="activity__empty">
            Nothing logged yet. Approved actions and handled work will appear
            here.
          </p>
        ) : (
          <div>
            {activity.map((entry) => (
              <div className="activity__row" key={entry.id}>
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
            ))}
          </div>
        )}
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
