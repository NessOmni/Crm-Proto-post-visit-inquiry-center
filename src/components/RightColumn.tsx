/* Right column — next-visit block + Assistant activity summary.
   Calm and quiet at this stage. */
import type { Substrate } from "../data/types";

export function RightColumn({ substrate }: { substrate: Substrate }) {
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
            <dd>Location</dd>
          </div>
          <div>
            <dt>Surface</dt>
            <dd>{roquette.surfaceM2} m²</dd>
          </div>
          <div>
            <dt>Loyer</dt>
            <dd>{roquette.priceEur.toLocaleString("fr-FR")} €</dd>
          </div>
        </dl>
      </section>

      <section className="panel card activity">
        <div className="panel__head">
          <span className="panel__title">Assistant activity</span>
          <span className="kicker">Today</span>
        </div>
        <p className="activity__empty">
          Nothing logged yet. Approved actions and handled work will appear
          here.
        </p>
      </section>
    </aside>
  );
}
