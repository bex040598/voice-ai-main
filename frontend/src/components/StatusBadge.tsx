export function StatusBadge({
  tone,
  label
}: {
  tone: "success" | "warning" | "danger" | "info" | "neutral" | "primary";
  label: string;
}) {
  return <span className={`status-chip tone-${tone}`}>{label}</span>;
}
