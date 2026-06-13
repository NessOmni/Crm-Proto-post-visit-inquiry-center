/* ============================================================
   Omnicasa — seed fixtures
   One substrate both flows read. Same agency, same agent,
   the Rue Lamartine bien (the Mercier visit), and the
   24 rue de la Roquette rental.

   Deterministic & offline. UI copy is English; fixture data
   (names, streets, property details) is authentic French.
   ============================================================ */

import type { Substrate, LeadEvent, LeadInsight, ContactRow } from "./types";

/* --- Agency & agent --------------------------------------- */
const agency: Substrate["agency"] = {
  id: "agency-omnicasa",
  name: "Omnicasa — Agence Lamartine",
  city: "Paris",
  kicker: "Paris 9ᵉ · Rive Droite",
};

const agent: Substrate["agent"] = {
  id: "agent-camille",
  agencyId: "agency-omnicasa",
  firstName: "Camille",
  lastName: "Roussel",
  initials: "CR",
  role: "Conseillère en immobilier",
};

/* --- Owners ----------------------------------------------- */
const owners: Substrate["owners"] = [
  {
    id: "owner-fontaine",
    firstName: "Hélène",
    lastName: "Fontaine",
    phone: "+33 6 12 44 09 71",
    email: "helene.fontaine@orange.fr",
  },
  {
    id: "owner-lemaire",
    firstName: "Bertrand",
    lastName: "Lemaire",
    phone: "+33 6 84 23 55 18",
    email: "b.lemaire@wanadoo.fr",
  },
];

/* --- Contacts --------------------------------------------- */
const contacts: Substrate["contacts"] = [
  {
    id: "contact-mercier",
    firstName: "Julien",
    lastName: "Mercier",
    initials: "JM",
    phone: "+33 6 71 90 32 04",
    email: "julien.mercier@gmail.com",
    // The hidden second transaction surfaced from the voice note.
    hasPropertyToSell: true,
  },
];

/* --- Biens ------------------------------------------------- */
const biens: Substrate["biens"] = [
  {
    id: "bien-lamartine",
    reference: "OMN-2241",
    kind: "sale",
    address: "12 rue Lamartine",
    postalCode: "75009",
    city: "Paris",
    priceEur: 845000,
    surfaceM2: 78,
    rooms: 4,
    bedrooms: 2,
    blurb:
      "Haussmannien plein sud, parquet point de Hongrie, deux balcons filants sur cour pavée.",
    ownerId: "owner-fontaine",
    photoUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "bien-roquette",
    reference: "OMN-2188",
    kind: "rental",
    address: "24 rue de la Roquette",
    postalCode: "75011",
    city: "Paris",
    priceEur: 1750,
    surfaceM2: 42,
    rooms: 2,
    bedrooms: 1,
    blurb:
      "Deux-pièces lumineux au cœur de Bastille, refait à neuf, cuisine ouverte, cinquième étage avec ascenseur.",
    ownerId: "owner-lemaire",
    photoUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=70",
  },
];

/* --- Mandates ---------------------------------------------- */
const mandates: Substrate["mandates"] = [
  {
    id: "mandate-lamartine",
    bienId: "bien-lamartine",
    ownerId: "owner-fontaine",
    kind: "exclusive",
    active: true,
    signedOn: "2026-05-04",
  },
  {
    id: "mandate-roquette",
    bienId: "bien-roquette",
    ownerId: "owner-lemaire",
    kind: "exclusive",
    active: true,
    signedOn: "2026-05-22",
  },
];

/* --- Visits ------------------------------------------------ */
const visits: Substrate["visits"] = [
  {
    id: "visit-mercier-lamartine",
    bienId: "bien-lamartine",
    contactId: "contact-mercier",
    agentId: "agent-camille",
    date: "2026-06-09T17:30:00+02:00",
    durationMin: 35,
  },
];

