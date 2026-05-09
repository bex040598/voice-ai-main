import {
  AlarmClockCheck,
  BookOpenText,
  Boxes,
  BrainCircuit,
  Building2,
  Camera,
  ChartNoAxesCombined,
  FileBadge2,
  LibraryBig,
  ShieldEllipsis,
  UserCog,
  Users
} from "lucide-react";
import { mockMonitoringStats, mockResources, mockSubjects, mockTests } from "../../data/mockAcademic";
import { mockNfcTags, mockRooms } from "../../data/mockCampus";
import { mockTeacherSchedules } from "../../data/mockTeachers";
import { mockAuditLogs, mockStudentProfiles, mockTeacherProfiles, mockUsers } from "../../data/mockUsers";
import { formatRole } from "../../lib/utils";
import type { Role } from "../../types";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

interface RoleDashboardPageProps {
  role: Role;
}

const rolePanels: Record<Role, { title: string; description: string; cards: Array<[string, string]> }> = {
  guest: {
    title: "Mehmon dashboard",
    description: "Face greeting, campus map, NFC touch va rektor qabulxonasiga tez kirish nuqtalari.",
    cards: [
      ["Guest guidance", "AR route, Telegram route va NFC touch demo"],
      ["Quick search", "Xona, dekanat, kafedra yoki o'qituvchi qidirish"],
      ["Reception", "Virtual rektor qabulxonasi bilan bevosita murojaat"]
    ]
  },
  student: {
    title: "Talaba kabineti",
    description: "Shaxsiy kabinet, dars jadvali, portfolio, test va elektron resurslar bir sahifada.",
    cards: [
      ["Academic flow", "Schedule, resurslar, topshiriq va baholar"],
      ["Portfolio", "Multimedia ishlar va fayl yuklash"],
      ["AI helper", "Avatar yordamida savol-javob va route suggestion"]
    ]
  },
  teacher: {
    title: "O'qituvchi kabineti",
    description: "Fanlar, testlar, elektron resurs va room schedule boshqaruvi uchun operatsion panel.",
    cards: [
      ["Teaching ops", "Fan, topic, resource va test yaratish"],
      ["Portfolio review", "Talabalar ishlarini ko'rish va baholash"],
      ["AI generator", "Demo test savollari generatsiyasi uchun tayyor qatlam"]
    ]
  },
  admin: {
    title: "Admin panel",
    description: "Kampus xaritasi, users, monitoring, NFC, face database va AI modullarini boshqarish markazi.",
    cards: [
      ["Campus graph", "Node, edge, building va floor mapping"],
      ["Monitoring", "Traffic, searches, requests va system health"],
      ["Operations", "Telegram, AI settings va hisobotlar"]
    ]
  },
  super_admin: {
    title: "Super admin control room",
    description: "Permissions, audit log, security monitoring, API keys va backup boshqaruvi.",
    cards: [
      ["Security", "RBAC, audit, health va policy ko'rinishi"],
      ["Governance", "Permission management va critical actions log"],
      ["Infrastructure", "API keys, backup va adapters readiness"]
    ]
  }
};

