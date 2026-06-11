/* Conversation bar — always present at the bottom.
   The mic dictates the post-visit voice note (Flow 1). */
import { useDemo } from "../state/DemoContext";
import { IconMic, IconSend } from "./icons";

export function ConversationBar() {
  const { phase, startVoiceNote } = useDemo();
  const busy = phase === "recording" || phase === "processing";

  const field =
    phase === "recording"
      ? "Listening… dictate your post-visit note."
      : phase === "processing"
        ? "Working on it…"
        : "Ask your assistant, or tap the mic to dictate a voice note…";

  return (
    <div className="convo">
      <div className="convo__inner">
        <span className="convo__field">{field}</span>
        <button className="convo__send" aria-label="Send" tabIndex={-1}>
          <IconSend />
        </button>
        <button
          className="convo__mic"
          aria-label="Dictate a voice note"
          onClick={startVoiceNote}
          disabled={busy}
          aria-pressed={phase === "recording"}
        >
          <IconMic />
        </button>
      </div>
    </div>
  );
}
