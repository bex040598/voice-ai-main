import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authMiddleware } from "../../common/middleware/auth.middleware.js";

export const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/me", authMiddleware, authController.me);
