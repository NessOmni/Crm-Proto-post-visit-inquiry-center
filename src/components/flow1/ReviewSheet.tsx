/* The review slide-over — the four prepared outputs, each with citation
   chips. Each block has quiet per-output actions (Edit · Decline ·
   Approve, all reversible); the prominent footer button approves in bulk
   and reflects progress. Approving commits — resolves the card and writes
   to the activity log. Presentation state only. */
import { useEffect, useState } from "react";
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

type OutputStatus = "pending" | "approved" | "declined";

export function ReviewSheet() {
  const { substrate, reviewOpen, closeReview, approve, phase } = useDemo();

  const [status, setStatus] = useState<Record<string, OutputStatus>>({});
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [buffer, setBuffer] = useState<Record<string, string>>({});

  // Close on Escape; reset per-output state when the sheet closes.
  useEffect(() => {
    if (!reviewOpen) {
      setStatus({});
      setEditing({});
      setDrafts({});
      setBuffer({});
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeReview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reviewOpen, closeReview]);

  if (!reviewOpen) return null;

  const outputs = flow1.outputIds.map((id) => commById(substrate, id));
  const statusOf = (id: string): OutputStatus => status[id] ?? "pending";
  const bodyOf = (id: string, fallback: string) => drafts[id] ?? fallback;

  const setOne = (id: string, s: OutputStatus) => {
    setStatus((prev) => ({ ...prev, [id]: s }));
    setEditing((prev) => ({ ...prev, [id]: false }));
  };
  const startEdit = (id: string, body: string) => {
    setBuffer((prev) => ({ ...prev, [id]: bodyOf(id, body) }));
    setEditing((prev) => ({ ...prev, [id]: true }));
  };
  const saveEdit = (id: string) => {
    setDrafts((prev) => ({ ...prev, [id]: buffer[id] }));
    setEditing((prev) => ({ ...prev, [id]: false }));
  };
  const cancelEdit = (id: string) =>
    setEditing((prev) => ({ ...prev, [id]: false }));

  const pending = outputs.filter((o) => statusOf(o.id) === "pending");
  const committing = phase === "approved";

  // Bulk: approve any still-pending blocks, then commit the review.
  const onBulk = () => {
    if (pending.length > 0) {
      setStatus((prev) => {
        const next = { ...prev };
        outputs.forEach((o) => {
          if ((next[o.id] ?? "pending") === "pending") next[o.id] = "approved";
        });
        return next;
      });
    }
    approve();
  };

  const bulkLabel =
    pending.length === 0
      ? "Done"
      : pending.length === outputs.length
        ? "Approve all four"
        : `Approve remaining ${pending.length}`;

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
            const st = statusOf(comm.id);
            const isEditing = editing[comm.id];
            return (
              <section
                className={`output ${st !== "pending" ? "output--resolved" : ""}`}
                key={comm.id}
              >
                <div className="output__head">
                  <span className="output__label">{outputLabel[comm.kind]}</span>
                  <span className="output__channel">
                    {channelLabel[comm.channel] ?? comm.channel}
                  </span>
                </div>
                <div className="output__recipient">
                  {comm.channel === "internal" ? "Linked to: " : "To "}
                  {outputRecipient(substrate, comm)}
                  {comm.subject ? ` · ${comm.subject}` : ""}
                </div>

                {isEditing ? (
                  <textarea
                    className="output__edit"
                    value={buffer[comm.id] ?? ""}
                    onChange={(e) =>
                      setBuffer((prev) => ({ ...prev, [comm.id]: e.target.value }))
                    }
                    aria-label={`Edit ${outputLabel[comm.kind]}`}
                  />
                ) : (
                  <div className="output__body">{bodyOf(comm.id, comm.body)}</div>
                )}

                <div className="output__cites">
                  {cites.map((c) => (
                    <CitationChip key={c.id} citation={c} />
                  ))}
                </div>

                {isEditing ? (
                  <div className="output__actions">
                    <button className="output-act" onClick={() => cancelEdit(comm.id)}>
                      Cancel
                    </button>
                    <button
                      className="output-act output-act--approve"
                      onClick={() => saveEdit(comm.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : st === "pending" ? (
                  <div className="output__actions">
                    <button
                      className="output-act"
                      onClick={() => startEdit(comm.id, comm.body)}
                    >
                      Edit
                    </button>
                    <button className="output-act" onClick={() => setOne(comm.id, "declined")}>
                      Decline
                    </button>
                    <button
                      className="output-act output-act--approve"
                      onClick={() => setOne(comm.id, "approved")}
                    >
                      Approve
                    </button>
                  </div>
                ) : (
                  <div className="output__resolved">
                    {st === "approved" ? (
                      <span className="output__state output__state--ok">
                        <IconCheck /> Approved
                      </span>
                    ) : (
                      <span className="output__state output__state--declined">
                        Declined
                      </span>
                    )}
                    <button className="output__undo" onClick={() => setOne(comm.id, "pending")}>
                      Undo
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <footer className="sheet__foot">
          <span className="sheet__foot-note">
            Each output is drafted in your voice and backed by its source.
          </span>
          {committing ? (
            <button className="btn btn--lg btn--done" disabled>
              <IconCheck /> Approved
            </button>
          ) : (
            <button className="btn btn--primary btn--lg" onClick={onBulk}>
              {bulkLabel}
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
