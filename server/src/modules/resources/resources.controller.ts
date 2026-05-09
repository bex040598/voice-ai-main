import type { Request, Response } from "express";
import { createResourceSchema } from "./resources.types.js";
import { resourcesService } from "./resources.service.js";

export const resourcesController = {
  create(request: Request, response: Response) {
    response.status(201).json(resourcesService.create(createResourceSchema.parse(request.body)));
  },

  list(_request: Request, response: Response) {
    response.json(resourcesService.list());
  },

  remove(request: Request, response: Response) {
    response.json(resourcesService.remove(String(request.params.id)));
  }
};
