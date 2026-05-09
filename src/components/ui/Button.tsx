import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "border border-cyan-400/60 bg-[linear-gradient(135deg,rgba(0,212,255,0.96),rgba(124,58,237,0.82))] text-white shadow-glow hover:-translate-y-0.5 hover:brightness-110 disabled:translate-y-0 disabled:opacity-60",
  secondary:
    "border border-white/12 bg-white/8 text-white hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-white/12",
  ghost: "bg-transparent text-[color:var(--atmura-text)] hover:bg-white/8",
  danger: "border border-rose-400/50 bg-rose-500/80 text-white hover:-translate-y-0.5 hover:bg-rose-500"
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-3.5 text-base"
};

export const Button = ({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  size = "md",
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    )}
    {...props}
  >
    {children}
  </button>
);
