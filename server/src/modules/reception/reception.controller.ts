import type { Request, Response } from "express";
import { createReceptionSchema, receptionStatusSchema } from "./reception.types.js";
import { receptionService } from "./reception.service.js";

export const receptionController = {
  create(request: Request, response: Response) {
    response.status(201).json(receptionService.create(createReceptionSchema.parse(request.body)));
  },

  list(_request: Request, response: Response) {
    response.json(receptionService.list());
  },

  updateStatus(request: Request, response: Response) {
    const { status } = receptionStatusSchema.parse(request.body);
    response.json(receptionService.updateStatus(String(request.params.id), status));
  }
};
