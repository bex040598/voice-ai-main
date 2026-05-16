import { NotificationCard } from "../components/NotificationCard";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { notifications } from "../data/mockData";

export function ProfilePage() {
  return (
    <div className="page-stack">
      <PageHeader title="Profile" description="Shaxsiy profil, aktiv bandlar, o'quv zali bronlari, xabarnomalar va xavfsizlik." />
      <div className="grid split-layout profile-layout">
        <section className="card profile-card">
          <div className="profile-top">
            <div className="profile-avatar">AG</div>
            <div>
              <h2>ATMURA Guest</h2>
              <p>Talaba • Kutubxona ID: LIB-24618</p>
            </div>
          </div>
          <div className="grid card-grid two">
            <StatCard label="Active loans" value="3" detail="On time" tone="success" />
            <StatCard label="Reservations" value="2" detail="Pending" tone="warning" />
            <StatCard label="Reading room" value="4" detail="Booked" tone="info" />
            <StatCard label="Face ID" value="Active" detail="Verified" tone="primary" />
          </div>
        </section>
        <section className="grid card-grid one">
          {notifications.map((notification) => (
            <NotificationCard key={notification.title} {...notification} />
          ))}
        </section>
      </div>
    </div>
  );
}
