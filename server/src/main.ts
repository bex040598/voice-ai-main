import { createServer } from "http";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { db } from "./database/mockDb.js";

const port = Number(process.env.PORT ?? 4000);
const app = createApp();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  socket.emit("monitoring:update", db.monitoringStats);
});

setInterval(() => {
  db.monitoringStats.activeUsers = 65 + Math.floor(Math.random() * 8);
  io.emit("monitoring:update", db.monitoringStats);
}, 15_000);

server.listen(port, () => {
  console.info(`ATMURA mock server listening on http://localhost:${port}`);
});
