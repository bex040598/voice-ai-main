import { db } from "../../database/mockDb.js";
import type { CreateBuildingInput } from "./campus.types.js";

const normalize = (value: string): string => value.toLowerCase().trim();

export const campusService = {
  getBuildings() {
    return db.buildings;
  },

  createBuilding(input: CreateBuildingInput) {
    const building = {
      id: `building-${db.buildings.length + 1}`,
      name: input.name,
      description: input.description
    };
    db.buildings.push(building);
    return building;
  },

  getFloors(buildingId: string) {
    return db.floors.filter((floor) => floor.buildingId === buildingId);
  },

  getRooms(query?: string) {
    if (!query) {
      return db.rooms;
    }

    const normalized = normalize(query);
    const aliases: Record<string, string[]> = {
      registrar: ["rekstrar", "registrar", "ro'yxat"],
      "command room": ["kommanda", "command room"],
      kutubxona: ["library", "kutubhona"],
      "dekanat honasi": ["dekan xonasi", "dekanat", "dean"]
    };

    return db.rooms.filter((room) => {
      const target = normalize(`${room.name} ${room.description} ${room.type}`);
      if (target.includes(normalized)) {
        return true;
      }
      return Object.entries(aliases).some(
        ([canonical, variations]) =>
          variations.includes(normalized) && target.includes(canonical.toLowerCase())
      );
    });
  },

  getGraphNodes() {
    return db.graphNodes;
  },

  getGraphEdges() {
    return db.graphEdges;
  }
};