/* --- Leads (the overnight burst — ranked by warmth) -------- */
const leads: Substrate["leads"] = [
  {
    id: "lead-bonnet",
    firstName: "Margaux",
    lastName: "Bonnet",
    initials: "MB",
    portal: "SeLoger",
    status: "acknowledged",
    warmth: "hot",
    disposition: "auto-sent",
    score: 94,
    bienId: "bien-roquette",
    signals: ["A répondu en 4 min", "Dossier complet joint", "Disponible cette semaine"],
    arrivedAt: "2026-06-10T01:12:00+02:00",
  },
  {
    id: "lead-david",
    firstName: "Antoine",
    lastName: "David",
    initials: "AD",
    portal: "Bien'ici",
    status: "acknowledged",
    warmth: "hot",
    disposition: "auto-sent",
    score: 88,
    bienId: "bien-roquette",
    signals: ["Budget confirmé", "Garant en CDI", "Cherche pour le 1er juillet"],
    arrivedAt: "2026-06-10T02:03:00+02:00",
  },
  {
    id: "lead-leroy",
    firstName: "Camille",
    lastName: "Leroy",
    initials: "CL",
    portal: "Leboncoin",
    status: "acknowledged",
    warmth: "warm",
    disposition: "auto-sent",
    score: 79,
    bienId: "bien-roquette",
    signals: ["Visite demandée", "Quartier ciblé"],
    arrivedAt: "2026-06-10T03:41:00+02:00",
    dedupedFrom: "Doublon SeLoger fusionné",
  },
  {
    id: "lead-petit",
    firstName: "Sarah",
    lastName: "Petit",
    initials: "SP",
    portal: "PAP",
    status: "acknowledged",
    warmth: "warm",
    disposition: "held",
    score: 72,
    bienId: "bien-roquette",
    signals: ["Revenus 3× le loyer", "Sans animaux"],
    arrivedAt: "2026-06-10T04:18:00+02:00",
  },
  {
    id: "lead-morel",
    firstName: "Thomas",
    lastName: "Morel",
    initials: "TM",
    portal: "Logic-Immo",
    status: "acknowledged",
    warmth: "warm",
    disposition: "auto-sent",
    score: 68,
    bienId: "bien-roquette",
    signals: ["Mutation professionnelle", "Flexible sur la date"],
    arrivedAt: "2026-06-10T05:02:00+02:00",
  },
  {
    id: "lead-girard",
    firstName: "Inès",
    lastName: "Girard",
    initials: "IG",
    portal: "SeLoger",
    status: "acknowledged",
    warmth: "tepid",
    disposition: "auto-sent",
    score: 61,
    bienId: "bien-roquette",
    signals: ["Première prise de contact", "À qualifier"],
    arrivedAt: "2026-06-10T05:47:00+02:00",
  },
];

/* --- Citations (sources behind drafted outputs) ----------- */
const citations: Substrate["citations"] = [
  {
    id: "cite-voice-owner",
    source: "voice-note",
    label: "Note vocale · 00:08",
    quote: "Préviens Mme Fontaine que la visite s'est très bien passée.",
  },
  {
    id: "cite-voice-buyer",
    source: "voice-note",
    label: "Note vocale · 00:14",
    quote: "Mercier était emballé par la lumière, un peu freiné par le prix.",
  },
  {
    id: "cite-voice-objection",
    source: "voice-note",
    label: "Note vocale · 00:21",
    quote: "Il a tiqué sur les 845, et sur la cuisine à refaire.",
  },
  {
    id: "cite-voice-second-tx",
    source: "voice-note",
    label: "Note vocale · 00:27",
    quote: "Au fait, lui aussi a un bien à vendre, un trois-pièces vers République.",
  },
  {
    id: "cite-visit-record",
    source: "visit",
    label: "Visite · 09 juin",
    quote: "12 rue Lamartine · 35 min · Julien Mercier.",
  },
  {
    id: "cite-lead-bonnet",
    source: "lead-message",
    label: "SeLoger · Margaux Bonnet",
    quote: "Bonjour, le bien est-il toujours disponible ? Dossier complet prêt à envoyer.",
  },
];

