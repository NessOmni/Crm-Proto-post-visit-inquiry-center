/* ============================================================
   Omnicasa — shared substrate
   The entity model both flows read. One substrate, two workflows.
   ============================================================ */

export type ID = string;

/** Trust tier carried on every assistant action. */
export type TrustTier = "automatic" | "drafted";

/** Where a citation points — the source of a drafted output. */
export type CitationSource = "voice-note" | "lead-message" | "record" | "visit" | "mandate";

/** Listing intent for a bien. */
export type BienKind = "sale" | "rental";

/** Property portals leads arrive from. */
export type Portal = "SeLoger" | "Leboncoin" | "Bien'ici" | "PAP" | "Logic-Immo";

export interface Agency {
  id: ID;
  name: string;
  city: string;
  /** Short mono kicker shown in the shell header. */
  kicker: string;
}

export interface Agent {
  id: ID;
  agencyId: ID;
  firstName: string;
  lastName: string;
  /** Initials for the avatar. */
  initials: string;
  role: string;
}

export interface Owner {
  id: ID;
  firstName: string;
  lastName: string;
  /** Authentic French fixture detail. */
  phone?: string;
  email?: string;
}

export interface Contact {
  id: ID;
  firstName: string;
  lastName: string;
  initials: string;
  phone?: string;
  email?: string;
  /** The hidden second transaction: this contact also has a property to sell. */
  hasPropertyToSell?: boolean;
}

export interface Bien {
  id: ID;
  reference: string;
  kind: BienKind;
  /** Street line, authentic French. */
  address: string;
  postalCode: string;
  city: string;
  priceEur: number;
  surfaceM2: number;
  rooms: number;
  bedrooms: number;
  /** Short art-directed blurb. */
  blurb: string;
  ownerId: ID;
  /** Optional photo URL (CDN); a gradient fallback covers offline. */
  photoUrl?: string;
}

export interface Mandate {
  id: ID;
  bienId: ID;
  ownerId: ID;
  kind: "exclusive" | "simple";
  active: boolean;
  signedOn: string; // ISO date
}

export interface Visit {
  id: ID;
  bienId: ID;
  contactId: ID;
  agentId: ID;
  date: string; // ISO datetime
  durationMin: number;
}

export type LeadStatus = "new" | "acknowledged" | "active";
export type Warmth = "hot" | "warm" | "tepid";

/** Did the assistant send the first substantive reply on its own,
 *  or hold the lead for the agent's decision? */
export type LeadDisposition = "auto-sent" | "held";

/** A structured fact the assistant extracted from the raw enquiry.
 *  "found" facts came from the prose; "gap" facts are what's missing. */
export interface ExtractedFact {
  label: string;
  status: "found" | "gap";
}

/** Why a lead was held for the agent rather than auto-handled. */
export interface HeldReason {
  signal: string;
  reasoning: string;
  suggestedAction: string;
}

/** The assistant's reading of one lead: the raw message, the facts it
 *  pulled out, and the reply it wrote against the detected gap. */
export interface LeadInsight {
  /** Raw inbound portal enquiry, free text (French). */
  inbound: string;
  /** Facts extracted from the prose — each ties back to the message. */
  facts: ExtractedFact[];
  /** The reply, written against the gap (sent, or drafted if held). */
  reply: string;
  /** Clock label for an auto-sent reply. */
  replyAt?: string;
  /** Present only on the held lead. */
  held?: HeldReason;
}

export interface Lead {
  id: ID;
  firstName: string;
  lastName: string;
  initials: string;
  portal: Portal;
  status: LeadStatus;
  warmth: Warmth;
  /** Whether the assistant auto-sent the first reply or held the lead. */
  disposition: LeadDisposition;
  /** Ranking score, deterministic. Higher = warmer. */
  score: number;
  /** Bien the lead enquired about. */
  bienId: ID;
  /** Short warmth signals, e.g. "Replied within 4 min". */
  signals: string[];
  arrivedAt: string; // ISO datetime
  /** Was this lead a duplicate folded into another? */
  dedupedFrom?: string;
}

export type CommunicationKind = "owner-update" | "buyer-follow-up" | "lead-reply" | "objection" | "note";
export type CommunicationChannel = "email" | "sms" | "portal" | "internal";

export interface Communication {
  id: ID;
  kind: CommunicationKind;
  channel: CommunicationChannel;
  tier: TrustTier;
  subject?: string;
  body: string;
  /** Citations backing this drafted output. */
  citationIds: ID[];
  relatedContactId?: ID;
  relatedLeadId?: ID;
  relatedBienId?: ID;
  createdAt: string; // ISO datetime
}

export interface Citation {
  id: ID;
  source: CitationSource;
  /** Short chip label, e.g. "Voice note · 00:18". */
  label: string;
  /** The quoted fragment the output draws from. */
  quote: string;
}

/** One step in a lead's activity timeline (Flow 2). */
export interface LeadEvent {
  id: ID;
  tier: TrustTier;
  /** English UI label, e.g. "Auto-acknowledged". */
  label: string;
  /** Optional supporting detail. */
  detail?: string;
  /** Clock label, e.g. "01:14". */
  time: string;
  /** The "held for you" decision point — styled distinctly (amber). */
  held?: boolean;
}

/** The full seed substrate both flows read. */
export interface Substrate {
  agency: Agency;
  agent: Agent;
  owners: Owner[];
  contacts: Contact[];
  biens: Bien[];
  mandates: Mandate[];
  visits: Visit[];
  leads: Lead[];
  communications: Communication[];
  citations: Citation[];
}

/* ============================================================
   Contacts view — the classic CRM table, reproduced.
   A flat directory derived from the same substrate people.
   ============================================================ */

export type ContactCategory = "Owner" | "Buyer" | "Tenant";

/** The manager who owns the relationship (initials drive the avatar). */
export interface ManagerRef {
  name: string;
  initials: string;
}

/** One row in the All-contacts table. */
export interface ContactRow {
  id: string; // display reference, e.g. "#10231"
  name: string; // honorific + full name, e.g. "M. Julien Mercier"
  phone: string;
  email: string;
  category?: ContactCategory;
  manager: ManagerRef;
}

/** The filterable columns, in table order. */
export type ContactColumn =
  | "name"
  | "id"
  | "phone"
  | "email"
  | "category"
  | "manager";
