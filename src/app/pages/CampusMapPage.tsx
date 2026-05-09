import { Send, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { CampusMapCanvas } from "../../components/map/CampusMapCanvas";
import { RouteInstructions } from "../../components/map/RouteInstructions";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Tabs } from "../../components/ui/Tabs";
import { mockFloors, mockRooms } from "../../data/mockCampus";
import { searchRooms } from "../../features/campus/campus.service";
import { findRoute } from "../../features/routing/routing.service";
import { sendRouteToTelegram } from "../../features/telegram/telegram.service";
import { useAppStore } from "../../store/useAppStore";
import type { Room } from "../../types";

export const CampusMapPage = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  const activeRoute = useAppStore((state) => state.activeRoute);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const pushToast = useAppStore((state) => state.pushToast);
  const [floorId, setFloorId] = useState("floor-a1");
  const [query, setQuery] = useState("215");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [algorithm, setAlgorithm] = useState<"dijkstra" | "astar">("astar");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void searchRooms("215").then((rooms) => {
      const first = rooms[0] ?? null;
      setSelectedRoom(first);
      if (first) {
        setFloorId(first.floorId);
      }
    });
  }, []);

  const handleSearch = async () => {
    const rooms = await searchRooms(query);
    const first = rooms[0] ?? null;

    if (!first) {
      pushToast({ title: "Xona topilmadi.", tone: "warning" });
      return;
    }

    setSelectedRoom(first);
    setFloorId(first.floorId);
  };

  const handleRoute = async () => {
    if (!selectedRoom) {
      return;
    }

    setLoading(true);
    try {
      const route = await findRoute({
        fromNodeId: "entrance-1",
        toRoomId: selectedRoom.id,
        algorithm
      });
      setActiveRoute(route);
      pushToast({ title: `${selectedRoom.name} uchun marshrut topildi.`, tone: "success" });
    } catch (error) {
      pushToast({
        title: error instanceof Error ? error.message : "Route hisoblanmadi.",
        tone: "warning"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendRoute = async () => {
    if (!activeRoute || !currentUser.telegramId) {
      pushToast({ title: "Telegram ID yoki route mavjud emas.", tone: "warning" });
      return;
    }

    await sendRouteToTelegram({ telegramId: currentUser.telegramId, route: activeRoute });
    pushToast({ title: "Route Telegramga yuborildi.", tone: "success" });
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Campus map"
        title="3D kampus xaritasi va real-time yo'l ko'rsatish"
        description="Dijkstra yoki A* algoritmi yordamida foydalanuvchining joriy nuqtasidan xona, dekanat, kutubxona yoki o'qituvchi kabinetigacha multi-floor marshrut hisoblanadi."
        action={
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => void sendRoute()}>
              <Send className="h-4 w-4" />
              Telegramga yuborish
            </Button>
          </div>
        }
      />

      <Card>
        <div className="grid gap-3 lg:grid-cols-[1fr_240px_220px_180px]">
          <Input
            placeholder="Masalan: 215, dekanat, kutubxona..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button variant="secondary" onClick={() => void handleSearch()}>
            Xona topish
          </Button>
          <Tabs
            items={[
              { id: "astar", label: "A*" },
              { id: "dijkstra", label: "Dijkstra" }
            ]}
            value={algorithm}
            onChange={(value) => setAlgorithm(value)}
          />
          <Button disabled={loading} onClick={() => void handleRoute()}>
            <Waypoints className="h-4 w-4" />
            {loading ? "Hisoblanmoqda..." : "Route topish"}
          </Button>
        </div>
      </Card>

      <Tabs
        items={mockFloors.map((floor) => ({
          id: floor.id,
          label: `${floor.buildingId.replace("building-", "Bino ").toUpperCase()} / ${floor.level}-qavat`
        }))}
        value={floorId}
        onChange={setFloorId}
      />

      <div className="grid gap-6 2xl:grid-cols-[1.5fr_0.8fr]">
        <CampusMapCanvas
          floorId={floorId}
          route={activeRoute}
          selectedRoomId={selectedRoom?.id}
          onSelectRoom={(roomId) => {
            setSelectedRoom(mockRooms.find((room) => room.id === roomId) ?? null);
          }}
        />
        <RouteInstructions route={activeRoute} />
      </div>
    </div>
  );
};
