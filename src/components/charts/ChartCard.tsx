import type { PropsWithChildren, ReactNode } from "react";
import { Card } from "../ui/Card";

interface ChartCardProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export const ChartCard = ({ title, description, action, children }: PropsWithChildren<ChartCardProps>) => (
  <Card className="h-full">
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <p className="font-['Space_Grotesk'] text-xl font-bold text-white">{title}</p>
        <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
      </div>
      {action}
    </div>
    <div className="h-[260px]">{children}</div>
  </Card>
);
