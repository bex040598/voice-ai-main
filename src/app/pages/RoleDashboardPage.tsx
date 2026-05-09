import {
  AlarmClockCheck,
  BookOpenText,
  BrainCircuit,
  Building2,
  Camera,
  ChartNoAxesCombined,
  Edit3,
  FileBadge2,
  LibraryBig,
  Plus,
  ShieldEllipsis,
  Trash2,
  UserCog,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { mockMonitoringStats, mockReceptionRequests, mockResources, mockSubjects, mockTests } from "../../data/mockAcademic";
import { mockBuildings, mockNfcTags, mockRooms } from "../../data/mockCampus";
import { mockTeacherSchedules } from "../../data/mockTeachers";
import { mockAuditLogs, mockStudentProfiles, mockTeacherProfiles, mockUsers } from "../../data/mockUsers";
import { formatRole } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import type { Role } from "../../types";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Tabs } from "../../components/ui/Tabs";

interface RoleDashboardPageProps {
  role: Role;
}

interface AdminRow {
  key: string;
  title: string;
  subtitle: string;
  status: string;
}

const rolePanels: Record<Role, { title: string; description: string; highlights: string[] }> = {
  guest: {
    title: "Mehmon dashboard",
    description: "Face greeting, campus map, NFC touch va virtual reception oqimlari birlashtirilgan.",
    highlights: [
      "Kamera orqali kirish va salomlashish",
      "Xona, kafedra, o'qituvchi qidiruvi",
      "NFC va AR guide bo'yicha tezkor oqim"
    ]
  },
  student: {
    title: "Talaba kabineti",
    description: "Dars jadvali, elektron resurslar, portfolio va testlar premium student workspace'da jamlangan.",
    highlights: [
      "AI yordamida route va savol-javob",
      "Portfolio va topshiriq modullari",
      "Natijalar va reyting monitoringi"
    ]
  },
  teacher: {
    title: "O'qituvchi kabineti",
    description: "Fanlar, testlar, resurslar va xona jadvali boshqaruvi uchun operatsion panel.",
    highlights: [
      "Teaching ops va content constructor",
      "AI yordamida test savollari generatsiya qatlamlari",
      "Talabalar portfolio monitoringi"
    ]
  },
  admin: {
    title: "Admin control center",
    description: "Users, campus graph, teacher schedules, NFC, reception requests va monitoring markazi.",
    highlights: [
      "Campus graph va room inventory tahriri",
      "NFC / Telegram / AI settings konfiguratsiyasi",
      "Operational dashboards va audit loglar"
    ]
  },
  super_admin: {
    title: "Super admin governance room",
    description: "Security monitoring, RBAC, audit log, API keys va backup boshqaruv markazi.",
    highlights: [
      "Permissions va critical action governance",
      "System health va infra loglari",
      "API keys, backup va security kuzatuvi"
    ]
  }
};

const adminTabs = [
  { id: "users", label: "Users" },
  { id: "rooms", label: "Rooms" },
  { id: "buildings", label: "Buildings" },
  { id: "schedules", label: "Teacher schedules" },
  { id: "nfc", label: "NFC tags" },
  { id: "reception", label: "Reception" },
  { id: "audit", label: "Audit logs" },
  { id: "settings", label: "System settings" }
] as const;

