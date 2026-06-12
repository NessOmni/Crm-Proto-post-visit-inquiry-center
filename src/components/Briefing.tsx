/* The calm briefing — the home. The Flow 1 decision card lands here
   once the voice note is processed; otherwise it stays quiet. */
import { useDemo } from "../state/DemoContext";
import { DecisionCard } from "./flow1/DecisionCard";
import { BurstCard } from "./flow2/BurstCard";

export function Briefing() {
  const { substrate, phase } = useDemo();
  const { agent } = substrate;
  // Approval resolves the card out of the briefing; the four actions
  // land in the Assistant activity panel instead.
  const hasCard = phase === "ready";

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
      </section>
    </main>
  );
}
