import type { NextFunction, Response } from "express";
import type { AuthedRequest } from "../types/http.types.js";
import { verifyJwt } from "../utils/jwt.utils.js";

export const authMiddleware = (request: AuthedRequest, response: Response, next: NextFunction): void => {
  const header = request.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    response.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    request.auth = verifyJwt(header.replace("Bearer ", ""));
    next();
  } catch {
    response.status(401).json({ message: "Invalid token" });
  }
};
