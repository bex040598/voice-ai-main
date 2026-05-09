import { Bell, Command, Globe2, Search } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import { formatRole } from "../../lib/utils";
import { mockUsers } from "../../data/mockUsers";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { CommandPalette } from "../ui/CommandPalette";

export const Topbar = () => {
  const currentRole = useAppStore((state) => state.currentRole);
  const setCurrentRole = useAppStore((state) => state.setCurrentRole);
  const location = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <header className="glass-panel sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/60 px-5 py-4 shadow-glass">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">ATMURA platform</p>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-navy-900">
            {location.pathname === "/" ? "Campus navigation" : location.pathname.replaceAll("/", " / ")}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" onClick={() => setPaletteOpen(true)}>
            <Search className="h-4 w-4" />
            Qidirish
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">Ctrl K</span>
          </Button>

          <div className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
            <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-slate-400">Role</label>
            <select
              className="bg-transparent text-sm font-semibold text-navy-900 outline-none"
              value={currentRole}
              onChange={(event) => setCurrentRole(event.target.value as typeof currentRole)}
            >
              {["guest", "student", "teacher", "admin", "super_admin"].map((role) => (
                <option key={role} value={role}>
                  {formatRole(role as typeof currentRole)}
                </option>
              ))}
            </select>
          </div>

          <Badge tone="success">
            <Globe2 className="mr-1 h-3.5 w-3.5" />
            Uzbek UI
          </Badge>
          <Badge tone="info">
            <Bell className="mr-1 h-3.5 w-3.5" />
            3 yangi event
          </Badge>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};
