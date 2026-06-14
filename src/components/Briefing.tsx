/* The calm briefing — the home. Every card flows through the shared
   BriefingCard shell; a single rule picks exactly one "spotlight". */
import { useDemo } from "../state/DemoContext";
import type { CardVariant } from "./BriefingCard";
import { DecisionCard } from "./flow1/DecisionCard";
import { BurstCard } from "./flow2/BurstCard";
import { AmbientCard } from "./AmbientCard";
import {
  IconFileText,
  IconFileSignature,
  IconGauge,
  IconPhone,
  IconBellRing,
} from "./icons";

// Listing photo for the Sedaine mandate (gradient fallback when offline).
const SEDAINE_PHOTO =
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=400&q=70";

export function Briefing() {
  const { substrate, phase } = useDemo();
  const { agent } = substrate;
  // The card is present from the moment it lands and stays after approval —
  // collapsing to a slim resolved row rather than disappearing.
  const hasCard = phase === "ready" || phase === "approved";

  // The spotlight rule: at most ONE spotlight at a time, chosen by the
  // highest-priority *present* card that carries the spotlight flag — a
  // property of importance, not of workflow type. Recency wins: the
  // freshly-dictated post-visit card outranks everything, so it takes the
  // spotlight and demotes the rest. If fixtures ever flag more than one,
  // only the highest-priority renders spotlight; the others are standard.
  const registry = [
    { id: "mercier", present: phase === "ready", priority: 100, spotlight: true },
    { id: "burst", present: true, priority: 60, spotlight: false },
    { id: "owner", present: true, priority: 40, spotlight: false },
    { id: "mandate", present: true, priority: 30, spotlight: false },
    { id: "estimation", present: true, priority: 20, spotlight: false },
  ];
  const spotlightId =
    registry
      .filter((c) => c.present && c.spotlight)
      .sort((a, b) => b.priority - a.priority)[0]?.id ?? null;
  const variantOf = (id: string): CardVariant =>
    id === spotlightId ? "spotlight" : "standard";

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
        {/* Tier 1/2 — decision cards, one spotlight, the rest standard. */}
        {hasCard && <DecisionCard variant={variantOf("mercier")} />}
        <BurstCard variant={variantOf("burst")} />

        <AmbientCard
          variant={variantOf("owner")}
          Icon={IconFileText}
          workflow="Owner reporting"
          subject="Hélène Fontaine, Marc Lefèvre +1"
          title="Monthly owner reports — 3 ready to send"
          body="Hélène Fontaine, Marc Lefèvre, +1 — each in your voice, comps included."
          cta="Review 3"
        />
        <AmbientCard
          variant={variantOf("mandate")}
          Icon={IconFileSignature}
          workflow="Mandate"
          subject="8 rue Sedaine"
          thumbUrl={SEDAINE_PHOTO}
          title="Mandate expires in 19 days"
          body="Renewal brief prepared — owner's satisfied, comparables support holding the price."
          cta="Review"
        />
        <AmbientCard
          variant={variantOf("estimation")}
          Icon={IconGauge}
          workflow="Estimation"
          subject="14 avenue Parmentier"
          title="New estimation request"
          body="Comparables pulled, valuation band ready, appointment proposed for Thursday."
          cta="Review"
        />
        {/* Leadflow: call → transcript → matched contact → drafted actions. */}
        <AmbientCard
          variant={variantOf("call")}
          Icon={IconPhone}
          workflow="Call follow-up"
          subject="M. Bertin"
          title="Yesterday's call, turned into next steps"
          body="8-minute call transcribed and matched to his contact. 3 actions detected — follow-up email drafted, valuation flagged, viewing to schedule."
          cta="Review"
          source="call · 08 Jun"
        />

        {/* Re-engagement: dormant leads woken by a REAL new trigger — the
            trigger chips are what separate this from a timed cadence blast. */}
        <AmbientCard
          variant={variantOf("reengage")}
          Icon={IconBellRing}
          workflow="Re-engagement"
          subject="2 dormant contacts"
          title="2 sleeping leads just got a reason to hear from you"
          body="Julien Caron — quiet since January — a new mandate matches the search he'd given up on. Mme Lefèvre — estimation 8 months cold — now has two active buyers fitting her property. Both notes drafted in your voice, each built on a real new reason."
          triggers={[
            "new matching listing",
            "matching buyers + comparable sold",
          ]}
          cta="Review 2"
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
