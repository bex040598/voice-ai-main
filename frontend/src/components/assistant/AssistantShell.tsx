import type { ReactNode } from "react";

export function AssistantShell({
  left,
  center,
  right,
  bottom,
  toast
}: {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  bottom: ReactNode;
  toast?: string;
}) {
  return (
    <div className="assistant-page-shell light">
      <header className="hero-header assistant-hero card">
        <div>
          <p className="eyebrow soft">AI Search</p>
          <h1>ATMURA Uzbek Voice AI Assistant</h1>
          <p>
            Universitet bo'yicha ovozli savol-javob, kampus navigatsiya, o'qituvchi qidirish va virtual qabulxona yordamchisi.
          </p>
        </div>
      </header>
      <main className="assistant-layout">
        <aside className="layout-left">{left}</aside>
        <section className="layout-center">{center}</section>
        <aside className="layout-right">{right}</aside>
      </main>
      <footer className="assistant-bottom">{bottom}</footer>
      {toast ? <div className="toast-notice">{toast}</div> : null}
    </div>
  );
}
