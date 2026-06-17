/* "Triggered by" tag — every activity line's actor is MY assistant; this
   names what set the action off. Three visually distinct sources keep the
   fold legible: a human teammate (avatar + name), a colleague's assistant
   ("[name]'s assistant", spark glyph), and a client ("client portal" chip). */
import type { TriggerSource } from "../state/DemoContext";
import { Avatar } from "./flow2/Avatar";
import { IconSpark, IconRadar } from "./icons";

export function TriggeredBy({ src }: { src: TriggerSource }) {
  return (
    <span className="trig">
      <span className="trig__by">triggered by</span>
      {src.kind === "teammate" && (
        <span className="trig__src">
          <Avatar initials={src.initials} size="xs" />
          {src.name}
        </span>
      )}
      {src.kind === "assistant-of" && (
        <span className="trig__src trig__src--assist">
          <IconSpark />
          {src.name}'s assistant
        </span>
      )}
      {src.kind === "client" && <span className="portal-chip">client portal</span>}
      {src.kind === "signal" && (
        <span className="trig__src trig__src--assist">
          <IconRadar /> signal
        </span>
      )}
      <span className="trig__detail">— {src.detail}</span>
    </span>
  );
}
