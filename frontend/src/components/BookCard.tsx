import { GhostButton, PrimaryButton, SecondaryButton } from "./PrimaryButton";
import { StatusBadge } from "./StatusBadge";

export function BookCard({
  title,
  author,
  department,
  availability,
  type,
  year
}: {
  title: string;
  author: string;
  department: string;
  availability: string;
  type: string;
  year: number;
}) {
  const tone =
    availability === "Mavjud" ? "success" : availability === "Band qilingan" ? "warning" : "neutral";
  return (
    <article className="card book-card">
      <div className="book-card-top">
        <StatusBadge tone={tone} label={availability} />
        <span className="meta-inline">
          {type} • {year}
        </span>
      </div>
      <h3>{title}</h3>
      <p>{author}</p>
      <span className="meta-inline">{department}</span>
      <div className="card-actions">
        <PrimaryButton>Kirish</PrimaryButton>
        <SecondaryButton>Band qilish</SecondaryButton>
        <GhostButton>Saqlash</GhostButton>
      </div>
    </article>
  );
}
