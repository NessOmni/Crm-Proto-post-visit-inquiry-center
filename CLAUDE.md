Omnicasa — Presentation Prototype
This repo is a presentation prototype, not the product. Its job is to make two moments of the Omnicasa philosophy undeniable on stage: the agent supervises an assistant; the assistant runs the day. It must be deterministic, offline, and resettable — every run identical.
The philosophy, in five lines

The home is a calm briefing of a few decision cards — never a database, never an inbox.
The assistant does the work; the agent reviews and approves.
Every assistant action carries a visible trust-tier badge: Automatic · handled or Drafted · to approve.
Every drafted output is citation-backed — chips that point to the source (voice note, lead message, record).
Depth surfaces (the Lead Lens) are pull, on demand — never the default view.

The two flows
Flow 1 — The Mercier moment (post-visit processing)

The agent taps the mic in the conversation bar and dictates a ~30-second post-visit voice note (the transcript streams in from a fixture — no real transcription).
A brief processing beat: an animated checklist showing the assistant visibly doing the work.
A decision card lands in the briefing with a soft flash — badge Drafted · to approve.
Expanding it opens a slide-over review sheet with four prepared outputs, each with citation chips: the owner update (drafted in the agent's voice), the Mercier buyer follow-up, logged objections, and the detected hidden second transaction (Mercier has a property to sell).
Approve resolves the card and writes the actions to the Activity log.

Flow 2 — The overnight burst (new lead setup)

The briefing carries one collapsed card: overnight, leads arrived, were deduplicated, acknowledged, and ranked by warmth — badge Automatic · handled, with a warm-lead preview.
"See the 6" opens the Lead Lens as a full-area takeover: a ranked list of 6 warm leads, each with status dot, portal badge, initials avatar, and warmth signals.
Selecting a lead opens a detail panel: stat pills, the active-mandate property card, the assistant-drafted reply in a full composer with toolbar, and an activity timeline where automatic-tier actions are tagged.
The Lens is a depth view the agent chose to open — closing it returns to the calm briefing. It is not an inbox.

Reset
A discreet "Replay the scene" button resets all state so the demo can be run repeatedly, identically.
Data substrate
Entity types: Agency, Agent, Bien, Owner, Contact, Visit, Lead, Communication, Mandate, Citation. One seed fixtures file in /src/data that both flows read — same agency, same agent, the Rue Lamartine bien (the Mercier visit), and the 24 rue de la Roquette rental. The point on stage: one substrate, two workflows.
Design system — elevated art direction (match the philosophy deck)
The prototype and the deck must look like one product. This is the elevated version — not raw SaaS.

Colours: --paper:#F2EBDD; --paper-2:#ECE3D1; --card:#F7F2E8; --ink:#211C16; --ink-70:#4D463B; --ink-45:rgba(33,28,22,.46); --terra:#C05E3A; --terra-deep:#A44E2E; --terra-soft:rgba(192,94,58,.12); --moss:#7E8A5C; --line:rgba(33,28,22,.14).
Type: Instrument Serif (the greeting, hero moments, italic accents), Geist (body/UI), Geist Mono (kickers, labels, dates — uppercase, letter-spaced). Load via Google Fonts.
Art direction: real property photography with graceful gradient fallbacks; a hero card treatment for the live decision; an ambient gradient on the canvas; layered warm shadows 0 18px 50px -22px rgba(33,28,22,.42); faint grain overlay; soft rounded cards (16–22px radius).
Motion: calm, slow reveals (~.55s ease). Nothing flashy. The card landing gets a soft flash, not a bounce.
Language: English UI (stakeholder audience), with French fixture data kept authentic — street names, people, property details. (If the audience flips to French, only copy strings change; structure stays.)
Layout: the briefing is the home (3–5 cards), left rail for depth (Biens, Contacts, Agenda, Performance — present but inert), right column with next-visit block and an "Assistant activity" summary, conversation bar always present at the bottom. Frame it mobile-first in proportions but it must present cleanly on a laptop.

Scope discipline — do NOT

No live AI, no transcription API, no network calls (fonts/photos CDN aside). Fixtures only. Deterministic. Offline-safe.
Don't build the other twelve workflows, settings sprawl, auth, or a real database.
No gamification or performance numbers on the briefing — the briefing stays calm.
Don't rebuild the Inquiry Center as a default inbox — Flow 2 is a card + the Lead Lens on demand.
Don't add features beyond the two flows without being asked.

Stack
React + Vite + TypeScript. Plain CSS with the variables above (no UI kit). Fixtures in /src/data. No backend. State in memory (perfect for a resettable demo).
Build order

Substrate + fixtures (the shared model both flows read).
App shell + design tokens + the calm briefing home (correct aesthetic, mostly empty).
Flow 1 end to end (voice → processing → card → review sheet → approve → Activity log).
Flow 2 (burst card → Lead Lens with the ranked 6 → detail panel → composer).
"Replay the scene" + presentation polish (keyboard nav between the two demo moments is a plus).

Stop at the end of each stage and wait for confirmation before continuing.
