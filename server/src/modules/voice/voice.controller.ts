import type { Request, Response } from "express";
import { transcriptSchema } from "./voice.types.js";
import { voiceService } from "./voice.service.js";

export const voiceController = {
  analyze(request: Request, response: Response) {
    const { transcript } = transcriptSchema.parse(request.body);
    response.json(voiceService.classify(transcript));
  }
};
