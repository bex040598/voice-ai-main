import { apiRequest } from "../../lib/api";
import type { RouteResponse } from "../../types";

export interface TelegramLinkPayload {
  userId: string;
  telegramId: string;
}

export const linkTelegram = async (payload: TelegramLinkPayload): Promise<{ success: boolean }> =>
  apiRequest<{ success: boolean }>("/api/telegram/link", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      console.info("[ATMURA] Telegram link demo", payload);
      return { success: true };
    }
  });

export const sendRouteToTelegram = async (payload: {
  telegramId: string;
  route: RouteResponse;
}): Promise<{ success: boolean }> =>
  apiRequest<{ success: boolean }>("/api/telegram/send-route", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      console.info("[ATMURA] Route sent to telegram demo", payload);
      return { success: true };
    }
  });
