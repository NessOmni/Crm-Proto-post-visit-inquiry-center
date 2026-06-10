/* Conversation bar — always present at the bottom.
   Inert for now; Flow 1 will wire the mic to the voice note. */
import { IconMic, IconSend } from "./icons";

export function ConversationBar() {
  return (
    <div className="convo">
      <div className="convo__inner">
        <span className="convo__field">Ask your assistant, or hold the mic to dictate…</span>
        <button className="convo__send" aria-label="Send" tabIndex={-1}>
          <IconSend />
        </button>
        <button className="convo__mic" aria-label="Dictate a voice note" tabIndex={-1}>
          <IconMic />
        </button>
      </div>
    </div>
  );
}
