import { StatusBadge } from "./StatusBadge";

export function StatCard({
  label,
  value,
  detail,
  tone
}: {
  label: string;
  value: string;
  detail: string;
  tone: "success" | "warning" | "danger" | "info" | "neutral" | "primary";
}) {
  return (
    <article className="card stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        <StatusBadge tone={tone} label={detail} />
      </div>
      <strong className="stat-value">{value}</strong>
    </article>
  );
}
