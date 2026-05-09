import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  strong?: boolean;
}

export const Card = ({
  children,
  className,
  padded = true,
  strong = false,
  ...props
}: PropsWithChildren<CardProps>) => (
  <div
    className={cn(
      strong ? "glass-panel-strong" : "glass-panel",
      "atmura-glow-border relative overflow-hidden rounded-[28px] border border-white/10 shadow-glass",
      padded && "p-5",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
