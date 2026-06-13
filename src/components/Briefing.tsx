/* The calm briefing — the home. The Flow 1 decision card lands here
   once the voice note is processed; otherwise it stays quiet. */
import { useDemo } from "../state/DemoContext";
import { DecisionCard } from "./flow1/DecisionCard";
import { BurstCard } from "./flow2/BurstCard";
import { AmbientCard } from "./AmbientCard";
import { IconFileText, IconFileSignature, IconGauge } from "./icons";

// Listing photo for the Sedaine mandate (gradient fallback when offline).
const SEDAINE_PHOTO =
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=400&q=70";

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
        {/* Tier 1 — hero cards (the demo click-path). */}
        {hasCard && <DecisionCard />}
        <BurstCard />

        {/* Tier 2 — ambient breadth cards. Compact, subordinate, inert
            CTAs. They show where the product is heading. */}
        <AmbientCard
          Icon={IconFileText}
          workflow="Owner reporting"
          subject="Hélène Fontaine, Marc Lefèvre +1"
          title="Monthly owner reports — 3 ready to send"
          body="Hélène Fontaine, Marc Lefèvre, +1 — each in your voice, comps included."
          cta="Review 3"
        />
        <AmbientCard
          Icon={IconFileSignature}
          workflow="Mandate"
          subject="8 rue Sedaine"
          thumbUrl={SEDAINE_PHOTO}
          title="Mandate expires in 19 days"
          body="Renewal brief prepared — owner's satisfied, comparables support holding the price."
          cta="Review"
        />
        <AmbientCard
          Icon={IconGauge}
          workflow="Estimation"
          subject="14 avenue Parmentier"
          title="New estimation request"
          body="Comparables pulled, valuation band ready, appointment proposed for Thursday."
          cta="Review"
        />

        {/* Tier 3 — informational handled rows. Quietest, no CTA. */}
        <div className="calm-row">
          <span className="badge badge--auto">Automatic · handled</span>
          <span className="calm-row__text">
            Visit confirmed for today · Sarah Petit, 11:30 — added to your day.
          </span>
        </div>
        <div className="calm-row">
          <span className="badge badge--auto">Automatic · handled</span>
          <span className="calm-row__text">
            Compromis Bertin · notaire confirmed signing for 18 June.
          </span>
        </div>
      </section>
    </main>
  );
}