export const RoleDashboardPage = ({ role }: RoleDashboardPageProps) => {
  const panel = rolePanels[role];

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow={`${formatRole(role)} dashboard`}
        title={panel.title}
        description={panel.description}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Users"
          value={String(mockUsers.filter((user) => user.role === role || role === "admin" || role === "super_admin").length)}
          hint={`${formatRole(role)} bo'yicha tayyor demo yozuvlar`}
          icon={role === "student" ? Users : role === "teacher" ? UserCog : Users}
        />
        <MetricCard
          label="Resources"
          value={String(mockResources.length)}
          hint="MultimediaLab kontent va elektron materiallar"
          icon={role === "student" ? BookOpenText : LibraryBig}
          accent="navy"
        />
        <MetricCard
          label="Live Ops"
          value={
            role === "guest"
              ? `${mockNfcTags.length} NFC`
              : role === "teacher"
                ? `${mockTests.length} test`
                : `${mockMonitoringStats.activeUsers}`
          }
          hint="Real-time ishlash uchun tayyor demo signal"
          icon={role === "guest" ? Camera : role === "teacher" ? BrainCircuit : ChartNoAxesCombined}
          accent="emerald"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.95fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">{panel.title}</p>
              <p className="text-sm text-slate-500">Role-specific modules va operational checklist</p>
            </div>
            <Badge tone="info">{formatRole(role)}</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {panel.cards.map(([title, description]) => (
              <div key={title} className="rounded-[24px] border border-slate-200 bg-white/70 p-4">
                <p className="font-semibold text-navy-900">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          {role === "guest" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-cyan-600" />
                <p className="font-semibold text-navy-900">Guest quick services</p>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Xona qidirish, NFC touch, AR route va rektor qabulxonasiga murojaat qilish shu rol uchun asosiy oqimdir.
              </p>
              <div className="grid gap-3">
                {mockRooms.slice(0, 4).map((room) => (
                  <div key={room.id} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                    <p className="text-sm font-semibold text-navy-900">{room.name}</p>
                    <p className="text-xs text-slate-500">{room.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {role === "student" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AlarmClockCheck className="h-5 w-5 text-cyan-600" />
                <p className="font-semibold text-navy-900">Student pulse</p>
              </div>
              {mockStudentProfiles.slice(0, 4).map((profile) => (
                <div key={profile.id} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                  <p className="text-sm font-semibold text-navy-900">{profile.group}</p>
                  <p className="text-xs text-slate-500">
                    {profile.faculty} | Kurs {profile.course} | Reyting {profile.rating}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {role === "teacher" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileBadge2 className="h-5 w-5 text-cyan-600" />
                <p className="font-semibold text-navy-900">Teacher operations</p>
              </div>
              {mockTeacherSchedules.slice(0, 4).map((schedule) => (
                <div key={schedule.id} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                  <p className="text-sm font-semibold text-navy-900">{schedule.subject}</p>
                  <p className="text-xs text-slate-500">
                    {schedule.weekday} | {schedule.startTime}-{schedule.endTime}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {role === "admin" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Boxes className="h-5 w-5 text-cyan-600" />
                <p className="font-semibold text-navy-900">Campus ops</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-4">
                  <p className="text-lg font-bold text-navy-900">{mockRooms.length}</p>
                  <p className="text-xs text-slate-500">Rooms mapped</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-4">
                  <p className="text-lg font-bold text-navy-900">{mockNfcTags.length}</p>
                  <p className="text-xs text-slate-500">NFC points linked</p>
                </div>
              </div>
            </div>
          ) : null}

          {role === "super_admin" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldEllipsis className="h-5 w-5 text-cyan-600" />
                <p className="font-semibold text-navy-900">Governance log</p>
              </div>
              {mockAuditLogs.map((log) => (
                <div key={log.id} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                  <p className="text-sm font-semibold text-navy-900">{log.action}</p>
                  <p className="text-xs text-slate-500">{log.entity}</p>
                </div>
              ))}
              <div className="rounded-2xl bg-navy-900 px-4 py-4 text-white">
                <p className="font-semibold">System health {mockMonitoringStats.systemHealth.api}%</p>
                <p className="mt-1 text-xs text-white/70">
                  API keys, backup va audit trail qatlamlari ulashga tayyor.
                </p>
              </div>
            </div>
          ) : null}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Teachers"
          value={String(mockTeacherProfiles.length)}
          hint="Ask-any-teacher va office lookup uchun tayyor"
          icon={Users}
        />
        <MetricCard
          label="Subjects"
          value={String(mockSubjects.length)}
          hint="Academic content constructor bilan bog'langan"
          icon={BookOpenText}
          accent="navy"
        />
        <MetricCard
          label="System status"
          value={`${mockMonitoringStats.systemHealth.api}%`}
          hint="API, DB, socket va AI bridge health"
          icon={ChartNoAxesCombined}
          accent="emerald"
        />
      </div>
    </div>
  );
};
