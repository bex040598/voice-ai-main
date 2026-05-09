import {
  Camera,
  Compass,
  MapPinned,
  Mic,
  ScanLine,
  Sparkles,
  UserRoundSearch
} from "lucide-react";
import { Link } from "react-router-dom";
import { ActivityTimeline } from "../../components/cards/ActivityTimeline";
import { ServiceHealthCard } from "../../components/cards/ServiceHealthCard";
import { AvatarCanvas } from "../../components/avatar/AvatarCanvas";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { CampusMapCanvas } from "../../components/map/CampusMapCanvas";
import { RouteInstructions } from "../../components/map/RouteInstructions";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { mockDashboardMetrics, mockActivityEvents, mockSystemServices } from "../../data/mockStats";
import { mockRooms } from "../../data/mockCampus";
import { useAppStore } from "../../store/useAppStore";
import { formatRole } from "../../lib/utils";

const quickActions = [
  { label: "Face Greeting", icon: Camera, path: "/face-greeting" },
  { label: "Route Finder", icon: Compass, path: "/campus-map" },
  { label: "Ask Teacher", icon: UserRoundSearch, path: "/teachers" },
  { label: "NFC Scan", icon: ScanLine, path: "/nfc-guide" },
  { label: "Voice Assistant", icon: Mic, path: "/voice-emotion" }
];

export const DashboardPage = () => {
  const currentRole = useAppStore((state) => state.currentRole);
  const activeRoute = useAppStore((state) => state.activeRoute);
  const assistantMessages = useAppStore((state) => state.assistantMessages);
  const avatarMode = useAppStore((state) => state.avatarMode);
  const setAvatarMode = useAppStore((state) => state.setAvatarMode);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Hero command center"
        title={`Xush kelibsiz, ${formatRole(currentRole)} uchun ATMURA boshqaruv markazi`}
        description="Bugungi kampus faoliyati real-time monitoring qilinmoqda. Navigatsiya, assistant, monitoring va multimedia modullari yagona premium operatsion qatlamda ishlamoqda."
      />

      <section className="grid gap-6 xl:grid-cols-[1.16fr_0.84fr]">
        <Card className="overflow-hidden bg-[linear-gradient(135deg,rgba(0,212,255,0.16),rgba(124,58,237,0.16))]" strong>
          <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
            <div>
              <Badge tone="info">Realtime command center</Badge>
              <h2 className="mt-5 font-['Space_Grotesk'] text-4xl font-bold text-white">
                Kampus AI ekotizimi jonli boshqaruv ostida
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                Face greeting, route finder, ask-any-teacher, NFC, voice emotion va virtual reception modullari bir vaqtning o'zida kuzatilmoqda.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {quickActions.map((action) => (
                  <Link key={action.path} to={action.path}>
                    <Button size="sm" variant="secondary" onMouseEnter={() => setAvatarMode("listening")}>
                      <action.icon className="h-4 w-4" />
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {[
                  "Yo'nalish Dijkstra algoritmi orqali hisoblandi.",
                  "Ovoz ohangiga qarab javob uslubi moslashtirildi.",
                  "Yuz tanildi: ishonchlilik darajasi 94%."
                ].map((copy) => (
                  <div key={copy} className="rounded-[24px] border border-white/10 bg-white/8 p-4 text-sm leading-6 text-white/72">
                    {copy}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-[linear-gradient(180deg,rgba(6,20,38,0.92),rgba(11,45,91,0.88))]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Avatar hologram</p>
                    <p className="text-sm text-white/55">Holat: {avatarMode}</p>
                  </div>
                  <Badge tone="violet">{assistantMessages.at(-1)?.role === "assistant" ? "Speaking" : "Online"}</Badge>
                </div>
                <AvatarCanvas mode={avatarMode} speaking={assistantMessages.at(-1)?.role === "assistant"} />
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <p className="text-sm font-semibold text-white">Current status</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Online", "Listening", "Thinking", "Speaking"].map((label, index) => (
                      <Badge key={label} tone={index % 2 === 0 ? "info" : "violet"}>
                        {label}
                      </Badge>
                    ))}
                  </div>
                </Card>
                <Card>
                  <p className="text-sm font-semibold text-white">Architecture mini map</p>
                  <div className="mt-4 space-y-2">
                    {["Users", "Web UI", "AI Modules", "Integrations", "Results"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-xs text-white/60">
                          {index + 1}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/60 to-violet-400/60" />
                        <span className="text-xs text-white/55">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>

        <ServiceHealthCard services={mockSystemServices} />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {mockDashboardMetrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            hint={metric.hint}
            icon={[MapPinned, Sparkles, UserRoundSearch, ScanLine, Mic][index % 5]}
            accent={metric.tone}
            trend={metric.change}
            series={metric.series}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card strong>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">Campus navigation preview</p>
              <p className="text-sm text-white/55">Current position, animated route line va qavatlar bo'yicha ko'rinish.</p>
            </div>
            <Link to="/campus-map">
              <Button size="sm">Open full map</Button>
            </Link>
          </div>
          <CampusMapCanvas
            floorId={activeRoute?.path.some((nodeId) => nodeId.includes("a2")) ? "floor-a2" : "floor-a1"}
            route={activeRoute}
            selectedRoomId={mockRooms.find((room) => room.id === "room-215")?.id}
          />
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">AI assistant panel</p>
                <p className="text-sm text-white/55">Suggested prompts va emotion-aware javoblar.</p>
              </div>
              <Badge tone="info">Chat ready</Badge>
            </div>
            <div className="space-y-3">
              {[
                "215-xonaga yo'l ko'rsat",
                "G'olib Rashidovich qayerda?",
                "Kutubxona qayerda?",
                "Rektor qabuliga yozilmoqchiman"
              ].map((prompt, index) => (
                <div
                  key={prompt}
                  className={`rounded-[24px] border p-4 text-sm leading-6 ${
                    index % 2 === 0
                      ? "border-cyan-400/18 bg-cyan-500/10 text-white/75"
                      : "border-white/10 bg-white/6 text-white/64"
                  }`}
                >
                  {prompt}
                </div>
              ))}
            </div>
          </Card>
          <RouteInstructions route={activeRoute} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <ActivityTimeline events={mockActivityEvents} />
        <Card>
          <div className="mb-5 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Quick insights</p>
              <p className="text-sm text-white/55">Platforma arxitekturasi va joriy vazifalar bo'yicha tezkor ko'rinish.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <p className="text-sm font-semibold text-white">System health</p>
              <p className="mt-3 text-4xl font-bold text-cyan-200">99.1%</p>
              <p className="mt-2 text-sm leading-6 text-white/55">API, database va socket qatlamlari barqaror javob bermoqda.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <p className="text-sm font-semibold text-white">Route accuracy</p>
              <p className="mt-3 text-4xl font-bold text-violet-200">96%</p>
              <p className="mt-2 text-sm leading-6 text-white/55">Nearest-node snapping va multi-floor instruction generator sinovdan o'tgan.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <p className="text-sm font-semibold text-white">Voice adapt</p>
              <p className="mt-3 text-4xl font-bold text-emerald-200">6</p>
              <p className="mt-2 text-sm leading-6 text-white/55">Emotion holatlari uchun javob ohangi moslashtiriladi.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <p className="text-sm font-semibold text-white">Integrations</p>
              <p className="mt-3 text-4xl font-bold text-amber-100">5</p>
              <p className="mt-2 text-sm leading-6 text-white/55">Telegram, NFC, WebSocket, PDF va AI adapter bog'langan.</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
