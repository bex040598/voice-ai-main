import { io, type Socket } from "socket.io-client";
import { apiBaseUrl } from "./api";

let socket: Socket | null = null;

export const getSocket = (): Socket | null => {
  if (import.meta.env.VITE_ENABLE_SOCKET !== "true") {
    return null;
  }

  if (!socket) {
    socket = io(apiBaseUrl, {
      transports: ["websocket"],
      autoConnect: false
    });
  }

  return socket;
};
