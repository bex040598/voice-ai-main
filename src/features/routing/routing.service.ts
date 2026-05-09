import { apiRequest } from "../../lib/api";
import { astar } from "../../lib/algorithms/astar";
import { dijkstra } from "../../lib/algorithms/dijkstra";
import { findNearestNode } from "../../lib/algorithms/nearestNode";
import { toRouteResponse } from "../../lib/algorithms/routeInstructions";
import { mockGraphEdges, mockGraphNodes, mockRooms } from "../../data/mockCampus";
import type { GraphNode, RouteRequest, RouteResponse } from "../../types";

export const findRoute = async (payload: RouteRequest): Promise<RouteResponse> =>
  apiRequest<RouteResponse>("/api/route/find", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      const targetRoom = mockRooms.find((room) => room.id === payload.toRoomId);
      if (!targetRoom) {
        throw new Error("Maqsad xona topilmadi.");
      }

      const result =
        payload.algorithm === "astar"
          ? astar(mockGraphNodes, mockGraphEdges, payload.fromNodeId, targetRoom.nodeId)
          : dijkstra(mockGraphNodes, mockGraphEdges, payload.fromNodeId, targetRoom.nodeId);

      return toRouteResponse(result.path, mockGraphNodes, mockGraphEdges);
    }
  });

export const findRouteFromLocation = async (payload: {
  currentPosition: Pick<GraphNode, "buildingId" | "floorId" | "x" | "y" | "z">;
  toRoomId: string;
  algorithm: RouteRequest["algorithm"];
}): Promise<RouteResponse> => {
  const nearestNode = findNearestNode(mockGraphNodes, payload.currentPosition);

  if (!nearestNode) {
    throw new Error("Joriy pozitsiya uchun yaqin tugun topilmadi.");
  }

  return findRoute({
    fromNodeId: nearestNode.id,
    toRoomId: payload.toRoomId,
    algorithm: payload.algorithm
  });
};
