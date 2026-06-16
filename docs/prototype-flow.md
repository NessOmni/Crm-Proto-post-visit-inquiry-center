# Omnicasa — Presentation Prototype: Flow & Foundations

> **What this is.** A faithful description of the Omnicasa presentation
> prototype as built — every surface, every flow, the mental model beneath
> them, and the data it reads. It is written to be **attached as context**
> when documenting the next features: the prototype is where the design set
> the foundations for the product's logic, so this doc captures those
> foundations in prose.
>
> **Companion artifact.** [`omnicasa-prototype.html`](./omnicasa-prototype.html)
> is a self-contained build of the prototype (CSS + JS inlined into one
> file). Open it directly in any browser — no build step, no server. It is
> deterministic and offline; the Inter font and property photos load from
> CDN when online and fall back gracefully when not. Press **R** (or click
> **Replay the scene**) to reset to the opening state at any time.

---

## 0. Using these assets in another project

This document is **self-contained** — it describes the whole prototype in
prose and needs no other file to be understood. If you carry it into a
different Claude project:

- **Attach *this* `.md` as the context.** It is what a model reads to
  understand the flow, the mental model, and the foundations for new features.
- **The `.html` is for humans, not for the model.** It is a minified build —
  open it in a browser to *see/demo* the prototype, but don't rely on a model
  to "read" it for understanding (it's a compiled bundle, not readable design
  context). Keep it as a reference artifact you open yourself.
- **Optional companions:** `design-system.md` (a fuller visual reference) and
  the source tree. They add detail but are not required — the design-token
  reference and architecture map below let this doc stand on its own.
- **Do not rely on the repo's `CLAUDE.md`** for the current state: it describes
  the original build brief and predates later work (the assistant command
  surface, WhatsApp-as-provenance, the domain-section navigation, and the
  "since your last visit" reframe). This document supersedes it.

---

## 1. The philosophy (the five lines everything serves)

1. The home is a **calm briefing** of a few decision cards — never a database, never an inbox.
2. The **assistant does the work; the agent reviews and approves**.
3. Every assistant action carries a visible **trust-tier badge**: *Automatic · handled* or *Drafted · to approve*.
4. Every drafted output is **citation-backed** — chips that point to the source (voice note, lead message, record).
5. **Depth surfaces** (the Lead Lens / Enquiry Center) are *pull*, on demand — never the default view.

The prototype exists to make two moments undeniable on stage: **the agent
supervises an assistant; the assistant runs the day.** Everything below is in
service of those two sentences.

---

## 2. The load-bearing mental model: Trust tier × Provenance (orthogonal)

This is the single most important foundation for future features. Two
independent dimensions describe every assistant action:

- **Trust tier — *who decides*.** A two-value axis:
  - `Automatic · handled` — the assistant did it and it's done (green dot).
  - `Drafted · to approve` — the assistant prepared it; it waits for the agent (indigo dot).
  - Indigo always means *"this is the action that needs you."*

- **Provenance / source — *where it came from*.** An open set of channels and
  origins, shown as a muted **source chip** (`source: inbox`, `source: call · 08 Jun`,
  `source: WhatsApp`). Provenance is **never** a trust tier. A WhatsApp command
  and an inbox enrichment can both be `Automatic` or both be `Drafted`; the
  channel is orthogonal to who decides.

- **Cross-actor attribution — *who triggered it*.** A third, related signal:
  the action is always *the assistant's*, but a teammate, a colleague's
  assistant, or a client may have set it off (a "triggered by" tag). This keeps
  the log honest: detection is a deterministic trigger, the AI is the drafting.

> **For new features:** any new capability must declare its **tier** (does it
> need the agent?) and its **provenance** (what set it off, from where) — and
> these are chosen independently. New channels (WhatsApp, email, portal, call)
> extend the *source* set; they do not add tiers.

---

## 3. The surfaces

### 3.1 Shell
- **Header:** the Omnicasa wordmark + the agency kicker ("Omnicasa — Agence
  Lamartine"); **Replay the scene** (reset); the agent chip (Camille Roussel,
  *Conseillère en immobilier*).
- **Three-pane body:** left nav · centre (briefing + dock) · right column.
  Each pane scrolls independently; hairline separators, white-on-gray.

### 3.2 Left navigation (retractable icon rail)
Two kinds of group — a **Navigate** group of surfaces, then **domain
sections** of objects. Collapses to a labelled icon rail.

- **Navigate:** Accueil *(home, the only rendered live surface)* · Agenda ·
  Activité & tâches · Performance.
- **BIEN:** Prospection · Estimation · Mandat.
- **TRANSACTION:** Offre · Compromis.
- **PORTEFEUILLE:** Contact · Acquéreur · **Enquiry Center**.