export const RoleDashboardPage = ({ role }: RoleDashboardPageProps) => {
  const pushToast = useAppStore((state) => state.pushToast);
  const panel = rolePanels[role];
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<(typeof adminTabs)[number]["id"]>("users");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [managedRows, setManagedRows] = useState<AdminRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<AdminRow | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [page, setPage] = useState(1);

  const baseAdminRows = useMemo<AdminRow[]>(() => {
    switch (tab) {
      case "users":
        return mockUsers.map((item) => ({ key: item.id, title: item.fullName, subtitle: item.role, status: "active" }));
      case "rooms":
        return mockRooms.map((item) => ({ key: item.id, title: item.name, subtitle: item.type, status: item.floorId }));
      case "buildings":
        return mockBuildings.map((item) => ({ key: item.id, title: item.name, subtitle: item.description, status: "mapped" }));
      case "schedules":
        return mockTeacherSchedules.map((item) => ({
          key: item.id,
          title: item.subject,
          subtitle: `${item.weekday} ${item.startTime}-${item.endTime}`,
          status: item.roomId
        }));
      case "nfc":
        return mockNfcTags.map((item) => ({ key: item.id, title: item.code, subtitle: item.description, status: item.floorId }));
      case "reception":
        return mockReceptionRequests.map((item) => ({
          key: item.id,
          title: item.fullName,
          subtitle: item.type,
          status: item.status
        }));
      case "audit":
        return mockAuditLogs.map((item) => ({ key: item.id, title: item.action, subtitle: item.entity, status: item.createdAt }));
      default:
        return [
          { key: "setting-ai", title: "AI Adapter", subtitle: "assistant-mock-adapter", status: "active" },
          { key: "setting-telegram", title: "Telegram Bot", subtitle: "linked", status: "healthy" },
          { key: "setting-rbac", title: "RBAC", subtitle: "student, teacher, admin, super_admin", status: "live" }
        ];
    }
  }, [tab]);

  useEffect(() => {
    setManagedRows(baseAdminRows);
    setSelectedRow(null);
    setPage(1);
  }, [baseAdminRows]);

  const filteredAdminRows = useMemo(
    () => managedRows.filter((row) => `${row.title} ${row.subtitle} ${row.status}`.toLowerCase().includes(search.toLowerCase())),
    [managedRows, search]
  );

  const totalPages = Math.max(1, Math.ceil(filteredAdminRows.length / 8));
  const paginatedAdminRows = filteredAdminRows.slice((page - 1) * 8, page * 8);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const showAdminCenter = role === "admin" || role === "super_admin";

  const openCreateModal = () => {
    setSelectedRow(null);
    setFormTitle("");
    setFormSubtitle("");
    setFormStatus("");
    setModalOpen(true);
  };

  const openEditModal = (row: AdminRow) => {
    setSelectedRow(row);
    setFormTitle(row.title);
    setFormSubtitle(row.subtitle);
    setFormStatus(row.status);
    setModalOpen(true);
  };

  const saveAdminRow = () => {
    if (!formTitle.trim()) {
      pushToast({ title: "Sarlavha kiriting.", tone: "warning" });
      return;
    }

    const nextRow: AdminRow = {
      key: selectedRow?.key ?? `${tab}-${Date.now()}`,
      title: formTitle.trim(),
      subtitle: formSubtitle.trim() || "custom item",
      status: formStatus.trim() || "draft"
    };

    setManagedRows((state) =>
      selectedRow ? state.map((row) => (row.key === selectedRow.key ? nextRow : row)) : [nextRow, ...state]
    );
    setModalOpen(false);
    setSelectedRow(null);
    setPage(1);
    pushToast({
      title: selectedRow ? "Yozuv yangilandi." : "Yangi yozuv yaratildi.",
      tone: "success"
    });
  };

  const confirmDelete = () => {
    if (!selectedRow) {
      setDeleteOpen(false);
      return;
    }

    setManagedRows((state) => state.filter((row) => row.key !== selectedRow.key));
    setDeleteOpen(false);
    setSelectedRow(null);
    pushToast({ title: "Yozuv o'chirildi.", tone: "warning" });
  };

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
          value={String(mockUsers.filter((user) => user.role === role || showAdminCenter).length)}
          hint={`${formatRole(role)} bo'yicha tayyor demo yozuvlar`}
          icon={role === "student" ? Users : role === "teacher" ? UserCog : Users}
          accent="cyan"
        />
        <MetricCard
          label="Resources"
          value={String(mockResources.length)}
          hint="MultimediaLab kontent va elektron materiallar"
          icon={role === "student" ? BookOpenText : LibraryBig}
          accent="violet"
        />
        <MetricCard
          label="Live Ops"
          value={showAdminCenter ? mockMonitoringStats.activeUsers : role === "teacher" ? mockTests.length : mockNfcTags.length}
          hint="Real-time demo signal va integratsiya holati"
          icon={role === "guest" ? Camera : role === "teacher" ? BrainCircuit : ChartNoAxesCombined}
          accent="emerald"
        />
      </div>

      {!showAdminCenter ? (
        <div className="grid gap-6 xl:grid-cols-[1.16fr_0.84fr]">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">{panel.title}</p>
                <p className="text-sm text-white/55">Role-specific highlight bloklari va joriy operatsiyalar.</p>
              </div>
              <Badge tone="info">{formatRole(role)}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {panel.highlights.map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                  <p className="text-sm font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            {role === "guest" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-cyan-300" />
                  <p className="font-semibold text-white">Guest quick services</p>
                </div>
                {mockRooms.slice(0, 4).map((room) => (
                  <div key={room.id} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                    <p className="text-sm font-semibold text-white">{room.name}</p>
                    <p className="text-xs text-white/45">{room.description}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {role === "student" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <AlarmClockCheck className="h-5 w-5 text-cyan-300" />
                  <p className="font-semibold text-white">Student pulse</p>
                </div>
                {mockStudentProfiles.slice(0, 6).map((profile) => (
                  <div key={profile.id} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                    <p className="text-sm font-semibold text-white">{profile.group}</p>
                    <p className="text-xs text-white/45">
                      {profile.faculty} | Kurs {profile.course} | Reyting {profile.rating}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {role === "teacher" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileBadge2 className="h-5 w-5 text-cyan-300" />
                  <p className="font-semibold text-white">Teacher operations</p>
                </div>
                {mockTeacherSchedules.slice(0, 6).map((schedule) => (
                  <div key={schedule.id} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                    <p className="text-sm font-semibold text-white">{schedule.subject}</p>
                    <p className="text-xs text-white/45">
                      {schedule.weekday} | {schedule.startTime}-{schedule.endTime}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </Card>
        </div>
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">Admin control center</p>
                  <p className="text-sm text-white/55">Qidiruv, filter, pagination va action modallari bilan boshqaruv paneli.</p>
                </div>
                <Button size="sm" onClick={openCreateModal}>
                  <Plus className="h-4 w-4" />
                  Create modal
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Input className="max-w-sm" placeholder="Qidirish..." value={search} onChange={(event) => setSearch(event.target.value)} />
                <Tabs
                  items={adminTabs.map((item) => ({ id: item.id, label: item.label }))}
                  value={tab}
                  onChange={(value) => setTab(value as typeof tab)}
                />
              </div>
            </Card>

            <Card>
              <div className="mb-4 flex items-center gap-3">
                <ShieldEllipsis className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="font-['Space_Grotesk'] text-xl font-bold text-white">System snapshot</p>
                  <p className="text-sm text-white/55">Campus ops, AI settings va audit ko'rinishi.</p>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                  <p className="text-sm font-semibold text-white">Rooms mapped</p>
                  <p className="mt-2 text-3xl font-bold text-white">{mockRooms.length}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                  <p className="text-sm font-semibold text-white">NFC points linked</p>
                  <p className="mt-2 text-3xl font-bold text-white">{mockNfcTags.length}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                  <p className="text-sm font-semibold text-white">Audit events</p>
                  <p className="mt-2 text-3xl font-bold text-white">{mockAuditLogs.length}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="overflow-hidden rounded-[26px] border border-white/10">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-white/8 text-white/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Detail</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAdminRows.map((row) => (
                    <tr key={row.key} className="border-t border-white/10 bg-white/4">
                      <td className="px-4 py-3 text-white">{row.title}</td>
                      <td className="px-4 py-3 text-white/58">{row.subtitle}</td>
                      <td className="px-4 py-3">
                        <Badge tone="info">{row.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/70"
                            onClick={() => openEditModal(row)}
                            type="button"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-rose-100"
                            onClick={() => {
                              setSelectedRow(row);
                              setDeleteOpen(true);
                            }}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-white/45">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => setPage((current) => Math.max(1, current - 1))}>
                  Oldingi
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
                  Keyingi
                </Button>
              </div>
              <span>
                Page {page} / {totalPages}
              </span>
            </div>
          </Card>
        </>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Teachers"
          value={String(mockTeacherProfiles.length)}
          hint="Ask-any-teacher va office lookup uchun tayyor"
          icon={Users}
          accent="cyan"
        />
        <MetricCard
          label="Subjects"
          value={String(mockSubjects.length)}
          hint="Academic content constructor bilan bog'langan"
          icon={BookOpenText}
          accent="violet"
        />
        <MetricCard
          label="System status"
          value={`${mockMonitoringStats.systemHealth.api}%`}
          hint="API, DB, socket va AI bridge health"
          icon={ChartNoAxesCombined}
          accent="emerald"
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create / Edit modal">
        <div className="space-y-4">
          <Input placeholder="Entity title" value={formTitle} onChange={(event) => setFormTitle(event.target.value)} />
          <Input placeholder="Description" value={formSubtitle} onChange={(event) => setFormSubtitle(event.target.value)} />
          <Input placeholder="Status" value={formStatus} onChange={(event) => setFormStatus(event.target.value)} />
          <Button onClick={saveAdminRow}>Saqlash</Button>
        </div>
      </Modal>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete confirmation">
        <div className="space-y-4">
          <p className="text-sm leading-6 text-white/68">
            Bu demo modal delete confirmation oqimini ko'rsatadi. Tasdiqlanganda local holat yangilanadi va jadval darhol o'zgaradi.
          </p>
          <div className="flex gap-3">
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
