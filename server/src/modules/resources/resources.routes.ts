import { Router } from "express";
import { resourcesController } from "./resources.controller.js";

export const resourcesRoutes = Router();

resourcesRoutes.post("/", resourcesController.create);
resourcesRoutes.get("/", resourcesController.list);
resourcesRoutes.delete("/:id", resourcesController.remove);
