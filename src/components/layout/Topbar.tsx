import {
  Bell,
  ChevronDown,
  Command,
  Globe2,
  Menu,
  MoonStar,
  Search,
  ShieldCheck,
  SunMedium
} from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { mockNotifications } from "../../data/mockUsers";
import { formatRole } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { CommandPalette } from "../ui/CommandPalette";
import { Input } from "../ui/Input";
import { Breadcrumbs } from "./Breadcrumbs";

interface TopbarProps {
  marketing?: boolean;
}

const titleMap: Record<string, string> = {
  "/": "Future Campus Experience",
  "/dashboard": "Boshqaruv markazi",
  "/dashboard/guest": "Mehmon dashboard",
  "/dashboard/student": "Talaba kabineti",
  "/dashboard/teacher": "O'qituvchi kabineti",
  "/dashboard/admin": "Admin control center",
  "/dashboard/super-admin": "Super admin governance room",
  "/campus-map": "Interaktiv Kampus Xarita",
  "/route-guide": "Route Intelligence",
  "/assistant": "ATMURA Assistant",
  "/face-greeting": "Face Greeting Terminal",
  "/voice-emotion": "Voice Emotion Lab",
  "/avatar": "3D Avatar Hologram",
  "/teachers": "Ask-any-Teacher Finder",
  "/nfc-guide": "NFC Touch Guide",
  "/ar-guide": "AR Route Overlay",
  "/resources": "Resource Studio",
  "/tests": "Assessment Hub",
  "/portfolio": "Portfolio Space",
  "/reception": "Virtual Reception",
  "/monitoring": "Realtime Monitoring",
  "/settings": "System Settings"
};

export const Topbar = ({ marketing = false }: TopbarProps) => {
  const currentRole = useAppStore((state) => state.currentRole);
  const currentUser = useAppStore((state) => state.currentUser);
  const language = useAppStore((state) => state.language);
  const theme = useAppStore((state) => state.theme);
  const setCurrentRole = useAppStore((state) => state.setCurrentRole);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const toggleSidebarMobile = useAppStore((state) => state.toggleSidebarMobile);
  const pushToast = useAppStore((state) => state.pushToast);
  const location = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const title = useMemo(() => {
    if (marketing) {
      return "ATMURA - Intelligent Campus AI Assistant Platform";
    }

    return titleMap[location.pathname] ?? location.pathname.split("/").filter(Boolean).join(" / ");
  }, [location.pathname, marketing]);

  return (
    <>
      <header
        className={
          marketing
            ? "sticky top-0 z-40 flex items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-[rgba(6,20,38,0.62)] px-5 py-4 shadow-glass backdrop-blur-2xl"
            : "sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-[rgba(6,20,38,0.62)] px-5 py-4 shadow-glass backdrop-blur-2xl"
        }
      >
        <div className="flex min-w-0 items-center gap-3">
          {!marketing ? (
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/75 transition hover:bg-white/12 xl:hidden"
              onClick={toggleSidebarMobile}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}

          <div className="min-w-0">
            {!marketing ? <Breadcrumbs /> : <p className="text-xs uppercase tracking-[0.34em] text-cyan-200">Intelligent campus platform</p>}
            <h1 className="truncate font-['Space_Grotesk'] text-xl font-bold text-white md:text-2xl">{title}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!marketing ? (
            <div className="hidden min-w-[260px] items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-3 py-2.5 lg:flex">
              <Search className="h-4 w-4 text-white/45" />
              <Input
                className="border-0 bg-transparent p-0 text-sm text-white placeholder:text-white/40 focus:bg-transparent"
                placeholder="Kampus, xona, o'qituvchi yoki modul qidiring..."
              />
            </div>
          ) : null}

          <Button size="sm" variant="secondary" onClick={() => setPaletteOpen(true)}>
            <Command className="h-4 w-4" />
            Command
            <span className="rounded-full border border-white/10 bg-white/8 px-2 py-0.5 text-[10px] text-white/60">Ctrl K</span>
          </Button>

          {!marketing ? (
            <Badge tone="success">
              <ShieldCheck className="h-3.5 w-3.5" />
              System healthy
            </Badge>
          ) : null}

          <button
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-3 text-white/75 transition hover:bg-white/12"
            onClick={() => {
              const nextLanguage = language === "uz" ? "en" : "uz";
              setLanguage(nextLanguage);
              pushToast({
                title: nextLanguage === "uz" ? "Interfeys tili o'zbek tiliga o'tdi." : "Interface language switched to English.",
                tone: "info"
              });
            }}
            type="button"
          >
            <Globe2 className="mr-2 h-4 w-4" />
            {language.toUpperCase()}
          </button>

          <button
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-3 text-white/75 transition hover:bg-white/12"
            onClick={() => {
              toggleTheme();
              pushToast({
                title: theme === "aurora" ? "Yorug' ko'rinish faollashtirildi." : "Aurora premium tema faollashtirildi.",
                tone: "success"
              });
            }}
            type="button"
          >
            {theme === "aurora" ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
          </button>

          {!marketing ? (
            <div className="relative">
              <button
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-3 text-white/75 transition hover:bg-white/12"
                onClick={() => setNotificationsOpen((value) => !value)}
                type="button"
              >
                <Bell className="h-4 w-4" />
              </button>
              {notificationsOpen ? (
                <div className="absolute right-0 top-14 z-40 w-[320px] rounded-[24px] border border-white/10 bg-[rgba(6,20,38,0.94)] p-4 shadow-glass">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-semibold text-white">Bildirishnomalar</p>
                    <Badge tone="info">{mockNotifications.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {mockNotifications.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-white/6 p-3">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-white/55">{item.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {!marketing ? (
            <div className="relative">
              <button
                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-left text-white/80 transition hover:bg-white/12"
                onClick={() => setProfileOpen((value) => !value)}
                type="button"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(0,212,255,0.92),rgba(124,58,237,0.88))] text-sm font-bold text-white">
                  {currentUser.fullName
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div className="hidden min-w-0 md:block">
                  <p className="truncate text-sm font-semibold text-white">{currentUser.fullName}</p>
                  <p className="text-xs text-white/45">{formatRole(currentRole)}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-white/45" />
              </button>
              {profileOpen ? (
                <div className="absolute right-0 top-16 z-40 w-[260px] rounded-[24px] border border-white/10 bg-[rgba(6,20,38,0.94)] p-4 shadow-glass">
                  <label className="mb-2 block text-xs uppercase tracking-[0.26em] text-white/45">Demo role</label>
                  <select
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none"
                    value={currentRole}
                    onChange={(event) => {
                      setCurrentRole(event.target.value as typeof currentRole);
                      pushToast({ title: `Rol ${formatRole(event.target.value as typeof currentRole)} ga almashtirildi.`, tone: "info" });
                    }}
                  >
                    {["guest", "student", "teacher", "admin", "super_admin"].map((role) => (
                      <option key={role} value={role}>
                        {formatRole(role as typeof currentRole)}
                      </option>
                    ))}
                  </select>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-3">
                    <p className="text-sm font-semibold text-white">Status badge</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Siz premium demo rejimidasiz. Har bir dashboard role bo'yicha adaptiv ko'rinishda ishlaydi.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onOpenRequest={() => setPaletteOpen(true)} />
    </>
  );
};
