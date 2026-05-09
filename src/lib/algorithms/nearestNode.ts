import type { GraphNode } from "../../types";

export const findNearestNode = (
  nodes: GraphNode[],
  current: Pick<GraphNode, "buildingId" | "floorId" | "x" | "y" | "z">
): GraphNode | null => {
  const candidates = nodes.filter(
    (node) => node.buildingId === current.buildingId && node.floorId === current.floorId
  );

  if (candidates.length === 0) {
    return null;
  }

  return candidates.reduce((closest, node) => {
    const currentDistance = Math.hypot(node.x - current.x, node.y - current.y);
    const previousDistance = Math.hypot(closest.x - current.x, closest.y - current.y);
    return currentDistance < previousDistance ? node : closest;
  });
};
