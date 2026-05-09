import { Clock3, Route, Search } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { mockRooms } from "../../data/mockCampus";
import { mockTeacherDirectory, mockTeacherSchedules } from "../../data/mockTeachers";
import { fuzzySearch } from "../../lib/algorithms/fuzzySearch";
import { findRoute } from "../../features/routing/routing.service";
import { useAppStore } from "../../store/useAppStore";

export const TeachersPage = () => {
  const [query, setQuery] = useState("G'olib Rashidovich");
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);

  const results = query
    ? fuzzySearch(
        query,
        mockTeacherDirectory.map((teacher) => ({
          ...teacher,
          name: teacher.fullName
        }))
      )
    : [];

  const teacher = results[0]?.target ?? mockTeacherDirectory.find((item) => item.id === teacherId) ?? null;
  const schedule = mockTeacherSchedules.find((item) => item.teacherId === teacher?.id);
  const room = mockRooms.find((item) => item.id === schedule?.roomId);

  const routeToTeacher = async () => {
    if (!room) {
      return;
    }
    const route = await findRoute({ fromNodeId: "entrance-1", toRoomId: room.id, algorithm: "astar" });
    setActiveRoute(route);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Ask any teacher"
        title="O'qituvchi qayerda dars berayotganini topish"
        description="Teacher directory va schedule database orqali o'qituvchining joriy dars joyi, vaqti va kerak bo'lsa route ko'rsatmasi taklif qilinadi."
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <div className="flex gap-3">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Teacher ismi..." />
            <Button variant="secondary">
              <Search className="h-4 w-4" />
              Qidirish
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {results.slice(0, 4).map((result) => (
              <button
                key={result.target.id}
                className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 text-left transition hover:border-cyan-300"
                onClick={() => setTeacherId(result.target.id)}
                type="button"
              >
                <p className="text-sm font-semibold text-navy-900">{result.target.fullName}</p>
                <p className="text-xs text-slate-500">{result.target.department}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          {teacher && schedule ? (
            <div className="space-y-4">
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">{teacher.fullName}</p>
              <div className="rounded-[24px] bg-cyan-50 p-4">
                <p className="text-sm leading-7 text-slate-700">
                  {teacher.fullName} bugun {schedule.startTime}-{schedule.endTime} oralig'ida {room?.name ?? "belgilangan xonada"} dars beradi. Xohlaysizmi, yo'lni ko'rsatib beray?
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock3 className="h-4 w-4 text-cyan-600" />
                {schedule.weekday} | {schedule.startTime}-{schedule.endTime}
              </div>
              <Button onClick={() => void routeToTeacher()}>
                <Route className="h-4 w-4" />
                Route ko'rsatish
              </Button>
            </div>
          ) : (
            <p className="text-sm leading-7 text-slate-500">Qidiruv natijasi shu yerda ko'rinadi.</p>
          )}
        </Card>
      </div>
    </div>
  );
};
