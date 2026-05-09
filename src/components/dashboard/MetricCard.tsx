import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  accent?: "cyan" | "navy" | "emerald";
}

const accentStyles = {
  cyan: "from-cyan-500/15 to-cyan-100",
  navy: "from-navy-900/15 to-slate-100",
  emerald: "from-emerald-500/15 to-emerald-100"
};

export const MetricCard = ({
  label,
  value,
  hint,
  icon: Icon,
  accent = "cyan"
}: MetricCardProps) => (
  <Card className={cn("relative overflow-hidden", `bg-gradient-to-br ${accentStyles[accent]}`)}>
    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/50 blur-2xl" />
    <div className="relative flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <p className="mt-3 text-3xl font-bold text-navy-900">{value}</p>
        <p className="mt-2 text-sm text-slate-600">{hint}</p>
      </div>
      <div className="rounded-2xl bg-white/90 p-3 shadow-panel">
        <Icon className="h-5 w-5 text-cyan-600" />
      </div>
    </div>
    <div className="relative mt-5 flex items-center gap-2 text-xs font-semibold text-slate-500">
      <ArrowUpRight className="h-3.5 w-3.5 text-cyan-600" />
      Real-time yangilanadigan modul
    </div>
  </Card>
);
