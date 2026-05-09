import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export const PageIntro = ({ eyebrow, title, description, action }: PageIntroProps) => (
  <div className="mb-6 flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-panel backdrop-blur-xl md:flex-row md:items-end md:justify-between">
    <div className="max-w-4xl">
      <p className="text-xs uppercase tracking-[0.34em] text-cyan-200">{eyebrow}</p>
      <h2 className="mt-3 font-['Space_Grotesk'] text-3xl font-bold text-white md:text-4xl">{title}</h2>
      <p className="mt-3 text-balance text-sm leading-7 text-white/68 md:text-base">{description}</p>
    </div>
    {action}
  </div>
);
