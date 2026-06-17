/* ============================================================
   Keyboard navigation — a presenter aid that moves cleanly
   between the two demo moments. Never fires while typing.

     1   Flow 1 — dictate the post-visit note (then open review)
     2   Flow 2 — open the Lead Lens
     5   Flow 3 — land the owner report (then open its review)
     ↑ ↓ move between ranked leads / mandates · Enter approves
     Enter (in a review) approves the outputs
     R   Replay the scene
     Esc closes the open surface (handled per-surface)
   ============================================================ */
import { useEffect } from "react";
import { useDemo } from "./DemoContext";
import { flow3 } from "../data/fixtures";

// The Owner Lens mandate order — health first (overdue rises), matching the
// Owner Lens list so ↑/↓ navigation lines up with what's on screen.
const HEALTH_ORDER = { overdue: 0, watch: 1, "on-track": 2 } as const;
const mandateOrder = () =>
  [...flow3.mandates].sort(
    (a, b) =>
      HEALTH_ORDER[a.health] - HEALTH_ORDER[b.health] ||
      b.daysOnMarket - a.daysOnMarket,
  );

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.isContentEditable
  );
}

export function useKeyboardNav() {
  const {
    phase,
    reviewOpen,
    lensOpen,
    view,
    substrate,
    selectedLeadId,
    repliedLeadIds,
    voiceScenario,
    commandOpen,
    ownerLensOpen,
    ownerReviewOpen,
    ownerPhase,
    selectedMandateId,
    startVoiceNote,
    openReview,
    approve,
    openLens,
    selectLead,
    sendReply,
    startVoice,
    closeVoice,
    openCommand,
    closeCommand,
    landOwnerReport,
    openOwnerReview,
    approveOwnerReport,
    selectMandate,
    replay,
  } = useDemo();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const editing = isEditable(e.target);

      // Assistant command surface — ⌘K / Ctrl+K summons it from the calm
      // briefing and dismisses it; Esc closes it. While it's open it owns
      // the keyboard, so the briefing shortcuts stay quiet behind it.
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (commandOpen) closeCommand();
        else if (
          !voiceScenario &&
          !lensOpen &&
          !reviewOpen &&
          !ownerLensOpen &&
          !ownerReviewOpen &&
          view === "briefing"
        ) {
          openCommand();
        }
        return;
      }
      if (commandOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeCommand();
        }
        return;
      }

      // Replay — available anywhere except while typing.
      if (!editing && (e.key === "r" || e.key === "R")) {
        e.preventDefault();
        replay();
        return;
      }

      // A voice moment is modal: Esc closes it; nothing else fires behind it.
      if (voiceScenario) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeVoice();
        }
        return;
      }

      // --- Lead Lens scope ---
      if (lensOpen) {
        const ranked = [...substrate.leads].sort((a, b) => b.score - a.score);
        const idx = Math.max(
          0,
          ranked.findIndex((l) => l.id === selectedLeadId),
        );
        if (e.key === "ArrowDown" || (!editing && e.key === "j")) {
          e.preventDefault();
          selectLead(ranked[Math.min(ranked.length - 1, idx + 1)].id);
        } else if (e.key === "ArrowUp" || (!editing && e.key === "k")) {
          e.preventDefault();
          selectLead(ranked[Math.max(0, idx - 1)].id);
        } else if (e.key === "Enter" && !editing) {
          const sel = ranked[idx];
          if (sel && !repliedLeadIds[sel.id]) {
            e.preventDefault();
            sendReply(sel.id);
          }
        }
        return;
      }

      // --- Review sheet scope ---
      if (reviewOpen) {
        if (e.key === "Enter" && !editing && phase !== "approved") {
          e.preventDefault();
          approve();
        }
        return;
      }

      // --- Owner Lens scope (Flow 3) — same nav as the Lead Lens ---
      if (ownerLensOpen) {
        const order = mandateOrder();
        const idx = Math.max(
          0,
          order.findIndex((m) => m.mandateId === selectedMandateId),
        );
        if (e.key === "ArrowDown" || (!editing && e.key === "j")) {
          e.preventDefault();
          selectMandate(order[Math.min(order.length - 1, idx + 1)].mandateId);
        } else if (e.key === "ArrowUp" || (!editing && e.key === "k")) {
          e.preventDefault();
          selectMandate(order[Math.max(0, idx - 1)].mandateId);
        }
        return;
      }

      // --- Owner report sheet scope (Flow 3) ---
      if (ownerReviewOpen) {
        if (e.key === "Enter" && !editing && ownerPhase !== "approved") {
          e.preventDefault();
          approveOwnerReport();
        }
        return;
      }

      if (editing) return;

      // The briefing shortcuts only apply on the home surface — never
      // behind the Contacts database view.
      if (view !== "briefing") return;

      // --- Briefing scope: jump to either demo moment ---
      if (e.key === "1") {
        e.preventDefault();
        if (phase === "idle") startVoiceNote();
        else if (phase === "ready" || phase === "approved") openReview();
      } else if (e.key === "2") {
        e.preventDefault();
        openLens();
      } else if (e.key === "3") {
        e.preventDefault();
        startVoice("global");
      } else if (e.key === "4") {
        e.preventDefault();
        startVoice("upload");
      } else if (e.key === "5") {
        e.preventDefault();
        // Flow 3 — land the owner-report card; once landed, open its review.
        if (ownerPhase === "idle") landOwnerReport();
        else openOwnerReview();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    phase,
    reviewOpen,
    lensOpen,
    view,
    substrate,
    selectedLeadId,
    repliedLeadIds,
    voiceScenario,
    commandOpen,
    ownerLensOpen,
    ownerReviewOpen,
    ownerPhase,
    selectedMandateId,
    startVoiceNote,
    openReview,
    approve,
    openLens,
    selectLead,
    sendReply,
    startVoice,
    closeVoice,
    openCommand,
    closeCommand,
    landOwnerReport,
    openOwnerReview,
    approveOwnerReport,
    selectMandate,
    replay,
  ]);
}
