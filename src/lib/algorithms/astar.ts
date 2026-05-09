import type { GraphEdge, GraphNode } from "../../types";
import { buildAdjacencyMap, reconstructPath, type PathResult } from "./dijkstra";

const heuristic = (from: GraphNode, to: GraphNode): number => {
  const floorPenalty = Math.abs(from.z - to.z) * 22;
  return Math.round(Math.hypot(from.x - to.x, from.y - to.y) / 10 + floorPenalty);
};

export const astar = (
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string,
  targetNodeId: string
): PathResult => {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const adjacency = buildAdjacencyMap(edges);
  const openSet = new Set<string>([startNodeId]);
  const cameFrom = new Map<string, string | null>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const targetNode = nodeMap.get(targetNodeId);

  nodes.forEach((node) => {
    gScore.set(node.id, Number.POSITIVE_INFINITY);
    fScore.set(node.id, Number.POSITIVE_INFINITY);
    cameFrom.set(node.id, null);
  });

  gScore.set(startNodeId, 0);
  fScore.set(
    startNodeId,
    targetNode ? heuristic(nodeMap.get(startNodeId) ?? nodes[0], targetNode) : Number.POSITIVE_INFINITY
  );

  while (openSet.size > 0) {
    let currentNodeId: string | null = null;
    let bestScore = Number.POSITIVE_INFINITY;

    openSet.forEach((candidate) => {
      const score = fScore.get(candidate) ?? Number.POSITIVE_INFINITY;
      if (score < bestScore) {
        bestScore = score;
        currentNodeId = candidate;
      }
    });

    if (!currentNodeId) {
      break;
    }

    if (currentNodeId === targetNodeId) {
      return {
        path: reconstructPath(cameFrom, targetNodeId),
        distance: gScore.get(targetNodeId) ?? Number.POSITIVE_INFINITY
      };
    }

    openSet.delete(currentNodeId);

    const edgesFromNode = adjacency.get(currentNodeId) ?? [];
    edgesFromNode.forEach((edge) => {
      const currentScore = gScore.get(currentNodeId ?? "") ?? Number.POSITIVE_INFINITY;
      const tentative = currentScore + edge.weight;
      const known = gScore.get(edge.toNodeId) ?? Number.POSITIVE_INFINITY;

      if (tentative < known) {
        cameFrom.set(edge.toNodeId, currentNodeId);
        gScore.set(edge.toNodeId, tentative);

        const nextNode = nodeMap.get(edge.toNodeId);
        if (nextNode && targetNode) {
          fScore.set(edge.toNodeId, tentative + heuristic(nextNode, targetNode));
        }

        openSet.add(edge.toNodeId);
      }
    });
  }

  return {
    path: [],
    distance: Number.POSITIVE_INFINITY
  };
};
