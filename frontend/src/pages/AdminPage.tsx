import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { Table } from "../components/Table";
import { stats } from "../data/mockData";

export function AdminPage() {
  const rows = [
    ["Pending uploads", "14", "Review queue"],
    ["Users", "8,240", "Active"],
    ["Departments", "12", "Healthy"],
    ["System health", "99.2%", "Stable"]
  ];

  return (
    <div className="page-stack">
      <PageHeader title="Admin" description="Modern SaaS analytics dashboard, tables, pending uploads va system health." />
      <div className="grid card-grid four">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="grid split-layout">
        <section className="card chart-card">
          <h3>Analytics preview</h3>
          <div className="bar-chart" aria-label="Analytics chart">
            {[58, 72, 66, 90, 80, 74].map((value, index) => (
              <span key={index} style={{ height: `${value}%` }} />
            ))}
          </div>
        </section>
        <section className="card">
          <Table headers={["Metric", "Value", "Status"]} rows={rows} />
        </section>
      </div>
    </div>
  );
}
