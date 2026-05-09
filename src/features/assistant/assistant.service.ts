import { apiRequest } from "../../lib/api";
import { mockTeacherSchedules } from "../../data/mockTeachers";
import { mockRooms } from "../../data/mockCampus";
import { mockUsers } from "../../data/mockUsers";
import { fuzzySearch } from "../../lib/algorithms/fuzzySearch";

export interface AssistantQueryResult {
  answer: string;
  suggestedRoomId?: string;
  teacherId?: string;
}

export const queryAssistant = async (prompt: string): Promise<AssistantQueryResult> =>
  apiRequest<AssistantQueryResult>("/api/assistant/query", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    fallback: async () => {
      const teacher = fuzzySearch(
        prompt,
        mockUsers
          .filter((user) => user.role === "teacher")
          .map((user) => ({ ...user, name: user.fullName, aliases: [user.fullName] }))
      )[0];

      if (teacher) {
        const schedule = mockTeacherSchedules.find((item) => item.teacherId === teacher.target.id);
        if (schedule) {
          const room = mockRooms.find((item) => item.id === schedule.roomId);
          return {
            answer: `${teacher.target.fullName} bugun ${schedule.startTime}-${schedule.endTime} oralig'ida ${room?.name ?? "belgilangan xonada"} dars beradi. Xohlasangiz yo'lni ko'rsataman.`,
            teacherId: teacher.target.id,
            suggestedRoomId: room?.id
          };
        }
      }

      const room = fuzzySearch(
        prompt,
        mockRooms.map((item) => ({ ...item, aliases: [item.name, item.description] }))
      )[0];

      if (room) {
        return {
          answer: `${room.target.name} topildi. Yo'lni xaritada hisoblab, bosqichma-bosqich ko'rsatib beraman.`,
          suggestedRoomId: room.target.id
        };
      }

      return {
        answer:
          "So'rovingiz qabul qilindi. Siz xona, o'qituvchi, dekanat yoki kutubxona nomini yozishingiz mumkin."
      };
    }
  });
