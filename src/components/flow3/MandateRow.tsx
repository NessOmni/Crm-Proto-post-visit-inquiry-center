/* One mandate in the Owner Lens list. The health dot reads the
   assistant's signal — on-track (green) / watch (neutral) / overdue
   (amber, the one decision point kept for the human). */
import type { MandateStat } from "../../data/types";
import { useDemo } from "../../state/DemoContext";
import { Photo } from "../Photo";

const healthTitle: Record<MandateStat["health"], string> = {
  "on-track": "Sur les rails",
  watch: "À surveiller",
  overdue: "Contact en retard",
};

export function MandateRow({
  stat,
  selected,
  onSelect,
}: {
  stat: MandateStat;
  selected: boolean;
  onSelect: () => void;
}) {
  const { substrate } = useDemo();
  const mandate = substrate.mandates.find((m) => m.id === stat.mandateId)!;
  const bien = substrate.biens.find((b) => b.id === mandate.bienId)!;
  const owner = substrate.owners.find((o) => o.id === mandate.ownerId)!;
  const overdue = stat.health === "overdue";

  return (
    <button
      className={`mandate-row ${selected ? "mandate-row--selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span
        className={`mandate-row__dot mandate-row__dot--${stat.health}`}
        title={healthTitle[stat.health]}
      />
      <Photo
        url={bien.photoUrl}
        alt={bien.address}
        className="mandate-row__thumb"
        seed={1}
      />
      <span className="mandate-row__main">
        <span className="mandate-row__addr">{bien.address}</span>
        <span className="mandate-row__owner">
          {owner.firstName} {owner.lastName} · {stat.reportNote}
        </span>
      </span>
      <span className="mandate-row__end">
        <span className="mandate-row__stat">{stat.daysOnMarket} j sur le marché</span>
        <span
          className={`mandate-row__contact ${
            overdue ? "mandate-row__contact--overdue" : ""
          }`}
        >
          contact il y a {stat.lastContactDays} j
        </span>
      </span>
    </button>
  );
}
