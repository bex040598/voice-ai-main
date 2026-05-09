import { Router } from "express";
import { usersController } from "./users.controller.js";
import { authMiddleware } from "../../common/middleware/auth.middleware.js";
import { requireRole } from "../../common/guards/role.guard.js";

export const usersRoutes = Router();

usersRoutes.use(authMiddleware);
usersRoutes.get("/", requireRole("admin", "super_admin"), usersController.list);
usersRoutes.get("/:id", requireRole("teacher", "admin", "super_admin"), usersController.getById);
usersRoutes.patch("/:id", requireRole("admin", "super_admin"), usersController.update);
usersRoutes.delete("/:id", requireRole("super_admin"), usersController.delete);
