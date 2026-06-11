/* Initials avatar, tinted by warmth. */
import type { Warmth } from "../../data/types";

export function Avatar({
  initials,
  warmth,
  size = "md",
}: {
  initials: string;
  warmth?: Warmth;
  size?: "sm" | "md" | "lg";
}) {
  const tint =
    warmth === "warm" ? "avatar--warm" : warmth === "tepid" ? "avatar--tepid" : "";
  const sz = size === "sm" ? "avatar--sm" : size === "lg" ? "avatar--lg" : "";
  return <span className={`avatar ${sz} ${tint}`}>{initials}</span>;
}
