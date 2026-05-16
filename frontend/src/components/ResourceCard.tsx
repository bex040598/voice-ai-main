export function ResourceCard({
  title,
  category,
  audience,
  freshness
}: {
  title: string;
  category: string;
  audience: string;
  freshness: string;
}) {
  return (
    <article className="card resource-card">
      <span className="pill subtle">{category}</span>
      <h3>{title}</h3>
      <p>{audience}</p>
      <span className="meta-inline">{freshness}</span>
    </article>
  );
}
