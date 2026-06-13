/* Ambient breadth card — a compact variant of the hero decision card.
   Present to show the product's range (owner reporting, mandates,
   estimations); NOT part of the demo click-path. Its CTA is inert. */
import { IconArrow } from "./icons";

export function AmbientCard({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <article className="ambient" aria-label={title}>
      <div className="ambient__head">
        <span className="kicker">{eyebrow}</span>
        <span className="badge badge--drafted">Drafted · to approve</span>
      </div>
      <h3 className="ambient__title">{title}</h3>
      <p className="ambient__body">{body}</p>
      {/* Inert — exists to be seen, not clicked, in this demo. */}
      <button type="button" className="ambient__cta">
        {cta} <IconArrow />
      </button>
    </article>
  );
}
