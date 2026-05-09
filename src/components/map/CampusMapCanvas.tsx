import { motion } from "framer-motion";
import { mockGraphEdges, mockGraphNodes, mockRooms } from "../../data/mockCampus";
import { cn } from "../../lib/utils";
import type { GraphNode, RouteResponse } from "../../types";

interface CampusMapCanvasProps {
  floorId: string;
  route: RouteResponse | null;
  selectedRoomId?: string;
  onSelectRoom?: (roomId: string) => void;
}

const roomColor = (roomId: string, selectedRoomId?: string): string =>
  selectedRoomId === roomId ? "#0fb8de" : "#10233e";

export const CampusMapCanvas = ({
  floorId,
  route,
  selectedRoomId,
  onSelectRoom
}: CampusMapCanvasProps) => {
  const floorNodes = mockGraphNodes.filter((node) => node.floorId === floorId);
  const floorEdges = mockGraphEdges.filter((edge) => {
    const from = mockGraphNodes.find((node) => node.id === edge.fromNodeId);
    const to = mockGraphNodes.find((node) => node.id === edge.toNodeId);
    return from?.floorId === floorId && to?.floorId === floorId;
  });
  const floorRooms = mockRooms.filter((room) => room.floorId === floorId);
  const nodeMap = new Map(mockGraphNodes.map((node) => [node.id, node]));
  const pathNodes: GraphNode[] = [];

  if (route) {
    route.path.forEach((nodeId) => {
      const node = nodeMap.get(nodeId);
      if (node && node.floorId === floorId) {
        pathNodes.push(node);
      }
    });
  }

  const currentPath = pathNodes.map((node) => `${node.x},${node.y}`).join(" ");

  return (
    <div className="relative h-[540px] overflow-hidden rounded-[30px] border border-white/70 bg-white/70">
      <div className="atmura-grid absolute inset-0 bg-hero-grid opacity-30" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1080 680">
        {floorEdges.map((edge) => {
          const from = nodeMap.get(edge.fromNodeId);
          const to = nodeMap.get(edge.toNodeId);

          if (!from || !to) {
            return null;
          }

          return (
            <line
              key={edge.id}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={edge.type === "stairs" ? "#4f46e5" : edge.type === "lift" ? "#0fb8de" : "#cbd5e1"}
              strokeWidth={edge.type === "corridor" ? 8 : 10}
              strokeLinecap="round"
              opacity={0.75}
            />
          );
        })}

        {currentPath ? (
          <motion.polyline
            fill="none"
            points={currentPath}
            stroke="#0fb8de"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={12}
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        ) : null}

        {floorNodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              fill={node.type === "stairs" ? "#4f46e5" : node.type === "lift" ? "#0fb8de" : "#10233e"}
              r={node.type === "entrance" ? 15 : 11}
            />
            <text
              x={node.x}
              y={node.y - 18}
              textAnchor="middle"
              fontSize="12"
              fill="#475569"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
        {floorRooms.slice(0, 9).map((room) => (
          <button
            key={room.id}
            className={cn(
              "rounded-2xl border px-3 py-3 text-left transition",
              selectedRoomId === room.id
                ? "border-cyan-400 bg-cyan-50"
                : "border-white/80 bg-white/90 hover:border-cyan-300"
            )}
            onClick={() => onSelectRoom?.(room.id)}
            style={{ color: roomColor(room.id, selectedRoomId) }}
            type="button"
          >
            <p className="text-sm font-semibold">{room.name}</p>
            <p className="mt-1 text-xs text-slate-500">{room.type}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
