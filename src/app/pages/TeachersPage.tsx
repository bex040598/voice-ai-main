import { Clock3, MapPinned, Send, UserRoundSearch, Waypoints } from "lucide-react";
import { useMemo, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { mockRooms } from "../../data/mockCampus";
import { mockTeacherDirectory, mockTeacherSchedules } from "../../data/mockTeachers";
import { findRoute } from "../../features/routing/routing.service";
import { sendRouteToTelegram } from "../../features/telegram/telegram.service";
import { fuzzySearch } from "../../lib/algorithms/fuzzySearch";
import { useAppStore } from "../../store/useAppStore";

const currentWeekday = "Shanba";

export const TeachersPage = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const pushToast = useAppStore((state) => state.pushToast);
  const [query, setQuery] = useState("G'olib Rashidovich qayerda?");
  const [department, setDepartment] = useState("all");
  const [availableNow, setAvailableNow] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>("teacher-1");

  const teachers = useMemo(() => {
    const base = query
      ? fuzzySearch(
          query,
          mockTeacherDirectory.map((teacher) => ({
            ...teacher,
            name: teacher.fullName,
            aliases: [...teacher.aliases, teacher.department]
          })),
          10
        ).map((item) => item.target)
      : mockTeacherDirectory;

    return base.filter((teacher) => {
      if (department !== "all" && teacher.department !== department) {
        return false;
      }

      if (!availableNow) {
        return true;
      }

      return mockTeacherSchedules.some(
        (schedule) => schedule.teacherId === teacher.id && schedule.weekday === currentWeekday
      );
    });
  }, [query, department, availableNow]);

  const selectedTeacher =
    teachers.find((item) => item.id === selectedTeacherId) ??
    mockTeacherDirectory.find((item) => item.id === selectedTeacherId) ??
    teachers[0] ??
    null;
  const selectedSchedule = mockTeacherSchedules.find((item) => item.teacherId === selectedTeacher?.id);
  const selectedRoom = mockRooms.find((item) => item.id === selectedSchedule?.roomId) ?? null;

  const routeToTeacher = async () => {
    if (!selectedRoom) {
      return;
    }
    const route = await findRoute({ fromNodeId: "entrance-1", toRoomId: selectedRoom.id, algorithm: "astar" });
    setActiveRoute(route);
    pushToast({ title: `${selectedRoom.name} uchun route tayyorlandi.`, tone: "success" });
  };

  const sendToTelegram = async () => {
    if (!selectedRoom || !currentUser.telegramId) {
      pushToast({ title: "Telegram uchun foydalanuvchi yoki xona mavjud emas.", tone: "warning" });
      return;
    }

    const route = await findRoute({ fromNodeId: "entrance-1", toRoomId: selectedRoom.id, algorithm: "astar" });
    await sendRouteToTelegram({ telegramId: currentUser.telegramId, route });
    pushToast({ title: "O'qituvchi route ma'lumoti Telegramga yuborildi.", tone: "success" });
  };

  const departments = ["all", ...Array.from(new Set(mockTeacherDirectory.map((teacher) => teacher.department)))];

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Ask-any-Teacher"
        title="O'qituvchi qayerda dars berayotganini premium formatda topish"
        description="Teacher directory, department filter, available-now indikator va kundalik schedule timeline orqali foydalanuvchi darhol kerakli o'qituvchini topadi."
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Card>
            <div className="grid gap-3 md:grid-cols-[1fr_200px_180px]">
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Masalan: G'olib Rashidovich qayerda?" />
              <select
                className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
              >
                {departments.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "Barcha bo'limlar" : item}
                  </option>
                ))}
              </select>
              <button
                className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white/75"
                onClick={() => setAvailableNow((value) => !value)}
                type="button"
              >
                {availableNow ? "Available only" : "All schedules"}
              </button>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {teachers.map((teacher) => {
              const schedule = mockTeacherSchedules.find((item) => item.teacherId === teacher.id);
              const room = mockRooms.find((item) => item.id === schedule?.roomId);

              return (
                <button
                  key={teacher.id}
                  className={`rounded-[28px] border p-5 text-left transition ${
                    selectedTeacher?.id === teacher.id
                      ? "border-cyan-400/35 bg-cyan-500/10"
                      : "border-white/10 bg-white/6 hover:border-cyan-300/25 hover:bg-white/8"
                  }`}
                  onClick={() => setSelectedTeacherId(teacher.id)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(0,212,255,0.92),rgba(124,58,237,0.88))] text-sm font-bold text-white">
                      {teacher.fullName
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <Badge tone={schedule?.weekday === currentWeekday ? "success" : "warning"}>
                      {schedule?.weekday === currentWeekday ? "Available now" : "Later"}
                    </Badge>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">{teacher.fullName}</p>
                  <p className="mt-2 text-sm text-white/50">{teacher.department}</p>
                  <p className="mt-4 text-sm leading-6 text-white/68">
                    {schedule
                      ? `${schedule.subject} | ${schedule.weekday} ${schedule.startTime}-${schedule.endTime}`
                      : "Bugungi jadval topilmadi."}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
                    <MapPinned className="h-3.5 w-3.5 text-cyan-300" />
                    {room?.name ?? "Room pending"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            {selectedTeacher && selectedSchedule ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">{selectedTeacher.fullName}</p>
                    <p className="text-sm text-white/50">{selectedTeacher.department}</p>
                  </div>
                  <Badge tone="info">Teacher finder</Badge>
                </div>

                <div className="rounded-[26px] border border-cyan-400/18 bg-cyan-500/10 p-4">
                  <p className="text-sm leading-7 text-white/74">
                    {selectedTeacher.fullName} bugun {selectedSchedule.startTime}-{selectedSchedule.endTime} oralig'ida{" "}
                    {selectedRoom?.name ?? "belgilangan xonada"} dars beradi. Xohlaysizmi, yo'lni ko'rsatib beray?
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Clock3 className="h-4 w-4 text-cyan-300" />
                      Today lesson
                    </div>
                    <p className="mt-3 text-sm text-white/60">
                      {selectedSchedule.weekday} | {selectedSchedule.startTime}-{selectedSchedule.endTime}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <MapPinned className="h-4 w-4 text-cyan-300" />
                      Room location
                    </div>
                    <p className="mt-3 text-sm text-white/60">{selectedRoom?.name ?? "No room"}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => void routeToTeacher()}>
                    <Waypoints className="h-4 w-4" />
                    Show route
                  </Button>
                  <Button variant="secondary" onClick={() => void sendToTelegram()}>
                    <Send className="h-4 w-4" />
                    Send Telegram
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-7 text-white/55">Qidiruv natijasi shu yerda ko'rinadi.</p>
            )}
          </Card>

          <Card>
            <div className="mb-4 flex items-center gap-3">
              <UserRoundSearch className="h-5 w-5 text-cyan-300" />
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Today schedule timeline</p>
                <p className="text-sm text-white/55">Bugungi asosiy o'qituvchilar oqimi.</p>
              </div>
            </div>
            <div className="space-y-3">
              {mockTeacherSchedules
                .filter((schedule) => schedule.weekday === currentWeekday)
                .map((schedule) => {
                  const teacher = mockTeacherDirectory.find((item) => item.id === schedule.teacherId);
                  const room = mockRooms.find((item) => item.id === schedule.roomId);

                  return (
                    <div key={schedule.id} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{teacher?.fullName}</p>
                          <p className="text-xs text-white/45">{schedule.subject}</p>
                        </div>
                        <Badge tone="success">
                          {schedule.startTime}-{schedule.endTime}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-white/58">{room?.name}</p>
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
