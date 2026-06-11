/* The decision card — hero treatment for the live decision.
   Lands in the briefing with a soft flash; carries the
   "Drafted · to approve" badge until the agent approves. */
import { useDemo } from "../../state/DemoContext";
import { flow1 } from "../../data/fixtures";
import { commById, outputLabel } from "../../data/selectors";
import { Photo } from "../Photo";
import { IconArrow, IconCheck } from "../icons";

export function DecisionCard() {
  const { substrate, phase, openReview } = useDemo();
  if (phase !== "ready" && phase !== "approved") return null;

  const bien = substrate.biens.find((b) => b.id === flow1.bienId)!;
  const resolved = phase === "approved";
  const outputs = flow1.outputIds.map((id) => commById(substrate, id));

  return (
    <article
      className={`card decision ${resolved ? "decision--resolved" : ""}`}
      aria-label="Post-visit decision card"
    >
      <Photo
        url={bien.photoUrl}
        alt={`${bien.address}, ${bien.city}`}
        className="decision__banner"
        seed={2}
      />
      <div className="decision__body">
        <div className="decision__top">
          <span className="kicker">Post-visit · {bien.address}</span>
          {resolved ? (
            <span className="badge badge--auto">Approved · handled</span>
          ) : (
            <span className="badge badge--drafted">Drafted · to approve</span>
          )}
        </div>

        <h2 className="decision__title">The Mercier visit, written up.</h2>
        <p className="decision__summary">
          Owner update, buyer follow-up, objections, and a detected second
          transaction — all drafted in your voice, each backed by what you said.
        </p>

        <div className="decision__outputs">
          {outputs.map((c, i) => (
            <span key={c.id} className="out-chip">
              <span className="out-chip__n">{i + 1}</span>
              {outputLabel[c.kind]}
            </span>
          ))}
        </div>

        {resolved ? (
          <div className="decision__resolved">
            <span className="decision__check">
              <IconCheck />
            </span>
            Approved — four actions written to the activity log.
          </div>
        ) : (
          <div className="decision__actions">
            <button className="btn btn--primary" onClick={openReview}>
              Review &amp; approve
              <IconArrow />
            </button>
            <span className="kicker">4 outputs prepared</span>
          </div>
        )}
      </div>
    </article>
  );
}
