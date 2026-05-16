import { useState } from "react";
import { NotificationCard } from "../components/NotificationCard";
import { PageHeader } from "../components/PageHeader";
import { Tabs } from "../components/Tabs";
import { notifications } from "../data/mockData";

export function NotificationsPage() {
  const [tab, setTab] = useState("Barchasi");
  return (
    <div className="page-stack">
      <PageHeader title="Notifications" description="Professional notification center, filter tabs va settings panel." />
      <Tabs items={["Barchasi", "Unread", "System", "Library"]} active={tab} onChange={setTab} />
      <div className="grid split-layout">
        <div className="grid card-grid one">
          {notifications.map((notification) => (
            <NotificationCard key={notification.title} {...notification} />
          ))}
        </div>
        <aside className="card settings-card">
          <h3>Settings panel</h3>
          <p>Email, Telegram va push xabarlar sozlamalari shu yerda boshqariladi.</p>
          <ul className="plain-list">
            <li>Yangi resurslar</li>
            <li>Bron tasdiqlari</li>
            <li>Upload tekshiruvlari</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
