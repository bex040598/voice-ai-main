import type {
  GraphEdge,
  GraphNode,
  NavigationInstruction,
  RouteResponse,
  RouteSegment
} from "../../types";

const directionLabel = (dx: number, dy: number): string => {
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx >= 0 ? "o'ng tomonga" : "chap tomonga";
  }

  return dy >= 0 ? "pastga yo'naling" : "to'g'riga davom eting";
};

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

export const buildRouteSegments = (path: string[], edges: GraphEdge[]): RouteSegment[] => {
  const segments: RouteSegment[] = [];

  for (let index = 0; index < path.length - 1; index += 1) {
    const fromNodeId = path[index];
    const toNodeId = path[index + 1];
    const edge = edges.find(
      (candidate) => candidate.fromNodeId === fromNodeId && candidate.toNodeId === toNodeId
    );

    if (edge) {
      segments.push({
        fromNodeId,
        toNodeId,
        type: edge.type,
        distance: edge.weight
      });
    }
  }

  return segments;
};

export const generateInstructions = (
  path: string[],
  nodes: GraphNode[],
  edges: GraphEdge[]
): NavigationInstruction[] => {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const segments = buildRouteSegments(path, edges);

  return segments.map((segment) => {
    const from = nodeMap.get(segment.fromNodeId);
    const to = nodeMap.get(segment.toNodeId);

    if (!from || !to) {
      return { text: "Yo'lni davom ettiring", distance: segment.distance };
    }

    if (segment.type === "stairs") {
      return {
        text: `Zinapoyadan ${to.z + 1}-qavatga chiqing`,
        distance: segment.distance
      };
    }

    if (segment.type === "lift") {
      return {
        text: `Lift orqali ${to.z + 1}-qavatga o'ting`,
        distance: segment.distance
      };
    }

    if (segment.type === "outdoor") {
      return {
        text: `Bino oralig'idagi yo'lakdan ${segment.distance} metr yuring`,
        distance: segment.distance
      };
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return {
      text: `${directionLabel(dx, dy)} ${segment.distance} metr yuring`,
      distance: segment.distance
    };
  });
};

export const toRouteResponse = (
  path: string[],
  nodes: GraphNode[],
  edges: GraphEdge[]
): RouteResponse => {
  const segments = buildRouteSegments(path, edges);
  const instructions = generateInstructions(path, nodes, edges);
  const totalDistance = segments.reduce((sum, segment) => sum + segment.distance, 0);

  return {
    distance: totalDistance,
    estimatedTime: `${Math.max(1, Math.round(totalDistance / 45))} min`,
    steps: instructions.map((instruction) => instruction.text),
    path,
    segments
  };
};
