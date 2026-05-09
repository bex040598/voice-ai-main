import type { NextFunction, Response } from "express";
import type { AuthedRequest } from "../types/http.types.js";
import type { Role } from "../types/domain.types.js";

export const requireRole =
  (...roles: Role[]) =>
  (request: AuthedRequest, response: Response, next: NextFunction): void => {
    if (!request.auth || !roles.includes(request.auth.role)) {
      response.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
