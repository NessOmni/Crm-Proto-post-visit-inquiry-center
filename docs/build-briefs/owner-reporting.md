# Build brief — Owner reporting (Flow 3)

> **For Claude Code, in the Omnicasa prototype repo.** Read this together with
> `prototype-flow.md` (the current foundations — it supersedes the repo
> `CLAUDE.md`). Branch off **`main`** as `feat/owner-reporting` and open a PR
> into `main` (full git workflow in §11). Do not touch Flow 1 (post-visit) or
> Flow 2 (Lead Lens); they must behave identically after this work.
>
> **Reference state.** The live source tree is on `main` (current trunk). v1 is
> frozen at `release/v1.0-prototype` (commit `2baf43d`), with the standalone
> build at `docs/omnicasa-prototype.html` there — use it only to *see* the v1
> demo or to diff against, never to branch from.

---

## 1. Why we're building this (the argument it advances)

Both wired flows are buyer-side: a post-visit *buyer* follow-up and *buyer*
leads. The owner/mandate side — the relationship a French agency is most afraid
of losing — is currently invisible on stage. This flow puts the **seller
relationship** on screen and makes the product feel two-sided.

It proves a second thing about the paradigm: the same supervision grammar
(*Drafted → review → citations → approve*) generalizes from a one-off
voice-driven moment to a **periodic, signal-driven** one the agent never
initiated. Flow 1 is woken by the agent's dictation; this is woken by a cadence
and a market signal, with the assistant already done by the time the agent looks.

It also introduces the **Owner Lens** as the symmetric twin of the Lead Lens —
buyer depth ↔ owner depth — so the prototype reads as one coherent system, not
two clever demos.

---

## 2. What to reuse (do not reinvent)

- **DecisionCard / BriefingCard** spotlight pattern, badges, dot-pills.
- **ReviewSheet** slide-over shell, **CitationChip**, per-output
  Edit · Decline · Approve, footer approve, approve→activity-log write path.
- **SourceChip** + **TriggeredBy** provenance chrome (channel dot rules).
- **LeadLens** full-area takeover pattern (list → detail panel, Esc returns to
  the calm briefing) — the Owner Lens is the same shape, different projection.
- **Avatar**, **DemoContext** store + **Replay the scene** reset, design tokens
  in `styles/tokens.css`. No new colours.

A lens is a query + a layout over the one substrate, not a new data structure
(see `lenses-overview.md`). Build the Owner Lens as a projection, mirroring how
the Lead Lens is built.

---

## 3. What's net-new vs Flow 1 (the load-bearing differences)

