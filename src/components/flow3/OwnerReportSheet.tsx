/* The owner report review — the ReviewSheet shell reused, but showing ONE
   composite living report (three citation-backed sections) instead of four
   atomic outputs. Kept deliberately tight and scannable: the richer,
   continuous history lives in the Owner Lens, not in the approval sheet.
   Footer: Modifier · Décliner · Approuver et envoyer. Approve writes one
   entry to the activity log and resolves the card. */
import { useEffect, useState } from "react";
import type { Citation } from "../../data/types";
import { useDemo } from "../../state/DemoContext";
import { flow3 } from "../../data/fixtures";
import { CitationChip } from "../flow1/CitationChip";
import { IconClose, IconCheck } from "../icons";

export function OwnerReportSheet() {
  const {
    substrate,
    ownerReviewOpen,
    ownerPhase,
    closeOwnerReview,
    approveOwnerReport,
    declineOwnerReport,
  } = useDemo();

  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  // Close on Escape; reset the edit buffer when the sheet closes.
  useEffect(() => {
    if (!ownerReviewOpen) {
      setEditing(false);
      setDrafts({});
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOwnerReview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ownerReviewOpen, closeOwnerReview]);

  if (!ownerReviewOpen) return null;

  const { report } = flow3;
  const committing = ownerPhase === "approved";
  const bodyOf = (id: string, fallback: string) => drafts[id] ?? fallback;

  return (
    <>
      <div className="scrim" onClick={closeOwnerReview} />
      <aside
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Review owner report"
      >
        <header className="sheet__head">
          <div>
            <span className="kicker">Rapport propriétaire · {flow3.cadence}</span>
            <h2 className="sheet__title">
              Rapport pour {report.to} — {report.bien}
            </h2>
          </div>
          <button className="sheet__close" onClick={closeOwnerReview} aria-label="Close">
            <IconClose />
          </button>
        </header>

        <div className="sheet__body">
          <p className="owner-report__meta">
            Email · à {report.to} · rédigé dans votre voix
          </p>

          {report.sections.map((sec) => {
            const cites = sec.citationIds
              .map((id) => substrate.citations.find((c) => c.id === id))
              .filter((c): c is Citation => Boolean(c));
            return (
              <section className="output" key={sec.id}>
                <div className="output__head">
                  <span className="output__label">{sec.heading}</span>
                </div>
                {editing ? (
                  <textarea
                    className="output__edit"
                    value={bodyOf(sec.id, sec.body)}
                    onChange={(e) =>
                      setDrafts((p) => ({ ...p, [sec.id]: e.target.value }))
                    }
                    aria-label={`Modifier — ${sec.heading}`}
                  />
                ) : (
                  <div className="output__body">{bodyOf(sec.id, sec.body)}</div>
                )}
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
            Rédigé dans votre voix, appuyé sur vos sources.
          </span>
          <div className="owner-report__actions">
            <button
              type="button"
              className="output-act"
              onClick={() => setEditing((v) => !v)}
            >
              {editing ? "Terminer" : "Modifier"}
            </button>
            <button type="button" className="output-act" onClick={declineOwnerReport}>
              Décliner
            </button>
            {committing ? (
              <button className="btn btn--lg btn--done" disabled>
                <IconCheck /> Envoyé
              </button>
            ) : (
              <button
                className="btn btn--primary btn--lg"
                onClick={approveOwnerReport}
              >
                Approuver et envoyer
              </button>
            )}
          </div>
        </footer>
      </aside>
    </>
  );
}
