import type { AssistantStatus } from "../../lib/assistant/assistantTypes";

export function AssistantInputBar({
  value,
  onChange,
  onSend,
  onMic,
  onClear,
  micDisabled,
  status
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onMic: () => void;
  onClear: () => void;
  micDisabled: boolean;
  status: AssistantStatus;
}) {
  return (
    <div className="assistant-input-bar">
      <button className={`mic-button ${status === "listening" ? "active" : ""}`} type="button" onClick={onMic} disabled={micDisabled} aria-label="Mikrofonni ishga tushirish">
        Mic
      </button>
      <input
        aria-label="Assistantga savol yuborish"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Masalan: 215-xonaga qanday boraman?"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSend();
          }
        }}
      />
      <button className="primary-button" type="button" onClick={onSend}>
        Send
      </button>
      <button className="ghost-button" type="button" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}
