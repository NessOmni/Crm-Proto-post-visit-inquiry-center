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
A decision card lands in the briefing — badge Drafted · to approve.
Expanding it opens a slide-over review sheet with four prepared outputs, each with citation chips: the owner update (drafted in the agent's voice), the Mercier buyer follow-up, logged objections, and the detected hidden second transaction (Mercier has a property to sell).
Approve resolves the card and writes the actions to the Activity log.

Flow 2 — The overnight burst (new lead setup)

The briefing carries one collapsed card: overnight, leads arrived, were deduplicated, acknowledged, and ranked by warmth — badge Automatic · handled, with a warm-lead preview.
"See the 6" opens the Lead Lens as a full-area takeover: a ranked list of 6 warm leads, each with status dot, portal badge, initials avatar, and warmth signals.
Selecting a lead opens a detail panel: stat pills, the active-mandate property card, the assistant-drafted reply in a full composer with toolbar, and an activity timeline where automatic-tier actions are tagged.
The Lens is a depth view the agent chose to open — closing it returns to the calm briefing. It is not an inbox.

Flow 3 — Owner reporting (the seller side)

The owner/mandate relationship made two-sided. Unlike Flow 1 this is not dictated: a periodic, signal-driven decision card appears (cadence = quinzaine + a market signal), the assistant already done. Pressing 5 lands it — badge Drafted · à valider, source chip source: cadence · quinzaine, and a "triggered by" naming the real signal (rapport dû + comparable vendu à proximité).
Expanding opens the review sheet shell with ONE composite living report (not four atomic outputs) in the agent's first-person voice to Hélène Fontaine — three citation-backed sections (Activité de la quinzaine · Le marché autour de votre bien · Notre lecture). Footer: Modifier · Décliner · Approuver et envoyer. Approve writes one entry to the Activity log.
The Mandat nav item (under BIEN) opens the Owner Lens — the symmetric twin of the Lead Lens (buyer depth ↔ owner depth): active mandates sorted by health (days-on-market, last-contact recency, a health dot; one amber row overdue for contact), each detail showing stat pills, the bien card, a comparables panel, and the report/communication history (the Living Page). Closing returns to the calm briefing. Flow 3 is standalone — it does not depend on Flow 1.

Reset
A discreet "Replay the scene" button resets all state so the demo can be run repeatedly, identically.
Data substrate
Entity types: Agency, Agent, Bien, Owner, Contact, Visit, Lead, Communication, Mandate, Citation. One seed fixtures file in /src/data that all flows read — same agency, same agent, the Rue Lamartine bien (the Mercier visit + the Fontaine owner report), and the 24 rue de la Roquette rental. The point on stage: one substrate, several workflows.
Design system — clean, light, functional SaaS aesthetic
White surfaces on a faint gray canvas, hairline borders instead of shadows, one saturated indigo accent carrying every primary action. Dense but breathable. Quiet, professional, unornamented — the interface recedes; the data is the interface. (Full reference: /docs/design-system.md.)

Colours: --canvas:#F7F7F8; --surface:#FFFFFF; --border:#ECECEC (panels/cards); --border-2:#E5E7EB (form-row separators); --text:#1A1A1A; --text-2:#6B7280; --text-3:#9CA3AF; --accent:#4263EB; --accent-hover:#3654D1; --accent-tint:rgba(66,99,235,.08); --success:#22C55E. Indigo is the only strong colour — anything indigo reads as "this is the action." Avatars use soft desaturated pastels (lavender, mint, peach, sky), one consistent colour per entity.
Type: one neutral grotesque sans (Inter) for everything — no display face, no serif, no mono. Hierarchy from weight and gray-value, not size jumps. Sentence case everywhere — no uppercase, no letter-spacing tricks. Page/pane titles 18–20px semibold; row titles/emphasised values 14px semibold; body 14px regular; labels/metadata/timestamps 12–13px regular secondary gray; tabs/buttons 13–14px medium. Load via Google Fonts.
Art direction: real property photography with neutral fallbacks; image thumbnails at 10–12px radius; no gradients, no grain, no decorative elements. Shadows: none in normal state — depth comes from white-on-gray contrast and 1px hairlines; at most a whisper of shadow on floating elements (slide-over, menus, dialogs). Radii: 8px buttons/inputs, 10–12px cards/thumbnails, fully round avatars and status dots.
Motion: nothing animates beyond instant state changes and subtle hovers (~120ms). Functional reveals only — the streaming transcript and the processing checklist — never decorative flashes or bounces. Honour prefers-reduced-motion.
Language: English UI (stakeholder audience), with French fixture data kept authentic — street names, people, property details. (If the audience flips to French, only copy strings change; structure stays.)
Layout: multi-pane, hairline-separated, each pane scrolling independently. A retractable left sidebar (Biens, Contacts, Agenda, Performance — present but inert) that shows labels when expanded and collapses to a narrow icon rail via a toggle (Attio/ChatGPT idiom; collapsed labels become tooltips), the briefing as the home (3–5 cards), a right column with next-visit block and an "Assistant activity" summary, conversation bar always present at the bottom. The Lead Lens is the list-column + detail pane idiom. Frame it mobile-first in proportions but it must present cleanly on a laptop.

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
Flow 3 (owner-report card → composite review sheet → approve → Activity log; the Owner Lens from the Mandat nav).
"Replay the scene" + presentation polish (keyboard nav between the demo moments is a plus).

Stop at the end of each stage and wait for confirmation before continuing.
