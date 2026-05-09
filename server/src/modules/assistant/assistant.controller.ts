import type { Request, Response } from "express";
import { assistantQuerySchema } from "./assistant.types.js";
import { assistantService } from "./assistant.service.js";
import { faceController } from "../face/face.controller.js";
import { voiceController } from "../voice/voice.controller.js";

export const assistantController = {
  query(request: Request, response: Response) {
    const { prompt } = assistantQuerySchema.parse(request.body);
    response.json(assistantService.query(prompt));
  },

  voice(request: Request, response: Response) {
    voiceController.analyze(request, response);
  },

  emotion(request: Request, response: Response) {
    voiceController.analyze(request, response);
  },

  faceGreeting(request: Request, response: Response) {
    faceController.greeting(request, response);
  }
};
