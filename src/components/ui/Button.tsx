import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-cyan-500 text-white shadow-panel hover:bg-cyan-400 disabled:bg-cyan-300",
  secondary:
    "border border-slate-200 bg-white/80 text-navy-900 hover:border-cyan-300 hover:bg-cyan-50",
  ghost: "bg-transparent text-navy-900 hover:bg-white/70",
  danger: "bg-rose-500 text-white hover:bg-rose-400"
};

export const Button = ({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed",
      variantStyles[variant],
      fullWidth && "w-full",
      className
    )}
    {...props}
  >
    {children}
  </button>
);
