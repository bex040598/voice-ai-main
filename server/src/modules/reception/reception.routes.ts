import { Router } from "express";
import { receptionController } from "./reception.controller.js";

export const receptionRoutes = Router();

receptionRoutes.post("/request", receptionController.create);
receptionRoutes.get("/requests", receptionController.list);
receptionRoutes.patch("/requests/:id/status", receptionController.updateStatus);
