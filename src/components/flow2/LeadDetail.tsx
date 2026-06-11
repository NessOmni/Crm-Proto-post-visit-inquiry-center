/* The lead detail panel — stat pills, the active-mandate property
   card, the assistant-drafted reply in a full composer, and the
   activity timeline where automatic-tier actions are tagged. */
import { useState } from "react";
import type { Lead, LeadEvent } from "../../data/types";
import { useDemo } from "../../state/DemoContext";
import { flow2 } from "../../data/fixtures";
import { Avatar } from "./Avatar";
import { Photo } from "../Photo";
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
  const bien = substrate.biens.find((b) => b.id === flow2.bienId)!;
  const mandate = substrate.mandates.find((m) => m.id === flow2.mandateId)!;
  const replied = Boolean(repliedLeadIds[lead.id]);

  const [draft, setDraft] = useState(flow2.replies[lead.id] ?? "");

  // The composer reply is citation-backed by the lead's own message.
  const leadCitation = {
    id: `cite-lead-${lead.id}`,
    source: "lead-message" as const,
    label: `${lead.portal} · ${lead.firstName} ${lead.lastName}`,
    quote: lead.signals.join(" · "),
  };

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
        </div>
      </div>

      <div className="pills">
        <span className="pill">
          <span className="pill__label">Warmth</span>
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
          <span className="pill__value" style={{ textTransform: "capitalize" }}>
            {replied ? "active" : lead.status}
          </span>
        </span>
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
            pièces · réf. {bien.reference}
          </div>
          <div className="mandate-card__row">
            <span className="mandate-badge">
              {mandate.kind === "exclusive" ? "Exclusive mandate" : "Simple mandate"}
              {mandate.active ? " · active" : ""}
            </span>
            <span className="mandate-card__price">
              {bien.priceEur.toLocaleString("fr-FR")} € <small>/ mois</small>
            </span>
          </div>
        </div>
      </div>

      {/* Composer — the assistant-drafted reply */}
      <div className="kicker section-label">
        Assistant-drafted reply
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
          <CitationChip citation={leadCitation} />
          {replied ? (
            <button className="btn btn--done" disabled>
              <IconCheck /> Sent
            </button>
          ) : (
            <button className="btn btn--primary" onClick={() => sendReply(lead.id)}>
              Approve &amp; send
              <IconArrow />
            </button>
          )}
        </div>
      </div>

      {/* Activity timeline — automatic-tier actions tagged */}
      <div className="kicker section-label">Activity</div>
      <div className="timeline">
        {timeline.map((ev) => (
          <div className="tl-row" key={ev.id}>
            <span
              className={`tl-dot ${ev.tier === "drafted" ? "tl-dot--drafted" : ""}`}
            />
            <div className="tl-body">
              <div className="tl-body__label">{ev.label}</div>
              {ev.detail && <div className="tl-body__detail">{ev.detail}</div>}
            </div>
            <div className="tl-meta">
              <span
                className={`badge ${ev.tier === "automatic" ? "badge--auto" : "badge--drafted"}`}
              >
                {ev.tier === "automatic" ? "Automatic" : "Approved"}
              </span>
              <span className="tl-time">{ev.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