/* --- Communications (prepared drafted outputs for Flow 1) -- */
const communications: Substrate["communications"] = [
  {
    id: "comm-owner-update",
    kind: "owner-update",
    channel: "email",
    tier: "drafted",
    subject: "Retour de visite — 12 rue Lamartine",
    body:
      "Bonjour Madame Fontaine,\n\nLa visite d'hier soir s'est très bien déroulée. " +
      "L'acquéreur a été particulièrement séduit par la luminosité et le charme de l'appartement. " +
      "Je reviens vers vous dès que j'ai du concret à vous transmettre.\n\nBien à vous,\nCamille Roussel",
    citationIds: ["cite-voice-owner", "cite-visit-record"],
    relatedBienId: "bien-lamartine",
    createdAt: "2026-06-10T08:02:00+02:00",
  },
  {
    id: "comm-buyer-followup",
    kind: "buyer-follow-up",
    channel: "email",
    tier: "drafted",
    subject: "Suite à votre visite — 12 rue Lamartine",
    body:
      "Bonjour Monsieur Mercier,\n\nMerci pour votre visite d'hier. " +
      "Je reste à votre disposition pour toute question sur le bien ou sur les modalités. " +
      "N'hésitez pas à me dire si vous souhaitez une seconde visite.\n\nBien cordialement,\nCamille Roussel",
    citationIds: ["cite-voice-buyer", "cite-visit-record"],
    relatedContactId: "contact-mercier",
    relatedBienId: "bien-lamartine",
    createdAt: "2026-06-10T08:02:00+02:00",
  },
  {
    id: "comm-objection",
    kind: "objection",
    channel: "internal",
    tier: "drafted",
    body: "Objections relevées : prix perçu élevé (845 000 €) ; cuisine à rénover.",
    citationIds: ["cite-voice-objection"],
    relatedContactId: "contact-mercier",
    relatedBienId: "bien-lamartine",
    createdAt: "2026-06-10T08:02:00+02:00",
  },
  {
    id: "comm-second-tx",
    kind: "note",
    channel: "internal",
    tier: "drafted",
    subject: "Seconde transaction détectée",
    body:
      "M. Mercier dispose d'un bien à vendre — un trois-pièces aux alentours de République. " +
      "Opportunité d'estimation à proposer.",
    citationIds: ["cite-voice-second-tx"],
    relatedContactId: "contact-mercier",
    createdAt: "2026-06-10T08:02:00+02:00",
  },
];

/** The frozen seed. Cloned on read so a reset restores it exactly. */
export const seed: Substrate = {
  agency,
  agent,
  owners,
  contacts,
  biens,
  mandates,
  visits,
  leads,
  communications,
  citations,
};

/** Deep clone of the seed — every run identical, perfectly resettable. */
export function loadSubstrate(): Substrate {
  return structuredClone(seed);
}

/* ============================================================
   Flow 1 — the Mercier moment
   The dictated voice note, the processing beat, and the four
   prepared outputs (in review order). Deterministic; the
   "transcript" is a fixture, not real transcription.
   ============================================================ */

export const flow1 = {
  bienId: "bien-lamartine",
  contactId: "contact-mercier",
  visitId: "visit-mercier-lamartine",
  durationLabel: "0:31",

  /** ~30s post-visit dictation. Streams in word by word from here. */
  transcript:
    "Bon, je sors de la visite du 12 rue Lamartine avec Monsieur Mercier. " +
    "Préviens Madame Fontaine que la visite s'est très bien passée, il a vraiment accroché. " +
    "Mercier était emballé par la lumière, un peu freiné par le prix — " +
    "il a tiqué sur les 845, et sur la cuisine à refaire. " +
    "Prépare-lui un mot de suivi, qu'on garde le contact pour une deuxième visite. " +
    "Ah, et au fait : lui aussi a un bien à vendre, un trois-pièces vers République. " +
    "Note-le, il faudra lui proposer une estimation.",

  /** The assistant visibly doing the work. */
  processingSteps: [
    "Transcribing the voice note",
    "Matching against the Mercier visit · 12 rue Lamartine",
    "Drafting the owner update",
    "Preparing the buyer follow-up",
    "Logging objections",
    "Detecting a second transaction",
  ],

  /** The four outputs, in the review-sheet order. */
  outputIds: [
    "comm-owner-update",
    "comm-buyer-followup",
    "comm-objection",
    "comm-second-tx",
  ],
} as const;

/* ============================================================
   Flow 2 — the overnight burst
   Leads arrived overnight, were deduplicated, acknowledged, and
   ranked by warmth — all Automatic · handled. The Lead Lens is a
   depth view the agent chooses to open. Deterministic & offline.
   ============================================================ */

