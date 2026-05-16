import { useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="app-shell">
      <Header onMenu={() => setSidebarOpen(true)} />
      <div className="shell-body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="shell-content">{children}</main>
      </div>
    </div>
  );
}
