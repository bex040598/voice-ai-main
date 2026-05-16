import { StatusBadge } from "./StatusBadge";

export function NotificationCard({
  title,
  body,
  time,
  unread,
  kind
}: {
  title: string;
  body: string;
  time: string;
  unread: boolean;
  kind: "info" | "success" | "warning";
}) {
  return (
    <article className="card notification-card">
      <div className="notification-top">
        <h3>{title}</h3>
        <StatusBadge tone={kind} label={unread ? "Unread" : "Read"} />
      </div>
      <p>{body}</p>
      <span className="meta-inline">{time}</span>
    </article>
  );
}
