import type { AssistantAction, ChatMessage } from "../../lib/assistant/assistantTypes";

export function AssistantMessageBubble({
  message,
  onAction
}: {
  message: ChatMessage;
  onAction: (action: AssistantAction, text: string) => void;
}) {
  return (
    <article className={`message-bubble ${message.role}`}>
      <div className="message-meta">
        <strong>{message.role === "assistant" ? "ATMURA AI" : "Siz"}</strong>
        <span>{new Date(message.timestamp).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <div className="message-text">{message.text}</div>
      {message.emotion ? <div className="message-emotion">Emotion: {message.emotion}</div> : null}
      {message.actions?.length ? (
        <div className="action-row">
          {message.actions.map((action) => (
            <button
              key={action.id}
              className="action-chip"
              type="button"
              onClick={() => onAction(action, message.text)}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </article>
  );
}
