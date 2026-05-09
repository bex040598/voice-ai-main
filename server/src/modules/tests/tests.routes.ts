import { Router } from "express";
import { testsController } from "./tests.controller.js";

export const testsRoutes = Router();

testsRoutes.post("/", testsController.create);
testsRoutes.get("/", testsController.list);
testsRoutes.post("/:id/submit", testsController.submit);
