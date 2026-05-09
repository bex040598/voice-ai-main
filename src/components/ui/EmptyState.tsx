import type { PropsWithChildren } from "react";
import { Card } from "./Card";

export const EmptyState = ({ children }: PropsWithChildren) => (
  <Card className="border-dashed border-slate-200 text-center text-sm text-slate-500">
    {children}
  </Card>
);
