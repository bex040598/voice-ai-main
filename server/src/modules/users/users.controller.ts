import type { Request, Response } from "express";
import { updateUserSchema } from "./users.types.js";
import { usersService } from "./users.service.js";

export const usersController = {
  list(_request: Request, response: Response) {
    response.json(usersService.list());
  },

  getById(request: Request, response: Response) {
    response.json(usersService.getById(String(request.params.id)));
  },

  update(request: Request, response: Response) {
    response.json(usersService.update(String(request.params.id), updateUserSchema.parse(request.body)));
  },

  delete(request: Request, response: Response) {
    response.json(usersService.delete(String(request.params.id)));
  }
};