1. **No comprehension moment.** The card *appears* (like Flow 2's burst card),
   it is not dictated. Trigger = bi-weekly cadence + an event signal.
2. **One composite report, not four atomic outputs.** The review sheet shows a
   single living report with sections, each citation-backed — not a stack of
   independent message cards.
3. **A new depth surface:** the Owner Lens (the relationship surface).
4. **Signal-as-provenance.** The source is a cadence/market signal, and the
   "triggered by" names the real world-state change — the prior is the citation.

---

## 4. The anchor fixtures (reuse the one world; add only what's needed)

Anchor on the established owner fixture so the substrate stays coherent:

- **Owner:** Hélène Fontaine — owner of **12 rue Lamartine** (the Mercier
  listing, €845 000). Preferred channel: email. Add owner-comms recency
  (last contacted ~3 weeks ago), tone preference, prior-report stub.
- **Mandate:** active mandate on 12 rue Lamartine — jours sur le marché,
  cadence = quinzaine (bi-weekly), next report due *now*.
- **Period activity (this fixture, standalone):** 2 visites, 1 offre reçue
  (€840 000), portal stats (vues/contacts SeLoger + Bien'ici). This must read
  correctly whether or not Flow 1 has been run — do **not** depend on Flow 1
  state.
- **Comparables:** 2–3 DVF/PriceHubble comparables sold in the sector + current
  actives, supporting "the €845k band holds."
- **A prior:** the "why" reasoning string (e.g. *"intérêt soutenu, le prix tient
  — pas d'ajustement recommandé · P##"*), surfaced as a citation.
- **Filler mandates for the lens:** reuse **15 rue Beaurepaire**, **9 rue des
  Martyrs**, **24 rue de la Roquette** as 3–4 other active mandates so the lens
  list isn't a single row. One of them flagged **amber** (overdue for owner
  contact) — the one decision point kept for the human, mirroring Flow 2's held
  lead. Reuse the existing amber treatment; introduce no new colour.

---

## 5. The decision card (on the briefing)

- This is one of the brief's existing *"Owner reports (3)"* items — fold it in,
  don't contradict the digest.
- Badge **`Drafted · à valider`** (indigo dot — needs you).
- **Source chip:** `source: cadence · quinzaine` with a **TriggeredBy** naming
  the real signal — e.g. *"déclenché par : rapport dû + comparable vendu à
  proximité."*
- Headline names Hélène / 12 rue Lamartine; one-line preview of the report's
  finding: *"2 visites · 1 offre à 840 000 € · le prix de marché tient."*
- Pressing **5** lands the card and gives it the spotlight (re-uses the
  spotlight-priority mechanism).

---

## 6. The review sheet (the composite living report)

Expanding the card opens the ReviewSheet shell with **one report**, written in
**Camille Roussel's first-person voice** (French), to Hélène, for email. Three
tight sections, each carrying ≥1 **CitationChip** that resolves to a real
fixture source:

1. **Activité de la quinzaine** — 2 visites, 1 offre (€840 000), stats portails.
   *Citations:* journal de visites, stats SeLoger / Bien'ici.
2. **Le marché autour de votre bien** — comparables vendus + actifs en cours.
   *Citation:* DVF / PriceHubble.
3. **Notre lecture** — the read + recommendation (*le prix tient, pas
   d'ajustement recommandé*), framed as strategy. *Citation:* the prior (P##).

Footer: **Modifier · Décliner · Approuver et envoyer.** Approve resolves the
card and writes **one** entry to the Assistant activity feed:
*"Rapport propriétaire envoyé — Hélène Fontaine · 12 rue Lamartine,"* with the
tier dot + `source` chip.

> **Design risk — read this.** The one genuinely new interaction is a *single
> rich artifact* instead of four atomic outputs. If the report grows into a
> long document, the sheet stops being a calm card review and becomes a document
> editor — which fights the briefing-calm thesis. **Keep the review sheet to the
> three sections above, scannable without heavy scroll.** The richer, continuous
> Living Page lives inside the Owner Lens (§7), not in the approval sheet.

---

## 7. The Owner Lens (depth on pull — the symmetric twin of the Lead Lens)

Same takeover pattern as the Lead Lens. **Opens from the `Mandat` nav item under
BIEN** (mirroring Enquiry Center → Lead Lens), and is reachable from the card
("Voir tous les mandats"). It is a depth view the agent *chose* to open — never
the default, never an inbox.

- **List:** active mandates, sorted by health. Each row: bien thumbnail, owner,
  **jours sur le marché**, **dernier contact** (recency), a health/mood dot.
  The one amber row = overdue for contact.
- **Detail panel** on select: stat pills (jours sur le marché · visites · leads
  · prix), the bien card, a **comparables panel** (PriceHubble-style numbers,
  no visible API), and the **report / communication history** (the Living Page +
  owner-comms timeline; automatic-tier steps tagged, like the Lead Lens
  timeline).
- **Closing the lens returns to the calm briefing.**

Completeness contract: anything the assistant knows about a mandate — a skipped
outreach, a health flag, the reasoning behind it — is reachable here. That's
what lets the briefing stay sparse.

---

## 8. Wiring & keys

- `5` → land the owner-report decision card (spotlight).
- `Mandat` nav item → open Owner Lens (full-area takeover). Esc returns.
- In the lens: reuse the Lead Lens nav (↑/↓ rows, Enter to drill, Esc to close).
- `R` resets all Flow 3 state to the opening config alongside Flows 1 & 2.
- Update the in-app presenter-keys hint and the keyboard map to include `5`.

Suggested architecture (mirror the existing tree):

```
src/
  data/   fixtures.ts (+ owner/mandate/period/comparables/prior), selectors.ts
  state/  DemoContext.tsx (landOwnerReport, approveOwnerReport, lens open/close,
          reset), useKeyboardNav.ts (+5)
  components/flow3/ OwnerReportCard · OwnerReportSheet · OwnerLens · MandateRow ·
          MandateDetail · ComparablesPanel · LivingPageTimeline
  styles/ flow3 css (tokens only — no new colours)
```

---

## 9. Guardrails

- **No new colours.** Indigo = the action; success green = handled; amber only
  for the one flagged mandate; WhatsApp green only ever as a channel dot.
- Inter, sentence case, hairline borders not shadows; honour
  `prefers-reduced-motion`. Chrome in English; fixture copy authentic French.
- **One substrate.** Read the existing entity model and seed world; add fixtures,
  don't fork addresses or invent a parallel store.
- **Deterministic, offline-safe, resettable.** No live AI, no network beyond
  fonts/photos. Replay must restore the opening state exactly.
- Do not modify Flow 1 / Flow 2 behaviour.
- Update `CLAUDE.md` on the feature branch so it ships *in the PR*.

---

## 10. Acceptance criteria (behaviour assertions)

1. Pressing `5` lands an owner-report card that takes the spotlight, badged
   **`Drafted · à valider`** with a `source: cadence` chip and a "triggered by"
   naming the real signal.
2. Expanding opens a sheet with **one** composite report, **three** sections,
   each carrying **≥1** citation chip that resolves to a real fixture source.
3. The report is in Camille's first-person voice and names Hélène /
   12 rue Lamartine.
4. **Approuver et envoyer** resolves the card and writes exactly **one** entry to
   the Assistant activity feed, with tier dot + source chip.
5. The `Mandat` nav item opens the Owner Lens as a full-area takeover listing
   active mandates with days-on-market + last-contact + health dot; **one** row
   is amber. Closing returns to the calm briefing.
6. Selecting a mandate opens a detail panel with stat pills, the bien card, a
   comparables panel, and the report/communication history.
7. The flow runs correctly with **no** dependency on Flow 1 having been run.
8. `R` restores the opening state; Flows 1 & 2 are unchanged.

---

## 11. Git workflow (this repo)

- **Trunk is `main`** — branch this work off `main` as `feat/owner-reporting`.
- **Save this brief** at `docs/build-briefs/owner-reporting.md`.
- **Open a PR into `main`** once §10 passes; the PR description is the changelog
  entry (what shipped + the §10 checklist ticked). Include the `CLAUDE.md`
  update.
- **Leave `release/v1.0-prototype` frozen.** Never merge into it or branch from
  it; use it only to diff against v1.
- Ships as part of the next milestone Release (**v2.0**), tagged from `main`
  once the milestone's features are integrated — not this session's job.
