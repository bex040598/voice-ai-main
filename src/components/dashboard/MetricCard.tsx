import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";
import { AnimatedCounter } from "../ui/AnimatedCounter";

interface MetricCardProps {
  label: string;
  value: string | number;
  hint: string;
  icon: LucideIcon;
  accent?: "cyan" | "navy" | "emerald" | "violet" | "amber";
  trend?: number;
  series?: number[];
}

const accentStyles = {
  cyan: "from-cyan-500/18 to-cyan-400/4",
  navy: "from-navy-900/18 to-white/4",
  emerald: "from-emerald-500/18 to-emerald-300/4",
  violet: "from-violet-500/18 to-violet-300/4",
  amber: "from-amber-500/18 to-amber-300/4"
};

const toneMap = {
  cyan: "text-cyan-200",
  navy: "text-white",
  emerald: "text-emerald-200",
  violet: "text-violet-200",
  amber: "text-amber-100"
};

export const MetricCard = ({
  label,
  value,
  hint,
  icon: Icon,
  accent = "cyan",
  trend = 8.2,
  series = [22, 30, 36, 41, 48, 44, 52]
}: MetricCardProps) => {
  const gradientId = useId().replace(/:/g, "-");

  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-white/10 via-white/6 to-transparent",
        "before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent",
        `after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-br ${accentStyles[accent]} after:opacity-90`
      )}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">{label}</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {typeof value === "number" ? <AnimatedCounter value={value} /> : value}
          </p>
          <p className="mt-2 text-sm text-white/68">{hint}</p>
        </div>
        <div className="rounded-2xl border border-white/12 bg-white/12 p-3 shadow-panel backdrop-blur-md">
          <Icon className={cn("h-5 w-5", toneMap[accent])} />
        </div>
      </div>
      <div className="relative mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
          <ArrowUpRight className="h-3.5 w-3.5 text-cyan-300" />
          {trend > 0 ? `+${trend.toFixed(1)}%` : `${trend.toFixed(1)}%`} trend
        </div>
        <svg className="h-10 w-24" viewBox="0 0 96 40" fill="none">
          <polyline
            points={series.map((item, index) => `${index * 16},${38 - item * 0.5}`).join(" ")}
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="96" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </Card>
  );
};
