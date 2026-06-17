/* The owner-report decision card (Flow 3). Unlike the post-visit card
   it is NOT dictated — it appears on a cadence + a market signal, the
   assistant already done. Rendered through the shared BriefingCard shell;
   on approval (or decline) it collapses to a slim resolved row in place. */
import type { CardVariant } from "../BriefingCard";
import { BriefingCard } from "../BriefingCard";
import { TriggeredBy } from "../TriggeredBy";
import { useDemo } from "../../state/DemoContext";
import { flow3 } from "../../data/fixtures";
import { IconArrow, IconCheck, IconFileText } from "../icons";

export function OwnerReportCard({ variant }: { variant: CardVariant }) {
  const { substrate, ownerPhase, openOwnerReview, openOwnerLens } = useDemo();
  if (ownerPhase === "idle") return null;

  const bien = substrate.biens.find((b) => b.id === flow3.bienId)!;
  const owner = substrate.owners.find((o) => o.id === flow3.ownerId)!;

  // Once resolved, the card collapses in place — the work resolved, it
  // didn't vanish.
  if (ownerPhase === "approved" || ownerPhase === "declined") {
    const declined = ownerPhase === "declined";
    return (
      <div className="resolved-row" role="status" aria-label="Owner report resolved">
        <span className="resolved-row__check">
          <IconCheck />
        </span>
        <span className="resolved-row__text">
          {declined
            ? "Rapport propriétaire — décliné"
            : `Rapport propriétaire — envoyé à ${owner.firstName} ${owner.lastName}`}
        </span>
        <span className="resolved-row__link">View in activity</span>
      </div>
    );
  }

  return (
    <BriefingCard
      variant={variant}
      accent="drafted"
      tag="Drafted · à valider"
      Icon={IconFileText}
      workflow="Owner reporting"
      subject={bien.address}
      photoUrl={bien.photoUrl}
      title={`Rapport de quinzaine — ${owner.firstName} ${owner.lastName}`}
      body={flow3.preview}
      source={`cadence · ${flow3.cadence}`}
      ariaLabel="Owner report decision card"
      footer={
        <>
          <button className="btn btn--primary" onClick={openOwnerReview}>
            Vérifier &amp; valider
            <IconArrow />
          </button>
          <button type="button" className="bcard__cta" onClick={openOwnerLens}>
            Voir tous les mandats
          </button>
        </>
      }
    >
      {/* Signal-as-provenance: the real world-state change that woke this. */}
      <div className="owner-trigger">
        <TriggeredBy src={{ kind: "signal", detail: flow3.triggerSignal }} />
      </div>
    </BriefingCard>
  );
}
