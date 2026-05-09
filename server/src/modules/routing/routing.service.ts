import { db } from "../../database/mockDb.js";
import type { GraphNode } from "../../common/types/domain.types.js";
import type { RouteInput } from "./routing.types.js";

interface PathResult {
  path: string[];
  distance: number;
}

const adjacencyMap = (): Map<string, typeof db.graphEdges> => {
  const map = new Map<string, typeof db.graphEdges>();
  db.graphEdges.forEach((edge) => {
    const list = map.get(edge.fromNodeId) ?? [];
    list.push(edge);
    map.set(edge.fromNodeId, list);
  });
  return map;
};

const heuristic = (from: GraphNode, to: GraphNode): number =>
  Math.round(Math.hypot(from.x - to.x, from.y - to.y) / 10 + Math.abs(from.z - to.z) * 22);

const reconstructPath = (previous: Map<string, string | null>, targetNodeId: string): string[] => {
  const path: string[] = [];
  let current: string | null = targetNodeId;

  while (current) {
    path.unshift(current);
    current = previous.get(current) ?? null;
  }
  return path;
};

const dijkstra = (startNodeId: string, targetNodeId: string): PathResult => {
  const adjacency = adjacencyMap();
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();

  db.graphNodes.forEach((node) => {
    distances.set(node.id, Number.POSITIVE_INFINITY);
    previous.set(node.id, null);
  });
  distances.set(startNodeId, 0);

  while (visited.size < db.graphNodes.length) {
    let currentNodeId: string | null = null;
    let shortest = Number.POSITIVE_INFINITY;

    distances.forEach((distance, nodeId) => {
      if (!visited.has(nodeId) && distance < shortest) {
        shortest = distance;
        currentNodeId = nodeId;
      }
    });

    if (!currentNodeId || currentNodeId === targetNodeId) {
      break;
    }
    visited.add(currentNodeId);

    (adjacency.get(currentNodeId) ?? []).forEach((edge) => {
      const candidate = shortest + edge.weight;
      const existing = distances.get(edge.toNodeId) ?? Number.POSITIVE_INFINITY;
      if (candidate < existing) {
        distances.set(edge.toNodeId, candidate);
        previous.set(edge.toNodeId, currentNodeId);
      }
    });
  }

  return {
    path: reconstructPath(previous, targetNodeId),
    distance: distances.get(targetNodeId) ?? Number.POSITIVE_INFINITY
  };
};

const astar = (startNodeId: string, targetNodeId: string): PathResult => {
  const adjacency = adjacencyMap();
  const nodeMap = new Map(db.graphNodes.map((node) => [node.id, node]));
  const openSet = new Set<string>([startNodeId]);
  const cameFrom = new Map<string, string | null>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const targetNode = nodeMap.get(targetNodeId);

  db.graphNodes.forEach((node) => {
    cameFrom.set(node.id, null);
    gScore.set(node.id, Number.POSITIVE_INFINITY);
    fScore.set(node.id, Number.POSITIVE_INFINITY);
  });

  gScore.set(startNodeId, 0);
  if (targetNode) {
    fScore.set(startNodeId, heuristic(nodeMap.get(startNodeId) ?? targetNode, targetNode));
  }

  while (openSet.size > 0) {
    let currentNodeId: string | null = null;
    let best = Number.POSITIVE_INFINITY;

    openSet.forEach((nodeId) => {
      const score = fScore.get(nodeId) ?? Number.POSITIVE_INFINITY;
      if (score < best) {
        best = score;
        currentNodeId = nodeId;
      }
    });

    if (!currentNodeId) {
      break;
    }

    const activeNodeId = currentNodeId;

    if (activeNodeId === targetNodeId) {
      return {
        path: reconstructPath(cameFrom, targetNodeId),
        distance: gScore.get(targetNodeId) ?? Number.POSITIVE_INFINITY
      };
    }

    openSet.delete(activeNodeId);

    (adjacency.get(activeNodeId) ?? []).forEach((edge) => {
      const tentative = (gScore.get(activeNodeId) ?? Number.POSITIVE_INFINITY) + edge.weight;
      if (tentative < (gScore.get(edge.toNodeId) ?? Number.POSITIVE_INFINITY)) {
        cameFrom.set(edge.toNodeId, activeNodeId);
        gScore.set(edge.toNodeId, tentative);
        const nextNode = nodeMap.get(edge.toNodeId);
        if (nextNode && targetNode) {
          fScore.set(edge.toNodeId, tentative + heuristic(nextNode, targetNode));
        }
        openSet.add(edge.toNodeId);
      }
    });
  }

  return { path: [], distance: Number.POSITIVE_INFINITY };
};

const instructionsForPath = (path: string[]) =>
  path.slice(0, -1).map((nodeId, index) => {
    const nextNodeId = path[index + 1];
    const edge = db.graphEdges.find((item) => item.fromNodeId === nodeId && item.toNodeId === nextNodeId);
    const from = db.graphNodes.find((node) => node.id === nodeId);
    const to = db.graphNodes.find((node) => node.id === nextNodeId);

    if (!edge || !from || !to) {
      return "Yo'lni davom ettiring";
    }

    if (edge.type === "stairs") {
      return `Zinapoyadan ${to.z + 1}-qavatga chiqing`;
    }

    if (edge.type === "lift") {
      return `Lift orqali ${to.z + 1}-qavatga o'ting`;
    }

    if (edge.type === "outdoor") {
      return `Bino oralig'idagi yo'lakdan ${edge.weight} metr yuring`;
    }

    return `${to.x >= from.x ? "To'g'riga" : "Chapga"} ${edge.weight} metr yuring`;
  });

export const routingService = {
  findRoute(input: RouteInput) {
    const room = db.rooms.find((item) => item.id === input.toRoomId);
    if (!room) {
      throw new Error("Target room not found");
    }

    const result =
      input.algorithm === "astar"
        ? astar(input.fromNodeId, room.nodeId)
        : dijkstra(input.fromNodeId, room.nodeId);

    return {
      distance: result.distance,
      estimatedTime: `${Math.max(1, Math.round(result.distance / 45))} min`,
      steps: instructionsForPath(result.path),
      path: result.path
    };
  }
};
