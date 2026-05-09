import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-navy-900 outline-none ring-0 transition focus:border-cyan-400 focus:bg-white",
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
      "min-h-28 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-navy-900 outline-none transition focus:border-cyan-400 focus:bg-white",
      className
    )}
    {...props}
  />
);
