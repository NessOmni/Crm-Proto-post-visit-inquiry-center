/* The calm briefing — the home. The Flow 1 decision card lands here
   once the voice note is processed; otherwise it stays quiet. */
import { useDemo } from "../state/DemoContext";
import { DecisionCard } from "./flow1/DecisionCard";
import { BurstCard } from "./flow2/BurstCard";

export function Briefing() {
  const { substrate, phase } = useDemo();
  const { agent } = substrate;
  // The card is present from the moment it lands and stays after approval —
  // collapsing to a slim resolved row rather than disappearing.
  const hasCard = phase === "ready" || phase === "approved";

  return (
    <main className="briefing" aria-label="Briefing">
      <header className="briefing__greeting">
        <div className="kicker" style={{ marginBottom: 12 }}>
          Wednesday 10 June · {substrate.agency.kicker}
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
        {hasCard && <DecisionCard />}
        <BurstCard />

        {/* A calm, subordinate note — makes the morning feel real.
            Not part of the demo click-path. */}
        <div className="calm-row">
          <span className="badge badge--auto">Automatic · handled</span>
          <span className="calm-row__text">
            Visit confirmed for today · Sarah Petit, 11:30 — added to your day.
          </span>
        </div>
      </section>
    </main>
  );
}
