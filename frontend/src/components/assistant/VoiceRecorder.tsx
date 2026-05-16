import type { AssistantStatus } from "../../lib/assistant/assistantTypes";

export function VoiceRecorder({
  isListening,
  isSupported,
  onStart,
  onStop,
  autoSend,
  setAutoSend,
  status
}: {
  isListening: boolean;
  isSupported: boolean;
  onStart: () => void;
  onStop: () => void;
  autoSend: boolean;
  setAutoSend: (value: boolean) => void;
  status: AssistantStatus;
}) {
  return (
    <section className="panel voice-recorder-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Voice Lab</p>
          <h3>Record va speech capture</h3>
        </div>
        <span className={`mini-pill ${status}`}>{status}</span>
      </div>
      <div className={`voice-orb ${isListening ? "live" : ""} ${!isSupported ? "disabled" : ""}`}>
        <button type="button" onClick={isListening ? onStop : onStart} disabled={!isSupported}>
          {isListening ? "Stop" : "Record"}
        </button>
      </div>
      <div className={`wave-bars ${isListening ? "active" : ""}`}>
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.08}s` }} />
        ))}
      </div>
      <label className="toggle-row">
        <input type="checkbox" checked={autoSend} onChange={(event) => setAutoSend(event.target.checked)} />
        <span>Auto send after final transcript</span>
      </label>
    </section>
  );
}
