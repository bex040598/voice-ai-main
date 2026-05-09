import {
  BellRing,
  Bot,
  Camera,
  MessageCircleMore,
  Route,
  ScanLine,
  Send,
  ShieldCheck,
  UserRoundSearch
} from "lucide-react";
import type { ActivityEvent, ActivityType } from "../../types";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

const iconMap: Record<ActivityType, typeof Camera> = {
  face: Camera,
  route: Route,
  nfc: ScanLine,
  voice: MessageCircleMore,
  teacher: UserRoundSearch,
  telegram: Send,
  reception: BellRing,
  system: ShieldCheck
};

const toneMap: Record<ActivityType, "info" | "success" | "warning" | "violet"> = {
  face: "info",
  route: "violet",
  nfc: "success",
  voice: "warning",
  teacher: "violet",
  telegram: "info",
  reception: "warning",
  system: "success"
};

interface ActivityTimelineProps {
  title?: string;
  events: ActivityEvent[];
}

export const ActivityTimeline = ({ title = "Live activity feed", events }: ActivityTimelineProps) => (
  <Card className="h-full">
    <div className="mb-5 flex items-center gap-3">
      <Bot className="h-5 w-5 text-cyan-300" />
      <div>
        <p className="font-['Space_Grotesk'] text-xl font-bold text-white">{title}</p>
        <p className="text-sm text-white/60">Platforma bo'ylab so'nggi jonli hodisalar.</p>
      </div>
    </div>
    <div className="atmura-scrollbar max-h-[420px] space-y-4 overflow-y-auto pr-2">
      {events.map((event) => {
        const Icon = iconMap[event.type];
        return (
          <div key={event.id} className="relative pl-10">
            <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
              <Icon className="h-4 w-4 text-cyan-200" />
            </div>
            <div className="absolute left-4 top-8 h-[calc(100%+0.5rem)] w-px bg-white/10 last:hidden" />
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <div className="flex items-center gap-2">
                  {event.badge ? <Badge tone={toneMap[event.type]}>{event.badge}</Badge> : null}
                  <span className="text-xs text-white/45">{event.timestamp}</span>
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/60">{event.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </Card>
);
