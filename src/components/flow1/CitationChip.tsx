/* A citation chip — points to the source behind a drafted output.
   Hovering reveals the quoted fragment (title). */
import type { Citation } from "../../data/types";
import { IconQuote, IconWaveSrc, IconRecordSrc } from "../icons";

function sourceIcon(source: Citation["source"]) {
  switch (source) {
    case "voice-note":
      return <IconWaveSrc />;
    case "visit":
      return <IconRecordSrc />;
    default:
      return <IconQuote />;
  }
}

export function CitationChip({ citation }: { citation: Citation }) {
  return (
    <span className="cite" title={citation.quote}>
      {sourceIcon(citation.source)}
      {citation.label}
    </span>
  );
}
