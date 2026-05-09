import { Router } from "express";
import { routingController } from "./routing.controller.js";

export const routingRoutes = Router();

routingRoutes.post("/find", routingController.find);
