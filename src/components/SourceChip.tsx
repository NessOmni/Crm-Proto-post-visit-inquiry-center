/* The trust thread — a small muted chip shown anywhere the assistant
   enriched something, pointing to where it came from. */
export function SourceChip({ source }: { source: string }) {
  return <span className="source-chip">source: {source}</span>;
}
