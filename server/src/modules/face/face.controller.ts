import type { Request, Response } from "express";
import { faceService } from "./face.service.js";

export const faceController = {
  greeting(_request: Request, response: Response) {
    response.json(faceService.greet());
  }
};
