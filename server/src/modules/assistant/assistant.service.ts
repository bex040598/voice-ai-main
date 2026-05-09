import { db } from "../../database/mockDb.js";

const normalize = (value: string): string => value.toLowerCase().trim().replace(/'/g, "");

export const assistantService = {
  query(prompt: string) {
    const normalized = normalize(prompt);
    const teacher = db.users
      .filter((user) => user.role === "teacher")
      .find((user) => normalize(user.fullName).includes(normalized) || normalized.includes(normalize(user.fullName.split(" ")[0])));

    if (teacher) {
      const schedule = db.teacherSchedules.find((item) => item.teacherId === teacher.id);
      const room = db.rooms.find((item) => item.id === schedule?.roomId);
      return {
        answer: `${teacher.fullName} bugun ${schedule?.startTime}-${schedule?.endTime} oralig'ida ${room?.name ?? "belgilangan xonada"} dars beradi. Xohlaysizmi, yo'lni ko'rsatib beray?`,
        teacherId: teacher.id,
        suggestedRoomId: room?.id
      };
    }

    const room = db.rooms.find((item) => normalize(item.name).includes(normalized));
    if (room) {
      return {
        answer: `${room.name} topildi. Yo'lni xaritada hisoblab beraman.`,
        suggestedRoomId: room.id
      };
    }

    return {
      answer: "Xona, o'qituvchi yoki xizmat nomini aniqroq kiriting. Men route yoki jadvalni topib beraman."
    };
  }
};
