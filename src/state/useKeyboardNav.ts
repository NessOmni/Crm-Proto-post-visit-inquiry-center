/* ============================================================
   Keyboard navigation — a presenter aid that moves cleanly
   between the two demo moments. Never fires while typing.

     1   Flow 1 — dictate the post-visit note (then open review)
     2   Flow 2 — open the Lead Lens
     ↑ ↓ move between ranked leads · Enter approves & sends
     Enter (in review) approves the four outputs
     R   Replay the scene
     Esc closes the open surface (handled per-surface)
   ============================================================ */
import { useEffect } from "react";
import { useDemo } from "./DemoContext";

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
    startVoiceNote,
    openReview,
    approve,
    openLens,
    selectLead,
    sendReply,
    startVoice,
    closeVoice,
    replay,
  } = useDemo();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const editing = isEditable(e.target);

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
    startVoiceNote,
    openReview,
    approve,
    openLens,
    selectLead,
    sendReply,
    startVoice,
    closeVoice,
    replay,
  ]);
}