All domain items are presentational/inert **except Enquiry Center**, which is
wired to open the **Lead Lens** (the product's namesake depth view). Inert
items can't break the demo on a stray click; Accueil always remains home.

### 3.3 The calm briefing (the home)
Greeting + date, then the **daily brief** digest (§5), then a short stack of
**decision cards** with exactly one *spotlight* at a time (chosen by priority
of the present cards; the freshly-dictated post-visit card outranks all). The
cards present the product's range without becoming a dashboard:
post-visit (Flow 1), new leads (Flow 2), owner reports, mandate renewal,
estimation, call follow-up, re-engagement, cross-team, prospecting — plus the
quietest *calm rows* (handled, no CTA). Card CTAs are inert except the two demo
flows.

### 3.4 Right column ("Today")
- **Agenda:** past appointment dimmed/done, a "now" indicator (09:30), the
  next visit highlighted (Sarah Petit, 11:30), then quiet upcoming rows.
- **Assistant activity feed:** a calm log. Items you just approved show a
  concrete time; the ambient feed is grouped under **"Recently"** with **no
  clock times** (the assistant works continuously, not in an implausible
  deep-night batch). Source chips and "triggered by" tags ride along.
- **Presenter keys:** ⌘K · 1 · 2 · 3 · 4 · R.

### 3.5 The conversation dock
Always present at the bottom of the centre column: a single persistent
voice/typing affordance. The mic opens *Dictate · Upload a recording*.
Focusing the field (or ⌘K) summons the **command surface** (§6).

---

## 4. The two flows

### Flow 1 — The Mercier moment (post-visit processing)
The proof that **the agent supervises**.

1. **Dictate.** Agent taps the dock mic → *Dictate*. A ~30s post-visit voice
   note streams in as a transcript (from a fixture — no real transcription).
2. **Processing beat.** An animated checklist shows the assistant visibly doing
   the work (matching against the Mercier visit, drafting, detecting).
3. **The card lands.** A decision card appears in the briefing, badge
   **Drafted · to approve**, and takes the spotlight.
4. **Review slide-over.** Expanding opens a sheet with **four prepared
   outputs**, each **citation-backed**:
   - the **owner update** (drafted in the agent's voice),
   - the **Mercier buyer follow-up**,
   - the **logged objections** (price hesitation ~845k),
   - the **detected hidden second transaction** (Mercier also has a property to sell).
   Each output has reversible per-output **Edit · Decline · Approve**; a footer
   button approves in bulk.
5. **Approve commits.** Resolves the card and writes the actions into the
   **Assistant activity** log.

### Flow 2 — New leads (the Lead Lens / Enquiry Center)
The proof that **the assistant runs the day** — and that depth is *pull*.

1. **The card.** One *Automatic · handled* card: leads have arrived **since the
   agent's last visit**, been deduplicated, acknowledged, and ranked by warmth.
   Counts: **7 arrived → 1 merged → 6 ranked**, 5 answered automatically, 1
   held for the agent's call. A warmest-lead preview sits inside the card.
   *(Framing note: this was deliberately moved off any "overnight / 4 a.m."
   narrative — leads are "handled as they arrived," times are plausible.)*
2. **"See the 6"** opens the **Lead Lens** as a full-area takeover: a ranked
   list grouped by market → address block → lead, each with status dot, portal
   badge, initials avatar, and warmth signals.
3. **Select a lead** → detail panel: stat pills, the active-mandate property
   card, the assistant-drafted reply in a full composer with toolbar, and an
   activity timeline where automatic-tier steps are tagged. The **held** lead is
   styled distinctly (amber) — the one decision point kept for the human.
4. **Closing the Lens** returns to the calm briefing. It is a depth view the
   agent *chose* to open — **not an inbox**.

---

## 5. The daily brief (the morning digest)

A structured, first-person digest the agent reads first — and the same message
delivered to their phone. Three sections, each a terse summary line that can
disclose its specific items:

- **Already handled** — New leads (7), Records (2 enriched), Calls (1 logged).
- **Needs your ok** — Write-up (Mercier), Owner reports (3), Mandate (Sedaine),
  Dormant leads (2), From your team (Karim), Prospecting (3 openings).
- **Your day** — 4 appointments, next: Sarah Petit, 11:30.

Closes with one priority ("Start here: approve the Mercier write-up — it
unblocks an estimation") and a delivery line: **"Envoyé sur WhatsApp · 7:30 ·
Replay"** with a WhatsApp-green channel dot. It is a calm note, never a
dashboard — no gamification, no performance numbers.

---

## 6. The assistant command surface (⌘K) — the inverse of a CRUD palette

Summon the conversation dock as a calm overlay (⌘K, or by focusing the dock
input; Esc closes). The briefing stays the home behind it.

- An input line: *"Tell me what to do — or ask anything."* with a hold-to-dictate mic.
- **"Suggested for today"** — five jobs, each a real-estate **task on a concrete
  fixture object** with a workflow icon: Draft an offer (12 rue Lamartine ·
  €840 000 · Julien Mercier) · Estimate (9 rue des Martyrs) · Draft owner report
  (Hélène Fontaine) · Follow up (Sarah Petit, before 11:30) · Publish (15 rue
  Beaurepaire to the portals).
- **Hard rule:** the verbs are the actual *work* — never "Add Company / Create
  task / Create note." This is the deliberate inverse of a generic CRUD palette.

Selecting *Draft an offer* (or typing the canned line "draft an offer on 12 rue
Lamartine at 840") runs the comprehension moment (§7) → resolves entity chips →
produces one **Drafted** offer card for review. It ties into the Mercier thread.

---

## 7. The voice / comprehension moment (the reusable engine)

The generalized post-visit pattern, used from global dictation, an uploaded
recording, a record-scoped dictation, and the command-surface offer. Three
beats, scripted and deterministic:

1. **Transcript streams** (the spoken words type out).
2. **"Understood" strip** — the resolved entities + intent as correctable-looking
   chips. *This is the trust emphasis*: the assistant shows its comprehension
   (who / which property / what / which condition) and invites correction.
3. **Outputs land** — drafted message cards (with approve) and/or auto-applied
   field updates.

The showcased value is **comprehension + routing** (resolving who/which/what
from natural speech), not transcription. The same `EntityChips`/"Understood"
treatment is the reuse point for any future natural-language capability.

---

## 8. WhatsApp as a provenance source

WhatsApp threads through the existing surfaces as a **source** (channel), never
a new tier — and deliberately *without* a mock phone screen:

- The **source chip** gains a small WhatsApp-green (`#25D366`) channel dot when
  the source is WhatsApp.
- The brief's delivery line reads **"Envoyé sur WhatsApp · 7:30."**
- The **Assistant activity** feed carries the cross-channel proof: a voice
  command arrived over WhatsApp and the assistant drafted the offer —
  *"Offre d'achat rédigée — 12 rue Lamartine · 840 000 € · Julien Mercier,"*
  badge **"Drafted · à valider,"** `source: WhatsApp` — now visible in-app.

The point: a command can come in over a channel, and its provenance is legible
in-app on a different device. The briefing stays the home.

---

## 9. Reset — "Replay the scene"

A discreet control (and the **R** key) resets *all* in-memory state to the
opening configuration so the demo runs repeatedly, identically. State lives in
one in-memory store (`DemoContext`); there is no backend and nothing persists —
ideal for a resettable stage demo.

---

## 10. The data substrate (one world, many workflows)

All surfaces read **one seed fixtures file**. Entity types: **Agency, Agent,
Owner, Contact, Bien, Mandate, Visit, Lead, Communication, Citation** — plus
voice scenarios and the contacts directory. The point on stage: one substrate,
several workflows.

Key fixtures (reused everywhere — no stray new addresses):
- **Agency / Agent:** Agence Lamartine · Camille Roussel.
- **12 rue Lamartine** — the Mercier listing (€845 000); the post-visit (Flow 1)
  and the drafted offer (€840 000) both attach here.
- **Julien Mercier** — the buyer who visited; carries the hidden *second
  transaction* (a property to sell).
- **Hélène Fontaine** — owner (owner update / report).
- **24 rue de la Roquette** — rental; today's 11:30 visit (Sarah Petit).
- **15 rue Beaurepaire**, **9 rue des Martyrs** — referenced listings.
- **Six leads** — Bonnet, David, Leroy, Petit (held), Morel, Girard — ranked by
  a deterministic warmth score, arriving across the recent window.

---

## 11. Design system (in one breath)

Clean, light, functional SaaS. White surfaces on a faint gray canvas, **hairline
borders instead of shadows**, one saturated **indigo** accent (`#4263EB`)
carrying every primary action — *anything indigo reads as "this is the action."*
Inter for everything, **sentence case**, hierarchy from weight and gray-value
not size jumps. Success green for *handled*; WhatsApp-green (`#25D366`) appears
*only* as the channel dot. Radii: 8px controls, 10–12px cards, round avatars/
dots. Motion is functional only (the streaming transcript, the processing
checklist) and honours `prefers-reduced-motion`. UI chrome in English; French
fixture data kept authentic.

**Design tokens (the palette in full):**

| Token | Value | Role |
| --- | --- | --- |
| `--canvas` | `#F7F7F8` | app background (faint gray) |
| `--surface` | `#FFFFFF` | panels, cards |
| `--border` | `#ECECEC` | panel/card hairlines |
| `--border-2` | `#E5E7EB` | form-row separators |
| `--text` | `#1A1A1A` | primary text |
| `--text-2` | `#6B7280` | secondary text |
| `--text-3` | `#9CA3AF` | metadata / timestamps |
| `--accent` | `#4263EB` | **the only strong colour** — every primary action |
| `--accent-hover` | `#3654D1` | accent hover |
| `--accent-tint` | `rgba(66,99,235,.08)` | indigo wash (active nav, chips) |
| `--success` | `#22C55E` | *Automatic · handled* dot |
| *(channel)* | `#25D366` | WhatsApp source dot — **only** as a channel marker |

Radii: 8px buttons/inputs · 10–12px cards/thumbnails · fully round avatars and
status dots. Type: Inter throughout, sentence case, no uppercase/letter-spacing
tricks (the domain nav headers are the one intentional uppercase eyebrow).
Avatars use soft desaturated pastels, one consistent colour per entity.
*(`design-system.md`, if present in the repo, is a fuller visual reference —
optional; this table is sufficient to reproduce the look.)*

---

## 12. Interaction & keyboard map

| Key | Action |
| --- | --- |
| **⌘K** | Summon the assistant command surface (Esc closes) |
| **1** | Flow 1 — dictate the post-visit note → open review |
| **2** | Flow 2 — open the Lead Lens / Enquiry Center |
| **3** | Global dictation (comprehension moment) |
| **4** | Upload a recording (comprehension moment) |
| **↑ ↓ / Enter** | In the Lens: move between ranked leads / send reply |
| **Enter** | In the review sheet: approve the outputs |
| **R** | Replay the scene (reset) |
| **Esc** | Close the open surface |

---

## 13. Architecture map (where the logic lives)

```
src/
  data/
    types.ts        — the entity model (the substrate's shape)
    fixtures.ts     — the one seed world + voice scenarios (deterministic)
    selectors.ts    — derive views from the substrate
  state/
    DemoContext.tsx — the single in-memory store; both flows + reset
    useKeyboardNav.ts — presenter keyboard map (⌘K, 1–4, R, Esc)
  components/
    Briefing / DailyBrief / BriefingCard / AmbientCard — the calm home
    ConversationBar / CommandSurface — the dock + ⌘K command surface
    RightColumn / SourceChip / TriggeredBy — Today + provenance chrome
    LeftRail — navigation (Navigate group + domain sections)
    voice/VoiceMoment — the reusable comprehension moment
    flow1/  VoiceCapture · DecisionCard · ReviewSheet · CitationChip
    flow2/  BurstCard · LeadLens · LeadRow · LeadDetail · Avatar
  styles/  tokens.css (design tokens) + layout/flow1/flow2/voice/contacts css
```

Stack: **React + Vite + TypeScript**, plain CSS with the tokens above, no UI
kit, no backend, state in memory. Deterministic, offline-safe, resettable.

---

## 14. Foundational patterns for the next features

When documenting or building the next workflows, these are the prototype's
load-bearing decisions to carry forward:

1. **Calm home, depth on pull.** New work surfaces as *at most a card* on the
   briefing; its full interface is a depth view the agent chooses to open. Never
   default anyone into an inbox or a table.
2. **Tier + provenance on every action.** Declare *who decides* (Automatic vs
   Drafted) and *where it came from* (source chip) — independently. Indigo =
   needs you.
3. **Drafted ⇒ citation-backed + reviewable.** Anything `Drafted` shows its
   sources and offers reversible Edit · Decline · Approve before it commits to
   the activity log.
4. **Comprehension is the demo, not transcription.** Natural-language entry
   resolves entities into a correctable "Understood" strip, then drafts. Reuse
   that engine; don't build bespoke parsers per feature.
5. **Detection is a deterministic trigger; the AI is the drafting.** Be honest
   about causation — a real new signal (new mandate, competitor listing, updated
   budget) is what wakes a workflow, and a "triggered by" tag names the actor.
6. **Channels are sources, not surfaces.** A command can arrive over WhatsApp /
   email / call; surface its *provenance* in-app rather than rebuilding the
   channel's UI.
7. **One substrate, many workflows.** New features read the same entity model
   and the same seed world — coherence comes from shared fixtures, not new ones.
8. **Deterministic & resettable.** Everything is fixture-driven and resets
   identically; no live AI, no network beyond fonts/photos.
