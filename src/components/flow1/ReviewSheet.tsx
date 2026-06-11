/* The review slide-over — the four prepared outputs, each with
   citation chips. Approve resolves the card and writes to the
   activity log. */
import { useEffect } from "react";
import { useDemo } from "../../state/DemoContext";
import { flow1 } from "../../data/fixtures";
import {
  commById,
  citationsFor,
  outputLabel,
  outputRecipient,
} from "../../data/selectors";
import { CitationChip } from "./CitationChip";
import { IconClose, IconCheck } from "../icons";

const channelLabel: Record<string, string> = {
  email: "Email",
  sms: "SMS",
  portal: "Portal",
  internal: "Internal note",
};

export function ReviewSheet() {
  const { substrate, reviewOpen, closeReview, approve, phase } = useDemo();

  // Close on Escape — calm keyboard nav.
  useEffect(() => {
    if (!reviewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeReview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reviewOpen, closeReview]);

  if (!reviewOpen) return null;

  const approved = phase === "approved";
  const outputs = flow1.outputIds.map((id) => commById(substrate, id));

  return (
    <>
      <div className="scrim" onClick={closeReview} />
      <aside className="sheet" role="dialog" aria-modal="true" aria-label="Review prepared outputs">
        <header className="sheet__head">
          <div>
            <span className="kicker">Post-visit · 12 rue Lamartine</span>
            <h2 className="sheet__title">Four outputs, ready for your review</h2>
          </div>
          <button className="sheet__close" onClick={closeReview} aria-label="Close">
            <IconClose />
          </button>
        </header>

        <div className="sheet__body">
          {outputs.map((comm) => {
            const cites = citationsFor(substrate, comm);
            return (
              <section className="output" key={comm.id}>
                <div className="output__head">
                  <span className="output__label">{outputLabel[comm.kind]}</span>
                  <span className="output__channel">
                    {channelLabel[comm.channel] ?? comm.channel}
                  </span>
                </div>
                <div className="output__recipient">
                  To {outputRecipient(substrate, comm)}
                  {comm.subject ? ` · ${comm.subject}` : ""}
                </div>
                <div className="output__body">{comm.body}</div>
                <div className="output__cites">
                  {cites.map((c) => (
                    <CitationChip key={c.id} citation={c} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <footer className="sheet__foot">
          <span className="sheet__foot-note">
            Each output is drafted in your voice and backed by its source.
          </span>
          {approved ? (
            <button className="btn btn--lg btn--done" disabled>
              <IconCheck /> Approved
            </button>
          ) : (
            <button className="btn btn--primary btn--lg" onClick={approve}>
              Approve all four
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
