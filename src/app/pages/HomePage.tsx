import { ArrowRight, Bot, Landmark, MapPinned, ScanFace, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { mockBuildings, mockNfcTags, mockRooms } from "../../data/mockCampus";
import { mockUsers } from "../../data/mockUsers";

const features = [
  {
    title: "Real-time face greeting",
    description: "Kamera preview, mock identify va role-aware salomlashuv ssenariylari."
  },
  {
    title: "3D avatar assistant",
    description: "React Three Fiber asosida idle, thinking, speaking va pointing holatlari."
  },
  {
    title: "Campus routing engine",
    description: "Dijkstra, A*, multi-floor graph va corridor-based instructions."
  },
  {
    title: "MultimediaLab suite",
    description: "Resources, tests, portfolio, monitoring va admin ops bitta ekotizimda."
  }
];

export const HomePage = () => (
  <div className="space-y-6">
    <PageIntro
      eyebrow="ATMURA MVP"
      title="Universitet kampusi uchun aqlli navigatsiya va multimedia boshqaruv markazi"
      description="ATMURA mehmon, talaba, o'qituvchi va administratorlar uchun yagona web platforma bo'lib, AI assistant, campus map, voice emotion, NFC guide va MultimediaLab modullarini birlashtiradi."
      action={
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard">
            <Button>
              Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/campus-map">
            <Button variant="secondary">Campus map</Button>
          </Link>
        </div>
      }
    />

    <div className="grid gap-4 lg:grid-cols-4">
      <MetricCard
        label="Buildings"
        value={String(mockBuildings.length)}
        hint="Asosiy bino, Innovation Center, Library Hub"
        icon={Landmark}
      />
      <MetricCard
        label="Rooms"
        value={String(mockRooms.length)}
        hint="30 ta xona, laboratoriya va xizmat nuqtalari"
        icon={MapPinned}
        accent="navy"
      />
      <MetricCard
        label="NFC Tags"
        value={String(mockNfcTags.length)}
        hint="Touch-to-guide uchun biriktirilgan demo teglar"
        icon={ScanFace}
      />
      <MetricCard
        label="Active personas"
        value={String(mockUsers.length)}
        hint="Role-based dashboard bilan tayyor foydalanuvchilar"
        icon={Bot}
        accent="emerald"
      />
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
      <Card className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,184,222,0.16),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.88),_rgba(255,255,255,0.76))]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-700">Why ATMURA</p>
            <h3 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-navy-900">
              Navigation, assistant va MultimediaLab bir joyda
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Platforma kampus mehmonlarini yuz va ovoz orqali kutib oladi, xona va o'qituvchi qidiruvini fuzzy search bilan yaxshilaydi, route ni AR yoki interaktiv xaritada ko'rsatadi va shu bilan birga talabalar uchun resurs, test va portfolio jarayonlarini boshqaradi.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-[24px] border border-white/80 bg-white/80 p-4">
                  <p className="font-semibold text-navy-900">{feature.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-navy-900 p-6 text-white">
            <div className="mb-5 flex items-center gap-3">
              <Waves className="h-5 w-5 text-cyan-300" />
              <p className="font-semibold">Live scenario</p>
            </div>
            <div className="space-y-4 text-sm leading-7 text-white/80">
              <p>1. Mehmon kameraga qaraydi va ATMURA salomlashadi.</p>
              <p>2. "215-xonani qidiryapman" deydi, voice emotion modul hurry/confused holatini aniqlaydi.</p>
              <p>3. Assistant A* route topib, campus map va 3D avatar orqali ko'rsatma beradi.</p>
              <p>4. Xohlagan paytda route Telegramga yuboriladi yoki NFC tegdan davom ettiriladi.</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Role dashboards</p>
        <div className="mt-4 space-y-3">
          {[
            ["Mehmon", "/dashboard/guest"],
            ["Talaba", "/dashboard/student"],
            ["O'qituvchi", "/dashboard/teacher"],
            ["Admin", "/dashboard/admin"],
            ["Super Admin", "/dashboard/super-admin"]
          ].map(([label, path]) => (
            <Link
              key={path}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 text-sm font-semibold text-navy-900 transition hover:border-cyan-300"
              to={path}
            >
              {label}
              <ArrowRight className="h-4 w-4 text-cyan-600" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  </div>
);
