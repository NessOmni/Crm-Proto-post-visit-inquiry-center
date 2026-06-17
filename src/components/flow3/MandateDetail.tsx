/* The mandate detail panel in the Owner Lens — the seller-side twin of the
   lead detail. Stat pills, the bien card, a comparables panel, and the
   report/communication history (the Living Page). The overdue mandate shows
   its held reasoning, mirroring Flow 2's held lead. */
import type { MandateStat } from "../../data/types";
import { useDemo } from "../../state/DemoContext";
import { flow3 } from "../../data/fixtures";
import { Avatar } from "../flow2/Avatar";
import { Photo } from "../Photo";
import { ComparablesPanel } from "./ComparablesPanel";
import { LivingPageTimeline } from "./LivingPageTimeline";

export function MandateDetail({ stat }: { stat: MandateStat }) {
  const { substrate } = useDemo();
  const mandate = substrate.mandates.find((m) => m.id === stat.mandateId)!;
  const bien = substrate.biens.find((b) => b.id === mandate.bienId)!;
  const owner = substrate.owners.find((o) => o.id === mandate.ownerId)!;
  const sale = bien.kind === "sale";
  const isHero = stat.mandateId === flow3.mandateId;
  const initials = `${owner.firstName[0]}${owner.lastName[0]}`;

  return (
    <div className="lead-detail">
      <div className="lead-detail__head">
        <Avatar initials={initials} size="lg" />
        <div>
          <div className="lead-detail__name">
            {owner.firstName} {owner.lastName}
          </div>
          <div className="lead-detail__sub">
            Mandat · {bien.address}, {bien.postalCode} {bien.city}
          </div>
        </div>
      </div>

      <div className="pills">
        <span className="pill">
          <span className="pill__label">Jours sur le marché</span>
          <span className="pill__value">{stat.daysOnMarket}</span>
        </span>
        <span className="pill">
          <span className="pill__label">Visites</span>
          <span className="pill__value">{stat.visitsPeriod}</span>
        </span>
        <span className="pill">
          <span className="pill__label">Leads</span>
          <span className="pill__value">{stat.leadsPeriod}</span>
        </span>
        <span className="pill">
          <span className="pill__label">Dernier contact</span>
          <span className="pill__value">il y a {stat.lastContactDays} j</span>
        </span>
      </div>

      {/* The overdue mandate — the one decision point kept for the human. */}
      {stat.held && (
        <div className="held-block">
          <div className="held-block__head">
            <span className="held-block__pill">Contact en retard — à vous de jouer</span>
            <span className="held-block__why">
              {owner.firstName} n'a pas eu de point automatique. Voici pourquoi.
            </span>
          </div>
          <dl className="held-reason">
            <div>
              <dt>Signal</dt>
              <dd>{stat.held.signal}</dd>
            </div>
            <div>
              <dt>Lecture</dt>
              <dd>{stat.held.reasoning}</dd>
            </div>
            <div>
              <dt>Action suggérée</dt>
              <dd>{stat.held.suggestedAction}</dd>
            </div>
          </dl>
        </div>
      )}

      {/* The bien card */}
      <div className="kicker section-label">Le bien</div>
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
            {bien.postalCode} {bien.city} · {bien.surfaceM2} m² · {bien.rooms} pièces
            · ref. {bien.reference}
          </div>
          <div className="mandate-card__row">
            <span className="mandate-badge">
              Mandat {sale ? "de vente" : "de location"} ·{" "}
              {mandate.kind === "exclusive" ? "exclusif" : "simple"}
              {mandate.active ? " · actif" : ""}
            </span>
            <span className="mandate-card__price">
              {bien.priceEur.toLocaleString("fr-FR")} €
              {sale ? null : <small> / mois</small>}
            </span>
          </div>
        </div>
      </div>

      {/* The market panel */}
      <ComparablesPanel comparables={stat.comparables} />

      {/* The Living Page — report / communication history */}
      <div className="kicker section-label">
        {isHero ? "Rapport & historique" : "Historique de contact"}
      </div>
      <LivingPageTimeline history={stat.history} />
    </div>
  );
}
