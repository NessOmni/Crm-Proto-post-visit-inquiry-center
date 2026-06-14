/* The lead detail panel. The assistant's reading is made visible:
   the raw enquiry, the facts extracted from it, and a reply written
   against the detected gap. Confident leads show a SENT record (the
   work is already done); the one held lead shows its reasoning and a
   draft the agent still has to approve. */
import { useState, type ReactNode } from "react";
import type { Lead, LeadEvent } from "../../data/types";
import { useDemo } from "../../state/DemoContext";
import { flow2 } from "../../data/fixtures";
import { Avatar } from "./Avatar";
import { Photo } from "../Photo";
import { SourceChip } from "../SourceChip";
import { CitationChip } from "../flow1/CitationChip";
import {
  IconBold,
  IconItalic,
  IconList,
  IconLink,
  IconArrow,
  IconCheck,
} from "../icons";

export function LeadDetail({ lead }: { lead: Lead }) {
  const { substrate, repliedLeadIds, sendReply } = useDemo();
  // The listing (and its active mandate) the lead enquired about — which
  // may be a rental or a sale. The panel reads its type to adapt.
  const bien = substrate.biens.find((b) => b.id === lead.bienId)!;
  const mandate = substrate.mandates.find((m) => m.bienId === lead.bienId)!;
  const sale = lead.transactionType === "sale";
  const insight = flow2.insights[lead.id];
  const enrichment = flow2.enrichments[lead.id];
  const matches = flow2.matches[lead.id];
  const held = lead.disposition === "held";
  const replied = Boolean(repliedLeadIds[lead.id]);

  const [draft, setDraft] = useState(insight.reply);
  const [adjusting, setAdjusting] = useState(false);

  // The reply is citation-backed by the lead's own message.
  const messageCitation = {
    id: `cite-lead-${lead.id}`,
    source: "lead-message" as const,
    label: `${lead.portal} · ${lead.firstName} ${lead.lastName}`,
    quote: insight.inbound,
  };

  const statusLabel = held
    ? replied
      ? "Active"
      : "Held"
    : replied
      ? "Active"
      : "Replied";

  const timeline: LeadEvent[] = [...(flow2.timelines[lead.id] ?? [])];
  if (replied) {
    timeline.push({
      id: `${lead.id}-reply`,
      tier: "drafted",
      label: "Reply sent",
      detail: "Approved & sent by you",
      time: "Just now",
    });
  }

  return (
    <div className="lead-detail">
      <div className="lead-detail__head">
        <Avatar initials={lead.initials} size="lg" />
        <div>
          <div className="lead-detail__name">
            {lead.firstName} {lead.lastName}
          </div>
          <div className="lead-detail__sub">
            Enquiry · {bien.address}, {bien.postalCode} {bien.city}
          </div>
          {enrichment && (
            <div className="lead-detail__enriched">
              {enrichment.label}: {enrichment.value}
              <SourceChip source={enrichment.source} />
            </div>
          )}
        </div>
      </div>

      <div className="pills">
        <span className="pill">
          <span className="pill__label">Warmth (read)</span>
          <span className="pill__value" style={{ textTransform: "capitalize" }}>
            {lead.warmth} · {lead.score}
          </span>
        </span>
        <span className="pill">
          <span className="pill__label">Portal</span>
          <span className="pill__value">{lead.portal}</span>
        </span>
        <span className="pill">
          <span className="pill__label">Arrived</span>
          <span className="pill__value">{lead.arrivedAt.slice(11, 16)}</span>
        </span>
        <span className="pill">
          <span className="pill__label">Status</span>
          <span className="pill__value">{statusLabel}</span>
        </span>
      </div>

      {/* What the assistant read — raw message → extracted facts */}
      <div className="kicker section-label">What the assistant read</div>
      <div className="read">
        <blockquote className="read__message">{insight.inbound}</blockquote>
        <div className="read__extracted">
          <span className="read__extracted-label">Extracted from the message</span>
          <div className="facts">
            {insight.facts.map((f) => (
              <span
                key={f.label}
                className={`fact ${f.status === "gap" ? "fact--gap" : ""}`}
                title={
                  f.status === "gap"
                    ? "Missing from the enquiry"
                    : "Extracted from the enquiry"
                }
              >
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Active-mandate property card */}
      <div className="kicker section-label">Active mandate</div>
      <div className="mandate-card">
        <Photo
          url={bien.photoUrl}
          alt={`${bien.address}, ${bien.city}`}
          className="mandate-card__photo"
          seed={1}
        />
        <div className="mandate-card__body">
          <div className="mandate-card__addr">{bien.address}</div>
          <div className="mandate-card__meta">
            {bien.postalCode} {bien.city} · {bien.surfaceM2} m² · {bien.rooms}{" "}
            pièces · ref. {bien.reference}
          </div>
          <div className="mandate-card__row">
            <span className="mandate-badge">
              Mandat {sale ? "de vente" : "de location"} ·{" "}
              {mandate.kind === "exclusive" ? "exclusif" : "simple"}
              {mandate.active ? " · actif" : ""}
            </span>
            <span className="mandate-card__price">
              {bien.priceEur.toLocaleString("fr-FR")} €
              {sale ? null : <small> / month</small>}
            </span>
          </div>
        </div>
      </div>

      {/* Suggested matches — incl. one surfaced from a call insight that
          the hard criteria would have excluded. (buyer/sale lead) */}
      {matches && matches.length > 0 && (
        <>
          <div className="kicker section-label">
            Suggested matches · {matches.length}
          </div>
          <div className="matches">
            {matches.map((m) => {
              const isInsight = m.kind === "insight";
              return (
                <div
                  key={m.id}
                  className={`match-row ${isInsight ? "match-row--insight" : ""}`}
                >
                  <div className="match-row__main">
                    <div className="match-row__addr">
                      {m.address} · {m.price}
                    </div>
                    {m.note && <div className="match-row__note">{m.note}</div>}
                    {m.source && <SourceChip source={m.source} />}
                  </div>
                  <div className="match-row__side">
                    <span
                      className={`match-tag ${isInsight ? "match-tag--insight" : ""}`}
                    >
                      {isInsight ? "insight" : "criteria match"}
                    </span>
                    <button type="button" className="match-row__cta">
                      Draft alert →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Reply — a sent record (auto) or a held draft (the exception) */}
      {held ? (
        <HeldReply
          lead={lead}
          draft={draft}
          setDraft={setDraft}
          replied={replied}
          onApprove={() => sendReply(lead.id)}
          citation={<CitationChip citation={messageCitation} />}
          heldReason={insight.held!}
        />
      ) : (
        <SentReply
          replyAt={insight.replyAt ?? lead.arrivedAt.slice(11, 16)}
          reply={insight.reply}
          adjusting={adjusting}
          setAdjusting={setAdjusting}
          draft={draft}
          setDraft={setDraft}
          citation={<CitationChip citation={messageCitation} />}
        />
      )}

      {/* Activity timeline */}
      <div className="kicker section-label">Activity</div>
      <div className="timeline">
        {timeline.map((ev) => (
          <div className="tl-row" key={ev.id}>
            <span
              className={`tl-dot ${
                ev.held ? "tl-dot--held" : ev.tier === "drafted" ? "tl-dot--drafted" : ""
              }`}
            />
            <div className="tl-body">
              <div className="tl-body__label">{ev.label}</div>
              {ev.detail && <div className="tl-body__detail">{ev.detail}</div>}
            </div>
            <div className="tl-meta">
              <span
                className={`badge ${
                  ev.held
                    ? "badge--held"
                    : ev.tier === "automatic"
                      ? "badge--auto"
                      : "badge--drafted"
                }`}
              >
                {ev.held ? "Held" : ev.tier === "automatic" ? "Automatic" : "Approved"}
              </span>
              <span className="tl-time">{ev.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- The five confident leads: a sent record, not a composer ------ */
function SentReply({
  replyAt,
  reply,
  adjusting,
  setAdjusting,
  draft,
  setDraft,
  citation,
}: {
  replyAt: string;
  reply: string;
  adjusting: boolean;
  setAdjusting: (v: boolean) => void;
  draft: string;
  setDraft: (v: string) => void;
  citation: ReactNode;
}) {
  return (
    <>
      <div className="reply-head">
        <span className="kicker section-label" style={{ margin: 0 }}>
          Assistant reply · sent
        </span>
        <span className="badge badge--auto">Automatic · sent · {replyAt}</span>
      </div>

      <div className="sent-record">
        <div className="sent-record__body">{reply}</div>
        <div className="sent-record__foot">
          {citation}
          <button
            className="link-quiet"
            onClick={() => setAdjusting(!adjusting)}
            aria-expanded={adjusting}
          >
            {adjusting ? "Close" : "Adjust / follow up"}
          </button>
        </div>
      </div>

      {adjusting && (
        <div className="composer" style={{ marginTop: 12 }}>
          <div className="composer__tools" aria-hidden="true">
            <span className="composer__tool"><IconBold /></span>
            <span className="composer__tool"><IconItalic /></span>
            <span className="composer__sep" />
            <span className="composer__tool"><IconList /></span>
            <span className="composer__tool"><IconLink /></span>
          </div>
          <textarea
            className="composer__area"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Adjust the reply"
          />
          <div className="composer__foot">
            <span className="composer__hint">Edit and send a follow-up if needed.</span>
            <button className="btn btn--ghost" onClick={() => setAdjusting(false)}>
              Send follow-up
              <IconArrow />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* --- The one held lead: reasoning + a draft to approve ------------ */
function HeldReply({
  lead,
  draft,
  setDraft,
  replied,
  onApprove,
  citation,
  heldReason,
}: {
  lead: Lead;
  draft: string;
  setDraft: (v: string) => void;
  replied: boolean;
  onApprove: () => void;
  citation: ReactNode;
  heldReason: { signal: string; reasoning: string; suggestedAction: string };
}) {
  return (
    <>
      <div className="held-block">
        <div className="held-block__head">
          <span className="held-block__pill">Held — needs your call</span>
          <span className="held-block__why">
            {lead.firstName} wasn't auto-handled. Here's why.
          </span>
        </div>
        <dl className="held-reason">
          <div>
            <dt>Signal</dt>
            <dd>{heldReason.signal}</dd>
          </div>
          <div>
            <dt>Reasoning</dt>
            <dd>{heldReason.reasoning}</dd>
          </div>
          <div>
            <dt>Suggested action</dt>
            <dd>{heldReason.suggestedAction}</dd>
          </div>
        </dl>
      </div>

      <div className="reply-head">
        <span className="kicker section-label" style={{ margin: 0 }}>
          Assistant draft · held for you
        </span>
        <span className="badge badge--drafted">Drafted · to approve</span>
      </div>

      <div className="composer">
        <div className="composer__tools" aria-hidden="true">
          <span className="composer__tool"><IconBold /></span>
          <span className="composer__tool"><IconItalic /></span>
          <span className="composer__sep" />
          <span className="composer__tool"><IconList /></span>
          <span className="composer__tool"><IconLink /></span>
        </div>
        <textarea
          className="composer__area"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={replied}
          aria-label="Reply to lead"
        />
        <div className="composer__foot">
          {citation}
          {replied ? (
            <button className="btn btn--done" disabled>
              <IconCheck /> Sent
            </button>
          ) : (
            <button className="btn btn--primary" onClick={onApprove}>
              Approve &amp; send
              <IconArrow />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
