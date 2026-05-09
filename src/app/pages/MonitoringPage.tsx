import { Activity, FileText, HeartPulse, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { generateMonitoringReport, getMonitoringActivity, getMonitoringStats } from "../../features/monitoring/monitoring.service";
import type { MonitoringStats } from "../../types";

export const MonitoringPage = () => {
  const [stats, setStats] = useState<MonitoringStats | null>(null);
  const [activity, setActivity] = useState<string[]>([]);

  useEffect(() => {
    void getMonitoringStats().then(setStats);
    void getMonitoringActivity().then(setActivity);
  }, []);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Monitoring"
        title="Admin monitoring va hisobotlar"
        description="Bugungi tashriflar, route requests, teacher search, NFC scan va system health ko'rsatkichlari bir markazda jamlangan."
        action={
          <Button onClick={() => void generateMonitoringReport()}>
            <FileText className="h-4 w-4" />
            Generate report
          </Button>
        }
      />

      {stats ? (
        <>
          <div className="grid gap-4 lg:grid-cols-4">
            <MetricCard label="Visitors" value={String(stats.todayVisitors)} hint="Bugungi tashriflar" icon={Activity} />
            <MetricCard label="Route requests" value={String(stats.routeRequests)} hint="Campus map so'rovlari" icon={Search} accent="navy" />
            <MetricCard label="Active users" value={String(stats.activeUsers)} hint="Hozir tizimda faol foydalanuvchilar" icon={HeartPulse} />
            <MetricCard label="Test submissions" value={String(stats.testSubmissions)} hint="Academic activity ko'rsatkichi" icon={FileText} accent="emerald" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
            <Card>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Top searched rooms</p>
              <div className="mt-4 space-y-3">
                {stats.topSearchedRooms.map((room) => (
                  <div key={room.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-navy-900">{room.name}</span>
                      <span className="text-slate-500">{room.count}</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div className="h-3 rounded-full bg-cyan-500" style={{ width: `${room.count * 2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">System health</p>
              <div className="mt-4 space-y-4">
                {Object.entries(stats.systemHealth).map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold capitalize text-navy-900">{label}</span>
                      <span className="text-slate-500">{value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Activity feed</p>
            <div className="mt-4 grid gap-3">
              {activity.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
};
