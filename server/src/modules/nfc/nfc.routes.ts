import { Router } from "express";
import { nfcController } from "./nfc.controller.js";

export const nfcRoutes = Router();

nfcRoutes.post("/resolve", nfcController.resolve);
