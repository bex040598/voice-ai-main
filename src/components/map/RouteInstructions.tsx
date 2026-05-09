import { ArrowRight, Clock3, Route } from "lucide-react";
import type { RouteResponse } from "../../types";
import { Card } from "../ui/Card";

export const RouteInstructions = ({ route }: { route: RouteResponse | null }) => (
  <Card>
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Bosqichma-bosqich ko'rsatma</p>
        <p className="text-sm text-white/55">Real-time campus routing va multi-floor support</p>
      </div>
      {route ? (
        <div className="text-right">
          <p className="text-sm font-semibold text-cyan-200">{route.distance} m</p>
          <p className="text-xs text-white/45">{route.estimatedTime}</p>
        </div>
      ) : null}
    </div>

    {route ? (
      <div className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-[24px] border border-cyan-400/18 bg-cyan-500/10 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
              <Route className="h-4 w-4" />
              Distance
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{route.distance} m</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
              <Clock3 className="h-4 w-4" />
              Estimated time
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{route.estimatedTime}</p>
          </div>
        </div>
        {route.steps.map((step, index) => (
          <div key={`${step}-${index}`} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(0,212,255,0.92),rgba(124,58,237,0.88))] text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{step}</p>
                <p className="mt-1 text-xs text-white/45">Koridor, zina va lift o'tishlari bosqichma-bosqich ko'rsatildi.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-cyan-300" />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm leading-6 text-white/55">
        Route hali hisoblanmadi. Xona yoki o'qituvchini tanlaganingizdan keyin marshrut shu yerda chiqadi.
      </p>
    )}
  </Card>
);
