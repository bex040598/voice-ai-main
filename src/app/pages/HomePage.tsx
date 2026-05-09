import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Camera,
  Compass,
  Layers3,
  MapPinned,
  Radio,
  ScanLine,
  Send,
  Sparkles,
  UserRoundSearch
} from "lucide-react";
import { Link } from "react-router-dom";
import { AvatarCanvas } from "../../components/avatar/AvatarCanvas";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { mockBuildings, mockFloors, mockRooms } from "../../data/mockCampus";
import { mockUsers } from "../../data/mockUsers";

const orbitFeatures = [
  { title: "Face Greeting", description: "Yuzni tanib, rolga mos salomlashadi.", icon: Camera },
  { title: "Voice Emotion", description: "Ovoz ohangiga qarab javob uslubini moslashtiradi.", icon: Radio },
  { title: "3D Navigation", description: "Multi-floor marshrutni jonli xaritada ko'rsatadi.", icon: MapPinned },
  { title: "NFC Guide", description: "Touch-to-guide nuqtalari bilan joylashuvni aniqlaydi.", icon: ScanLine },
  { title: "AR Route", description: "Telefon kamerasi ustida AR yo'l strelkalarini beradi.", icon: Compass },
  { title: "Ask Teacher", description: "O'qituvchi jadvali va xona joylashuvini topadi.", icon: UserRoundSearch },
  { title: "Telegram", description: "Route, xabar va qabul ma'lumotlarini yuboradi.", icon: Send },
  { title: "Reception", description: "Virtual rektor qabulxonasini boshqaradi.", icon: Bot }
];

const architectureLayers = [
  {
    title: "Users",
    items: ["Mehmon", "Talaba", "O'qituvchi", "Administrator", "Super Admin"]
  },
  {
    title: "Web Interface",
    items: ["Premium dashboard", "3D avatar", "Campus map", "Voice lab", "AR overlay"]
  },
  {
    title: "AI Modules",
    items: ["Face greeting", "Emotion detector", "Route intelligence", "Fuzzy search"]
  },
  {
    title: "Integration Services",
    items: ["Telegram bot", "WebSocket", "PDF reports", "NFC resolver", "AI adapter"]
  },
  {
    title: "Database & Results",
    items: ["Users", "Schedules", "Graph nodes", "Reception flow", "Monitoring analytics"]
  }
];

const previewCards = [
  {
    title: "3D Campus Map",
    description: "Yo'nalish Dijkstra algoritmi orqali hisoblandi va qavat o'tishlari bosqichma-bosqich chizildi.",
    accent: "from-cyan-500/30 to-transparent"
  },
  {
    title: "AI Assistant Chat",
    description: "ATMURA sizning savolingizni tahlil qilmoqda va route ni avtomatik topmoqda.",
    accent: "from-violet-500/30 to-transparent"
  },
  {
    title: "Monitoring Dashboard",
    description: "Realtime tashriflar, NFC skanlar va teacher search oqimi premium analitika bilan ko'rsatiladi.",
    accent: "from-emerald-500/30 to-transparent"
  }
];

