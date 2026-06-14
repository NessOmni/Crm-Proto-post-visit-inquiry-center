/* Conversation bar — the one persistent voice affordance, present on
   every surface. Prominent mic (voice is the hero) with typing alongside;
   the mic opens a menu: Dictate · Upload a recording. Placeholder adapts
   to context. */
import { useState } from "react";
import { useDemo } from "../state/DemoContext";
import { IconMic, IconSend, IconUpload } from "./icons";

export function ConversationBar({
  placeholder = "Ask your assistant, or hold to dictate…",
  onDictate,
  onUpload,
}: {
  placeholder?: string;
  onDictate?: () => void;
  onUpload?: () => void;
}) {
  const { phase } = useDemo();
  const [menuOpen, setMenuOpen] = useState(false);
  // Flow 1 (post-visit) drives a transient status on the home bar.
  const busy = phase === "recording" || phase === "processing";

  const field =
    phase === "recording"
      ? "Listening… dictate your post-visit note."
      : phase === "processing"
        ? "Working on it…"
        : placeholder;

  const pick = (fn?: () => void) => {
    setMenuOpen(false);
    fn?.();
  };

  return (
    <div className="convo">
      <div className="convo__inner">
        <span className="convo__field">{field}</span>
        <button className="convo__send" aria-label="Send" tabIndex={-1}>
          <IconSend />
        </button>
        <div className="convo__micwrap">
          <button
            className="convo__mic"
            aria-label="Voice"
            onClick={() => setMenuOpen((o) => !o)}
            disabled={busy}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <IconMic />
          </button>
          {menuOpen && (
            <>
              <div className="menu-scrim" onClick={() => setMenuOpen(false)} />
              <div className="menu menu--up" role="menu">
                <button
                  className="menu__item"
                  role="menuitem"
                  onClick={() => pick(onDictate)}
                >
                  <IconMic width={15} height={15} /> Dictate
                </button>
                <button
                  className="menu__item"
                  role="menuitem"
                  onClick={() => pick(onUpload)}
                >
                  <IconUpload width={15} height={15} /> Upload a recording
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
