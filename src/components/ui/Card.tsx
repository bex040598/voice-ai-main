import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export const Card = ({
  children,
  className,
  padded = true,
  ...props
}: PropsWithChildren<CardProps>) => (
  <div
    className={cn(
      "glass-panel rounded-[28px] border border-white/60 shadow-glass",
      padded && "p-5",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
