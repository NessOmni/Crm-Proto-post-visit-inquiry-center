/* The trust thread — a small muted chip shown anywhere the assistant
   enriched something, pointing to where it came from. WhatsApp gets a
   small channel dot (#25D366) so the source reads as a channel; it stays
   a provenance source, never a trust tier. */
export function SourceChip({ source }: { source: string }) {
  const isWhatsApp = /whatsapp/i.test(source);
  return (
    <span className="source-chip">
      {isWhatsApp && <span className="source-chip__dot source-chip__dot--wa" />}
      source: {source}
    </span>
  );
}
