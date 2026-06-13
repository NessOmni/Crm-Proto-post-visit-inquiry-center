/* Reusable numbered output chips — driven by card data, not tied to
   any one workflow. Renders nothing when a card has no outputs. */
export interface CardOutput {
  index: number;
  label: string;
}

export function CardOutputs({ outputs }: { outputs?: CardOutput[] }) {
  if (!outputs || outputs.length === 0) return null;
  return (
    <div className="card-outputs">
      {outputs.map((o) => (
        <span key={o.index} className="out-chip">
          <span className="out-chip__n">{o.index}</span>
          {o.label}
        </span>
      ))}
    </div>
  );
}
