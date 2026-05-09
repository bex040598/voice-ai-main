import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ActivityTimeline } from "../../components/cards/ActivityTimeline";
import { ServiceHealthCard } from "../../components/cards/ServiceHealthCard";
import { ChartCard } from "../../components/charts/ChartCard";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import {
  mockActivityEvents,
  mockDashboardMetrics,
  mockHeatmap,
  mockMonitoringSeries,
  mockSystemLogs,
  mockSystemServices,
  mockTeacherRanking
} from "../../data/mockStats";
import { generateMonitoringReport, getMonitoringStats } from "../../features/monitoring/monitoring.service";
import type { MonitoringStats } from "../../types";

export const MonitoringPage = () => {
  const [stats, setStats] = useState<MonitoringStats | null>(null);

  useEffect(() => {
    void getMonitoringStats().then(setStats);
  }, []);

  const pieData = [
    { name: "Known users", value: 68, color: "#00d4ff" },
    { name: "Guests", value: 21, color: "#7c3aed" },
    { name: "Unknown", value: 11, color: "#34d399" }
  ];

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Monitoring analytics"
        title="Premium campus analytics va system observability"
        description="Route requests, voice queries, face greeting, NFC scans, teacher search va system loglar bir markazda premium analitik ko'rinishda jamlangan."
        action={
          <Button onClick={() => void generateMonitoringReport()}>
            <FileText className="h-4 w-4" />
            Generate report
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mockDashboardMetrics.slice(0, 4).map((metric, index) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            hint={metric.hint}
            icon={[FileText, FileText, FileText, FileText][index]}
            accent={metric.tone}
            trend={metric.change}
            series={metric.series}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Route requests line chart" description="Kampus bo'ylab navigatsiya oqimi soat kesimida.">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockMonitoringSeries}>
              <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" />
              <YAxis stroke="rgba(255,255,255,0.4)" />
              <Tooltip />
              <Line type="monotone" dataKey="routeRequests" stroke="#00d4ff" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Voice queries bar chart" description="Voice emotion so'rovlarining soatlik kesimi.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockMonitoringSeries}>
              <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" />
              <YAxis stroke="rgba(255,255,255,0.4)" />
              <Tooltip />
              <Bar dataKey="voiceQueries" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Face greeting pie chart" description="Tanish, mehmon va noma'lum foydalanuvchi taqsimoti.">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} innerRadius={55}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="NFC scans area chart" description="Touch-to-guide skanlari va route demand o'sishi.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockMonitoringSeries}>
              <defs>
                <linearGradient id="nfc-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" />
              <YAxis stroke="rgba(255,255,255,0.4)" />
              <Tooltip />
              <Area type="monotone" dataKey="nfcScans" stroke="#00d4ff" fill="url(#nfc-area)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Top searched rooms</p>
          <div className="mt-4 space-y-4">
            {stats?.topSearchedRooms.map((room) => (
              <div key={room.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-white">{room.name}</span>
                  <span className="text-white/45">{room.count}</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div className="h-3 rounded-full bg-[linear-gradient(90deg,#00d4ff,#7c3aed)]" style={{ width: `${Math.min(100, room.count)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Teacher search ranking</p>
          <div className="mt-4 space-y-3">
            {mockTeacherRanking.map((teacher) => (
              <div key={teacher.id} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{teacher.fullName}</p>
                    <p className="text-xs text-white/45">{teacher.department}</p>
                  </div>
                  <span className="text-sm font-bold text-cyan-200">{teacher.searches}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Activity heatmap</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {mockHeatmap.map((point) => (
              <div
                key={point.id}
                className="rounded-2xl p-3 text-center text-xs text-white/70"
                style={{
                  backgroundColor: `rgba(0, 212, 255, ${point.value / 110})`
                }}
              >
                <div>{point.day}</div>
                <div className="mt-1 text-[10px]">{point.slot}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="font-['Space_Grotesk'] text-xl font-bold text-white">System logs</p>
          <div className="mt-4 space-y-3">
            {mockSystemLogs.map((log) => (
              <div key={log.id} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-white">{log.message}</span>
                  <span className="text-xs text-white/45">{log.createdAt}</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/40">{log.level}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ActivityTimeline events={mockActivityEvents.slice(0, 8)} />
        <ServiceHealthCard services={mockSystemServices} />
      </div>
    </div>
  );
};
