import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { MapPinned, Sparkles, Waves } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AvatarCanvas } from "../avatar/AvatarCanvas";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { AppErrorBoundary } from "../error/AppErrorBoundary";
import { ErrorFallback } from "../error/ErrorFallback";
import { useAppStore } from "../../store/useAppStore";
import { AssistantDock } from "../assistant/AssistantDock";
import { ToastViewport } from "../ui/ToastViewport";
import { PageTransition } from "./PageTransition";

const marketingPaths = new Set(["/", "/login", "/register"]);

export const AppShell = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const assistantMessages = useAppStore((state) => state.assistantMessages);
  const activeRoute = useAppStore((state) => state.activeRoute);
  const avatarMode = useAppStore((state) => state.avatarMode);
  const theme = useAppStore((state) => state.theme);
  const sidebarMobileOpen = useAppStore((state) => state.sidebarMobileOpen);
  const setSidebarMobileOpen = useAppStore((state) => state.setSidebarMobileOpen);
  const marketing = marketingPaths.has(location.pathname);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="relative min-h-screen overflow-hidden p-3 md:p-4 xl:p-6">
      <div className="atmura-particles fixed inset-0 z-0">
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            style={{
              left: `${6 + index * 6}%`,
              animationDelay: `${index * 1.2}s`,
              animationDuration: `${15 + (index % 5)}s`
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {sidebarMobileOpen && !marketing ? (
          <motion.div
            className="fixed inset-0 z-50 bg-[#020816]/80 p-3 backdrop-blur-md xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Sidebar mobile />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={marketing ? "relative z-10 mx-auto max-w-[1440px]" : "relative z-10 mx-auto flex max-w-[1880px] gap-4 xl:gap-6"}>
        {!marketing ? <Sidebar /> : null}

        <main className="min-w-0 flex-1">
          <Topbar marketing={marketing} />
          <div className={marketing ? "mt-4" : "mt-4"}>
            <PageTransition>{children}</PageTransition>
          </div>
        </main>

        {!marketing ? (
          <aside className="hidden w-[360px] shrink-0 space-y-4 xl:block">
            <Card className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.18),transparent_32%),linear-gradient(180deg,rgba(6,20,38,0.92),rgba(11,45,91,0.88))]">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-['Space_Grotesk'] text-xl font-bold text-white">3D Avatar Core</p>
                  <p className="text-sm text-white/60">ATMURA holati: {avatarMode}</p>
                </div>
                <Badge tone="info">Realtime</Badge>
              </div>
              <AppErrorBoundary
                fallback={
                  <ErrorFallback
                    compact
                    title="3D avatar vaqtincha yuklanmadi"
                    description="Avatar sahnasi ishlamay qolsa ham qolgan ATMURA modullari ochiladi."
                  />
                }
              >
                <AvatarCanvas
                  mode={avatarMode}
                  speaking={assistantMessages[assistantMessages.length - 1]?.role === "assistant"}
                />
              </AppErrorBoundary>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Online", "Listening", "Thinking", "Speaking"].map((label, index) => (
                  <Badge key={label} tone={index % 2 === 0 ? "info" : "violet"}>
                    {label}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card>
              <div className="mb-4 flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-cyan-300" />
                <p className="font-semibold text-white">Route telemetry</p>
              </div>
              {activeRoute ? (
                <div className="space-y-4 text-sm text-white/65">
                  <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-500/10 px-4 py-4">
                    <p className="font-semibold text-cyan-100">{activeRoute.distance} metr</p>
                    <p>{activeRoute.estimatedTime}</p>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="atmura-route-line h-full w-full rounded-full" />
                  </div>
                  {activeRoute.steps.slice(0, 3).map((step) => (
                    <div key={step} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                      {step}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-white/55">
                  Xona yoki o'qituvchi qidirilgandan keyin shu yerda route summary, qavat o'tishlari va bosqichlar ko'rinadi.
                </p>
              )}
            </Card>

            <Card className="bg-[linear-gradient(135deg,rgba(124,58,237,0.2),rgba(0,212,255,0.14))]">
              <div className="mb-3 flex items-center gap-2">
                <Waves className="h-4 w-4 text-cyan-200" />
                <p className="font-semibold text-white">Realtime modules</p>
              </div>
              <div className="grid gap-3 text-sm text-white/72">
                <p>Face greeting demo ishonchlilik halqasi bilan tayyor</p>
                <p>Voice emotion classifier javob uslubini moslashtiradi</p>
                <p>NFC, Telegram va monitoring qatlamlari jonli ssenariy uchun bog'langan</p>
                <p>Render uchun HDRsiz xavfsiz 3D sahna ishlamoqda</p>
              </div>
            </Card>
          </aside>
        ) : null}
      </div>

      {!marketing ? <AssistantDock /> : null}
      <ToastViewport />
    </div>
  );
};
