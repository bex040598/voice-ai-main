import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "w-full rounded-2xl border border-white/12 bg-white/7 px-4 py-3 text-sm text-[color:var(--atmura-text)] outline-none ring-0 transition placeholder:text-white/35 focus:border-cyan-400/55 focus:bg-white/10",
      className
    )}
    {...props}
  />
);

export const Textarea = ({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      "min-h-28 w-full rounded-2xl border border-white/12 bg-white/7 px-4 py-3 text-sm text-[color:var(--atmura-text)] outline-none transition placeholder:text-white/35 focus:border-cyan-400/55 focus:bg-white/10",
      className
    )}
    {...props}
  />
);
