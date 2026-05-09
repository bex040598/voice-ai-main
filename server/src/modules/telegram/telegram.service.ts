import { appendAuditLog, db } from "../../database/mockDb.js";

export const telegramService = {
  link(userId: string, telegramId: string) {
    const user = db.users.find((candidate) => candidate.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.telegramId = telegramId;
    appendAuditLog(userId, "linked telegram", "Telegram");
    console.info("[ATMURA] Telegram linked", { userId, telegramId });
    return { success: true };
  },

  sendRoute(telegramId: string, route: { distance: number; steps: string[] }) {
    console.info("[ATMURA] Route sent", { telegramId, route });
    return { success: true };
  }
};
