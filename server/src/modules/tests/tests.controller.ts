import type { Request, Response } from "express";
import { createTestSchema, submitTestSchema } from "./tests.types.js";
import { testsService } from "./tests.service.js";

export const testsController = {
  create(request: Request, response: Response) {
    response.status(201).json(testsService.create(createTestSchema.parse(request.body)));
  },

  list(_request: Request, response: Response) {
    response.json(testsService.list());
  },

  submit(request: Request, response: Response) {
    const testId = String(request.params.id);
    const payload = submitTestSchema.parse({ ...request.body, testId });
    response.json(testsService.submit(testId, payload));
  }
};
