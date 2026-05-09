import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  response.status(500).json({
    message: error.message || "Internal server error"
  });
};
