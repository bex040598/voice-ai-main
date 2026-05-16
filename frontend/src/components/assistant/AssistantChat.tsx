import { AssistantMessageBubble } from "./AssistantMessageBubble";
import { AssistantTypingIndicator } from "./AssistantTypingIndicator";
import type { AssistantAction, ChatMessage } from "../../lib/assistant/assistantTypes";

export function AssistantChat({
  messages,
  isThinking,
  onAction
}: {
  messages: ChatMessage[];
  isThinking: boolean;
  onAction: (action: AssistantAction, text: string) => void;
}) {
  return (
    <div className="assistant-chat">
      {messages.map((message) => (
        <AssistantMessageBubble key={message.id} message={message} onAction={onAction} />
      ))}
      {isThinking ? (
        <div className="message-bubble assistant typing">
          <div className="message-meta">
            <strong>ATMURA AI</strong>
            <span>Thinking...</span>
          </div>
          <AssistantTypingIndicator />
        </div>
      ) : null}
    </div>
  );
}
