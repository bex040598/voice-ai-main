import type { PropsWithChildren } from "react";
import { Card } from "./Card";

export const EmptyState = ({ children }: PropsWithChildren) => (
  <Card className="border-dashed border-white/12 text-center text-sm text-white/55">
    {children}
  </Card>
);
