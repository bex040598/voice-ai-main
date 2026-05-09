import { Router } from "express";
import { telegramController } from "./telegram.controller.js";

export const telegramRoutes = Router();

telegramRoutes.post("/link", telegramController.link);
telegramRoutes.post("/send-route", telegramController.sendRoute);
