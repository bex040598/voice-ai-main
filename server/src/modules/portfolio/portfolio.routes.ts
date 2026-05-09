import { Router } from "express";
import { portfolioController } from "./portfolio.controller.js";

export const portfolioRoutes = Router();

portfolioRoutes.get("/", portfolioController.list);
portfolioRoutes.get("/:id/items", portfolioController.listItems);
portfolioRoutes.post("/items", portfolioController.addItem);
