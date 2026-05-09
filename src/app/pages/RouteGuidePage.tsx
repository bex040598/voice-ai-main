import { Compass, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { RouteInstructions } from "../../components/map/RouteInstructions";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { findRouteFromLocation } from "../../features/routing/routing.service";
import { useAppStore } from "../../store/useAppStore";

export const RouteGuidePage = () => {
  const activeRoute = useAppStore((state) => state.activeRoute);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const [loading, setLoading] = useState(false);

  const recalculate = async () => {
    setLoading(true);
    const route = await findRouteFromLocation({
      currentPosition: { buildingId: "building-a", floorId: "floor-a1", x: 145, y: 334, z: 0 },
      toRoomId: "room-215",
      algorithm: "astar"
    });
    setActiveRoute(route);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Route guide"
        title="Bosqichma-bosqich marshrut ko'rsatma"
        description="Joriy lokatsiya yaqin tugunga snap qilinadi, keyin marshrut qayta hisoblanib, foydalanuvchiga qisqa va tushunarli navigatsiya ko'rsatmalari chiqariladi."
        action={
          <Button onClick={() => void recalculate()}>
            <Compass className="h-4 w-4" />
            {loading ? "Qayta hisoblanmoqda..." : "Route recalculation"}
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-cyan-600" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Demo current location</p>
              <p className="text-sm text-slate-500">Asosiy kirish, bino A, 1-qavat</p>
            </div>
          </div>
          <div className="space-y-3 text-sm leading-7 text-slate-600">
            <p>1. Joriy nuqta campus graph tuguniga snap qilinadi.</p>
            <p>2. Maqsad xona yoki o'qituvchi kabinetidan target node aniqlanadi.</p>
            <p>3. A* yoki Dijkstra yordamida multi-floor path topiladi.</p>
            <p>4. Instructions generator koridor, zina va lift segmentlari bo'yicha matnli yo'l yozyapti.</p>
          </div>
        </Card>
        <RouteInstructions route={activeRoute} />
      </div>
    </div>
  );
};
