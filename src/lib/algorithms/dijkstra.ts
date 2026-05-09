import type { GraphEdge, GraphNode } from "../../types";

export interface PathResult {
  path: string[];
  distance: number;
}

export const buildAdjacencyMap = (edges: GraphEdge[]): Map<string, GraphEdge[]> => {
  const adjacency = new Map<string, GraphEdge[]>();

  edges.forEach((edge) => {
    const list = adjacency.get(edge.fromNodeId) ?? [];
    list.push(edge);
    adjacency.set(edge.fromNodeId, list);
  });

  return adjacency;
};

export const dijkstra = (
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string,
  targetNodeId: string
): PathResult => {
  const adjacency = buildAdjacencyMap(edges);
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();

  nodes.forEach((node) => {
    distances.set(node.id, Number.POSITIVE_INFINITY);
    previous.set(node.id, null);
  });

  distances.set(startNodeId, 0);

  while (visited.size < nodes.length) {
    let currentNodeId: string | null = null;
    let currentDistance = Number.POSITIVE_INFINITY;

    distances.forEach((distance, nodeId) => {
      if (!visited.has(nodeId) && distance < currentDistance) {
        currentDistance = distance;
        currentNodeId = nodeId;
      }
    });

    if (!currentNodeId || currentNodeId === targetNodeId) {
      break;
    }

    visited.add(currentNodeId);

    const nextEdges = adjacency.get(currentNodeId) ?? [];
    nextEdges.forEach((edge) => {
      const candidate = currentDistance + edge.weight;
      const existing = distances.get(edge.toNodeId) ?? Number.POSITIVE_INFINITY;

      if (candidate < existing) {
        distances.set(edge.toNodeId, candidate);
        previous.set(edge.toNodeId, currentNodeId);
      }
    });
  }

  const path = reconstructPath(previous, targetNodeId);
  return {
    path,
    distance: distances.get(targetNodeId) ?? Number.POSITIVE_INFINITY
  };
};

export const reconstructPath = (
  previous: Map<string, string | null>,
  targetNodeId: string
): string[] => {
  const path: string[] = [];
  let current: string | null = targetNodeId;

  while (current) {
    path.unshift(current);
    current = previous.get(current) ?? null;
  }

  return path;
};
