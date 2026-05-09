import { Router } from "express";
import { assistantController } from "./assistant.controller.js";

export const assistantRoutes = Router();

assistantRoutes.post("/query", assistantController.query);
assistantRoutes.post("/voice", assistantController.voice);
assistantRoutes.post("/emotion", assistantController.emotion);
assistantRoutes.post("/face-greeting", assistantController.faceGreeting);
