import { Router } from "express";
import { monitoringController } from "./monitoring.controller.js";

export const monitoringRoutes = Router();
export const reportsRoutes = Router();

monitoringRoutes.get("/stats", monitoringController.stats);
monitoringRoutes.get("/activity", monitoringController.activity);
reportsRoutes.get("/pdf", monitoringController.pdf);
