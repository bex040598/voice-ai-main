import { z } from "zod";

export const routeSchema = z.object({
  fromNodeId: z.string(),
  toRoomId: z.string(),
  algorithm: z.enum(["dijkstra", "astar"])
});

export type RouteInput = z.infer<typeof routeSchema>;
