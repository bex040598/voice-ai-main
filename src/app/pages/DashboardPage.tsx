import {
  Activity,
  Bot,
  GraduationCap,
  MapPinned,
  ShieldCheck,
  UserRoundSearch
} from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Card } from "../../components/ui/Card";
import { useAppStore } from "../../store/useAppStore";
import { formatRole } from "../../lib/utils";
import { mockMonitoringStats } from "../../data/mockAcademic";

export const DashboardPage = () => {
  const currentRole = useAppStore((state) => state.currentRole);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Unified dashboard"
        title={`${formatRole(currentRole)} uchun ATMURA overview`}
        description="Bu sahifa AI assistant, campus routing, MultimediaLab va monitoring modullarining umumiy ko'rinishini beradi. Chap menyudan har bir modulga chuqurroq kirishingiz mumkin."
      />

      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Visitors today"
          value={String(mockMonitoringStats.todayVisitors)}
          hint="Face greeting va guest traffic"
          icon={Activity}
        />
        <MetricCard
          label="Route requests"
          value={String(mockMonitoringStats.routeRequests)}
          hint="A* va Dijkstra so'rovlari"
          icon={MapPinned}
          accent="navy"
        />
        <MetricCard
          label="Teacher search"
          value={String(mockMonitoringStats.teacherSearchCount)}
          hint="Ask-any-teacher module usage"
          icon={UserRoundSearch}
        />
        <MetricCard
          label="Academic ops"
          value={`${mockMonitoringStats.testSubmissions}+`}
          hint="Resource, test va portfolio faoliyati"
          icon={GraduationCap}
          accent="emerald"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <Bot className="h-5 w-5 text-cyan-600" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Key modules</p>
              <p className="text-sm text-slate-500">ATMURA MVPda faol ishlayotgan asosiy xizmatlar</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Face Greeting", "/face-greeting"],
              ["Voice Emotion", "/voice-emotion"],
              ["Campus Routing", "/campus-map"],
              ["Teachers", "/teachers"],
              ["Reception", "/reception"],
              ["Monitoring", "/monitoring"]
            ].map(([label, path]) => (
              <Link
                key={path}
                className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 text-sm font-semibold text-navy-900 transition hover:border-cyan-300"
                to={path}
              >
                {label}
              </Link>
            ))}
          </div>
        </Card>

        <Card className="bg-navy-900 text-white">
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-cyan-300" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold">Security & readiness</p>
              <p className="text-sm text-white/70">JWT, RBAC, audit va mock backend structure</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <p>Protected route struktura tayyor</p>
            <p>Role-based dashboardlar ajratilgan</p>
            <p>Telegram, WebSocket va PDF report abstraction mavjud</p>
            <p>Real backend ulanishi uchun API layer ajratilgan</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
