import { Download, Route as RouteIcon, Send, ShieldCheck, Sparkles, UserRoundSearch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { CampusMapCanvas } from "../../components/map/CampusMapCanvas";
import { RouteInstructions } from "../../components/map/RouteInstructions";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Tabs } from "../../components/ui/Tabs";
import { mockBuildings, mockFloors, mockRooms } from "../../data/mockCampus";
import { mockTeacherDirectory, mockTeacherSchedules } from "../../data/mockTeachers";
import { searchRooms } from "../../features/campus/campus.service";
import { findRoute } from "../../features/routing/routing.service";
import { sendRouteToTelegram } from "../../features/telegram/telegram.service";
import { fuzzySearch } from "../../lib/algorithms/fuzzySearch";
import { useAppStore } from "../../store/useAppStore";
import type { Room } from "../../types";

export const CampusMapPage = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  const activeRoute = useAppStore((state) => state.activeRoute);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const setAvatarMode = useAppStore((state) => state.setAvatarMode);
  const pushToast = useAppStore((state) => state.pushToast);
  const [buildingId, setBuildingId] = useState("building-a");
  const [floorId, setFloorId] = useState("floor-a1");
  const [roomQuery, setRoomQuery] = useState("215");
  const [teacherQuery, setTeacherQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [algorithm, setAlgorithm] = useState<"dijkstra" | "astar">("astar");
  const [showNfc, setShowNfc] = useState(true);
  const [showVertical, setShowVertical] = useState(true);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialRoom = mockRooms.find((room) => room.id === "room-215") ?? mockRooms[0];
    if (initialRoom) {
      setSelectedRoom(initialRoom);
      setFloorId(initialRoom.floorId);
      setBuildingId(initialRoom.buildingId);
    }
  }, []);

  const floors = useMemo(() => mockFloors.filter((floor) => floor.buildingId === buildingId), [buildingId]);
  const teacherResults = teacherQuery
    ? fuzzySearch(
        teacherQuery,
        mockTeacherDirectory.map((teacher) => ({
          ...teacher,
          name: teacher.fullName,
          aliases: [...teacher.aliases, teacher.department]
        })),
        5
      )
    : [];

  const handleRoomSearch = async () => {
    const rooms = await searchRooms(roomQuery);
    const first = rooms[0] ?? null;

    if (!first) {
      pushToast({ title: "Xona topilmadi.", tone: "warning" });
      return;
    }

    setSelectedRoom(first);
    setFloorId(first.floorId);
    setBuildingId(first.buildingId);
    pushToast({ title: `${first.name} tanlandi.`, tone: "success" });
  };

  const handleTeacherPick = async (teacherId: string) => {
    const schedule = mockTeacherSchedules.find((item) => item.teacherId === teacherId);
    const room = mockRooms.find((item) => item.id === schedule?.roomId) ?? null;

    if (!room) {
      pushToast({ title: "O'qituvchi jadvali topilmadi.", tone: "warning" });
      return;
    }

    setSelectedRoom(room);
    setFloorId(room.floorId);
    setBuildingId(room.buildingId);
    pushToast({ title: `${room.name} o'qituvchi uchun tanlandi.`, tone: "info" });
  };

  const handleRoute = async () => {
    if (!selectedRoom) {
      return;
    }

    setLoading(true);
    setAvatarMode("thinking");
    try {
      const route = await findRoute({
        fromNodeId: "entrance-1",
        toRoomId: selectedRoom.id,
        algorithm
      });
      setActiveRoute(route);
      setAvatarMode("pointing");
      pushToast({ title: `${selectedRoom.name} uchun marshrut topildi.`, tone: "success" });
    } catch (error) {
      setAvatarMode("neutral");
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

  const downloadRoute = () => {
    if (!activeRoute) {
      pushToast({ title: "Avval route hisoblang.", tone: "warning" });
      return;
    }

    const content = [
      `ATMURA route summary`,
      `Distance: ${activeRoute.distance} m`,
      `Estimated time: ${activeRoute.estimatedTime}`,
      ...activeRoute.steps.map((step, index) => `${index + 1}. ${step}`)
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "atmura-route.txt";
    anchor.click();
    window.URL.revokeObjectURL(url);
    pushToast({ title: "Route fayli yuklab olindi.", tone: "info" });
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Campus map flagship module"
        title="3D kampus xaritasi va real-time yo'nalish markazi"
        description="Nearest-node snapping, Dijkstra / A* hisoblash, qavatlar oralig'idagi marshrut va NFC/AR integratsiyasi bitta interaktiv canvasda ko'rsatiladi."
      />

      <div className="grid gap-6 2xl:grid-cols-[320px_1fr_360px]">
        <Card className="space-y-5">
          <div>
            <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Search & filters</p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Bino, qavat, xona yoki o'qituvchi bo'yicha qidiruv qiling va route ni hisoblang.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.26em] text-white/40">Building</label>
            <select
              className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none"
              value={buildingId}
              onChange={(event) => {
                setBuildingId(event.target.value);
                const firstFloor = mockFloors.find((floor) => floor.buildingId === event.target.value);
                if (firstFloor) {
                  setFloorId(firstFloor.id);
                }
              }}
            >
              {mockBuildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.26em] text-white/40">Floor</label>
            <Tabs
              items={floors.map((floor) => ({
                id: floor.id,
                label: `${floor.level}-qavat`
              }))}
              value={floorId}
              onChange={setFloorId}
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.26em] text-white/40">Room search</label>
            <Input value={roomQuery} onChange={(event) => setRoomQuery(event.target.value)} placeholder="Masalan: 215, kutubxona..." />
            <Button fullWidth variant="secondary" onClick={() => void handleRoomSearch()}>
              <Sparkles className="h-4 w-4" />
              Xonani topish
            </Button>
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.26em] text-white/40">Teacher search</label>
            <Input value={teacherQuery} onChange={(event) => setTeacherQuery(event.target.value)} placeholder="G'olib Rashidovich..." />
            {teacherResults.length > 0 ? (
              <div className="space-y-2">
                {teacherResults.slice(0, 3).map((result) => (
                  <button
                    key={result.target.id}
                    className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left transition hover:border-cyan-300/35"
                    onClick={() => void handleTeacherPick(result.target.id)}
                    type="button"
                  >
                    <p className="text-sm font-semibold text-white">{result.target.fullName}</p>
                    <p className="text-xs text-white/45">{result.target.department}</p>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-3">
            <Tabs
              items={[
                { id: "astar", label: "A*" },
                { id: "dijkstra", label: "Dijkstra" }
              ]}
              value={algorithm}
              onChange={(value) => setAlgorithm(value)}
            />

            {[
              {
                label: "Show NFC points",
                value: showNfc,
                toggle: () => setShowNfc((value) => !value)
              },
              {
                label: "Show stairs / lift",
                value: showVertical,
                toggle: () => setShowVertical((value) => !value)
              },
              {
                label: "Accessibility mode",
                value: accessibilityMode,
                toggle: () => setAccessibilityMode((value) => !value)
              }
            ].map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/72"
                onClick={item.toggle}
                type="button"
              >
                {item.label}
                <Badge tone={item.value ? "success" : "warning"}>{item.value ? "On" : "Off"}</Badge>
              </button>
            ))}
          </div>
        </Card>

        <CampusMapCanvas
          floorId={floorId}
          route={activeRoute}
          selectedRoomId={selectedRoom?.id}
          showNfc={showNfc}
          showVertical={showVertical}
          onSelectRoom={(roomId) => {
            const room = mockRooms.find((item) => item.id === roomId) ?? null;
            setSelectedRoom(room);
            if (room) {
              setFloorId(room.floorId);
            }
          }}
        />

        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Room / route details</p>
                <p className="text-sm text-white/55">Tanlangan obyekt va navigatsiya vazifalari.</p>
              </div>
              <Badge tone="info">{algorithm.toUpperCase()}</Badge>
            </div>

            {selectedRoom ? (
              <div className="space-y-4">
                <div className="rounded-[26px] border border-cyan-400/18 bg-cyan-500/10 p-4">
                  <p className="text-sm font-semibold text-white">{selectedRoom.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/64">{selectedRoom.description}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/40">Building</p>
                    <p className="mt-2 text-lg font-bold text-white">{selectedRoom.buildingId}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/40">Floor</p>
                    <p className="mt-2 text-lg font-bold text-white">{selectedRoom.floorId}</p>
                  </div>
                </div>
                <Button fullWidth onClick={() => void handleRoute()} disabled={loading}>
                  <RouteIcon className="h-4 w-4" />
                  {loading ? "Route hisoblanmoqda..." : "Find Route"}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-white/55">Xona tanlanganda batafsil ma'lumot shu yerda chiqadi.</p>
            )}
          </Card>

          <RouteInstructions route={activeRoute} />

          <Card>
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-cyan-300" />
              <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Route actions</p>
            </div>
            <div className="grid gap-3">
              <Button variant="secondary" onClick={() => void sendRoute()}>
                <Send className="h-4 w-4" />
                Telegramga yuborish
              </Button>
              <Link to="/ar-guide">
                <Button fullWidth variant="secondary">
                  <UserRoundSearch className="h-4 w-4" />
                  Open AR Guide
                </Button>
              </Link>
              <Button variant="secondary" onClick={downloadRoute}>
                <Download className="h-4 w-4" />
                Download route
              </Button>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/55">
              {showNfc ? "NFC nuqtalar ko'rsatilmoqda." : "NFC nuqtalar yashirildi."}{" "}
              {accessibilityMode
                ? "Accessibility mode yo'lni lift va qulay o'tishlar orqali ko'rib chiqadi."
                : "Standard mode barcha segmentlarni ko'rsatadi."}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
