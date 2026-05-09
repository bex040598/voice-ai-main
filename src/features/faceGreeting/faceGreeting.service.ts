import { apiRequest } from "../../lib/api";
import { mockTeacherSchedules } from "../../data/mockTeachers";
import { mockUsers } from "../../data/mockUsers";
import type { FaceGreetingResult, User } from "../../types";

const createGreeting = (user: User | null): string => {
  if (!user) {
    return "Assalomu alaykum, xush kelibsiz! Sizga qanday yordam bera olaman?";
  }

  if (user.role === "teacher") {
    const meeting = mockTeacherSchedules.find((schedule) => schedule.teacherId === user.id);
    return `Assalomu alaykum, ${user.fullName}! ${meeting ? `Bugun sizda ${meeting.startTime}-${meeting.endTime} oralig'ida ${meeting.subject} bor.` : "Bugungi jadval tayyor."}`;
  }

  if (user.role === "student") {
    return `Salom, ${user.fullName.split(" ")[0]}! Bugungi dars jadvalingiz tayyor.`;
  }

  return `Assalomu alaykum, ${user.fullName}! Platformaga xush kelibsiz.`;
};

export const identifyFaceMock = async (): Promise<FaceGreetingResult> =>
  apiRequest<FaceGreetingResult>("/api/assistant/face-greeting", {
    method: "POST",
    fallback: async () => {
      const candidates = [
        null,
        mockUsers.find((user) => user.role === "teacher") ?? null,
        mockUsers.find((user) => user.role === "student") ?? null
      ];
      const recognizedUser = candidates[Math.floor(Math.random() * candidates.length)];
      return {
        recognizedUser,
        greeting: createGreeting(recognizedUser),
        confidence: recognizedUser ? 0.84 : 0.48
      };
    }
  });
