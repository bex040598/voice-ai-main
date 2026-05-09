import type { Request, Response } from "express";
import { routeSchema } from "./routing.types.js";
import { routingService } from "./routing.service.js";

export const routingController = {
  find(request: Request, response: Response) {
    response.json(routingService.findRoute(routeSchema.parse(request.body)));
  }
};
