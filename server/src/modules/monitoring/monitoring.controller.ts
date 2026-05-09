import type { Request, Response } from "express";
import { monitoringService } from "./monitoring.service.js";

export const monitoringController = {
  stats(_request: Request, response: Response) {
    response.json(monitoringService.stats());
  },

  activity(_request: Request, response: Response) {
    response.json(monitoringService.activity());
  },

  async pdf(_request: Request, response: Response) {
    const buffer = await monitoringService.pdf();
    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", "inline; filename=atmura-monitoring-report.pdf");
    response.send(buffer);
  }
};
