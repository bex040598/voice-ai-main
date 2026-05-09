import {
  Bot,
  Camera,
  GraduationCap,
  LayoutDashboard,
  Map,
  Monitor,
  Radio,
  ScrollText,
  Settings,
  UserRoundSearch
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/Badge";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/campus-map", label: "Campus map", icon: Map },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/face-greeting", label: "Face greeting", icon: Camera },
  { to: "/voice-emotion", label: "Voice emotion", icon: Radio },
  { to: "/teachers", label: "Ask any teacher", icon: UserRoundSearch },
  { to: "/resources", label: "Resources", icon: GraduationCap },
  { to: "/reception", label: "Reception", icon: ScrollText },
  { to: "/monitoring", label: "Monitoring", icon: Monitor },
  { to: "/settings", label: "Settings", icon: Settings }
];

export const Sidebar = () => (
  <aside className="glass-panel hidden h-[calc(100vh-2rem)] w-[280px] flex-col rounded-[32px] border border-white/60 p-6 shadow-glass xl:flex">
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p className="font-['Space_Grotesk'] text-2xl font-bold text-navy-900">ATMURA</p>
        <p className="text-sm text-slate-500">AI Campus Navigation</p>
      </div>
      <Badge tone="info">Live</Badge>
    </div>

    <div className="mb-6 rounded-[28px] bg-navy-900 px-5 py-5 text-white">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Campus Core</p>
      <p className="mt-2 text-lg font-semibold">Guest, student, teacher va admin uchun yagona operatsion panel.</p>
    </div>

    <nav className="flex-1 space-y-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition",
              isActive ? "bg-cyan-50 text-navy-900 shadow-panel" : "hover:bg-white/70 hover:text-navy-900"
            )
          }
          to={link.to}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </NavLink>
      ))}
    </nav>

    <div className="rounded-[28px] border border-dashed border-cyan-200 bg-cyan-50/80 p-4">
      <p className="text-sm font-semibold text-navy-900">NFC touch-to-guide faol</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">
        8 ta demo teg, AR overlay sahifasi va Telegramga route yuborish tayyor.
      </p>
    </div>
  </aside>
);
