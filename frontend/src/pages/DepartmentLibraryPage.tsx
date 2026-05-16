import { useParams } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { ResourceCard } from "../components/ResourceCard";
import { SectionTitle } from "../components/SectionTitle";
import { StatCard } from "../components/StatCard";
import { books, departments, resources } from "../data/mockData";

export function DepartmentLibraryPage() {
  const params = useParams();
  const department = departments.find((item) => item.id === params.departmentId) || departments[0];

  return (
    <div className="page-stack">
      <section className="hero-surface compact">
        <div className="hero-copy">
          <p className="eyebrow soft">Department library</p>
          <h1>{department.title}</h1>
          <p>{department.faculty} uchun fanlar, resurs kategoriyalari, analytics va upload holati.</p>
        </div>
        <div className="dashboard-grid">
          <StatCard label="Fanlar" value={String(department.subjects)} detail="Aktiv" tone="primary" />
          <StatCard label="Resurslar" value={String(department.resources)} detail="Yangilangan" tone="info" />
        </div>
      </section>
      <div className="grid split-layout">
        <section className="section-block">
          <SectionTitle title="Latest resources" description="Kafedra bo'yicha yangi yuklangan materiallar." />
          <div className="grid card-grid two">
            {resources.map((resource) => (
              <ResourceCard key={resource.title} {...resource} />
            ))}
          </div>
        </section>
        <section className="section-block">
          <SectionTitle title="Popular resources" description="Ko'p o'qilgan va tavsiya etilgan materiallar." />
          <div className="grid card-grid one">
            {books.slice(0, 2).map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>
      </div>
      <section className="grid card-grid three">
        <StatCard label="Upload holati" value="14" detail="Pending review" tone="warning" />
        <StatCard label="Analytics" value="92%" detail="Engaged" tone="success" />
        <StatCard label="O'qituvchi qamrovi" value="19" detail="Updated" tone="primary" />
      </section>
    </div>
  );
}