export const HomePage = () => (
  <div className="space-y-10 pb-12">
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(135deg,rgba(6,20,38,0.92),rgba(11,45,91,0.78))] px-6 py-8 shadow-glass md:px-10 md:py-10 xl:min-h-[calc(100vh-7.5rem)] xl:px-14 xl:py-14">
      <div className="absolute inset-0 atmura-noise opacity-25" />
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/18 blur-3xl" />
      <div className="absolute inset-x-20 top-24 h-px atmura-route-line opacity-80" />

      <div className="relative grid gap-10 xl:grid-cols-[1.12fr_0.88fr] xl:items-center">
        <div>
          <Badge tone="violet">Premium Futuristic Campus Dashboard</Badge>
          <h1 className="mt-6 max-w-4xl font-['Space_Grotesk'] text-5xl font-bold leading-[1.05] text-white md:text-6xl">
            ATMURA - Aqlli Kampus AI Yordamchisi
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Yuzni tanib salomlashish, ovoz hissiyotini aniqlash, 3D avatar, NFC, AR va real-time kampus navigatsiya yagona platformada.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/dashboard">
              <Button size="lg">
                Dashboardga kirish
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/campus-map">
              <Button size="lg" variant="secondary">
                Kampus xaritani ko'rish
              </Button>
            </Link>
            <Link to="/assistant">
              <Button size="lg" variant="ghost">
                AI yordamchini sinash
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <MetricCard
              label="Buildings"
              value={mockBuildings.length}
              hint="Kampus korpuslari"
              icon={Layers3}
              series={[12, 16, 18, 24, 28, 32, 35]}
            />
            <MetricCard
              label="Floors"
              value={mockFloors.length}
              hint="Aktiv qavatlar"
              icon={MapPinned}
              accent="violet"
              series={[8, 9, 10, 10, 11, 12, 12]}
            />
            <MetricCard
              label="Rooms"
              value={mockRooms.length}
              hint="Yo'naltiriladigan xonalar"
              icon={Compass}
              accent="emerald"
              series={[22, 24, 25, 29, 31, 34, 37]}
            />
            <MetricCard
              label="Users"
              value={mockUsers.length}
              hint="Platforma personallari"
              icon={Bot}
              accent="amber"
              series={[18, 22, 25, 29, 33, 36, 41]}
            />
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-4 xl:grid-cols-[1fr_0.82fr]">
            <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="font-['Space_Grotesk'] text-xl font-bold text-white">ATMURA Core Avatar</p>
                  <p className="text-sm text-white/55">Hologram preview</p>
                </div>
                <Badge tone="info">Live</Badge>
              </div>
              <AvatarCanvas mode="greeting" />
            </Card>

            <div className="space-y-4">
              <Card className="bg-[linear-gradient(135deg,rgba(0,212,255,0.14),rgba(255,255,255,0.04))]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Live assistant card</p>
                    <p className="mt-2 text-sm leading-6 text-white/62">"ATMURA sizning savolingizni tahlil qilmoqda..."</p>
                  </div>
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                </div>
              </Card>
              <Card className="bg-[linear-gradient(135deg,rgba(124,58,237,0.14),rgba(255,255,255,0.04))]">
                <p className="text-sm font-semibold text-white">Mini route map</p>
                <div className="mt-4 rounded-[24px] border border-white/10 bg-white/6 p-4">
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="atmura-route-line h-full w-full rounded-full" />
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-white/65">
                    <p>To'g'riga 12 metr yuring</p>
                    <p>Chapga buriling</p>
                    <p>Zinapoyadan 2-qavatga chiqing</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(255,255,255,0.04))]">
                <p className="text-sm font-semibold text-white">Emotion badge</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["happy", "neutral", "confused", "hurry"].map((emotion, index) => (
                    <Badge key={emotion} tone={index < 2 ? "success" : "warning"}>
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="grid gap-8 xl:grid-cols-[0.96fr_1.04fr]">
      <Card>
        <p className="text-xs uppercase tracking-[0.34em] text-cyan-200">Feature Orbit</p>
        <div className="mt-6 grid gap-4 xl:hidden">
          {orbitFeatures.map((feature) => (
            <div key={feature.title} className="rounded-[24px] border border-white/10 bg-white/8 p-4 shadow-panel backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                  <feature.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{feature.title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/55">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-6 hidden min-h-[460px] items-center justify-center xl:flex">
          <div className="absolute h-[320px] w-[320px] rounded-full border border-white/10" />
          <div className="absolute h-[420px] w-[420px] rounded-full border border-dashed border-white/10" />
          <div className="absolute flex h-40 w-40 items-center justify-center rounded-full border border-cyan-400/24 bg-[linear-gradient(135deg,rgba(0,212,255,0.18),rgba(124,58,237,0.22))] text-center shadow-glow">
            <div>
              <p className="font-['Space_Grotesk'] text-3xl font-bold text-white">ATMURA</p>
              <p className="mt-2 text-sm text-white/55">AI Campus Ecosystem</p>
            </div>
          </div>
          {orbitFeatures.map((feature, index) => {
            const angle = (Math.PI * 2 * index) / orbitFeatures.length;
            const x = Math.cos(angle) * 180;
            const y = Math.sin(angle) * 160;

            return (
              <motion.div
                key={feature.title}
                className="absolute w-40"
                style={{ transform: `translate(${x}px, ${y}px)` }}
                whileHover={{ scale: 1.05, y: -6 }}
              >
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-4 text-center shadow-panel backdrop-blur-xl">
                  <feature.icon className="mx-auto h-5 w-5 text-cyan-300" />
                  <p className="mt-3 text-sm font-semibold text-white">{feature.title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/50">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      <Card>
        <p className="text-xs uppercase tracking-[0.34em] text-cyan-200">Architecture</p>
        <div className="mt-6 space-y-4">
          {architectureLayers.map((layer, index) => (
            <div key={layer.title} className="relative rounded-[28px] border border-white/10 bg-white/6 p-5">
              {index < architectureLayers.length - 1 ? (
                <div className="absolute bottom-[-18px] left-10 z-10 h-8 w-px bg-gradient-to-b from-cyan-400 to-violet-400" />
              ) : null}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200">
                  {index + 1}
                </div>
                <div>
                  <p className="font-['Space_Grotesk'] text-xl font-bold text-white">{layer.title}</p>
                  <p className="text-sm text-white/48">Platforma qatlamlari o'zaro jonli integratsiyada ishlaydi.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <Badge key={item} tone={index % 2 === 0 ? "info" : "violet"}>
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>

    <section className="grid gap-6 xl:grid-cols-3">
      {previewCards.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
        >
          <Card className={`relative overflow-hidden bg-gradient-to-br ${item.accent}`}>
            <div className="absolute inset-0 atmura-noise opacity-30" />
            <p className="relative text-xs uppercase tracking-[0.3em] text-white/45">Live demo preview</p>
            <p className="relative mt-3 font-['Space_Grotesk'] text-2xl font-bold text-white">{item.title}</p>
            <p className="relative mt-3 text-sm leading-7 text-white/65">{item.description}</p>
            <div className="relative mt-6 h-40 rounded-[26px] border border-white/10 bg-white/6 p-4">
              <div className="mb-4 flex items-center justify-between">
                <Badge tone="info">Preview</Badge>
                <span className="text-xs text-white/40">Realtime</span>
              </div>
              <div className="grid gap-3">
                <div className="h-2 rounded-full bg-white/10">
                  <div className="atmura-route-line h-full w-4/5 rounded-full" />
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-white/25" />
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-1/2 rounded-full bg-white/18" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </section>

    <footer className="rounded-[32px] border border-white/10 bg-white/6 px-6 py-8 shadow-panel">
      <div className="grid gap-6 md:grid-cols-4">
        <div>
          <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">ATMURA</p>
          <p className="mt-3 text-sm leading-6 text-white/60">
            Intelligent Campus AI Assistant Platform. Navigatsiya, AI, multimedia va real-time monitoring yagona ekotizimda.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Modullar</p>
          <div className="mt-3 grid gap-2 text-sm text-white/60">
            <span>Face Greeting</span>
            <span>Voice Emotion</span>
            <span>3D Avatar</span>
            <span>NFC & AR</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Texnologiyalar</p>
          <div className="mt-3 grid gap-2 text-sm text-white/60">
            <span>React + TypeScript</span>
            <span>Tailwind + Motion</span>
            <span>Three.js / R3F</span>
            <span>Node.js + WebSocket</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-white/60">
            <span>demo@atmura.uz</span>
            <span>+998 90 000 00 00</span>
            <span>ATMURA Campus Experience Lab</span>
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/40">
        ATMURA - kelajak universitetlari uchun AI, navigatsiya va multimedia platformasi.
      </div>
    </footer>
  </div>
);
