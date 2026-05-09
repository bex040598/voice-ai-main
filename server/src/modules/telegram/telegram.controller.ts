import type { Request, Response } from "express";
import { telegramLinkSchema, telegramRouteSchema } from "./telegram.types.js";
import { telegramService } from "./telegram.service.js";

export const telegramController = {
  link(request: Request, response: Response) {
    const input = telegramLinkSchema.parse(request.body);
    response.json(telegramService.link(input.userId, input.telegramId));
  },

  sendRoute(request: Request, response: Response) {
    const input = telegramRouteSchema.parse(request.body);
    response.json(telegramService.sendRoute(input.telegramId, input.route));
  }
};
