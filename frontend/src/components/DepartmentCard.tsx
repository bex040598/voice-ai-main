import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "./PrimaryButton";

export function DepartmentCard({
  id,
  title,
  faculty,
  resources,
  subjects,
  teachers,
  updatedAt
}: {
  id: string;
  title: string;
  faculty: string;
  resources: number;
  subjects: number;
  teachers: number;
  updatedAt: string;
}) {
  const navigate = useNavigate();
  return (
    <article className="card department-card">
      <div className="department-meta">
        <span className="pill">{faculty}</span>
        <span className="meta-inline">Yangilandi: {updatedAt}</span>
      </div>
      <h3>{title}</h3>
      <div className="mini-stats">
        <div><strong>{resources}</strong><span>resurs</span></div>
        <div><strong>{subjects}</strong><span>fan</span></div>
        <div><strong>{teachers}</strong><span>o'qituvchi</span></div>
      </div>
      <SecondaryButton onClick={() => navigate(`/departments/${id}`)}>Elektron kutubxonaga kirish</SecondaryButton>
    </article>
  );
}
