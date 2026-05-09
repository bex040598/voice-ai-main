import type { PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  tone?: "default" | "success" | "warning" | "info";
  className?: string;
}

const toneStyles = {
  default: "bg-navy-900/6 text-navy-900",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-cyan-100 text-cyan-700"
};

export const Badge = ({
  children,
  tone = "default",
  className
}: PropsWithChildren<BadgeProps>) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
      toneStyles[tone],
      className
    )}
  >
    {children}
  </span>
);
