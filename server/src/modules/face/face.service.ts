import { db } from "../../database/mockDb.js";

export const faceService = {
  greet() {
    const candidates = [
      null,
      db.users.find((user) => user.role === "teacher") ?? null,
      db.users.find((user) => user.role === "student") ?? null
    ];
    const user = candidates[Math.floor(Math.random() * candidates.length)];

    if (!user) {
      return {
        recognizedUser: null,
        greeting: "Assalomu alaykum, xush kelibsiz! Sizga qanday yordam bera olaman?",
        confidence: 0.48
      };
    }

    if (user.role === "teacher") {
      return {
        recognizedUser: user.fullName,
        greeting: `Assalomu alaykum, ${user.fullName}! Bugun sizda 3-qavatda yig'ilish bor.`,
        confidence: 0.84
      };
    }

    return {
      recognizedUser: user.fullName,
      greeting: `Salom, ${user.fullName.split(" ")[0]}! Bugungi dars jadvalingiz tayyor.`,
      confidence: 0.82
    };
  }
};
