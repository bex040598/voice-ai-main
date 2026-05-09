import { motion } from "framer-motion";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { mockGraphEdges, mockGraphNodes, mockNfcTags, mockRooms } from "../../data/mockCampus";
import { cn } from "../../lib/utils";
import type { GraphNode, RouteResponse } from "../../types";

interface CampusMapCanvasProps {
  floorId: string;
  route: RouteResponse | null;
  selectedRoomId?: string;
  showNfc?: boolean;
  showVertical?: boolean;
  onSelectRoom?: (roomId: string) => void;
}

const roomColor = (roomId: string, selectedRoomId?: string): string =>
  selectedRoomId === roomId ? "#00d4ff" : "#ffffff";

export const CampusMapCanvas = ({
  floorId,
  route,
  selectedRoomId,
  showNfc = true,
  showVertical = true,
  onSelectRoom
}: CampusMapCanvasProps) => {
  const [zoom, setZoom] = useState(1);
  const floorNodes = mockGraphNodes.filter(
    (node) => node.floorId === floorId && (showVertical || (node.type !== "stairs" && node.type !== "lift"))
  );
  const floorEdges = mockGraphEdges.filter((edge) => {
    const from = mockGraphNodes.find((node) => node.id === edge.fromNodeId);
    const to = mockGraphNodes.find((node) => node.id === edge.toNodeId);
    return (
      from?.floorId === floorId &&
      to?.floorId === floorId &&
      (showVertical || (edge.type !== "stairs" && edge.type !== "lift"))
    );
  });
  const floorRooms = mockRooms.filter((room) => room.floorId === floorId);
  const floorNfc = mockNfcTags.filter((tag) => tag.floorId === floorId);
  const nodeMap = useMemo(() => new Map(mockGraphNodes.map((node) => [node.id, node])), []);
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
  const currentLocation = floorNodes.find((node) => node.type === "entrance") ?? floorNodes[0];
  const targetNode = selectedRoomId ? nodeMap.get(mockRooms.find((room) => room.id === selectedRoomId)?.nodeId ?? "") : null;

  return (
    <div className="relative h-[620px] overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(6,20,38,0.94),rgba(11,45,91,0.88))]">
      <div className="absolute inset-0 atmura-grid bg-hero-grid opacity-25" />
      <div className="absolute inset-0 atmura-noise opacity-25" />
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(6,20,38,0.75)] px-3 py-2 text-xs text-white/60 backdrop-blur-md">
        <LocateFixed className="h-4 w-4 text-cyan-300" />
        Floor ID: {floorId}
      </div>
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(6,20,38,0.75)] text-white/70 backdrop-blur-md"
          onClick={() => setZoom((value) => Math.min(1.6, value + 0.1))}
          type="button"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(6,20,38,0.75)] text-white/70 backdrop-blur-md"
          onClick={() => setZoom((value) => Math.max(0.8, value - 0.1))}
          type="button"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      <svg
        className="absolute inset-0 h-full w-full transition-transform duration-300"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        viewBox="0 0 1080 680"
      >
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
              stroke={edge.type === "stairs" ? "#7c3aed" : edge.type === "lift" ? "#00d4ff" : "rgba(226,232,240,0.28)"}
              strokeWidth={edge.type === "corridor" ? 10 : 12}
              strokeLinecap="round"
              opacity={0.84}
            />
          );
        })}

        {currentPath ? (
          <>
            <motion.polyline
              fill="none"
              points={currentPath}
              stroke="rgba(0,212,255,0.25)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={20}
              initial={{ pathLength: 0, opacity: 0.1 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            <motion.polyline
              fill="none"
              points={currentPath}
              stroke="#00d4ff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={9}
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: 1, opacity: 0.95 }}
              transition={{ duration: 1.25, ease: "easeInOut" }}
            />
          </>
        ) : null}

        {floorNodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              fill={node.type === "stairs" ? "#7c3aed" : node.type === "lift" ? "#00d4ff" : "#E2E8F0"}
              r={node.type === "entrance" ? 15 : 10}
              opacity={node.type === "corridor" ? 0.9 : 1}
            />
            <text
              x={node.x}
              y={node.y - 18}
              textAnchor="middle"
              fontSize="11"
              fill="rgba(255,255,255,0.58)"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              {node.label}
            </text>
          </g>
        ))}

        {currentLocation ? (
          <>
            <circle cx={currentLocation.x} cy={currentLocation.y} r={24} fill="rgba(0,212,255,0.12)" />
            <circle cx={currentLocation.x} cy={currentLocation.y} r={10} fill="#00d4ff" />
          </>
        ) : null}

        {targetNode ? (
          <>
            <circle cx={targetNode.x} cy={targetNode.y} r={24} fill="rgba(124,58,237,0.18)" />
            <circle cx={targetNode.x} cy={targetNode.y} r={11} fill="#7c3aed" />
          </>
        ) : null}

        {showNfc
          ? floorNfc.map((tag) => {
          const node = nodeMap.get(tag.nodeId);
          if (!node) {
            return null;
          }

          return (
            <g key={tag.id}>
              <rect
                x={node.x - 11}
                y={node.y + 12}
                rx={8}
                width={22}
                height={22}
                fill="rgba(0,212,255,0.18)"
                stroke="rgba(0,212,255,0.65)"
              />
              <text
                x={node.x}
                y={node.y + 27}
                textAnchor="middle"
                fontSize="11"
                fill="#00d4ff"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                N
              </text>
            </g>
          );
          })
          : null}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 grid gap-3 xl:grid-cols-[1fr_220px]">
        <div className="grid gap-3 md:grid-cols-3">
          {floorRooms.slice(0, 9).map((room) => (
            <button
              key={room.id}
              className={cn(
                "rounded-2xl border px-3 py-3 text-left transition backdrop-blur-md",
                selectedRoomId === room.id
                  ? "border-cyan-400/40 bg-cyan-500/12"
                  : "border-white/10 bg-[rgba(6,20,38,0.74)] hover:border-cyan-300/35 hover:bg-white/8"
              )}
              onClick={() => onSelectRoom?.(room.id)}
              style={{ color: roomColor(room.id, selectedRoomId) }}
              type="button"
            >
              <p className="text-sm font-semibold">{room.name}</p>
              <p className="mt-1 text-xs text-white/45">{room.type}</p>
            </button>
          ))}
        </div>

        <div className="rounded-[26px] border border-white/10 bg-[rgba(6,20,38,0.78)] p-4 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Mini map</p>
          <div className="mt-4 h-28 rounded-[20px] border border-white/10 bg-white/6 p-3">
            <div className="flex h-full items-end gap-2">
              {["A1", "A2", "B3", "C2"].map((item, index) => (
                <div key={item} className="flex-1">
                  <div
                    className={`w-full rounded-t-2xl ${
                      floorId === ["floor-a1", "floor-a2", "floor-b3", "floor-c2"][index] ? "bg-cyan-400" : "bg-white/20"
                    }`}
                    style={{ height: `${36 + index * 12}px` }}
                  />
                  <p className="mt-2 text-center text-[11px] text-white/45">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
