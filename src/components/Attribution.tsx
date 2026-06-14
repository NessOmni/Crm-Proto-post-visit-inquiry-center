/* Cross-actor attribution — the connective tissue that makes the
   ecosystem visible without a separate feed. A teammate shows as a
   small avatar + name; a client action shows as a muted "client portal"
   chip + the client's initials. Used on rail items and cards. */
import type { ActivityActor } from "../state/DemoContext";
import { Avatar } from "./flow2/Avatar";

export function Attribution({ actor }: { actor: ActivityActor }) {
  if (actor.kind === "teammate") {
    return (
      <span className="attribution">
        <Avatar initials={actor.initials} size="xs" />
        <span className="attribution__name">{actor.name}</span>
      </span>
    );
  }
  return (
    <span className="attribution">
      <span className="portal-chip">client portal</span>
      <Avatar initials={actor.initials} size="xs" />
    </span>
  );
}
