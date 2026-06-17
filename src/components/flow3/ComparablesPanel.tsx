/* The market panel inside a mandate's detail — comparables sold + active,
   PriceHubble/DVF-style numbers with no visible API. Provenance rides as a
   source chip. Supports the report's "the price band holds" read. */
import type { Comparable } from "../../data/types";
import { SourceChip } from "../SourceChip";

export function ComparablesPanel({ comparables }: { comparables: Comparable[] }) {
  return (
    <>
      <div className="kicker section-label">Le marché autour du bien</div>
      <div className="comps">
        {comparables.map((c) => (
          <div className="comp-row" key={c.address}>
            <span className={`comp-row__dot comp-row__dot--${c.kind}`} />
            <span className="comp-row__main">
              <span className="comp-row__addr">{c.address}</span>
              <span className="comp-row__detail">{c.detail}</span>
            </span>
            <SourceChip source={c.source} />
          </div>
        ))}
      </div>
    </>
  );
}
