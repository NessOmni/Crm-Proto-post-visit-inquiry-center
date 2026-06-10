/* ============================================================
   Omnicasa — seed fixtures
   One substrate both flows read. Same agency, same agent,
   the Rue Lamartine bien (the Mercier visit), and the
   24 rue de la Roquette rental.

   Deterministic & offline. UI copy is English; fixture data
   (names, streets, property details) is authentic French.
   ============================================================ */

import type { Substrate } from "./types";

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
