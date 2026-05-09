import type { PropsWithChildren } from "react";
import { Bot, Route } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AvatarCanvas } from "../avatar/AvatarCanvas";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { useAppStore } from "../../store/useAppStore";
import { AssistantDock } from "../assistant/AssistantDock";
import { ToastViewport } from "../ui/ToastViewport";

export const AppShell = ({ children }: PropsWithChildren) => {
  const activeRoute = useAppStore((state) => state.activeRoute);
  const assistantMessages = useAppStore((state) => state.assistantMessages);

  return (
    <div className="min-h-screen p-4 xl:p-6">
      <div className="mx-auto flex max-w-[1880px] gap-4 xl:gap-6">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mt-4">{children}</div>
        </main>

        <aside className="hidden w-[360px] shrink-0 space-y-4 xl:block">
          <Card className="overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">3D Avatar</p>
                <p className="text-sm text-slate-500">Idle, greeting, thinking, direction pointing</p>
              </div>
              <Badge tone="info">R3F</Badge>
            </div>
            <AvatarCanvas speaking={assistantMessages[assistantMessages.length - 1]?.role === "assistant"} />
          </Card>

          <Card>
            <div className="mb-3 flex items-center gap-2">
              <Route className="h-4 w-4 text-cyan-600" />
              <p className="font-semibold text-navy-900">Joriy route</p>
            </div>
            {activeRoute ? (
              <div className="space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-cyan-50 px-4 py-3">
                  <p className="font-semibold text-cyan-700">{activeRoute.distance} metr</p>
                  <p>{activeRoute.estimatedTime}</p>
                </div>
                <p className="leading-6">{activeRoute.steps[0]}</p>
                <p className="leading-6">{activeRoute.steps[1] ?? "Keyingi bosqich assistant panelida ko'rsatiladi."}</p>
              </div>
            ) : (
              <p className="text-sm leading-6 text-slate-500">
                Room yoki teacher qidirilgandan keyin shu yerda route summary chiqadi.
              </p>
            )}
          </Card>

          <Card className="bg-navy-900 text-white">
            <div className="mb-3 flex items-center gap-2">
              <Bot className="h-4 w-4 text-cyan-300" />
              <p className="font-semibold">Realtime modules</p>
            </div>
            <div className="grid gap-3 text-sm text-white/80">
              <p>Face greeting demo tayyor</p>
              <p>Voice emotion mock classifier tayyor</p>
              <p>Socket layer va Telegram abstraction tayyor</p>
            </div>
          </Card>
        </aside>
      </div>

      <AssistantDock />
      <ToastViewport />
    </div>
  );
};
