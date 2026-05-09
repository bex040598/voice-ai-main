import type { PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  tone?: "default" | "success" | "warning" | "info" | "violet";
  className?: string;
}

const toneStyles = {
  default: "border border-white/12 bg-white/8 text-[color:var(--atmura-text)]",
  success: "border border-emerald-400/25 bg-emerald-500/14 text-emerald-200",
  warning: "border border-amber-300/25 bg-amber-400/14 text-amber-100",
  info: "border border-cyan-400/25 bg-cyan-500/14 text-cyan-100",
  violet: "border border-violet-400/25 bg-violet-500/14 text-violet-100"
};

export const Badge = ({
  children,
  tone = "default",
  className
}: PropsWithChildren<BadgeProps>) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
      toneStyles[tone],
      className
    )}
  >
    {children}
  </span>
);
