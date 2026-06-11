/* Small read helpers over the substrate. Pure, deterministic. */
import type {
  Substrate,
  Communication,
  Citation,
  CommunicationKind,
} from "./types";

export function citationsFor(
  substrate: Substrate,
  comm: Communication,
): Citation[] {
  return comm.citationIds
    .map((id) => substrate.citations.find((c) => c.id === id))
    .filter((c): c is Citation => Boolean(c));
}

export function commById(substrate: Substrate, id: string): Communication {
  const comm = substrate.communications.find((c) => c.id === id);
  if (!comm) throw new Error(`Unknown communication: ${id}`);
  return comm;
}

/** English UI label for each prepared output. */
export const outputLabel: Record<CommunicationKind, string> = {
  "owner-update": "Owner update",
  "buyer-follow-up": "Buyer follow-up",
  "lead-reply": "Lead reply",
  objection: "Objections logged",
  note: "Second transaction detected",
};

/** Short English recipient/context line shown under the label. */
export function outputRecipient(substrate: Substrate, comm: Communication): string {
  if (comm.relatedContactId) {
    const c = substrate.contacts.find((x) => x.id === comm.relatedContactId);
    if (c) return `${c.firstName} ${c.lastName}`;
  }
  if (comm.kind === "owner-update" && comm.relatedBienId) {
    const bien = substrate.biens.find((b) => b.id === comm.relatedBienId);
    if (bien) {
      const owner = substrate.owners.find((o) => o.id === bien.ownerId);
      if (owner) return `${owner.firstName} ${owner.lastName}`;
    }
  }
  if (comm.relatedBienId) {
    const bien = substrate.biens.find((b) => b.id === comm.relatedBienId);
    if (bien) return bien.address;
  }
  return "Internal";
}
