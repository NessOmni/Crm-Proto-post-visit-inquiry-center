/* The post-visit decision card. Rendered through the shared
   BriefingCard shell as a "spotlight" card (full photo + outputs).
   On approval it collapses to a slim resolved row in place. */
import type { CardVariant } from "../BriefingCard";
import { BriefingCard } from "../BriefingCard";
import { useDemo } from "../../state/DemoContext";
import { flow1 } from "../../data/fixtures";
import { commById, outputLabel } from "../../data/selectors";
import { IconArrow, IconCheck, IconMic } from "../icons";

export function DecisionCard({ variant }: { variant: CardVariant }) {
  const { substrate, phase, openReview } = useDemo();
  if (phase !== "ready" && phase !== "approved") return null;

  const bien = substrate.biens.find((b) => b.id === flow1.bienId)!;

  // Once approved, the card collapses to a slim resolved row in place —
  // the work didn't vanish, it resolved.
  if (phase === "approved") {
    return (
      <div className="resolved-row" role="status" aria-label="Mercier visit resolved">
        <span className="resolved-row__check">
          <IconCheck />
        </span>
        <span className="resolved-row__text">
          The Mercier visit — 4 outputs approved
        </span>
        <span className="resolved-row__link">View in activity</span>
      </div>
    );
  }

  const outputs = flow1.outputIds.map((id, i) => ({
    index: i + 1,
    label: outputLabel[commById(substrate, id).kind],
  }));

  return (
    <BriefingCard
      variant={variant}
      accent="drafted"
      tag="Drafted · to approve"
      Icon={IconMic}
      workflow="Post-visit"
      subject={bien.address}
      photoUrl={bien.photoUrl}
      title="The Mercier visit, written up."
      body="Owner update, buyer follow-up, objections, and a detected second transaction — all drafted in your voice, each backed by what you said."
      outputs={outputs}
      ariaLabel="Post-visit decision card"
      footer={
        <>
          <button className="btn btn--primary" onClick={openReview}>
            Review &amp; approve
            <IconArrow />
          </button>
          <span className="kicker">4 outputs prepared</span>
        </>
      }
    />
  );
}
