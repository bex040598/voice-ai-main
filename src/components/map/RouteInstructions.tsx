import type { RouteResponse } from "../../types";
import { Card } from "../ui/Card";
import { Stepper } from "../ui/Stepper";

export const RouteInstructions = ({ route }: { route: RouteResponse | null }) => (
  <Card>
    <div className="mb-4 flex items-end justify-between">
      <div>
        <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Bosqichma-bosqich ko'rsatma</p>
        <p className="text-sm text-slate-500">Real-time campus routing va multi-floor support</p>
      </div>
      {route ? (
        <div className="text-right">
          <p className="text-sm font-semibold text-cyan-700">{route.distance} m</p>
          <p className="text-xs text-slate-500">{route.estimatedTime}</p>
        </div>
      ) : null}
    </div>

    {route ? (
      <Stepper steps={route.steps} />
    ) : (
      <p className="text-sm leading-6 text-slate-500">
        Route hali hisoblanmadi. Xona yoki o'qituvchini tanlaganingizdan keyin marshrut shu yerda chiqadi.
      </p>
    )}
  </Card>
);
