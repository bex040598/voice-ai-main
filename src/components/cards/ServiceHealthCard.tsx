import { Activity, Database, RadioTower, ServerCog } from "lucide-react";
import type { SystemService } from "../../types";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

const toneMap = {
  online: "success",
  active: "info",
  demo: "violet",
  ready: "info",
  warning: "warning",
  offline: "warning"
} as const;

const iconMap = [Activity, RadioTower, ServerCog, Database];

interface ServiceHealthCardProps {
  services: SystemService[];
}

export const ServiceHealthCard = ({ services }: ServiceHealthCardProps) => (
  <Card className="h-full">
    <div className="mb-5 flex items-center gap-3">
      <ServerCog className="h-5 w-5 text-cyan-300" />
      <div>
        <p className="font-['Space_Grotesk'] text-xl font-bold text-white">System health</p>
        <p className="text-sm text-white/60">AI, voice, NFC, Telegram va infratuzilma holati.</p>
      </div>
    </div>
    <div className="space-y-3">
      {services.map((service, index) => {
        const Icon = iconMap[index % iconMap.length];
        return (
          <div key={service.id} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-2.5">
                  <Icon className="h-4 w-4 text-cyan-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{service.name}</p>
                  <p className="text-xs text-white/45">{service.description}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge tone={toneMap[service.status]}>{service.status}</Badge>
                <p className="mt-2 text-xs text-white/45">{service.latency}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </Card>
);
