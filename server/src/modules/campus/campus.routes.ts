import { Router } from "express";
import { campusController } from "./campus.controller.js";
import { authMiddleware } from "../../common/middleware/auth.middleware.js";
import { requireRole } from "../../common/guards/role.guard.js";

export const campusRoutes = Router();

campusRoutes.get("/buildings", campusController.buildings);
campusRoutes.post("/buildings", authMiddleware, requireRole("admin", "super_admin"), campusController.createBuilding);
campusRoutes.get("/floors/:buildingId", campusController.floors);
campusRoutes.get("/rooms", campusController.rooms);
campusRoutes.get("/rooms/search", campusController.rooms);
campusRoutes.get("/graph/nodes", campusController.nodes);
campusRoutes.get("/graph/edges", campusController.edges);
