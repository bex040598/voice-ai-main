import type { NextFunction, Request, Response } from "express";

const cache = new Map<string, { count: number; timestamp: number }>();

export const rateLimitMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  const key = `${request.ip}:${request.path}`;
  const now = Date.now();
  const entry = cache.get(key);

  if (!entry || now - entry.timestamp > 60_000) {
    cache.set(key, { count: 1, timestamp: now });
    next();
    return;
  }

  if (entry.count >= 120) {
    response.status(429).json({ message: "Too many requests" });
    return;
  }

  entry.count += 1;
  cache.set(key, entry);
  next();
};
