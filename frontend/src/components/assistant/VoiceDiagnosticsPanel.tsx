import type { AssistantStatus, ExternalBotStatus } from "../../lib/assistant/assistantTypes";

export function VoiceDiagnosticsPanel({
  status,
  permissionState,
  isSpeechSupported,
  ttsSupported,
  selectedVoiceLabel,
  externalBotStatus,
  speechError,
  ttsError,
  fallbackMessage
}: {
  status: AssistantStatus;
  permissionState: string;
  isSpeechSupported: boolean;
  ttsSupported: boolean;
  selectedVoiceLabel: string;
  externalBotStatus: ExternalBotStatus;
  speechError: string;
  ttsError: string;
  fallbackMessage: string;
}) {
  return (
    <section className="panel diagnostics-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Diagnostics</p>
          <h3>Voice support va fallback</h3>
        </div>
      </div>
      <div className="diagnostic-grid">
        <div><span>Assistant status</span><strong>{status}</strong></div>
        <div><span>Mic permission</span><strong>{permissionState}</strong></div>
        <div><span>Speech recognition</span><strong>{isSpeechSupported ? "Supported" : "Unsupported"}</strong></div>
        <div><span>TTS support</span><strong>{ttsSupported ? "Supported" : "Unsupported"}</strong></div>
        <div><span>Selected voice</span><strong>{selectedVoiceLabel}</strong></div>
        <div><span>External bot</span><strong>{externalBotStatus}</strong></div>
      </div>
      {fallbackMessage ? <div className="warning-panel">{fallbackMessage}</div> : null}
      {speechError ? <div className="error-panel">{speechError}</div> : null}
      {ttsError ? <div className="error-panel">{ttsError}</div> : null}
      {!isSpeechSupported ? (
        <div className="warning-panel">
          Bu brauzer speech recognition funksiyasini qo'llab-quvvatlamaydi. Matn orqali savol yuboring.
        </div>
      ) : null}
    </section>
  );
}
