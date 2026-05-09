import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimitMiddleware } from "./common/middleware/rateLimit.middleware.js";
import { errorMiddleware } from "./common/middleware/error.middleware.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";
import { campusRoutes } from "./modules/campus/campus.routes.js";
import { routingRoutes } from "./modules/routing/routing.routes.js";
import { assistantRoutes } from "./modules/assistant/assistant.routes.js";
import { nfcRoutes } from "./modules/nfc/nfc.routes.js";
import { telegramRoutes } from "./modules/telegram/telegram.routes.js";
import { receptionRoutes } from "./modules/reception/reception.routes.js";
import { resourcesRoutes } from "./modules/resources/resources.routes.js";
import { testsRoutes } from "./modules/tests/tests.routes.js";
import { monitoringRoutes, reportsRoutes } from "./modules/monitoring/monitoring.routes.js";
import { portfolioRoutes } from "./modules/portfolio/portfolio.routes.js";

export const createApp = () => {
  const app = express();
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFile);
  const clientDistDir = path.resolve(currentDir, "../../dist");

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(rateLimitMiddleware);

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api", campusRoutes);
  app.use("/api/route", routingRoutes);
  app.use("/api/assistant", assistantRoutes);
  app.use("/api/nfc", nfcRoutes);
  app.use("/api/telegram", telegramRoutes);
  app.use("/api/reception", receptionRoutes);
  app.use("/api/resources", resourcesRoutes);
  app.use("/api/tests", testsRoutes);
  app.use("/api/monitoring", monitoringRoutes);
  app.use("/api/reports", reportsRoutes);
  app.use("/api/portfolio", portfolioRoutes);

  if (existsSync(clientDistDir)) {
    app.use(express.static(clientDistDir));

    app.get(/^(?!\/api).*/, (_request, response) => {
      response.sendFile(path.join(clientDistDir, "index.html"));
    });
  }

  app.use(errorMiddleware);

  return app;
};
