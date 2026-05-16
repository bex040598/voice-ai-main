import type { ExternalBotStatus } from "../../lib/assistant/assistantTypes";

export function ExternalBotFrame({ status }: { status: ExternalBotStatus }) {
  return (
    <section className="panel external-bot-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">External Uzbek Bot</p>
          <h3>ATMU AI integratsiya paneli</h3>
        </div>
        <span className={`mini-pill ${status}`}>{status === "online" ? "Online" : "Fallback mode"}</span>
      </div>
      <div className="iframe-shell">
        <iframe
          title="ATMU external bot"
          src="https://atmu-ai.onrender.com/"
          allow="microphone; camera; clipboard-write"
        />
      </div>
      <div className="button-row">
        <a className="primary-link" href="https://atmu-ai.onrender.com/" target="_blank" rel="noreferrer">
          Open in new tab
        </a>
      </div>
    </section>
  );
}
