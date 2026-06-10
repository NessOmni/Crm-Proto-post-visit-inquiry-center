/* The calm briefing — the home. Mostly empty for now;
   the two flows will land their decision cards here. */
import type { Substrate } from "../data/types";

export function Briefing({ substrate }: { substrate: Substrate }) {
  const { agent } = substrate;

  return (
    <main className="briefing" aria-label="Briefing">
      <header className="briefing__greeting">
        <div className="kicker" style={{ marginBottom: 12 }}>
          Mercredi 10 juin · {substrate.agency.kicker}
        </div>
        <h1 className="briefing__hello">
          Good morning, <em>{agent.firstName}</em>.
        </h1>
        <p className="briefing__sub">
          A calm read of what needs you today. Your assistant has been working
          overnight — nothing here is an inbox.
        </p>
      </header>

      <section className="briefing__cards">
        <div className="briefing__empty">
          <div className="kicker">The briefing</div>
          <p>
            Quiet for the moment. Decision cards will land here as the day's
            work is prepared for your review.
          </p>
        </div>
      </section>
    </main>
  );
}
