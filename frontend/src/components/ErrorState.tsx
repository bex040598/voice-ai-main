export function ErrorState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="state-card error" role="alert">
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}
