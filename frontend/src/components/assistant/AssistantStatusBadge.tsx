import type { AssistantStatus } from "../../lib/assistant/assistantTypes";

const statusLabelMap: Record<AssistantStatus, string> = {
  idle: "Online",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
  error: "Error"
};

export function AssistantStatusBadge({ status }: { status: AssistantStatus }) {
  return <span className={`status-badge status-${status}`}>{statusLabelMap[status]}</span>;
}
