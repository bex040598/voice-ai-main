import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  guest: "Mehmon",
  student: "Talaba",
  teacher: "O'qituvchi",
  admin: "Admin",
  "super-admin": "Super Admin",
  "campus-map": "Kampus xarita",
  "route-guide": "Route Guide",
  assistant: "AI Assistant",
  "face-greeting": "Face Greeting",
  "voice-emotion": "Voice Emotion",
  avatar: "3D Avatar",
  teachers: "Ask Teacher",
  "nfc-guide": "NFC Guide",
  "ar-guide": "AR Guide",
  resources: "Resources",
  tests: "Tests",
  portfolio: "Portfolio",
  reception: "Reception",
  monitoring: "Monitoring",
  settings: "Settings",
  login: "Login",
  register: "Register"
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-white/45">
      <Link className="transition hover:text-cyan-200" to="/">
        ATMURA
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-white/25" />
            {isLast ? (
              <span className="text-white/72">{labelMap[segment] ?? segment}</span>
            ) : (
              <Link className="transition hover:text-cyan-200" to={href}>
                {labelMap[segment] ?? segment}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};
