import {
  Bot,
  Camera,
  ChevronLeft,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Map,
  Monitor,
  Radio,
  Route,
  ScanLine,
  ScrollText,
  Settings,
  Shield,
  Sparkles,
  UserRoundSearch
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { mockNotifications } from "../../data/mockUsers";
import { cn, formatRole } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { Badge } from "../ui/Badge";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/campus-map", label: "Kampus xarita", icon: Map },
  { to: "/route-guide", label: "Route Guide", icon: Route },
  { to: "/face-greeting", label: "Face Greeting", icon: Camera },
  { to: "/voice-emotion", label: "Voice Emotion", icon: Radio },
  { to: "/avatar", label: "3D Avatar", icon: Sparkles },
  { to: "/teachers", label: "Ask Teacher", icon: UserRoundSearch },
  { to: "/nfc-guide", label: "NFC Guide", icon: ScanLine },
  { to: "/ar-guide", label: "AR Guide", icon: Compass },
  { to: "/resources", label: "Resources", icon: GraduationCap },
  { to: "/tests", label: "Tests", icon: Shield },
  { to: "/portfolio", label: "Portfolio", icon: Bot },
  { to: "/reception", label: "Reception", icon: ScrollText },
  { to: "/monitoring", label: "Monitoring", icon: Monitor },
  { to: "/dashboard/admin", label: "Admin Panel", icon: Shield },
  { to: "/settings", label: "Settings", icon: Settings }
];

interface SidebarProps {
  marketing?: boolean;
  mobile?: boolean;
}

export const Sidebar = ({ marketing = false, mobile = false }: SidebarProps) => {
  const currentUser = useAppStore((state) => state.currentUser);
  const currentRole = useAppStore((state) => state.currentRole);
  const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  if (marketing) {
    return null;
  }

  return (
    <aside
      className={cn(
        "glass-panel h-[calc(100vh-2rem)] shrink-0 flex-col rounded-[32px] border border-white/10 p-4 shadow-glass",
        mobile ? "flex w-[296px]" : "hidden xl:flex",
        sidebarCollapsed ? "w-[104px]" : "w-[296px]"
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-3 px-2">
        <div className={cn("min-w-0", sidebarCollapsed && "hidden")}>
          <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">ATMURA</p>
          <p className="text-sm text-white/55">Intelligent Campus AI Assistant</p>
        </div>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/70 transition hover:bg-white/12"
          onClick={toggleSidebar}
          type="button"
        >
          <ChevronLeft className={cn("h-5 w-5 transition", sidebarCollapsed && "rotate-180")} />
        </button>
      </div>

      <div className="mb-5 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,212,255,0.18),rgba(124,58,237,0.18))] p-4">
        <p className={cn("text-xs uppercase tracking-[0.28em] text-cyan-200", sidebarCollapsed && "hidden")}>Campus Core</p>
        <p className={cn("mt-2 text-sm font-semibold leading-6 text-white/85", sidebarCollapsed && "hidden")}>
          Real-time navigatsiya, AI assistant va akademik operatsiyalar yagona markazda.
        </p>
        {sidebarCollapsed ? <Bot className="mx-auto h-6 w-6 text-cyan-200" /> : null}
      </div>

      <nav className="atmura-scrollbar flex-1 space-y-2 overflow-y-auto pr-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white/62 transition",
                isActive
                  ? "bg-[linear-gradient(135deg,rgba(0,212,255,0.22),rgba(124,58,237,0.22))] text-white shadow-glow"
                  : "hover:bg-white/8 hover:text-white"
              )
            }
            to={link.to}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
              <link.icon className="h-4 w-4" />
            </div>
            <span className={cn("truncate", sidebarCollapsed && "hidden")}>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-5 rounded-[28px] border border-white/10 bg-white/6 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(0,212,255,0.95),rgba(124,58,237,0.88))] text-sm font-bold text-white">
            {currentUser.fullName
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")}
          </div>
          <div className={cn("min-w-0", sidebarCollapsed && "hidden")}>
            <p className="truncate text-sm font-semibold text-white">{currentUser.fullName}</p>
            <p className="text-xs text-white/45">{formatRole(currentRole)}</p>
          </div>
        </div>
        <div className={cn("mt-4 flex items-center justify-between", sidebarCollapsed && "hidden")}>
          <Badge tone="info">{mockNotifications.filter((item) => !item.isRead).length} yangi</Badge>
          <span className="text-xs text-white/45">Live demo</span>
        </div>
      </div>
    </aside>
  );
};
