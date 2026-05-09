import { apiRequest } from "../../lib/api";
import { fuzzySearch } from "../../lib/algorithms/fuzzySearch";
import { mockBuildings, mockFloors, mockGraphEdges, mockGraphNodes, mockRooms } from "../../data/mockCampus";
import type { Building, Floor, GraphEdge, GraphNode, Room } from "../../types";

export const getBuildings = async (): Promise<Building[]> =>
  apiRequest<Building[]>("/api/buildings", {
    fallback: async () => mockBuildings
  });

export const createBuilding = async (payload: Pick<Building, "name" | "description">): Promise<Building> =>
  apiRequest<Building>("/api/buildings", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      const building: Building = {
        id: `building-${mockBuildings.length + 1}`,
        name: payload.name,
        description: payload.description
      };
      mockBuildings.push(building);
      return building;
    }
  });

export const getFloors = async (buildingId: string): Promise<Floor[]> =>
  apiRequest<Floor[]>(`/api/floors/${buildingId}`, {
    fallback: async () => mockFloors.filter((floor) => floor.buildingId === buildingId)
  });

export const getRooms = async (): Promise<Room[]> =>
  apiRequest<Room[]>("/api/rooms", {
    fallback: async () => mockRooms
  });

export const searchRooms = async (query: string): Promise<Room[]> =>
  apiRequest<Room[]>(`/api/rooms/search?q=${encodeURIComponent(query)}`, {
    fallback: async () =>
      fuzzySearch(
        query,
        mockRooms.map((room) => ({
          ...room,
          aliases: [room.name, room.description, room.type]
        }))
      ).map((result) => result.target)
  });

export const getGraphNodes = async (): Promise<GraphNode[]> =>
  apiRequest<GraphNode[]>("/api/graph/nodes", {
    fallback: async () => mockGraphNodes
  });

export const getGraphEdges = async (): Promise<GraphEdge[]> =>
  apiRequest<GraphEdge[]>("/api/graph/edges", {
    fallback: async () => mockGraphEdges
  });
