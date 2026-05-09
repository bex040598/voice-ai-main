import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export const PageIntro = ({ eyebrow, title, description, action }: PageIntroProps) => (
  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-700">{eyebrow}</p>
      <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-navy-900">{title}</h2>
      <p className="mt-3 text-balance text-sm leading-7 text-slate-600">{description}</p>
    </div>
    {action}
  </div>
);
