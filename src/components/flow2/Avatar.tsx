/* Initials avatar — one consistent soft pastel per entity. */
const PASTELS = ["lavender", "mint", "peach", "sky"] as const;

function pastelFor(initials: string): string {
  const sum = [...initials].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PASTELS[sum % PASTELS.length];
}

export function Avatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const sz =
    size === "xs"
      ? "avatar--xs"
      : size === "sm"
        ? "avatar--sm"
        : size === "lg"
          ? "avatar--lg"
          : "";
  return (
    <span className={`avatar avatar--${pastelFor(initials)} ${sz}`}>
      {initials}
    </span>
  );
}
