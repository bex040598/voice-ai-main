import type { Request, Response } from "express";
import { createBuildingSchema } from "./campus.types.js";
import { campusService } from "./campus.service.js";

export const campusController = {
  buildings(_request: Request, response: Response) {
    response.json(campusService.getBuildings());
  },

  createBuilding(request: Request, response: Response) {
    response.status(201).json(campusService.createBuilding(createBuildingSchema.parse(request.body)));
  },

  floors(request: Request, response: Response) {
    response.json(campusService.getFloors(String(request.params.buildingId)));
  },

  rooms(request: Request, response: Response) {
    response.json(campusService.getRooms(typeof request.query.q === "string" ? request.query.q : undefined));
  },

  nodes(_request: Request, response: Response) {
    response.json(campusService.getGraphNodes());
  },

  edges(_request: Request, response: Response) {
    response.json(campusService.getGraphEdges());
  }
};