/** Clock label HH:MM from an ISO time, optionally offset by minutes. */
function clock(iso: string, addMin = 0): string {
  const hh = Number(iso.slice(11, 13));
  const mm = Number(iso.slice(14, 16));
  const total = hh * 60 + mm + addMin;
  const h = Math.floor(total / 60) % 24;
  const m = ((total % 60) + 60) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** The activity timeline the overnight assistant produced per lead.
 *  Auto-sent leads gain a third automatic "Reply sent" entry; the
 *  held lead instead shows a distinct "Held for your decision" point. */
function buildTimeline(leadId: string): LeadEvent[] {
  const lead = leads.find((l) => l.id === leadId)!;
  const events: LeadEvent[] = [
    {
      id: `${leadId}-recv`,
      tier: "automatic",
      label: "Lead received",
      detail: `${lead.portal} · 24 rue de la Roquette`,
      time: clock(lead.arrivedAt),
    },
  ];
  if (lead.dedupedFrom) {
    events.push({
      id: `${leadId}-dedup`,
      tier: "automatic",
      label: "Duplicate merged",
      detail: lead.dedupedFrom,
      time: clock(lead.arrivedAt, 1),
    });
  }
  events.push({
    id: `${leadId}-ack`,
    tier: "automatic",
    label: "Auto-acknowledged",
    detail: "Confirmation reply sent",
    time: clock(lead.arrivedAt, 2),
  });

  if (lead.disposition === "held") {
    events.push({
      id: `${leadId}-held`,
      tier: "drafted",
      held: true,
      label: "Held for your decision",
      detail: "Competing deadline — needs a human call",
      time: clock(lead.arrivedAt, 3),
    });
  } else {
    events.push({
      id: `${leadId}-sent`,
      tier: "automatic",
      label: "Reply sent",
      detail: "Substantive reply — no approval needed",
      time: clock(lead.arrivedAt, 4),
    });
  }
  return events;
}

/* Per-lead insight: the raw enquiry, the facts the assistant pulled
   from it, and a reply written against the detected gap. The reply is
   specific to each lead's extracted facts — never a tone-graded template. */
const insights: Record<string, LeadInsight> = {
  // Rank 1 — income stated, but no guarantor → reply asks for the garant.
  "lead-bonnet": {
    inbound:
      "Bonjour, votre annonce pour le 24 rue de la Roquette m'intéresse beaucoup. " +
      "Je suis en CDI depuis trois ans et je gagne 3 900 € net par mois. " +
      "L'appartement est-il toujours disponible ? Je peux me libérer dès cette semaine " +
      "pour une visite. Merci d'avance.",
    facts: [
      { label: "Revenus : 3 900 € net", status: "found" },
      { label: "Situation : CDI, 3 ans", status: "found" },
      { label: "Visite : souhaitée cette semaine", status: "found" },
      { label: "Garant : non précisé", status: "gap" },
    ],
    replyAt: "01:15",
    reply:
      "Bonjour Margaux,\n\n" +
      "Merci pour votre message — le 24 rue de la Roquette est toujours disponible. " +
      "Vos revenus correspondent bien au loyer (environ trois fois). " +
      "Pour compléter votre dossier, pourriez-vous me préciser si vous disposez d'un garant, " +
      "et le cas échéant sa situation ?\n\n" +
      "Je vous propose une visite jeudi ou vendredi en fin de journée.\n\n" +
      "Bien à vous,\nCamille Roussel",
  },

  // Rank 2 — guarantor given, but his own income missing → asks for his payslips.
  "lead-david": {
    inbound:
      "Bonjour, je suis très intéressé par le deux-pièces rue de la Roquette. " +
      "Mon garant est en CDI et mon budget est validé de mon côté. " +
      "J'aimerais idéalement emménager pour le 1er juillet. Est-ce encore disponible ?",
    facts: [
      { label: "Garant : CDI confirmé", status: "found" },
      { label: "Budget : validé", status: "found" },
      { label: "Emménagement : 1er juillet", status: "found" },
      { label: "Revenus du locataire : non précisés", status: "gap" },
    ],
    replyAt: "02:06",
    reply:
      "Bonjour Antoine,\n\n" +
      "Merci pour votre message. L'appartement est disponible et le 1er juillet est tout à fait jouable. " +
      "Un garant en CDI est un vrai atout pour le dossier. " +
      "Pour le finaliser, pourriez-vous joindre vos propres justificatifs de revenus " +
      "(vos trois derniers bulletins de salaire) ?\n\n" +
      "Je peux vous proposer une visite cette semaine si vous le souhaitez.\n\n" +
      "Bien à vous,\nCamille Roussel",
  },

  // Rank 3 — strong intent, zero financials → asks for the full dossier.
  "lead-leroy": {
    inbound:
      "Bonjour, je cherche absolument dans le 11e, autour de Bastille, et votre annonce " +
      "correspond parfaitement à ce que je veux. Serait-il possible de visiter rapidement ? " +
      "J'ai déjà visité plusieurs biens dans le secteur ces derniers jours.",
    facts: [
      { label: "Secteur ciblé : Bastille / 11e", status: "found" },
      { label: "Visite : demandée rapidement", status: "found" },
      { label: "Revenus : non précisés", status: "gap" },
      { label: "Garant : non précisé", status: "gap" },
    ],
    replyAt: "03:44",
    reply:
      "Bonjour Camille,\n\n" +
      "Avec plaisir — l'emplacement correspond exactement à votre recherche et le bien est disponible. " +
      "Je vous propose une visite dès cette semaine. " +
      "Pour préparer votre dossier en amont, pourriez-vous me transmettre vos justificatifs de revenus " +
      "ainsi que les coordonnées d'un garant ?\n\n" +
      "Bien à vous,\nCamille Roussel",
  },

  // Rank 4 — HELD. Competing deadline + visit-timeline compression.
  "lead-petit": {
    inbound:
      "Bonjour, votre appartement me plaît beaucoup. Je dois vous préciser que je suis aussi " +
      "en lice sur un autre appartement et que je dois me décider avant vendredi. " +
      "Serait-il possible d'organiser une visite avant cette date ? " +
      "Mes revenus sont d'environ trois fois le loyer et je n'ai pas d'animaux.",
    facts: [
      { label: "Revenus : ~3× le loyer", status: "found" },
      { label: "Animaux : aucun", status: "found" },
      { label: "Concurrence : autre bien en parallèle", status: "found" },
      { label: "Échéance : décision avant vendredi", status: "found" },
      { label: "Demande : visite avant vendredi", status: "found" },
    ],
    held: {
      signal:
        "Sarah mentions a competing flat with a Friday deadline, and asks for a visit before then.",
      reasoning:
        "Competing deadline detected (Friday) + request to compress the visit timeline. " +
        "This needs a scheduling commitment I can't make for you, and likely a call rather than " +
        "an email. Held for your decision.",
      suggestedAction:
        "Call Sarah today to offer a visit slot before Friday. The draft below is a fallback if you'd rather write first.",
    },
    reply:
      "Bonjour Sarah,\n\n" +
      "Merci pour votre message et votre intérêt pour le 24 rue de la Roquette. " +
      "Je comprends que vous deviez vous décider avant vendredi. " +
      "Je vous propose de convenir d'un créneau de visite très rapidement — " +
      "seriez-vous disponible jeudi ou vendredi ? Indiquez-moi vos disponibilités et " +
      "je reviens vers vous dans la journée pour confirmer.\n\n" +
      "Bien à vous,\nCamille Roussel",
  },

  // Rank 5 — relocation, no financials → asks for employer attestation + income.
  "lead-morel": {
    inbound:
      "Bonjour, je suis muté à Paris pour mon travail et je dois trouver un logement dans le 11e. " +
      "Je suis assez flexible sur la date d'entrée. Le 24 rue de la Roquette est-il toujours libre ?",
    facts: [
      { label: "Motif : mutation professionnelle", status: "found" },
      { label: "Date d'entrée : flexible", status: "found" },
      { label: "Revenus / employeur : non précisés", status: "gap" },
      { label: "Garant : non précisé", status: "gap" },
    ],
    replyAt: "05:05",
    reply:
      "Bonjour Thomas,\n\n" +
      "Merci pour votre message — l'appartement est toujours libre et une mutation est tout à fait gérable, " +
      "votre flexibilité sur la date aide. " +
      "Pour avancer, une attestation de votre employeur ainsi que vos justificatifs de revenus " +
      "me permettraient de présenter votre dossier au propriétaire.\n\n" +
      "Bien à vous,\nCamille Roussel",
  },

  // Rank 6 — first contact, almost no info → invites her to qualify.
  "lead-girard": {
    inbound:
      "Bonjour, est-ce que l'appartement rue de la Roquette est toujours disponible ? " +
      "Pourriez-vous m'en dire un peu plus ? Merci.",
    facts: [
      { label: "Intérêt : exprimé", status: "found" },
      { label: "Disponibilité : question posée", status: "found" },
      { label: "Revenus : non précisés", status: "gap" },
      { label: "Garant : non précisé", status: "gap" },
    ],
    replyAt: "05:50",
    reply:
      "Bonjour Inès,\n\n" +
      "Merci pour votre message. Oui, le bien est disponible : il s'agit d'un deux-pièces de 42 m² " +
      "à 1 750 € par mois, rue de la Roquette. " +
      "Pour vérifier que cela correspond à votre situation, pourriez-vous m'indiquer vos revenus " +
      "et si vous disposez d'un garant ?\n\n" +
      "Bien à vous,\nCamille Roussel",
  },
};

export const flow2 = {
  bienId: "bien-roquette",
  mandateId: "mandate-roquette",
  /** What the assistant did overnight, for the burst-card summary. */
  arrivedCount: 7,
  dedupedCount: 1,
  rankedCount: 6,
  autoSentCount: leads.filter((l) => l.disposition === "auto-sent").length,
  heldCount: leads.filter((l) => l.disposition === "held").length,
  acknowledgedAt: "Overnight · 01:12–05:47",
  insights,
  timelines: Object.fromEntries(
    leads.map((l) => [l.id, buildTimeline(l.id)]),
  ) as Record<string, LeadEvent[]>,
} as const;

/* ============================================================
   Contacts directory — the classic CRM "All contacts" table.
   Derived from the same substrate people so the database view
   shares one world with the two flows. The owning manager is
   Camille Roussel (the agent) plus a couple of colleagues.
   ============================================================ */

const mgr = {
  CR: { name: "Camille Roussel", initials: "CR" },
  LM: { name: "Luc Maes", initials: "LM" },
  SC: { name: "Sofie Claes", initials: "SC" },
} as const;

/** Phone + email for the six leads (they share the prototype's world
 *  but only carry portal signals in the substrate). */
const leadContact: Record<string, { phone: string; email: string; civ: string }> = {
  "lead-bonnet": { phone: "+33 6 22 14 88 03", email: "margaux.bonnet@gmail.com", civ: "Mme" },
  "lead-david": { phone: "+33 6 51 09 77 42", email: "antoine.david@orange.fr", civ: "M." },
  "lead-leroy": { phone: "+33 6 88 31 20 56", email: "camille.leroy@free.fr", civ: "Mme" },
  "lead-petit": { phone: "+33 6 14 76 33 90", email: "sarah.petit@gmail.com", civ: "Mme" },
  "lead-morel": { phone: "+33 6 77 45 12 88", email: "thomas.morel@outlook.fr", civ: "M." },
  "lead-girard": { phone: "+33 6 39 62 41 07", email: "ines.girard@gmail.com", civ: "Mme" },
};

const leadManagers: Record<string, (typeof mgr)[keyof typeof mgr]> = {
  "lead-bonnet": mgr.CR,
  "lead-david": mgr.SC,
  "lead-leroy": mgr.CR,
  "lead-petit": mgr.LM,
  "lead-morel": mgr.CR,
  "lead-girard": mgr.SC,
};

export const contactDirectory: ContactRow[] = [
  // The Mercier buyer (Flow 1).
  {
    id: "#10231",
    name: `M. ${contacts[0].firstName} ${contacts[0].lastName}`,
    phone: contacts[0].phone ?? "",
    email: contacts[0].email ?? "",
    category: "Buyer",
    manager: mgr.CR,
  },
  // The two property owners.
  {
    id: "#10232",
    name: `Mme ${owners[0].firstName} ${owners[0].lastName}`,
    phone: owners[0].phone ?? "",
    email: owners[0].email ?? "",
    category: "Owner",
    manager: mgr.CR,
  },
  {
    id: "#10233",
    name: `M. ${owners[1].firstName} ${owners[1].lastName}`,
    phone: owners[1].phone ?? "",
    email: owners[1].email ?? "",
    category: "Owner",
    manager: mgr.LM,
  },
  // The six rental leads (the Lead Lens), as prospective tenants.
  ...leads.map((l, i): ContactRow => {
    const extra = leadContact[l.id];
    return {
      id: `#${10234 + i}`,
      name: `${extra.civ} ${l.firstName} ${l.lastName}`,
      phone: extra.phone,
      email: extra.email,
      category: "Tenant",
      manager: leadManagers[l.id],
    };
  }),
];
