import { DepartmentCard } from "../components/DepartmentCard";
import { PageHeader } from "../components/PageHeader";
import { departments } from "../data/mockData";

export function DepartmentsPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Departments" description="Fakultetlar, kafedralar, resurslar, fanlar va yangilanishlar markazi." />
      <div className="grid card-grid three">
        {departments.map((department) => (
          <DepartmentCard key={department.id} {...department} />
        ))}
      </div>
    </div>
  );
}
