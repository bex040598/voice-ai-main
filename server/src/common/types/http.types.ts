import type { Request } from "express";
import type { Role } from "./domain.types.js";

export interface JwtPayload {
  sub: string;
  role: Role;
  email: string;
}

export interface AuthedRequest extends Request {
  auth?: JwtPayload;
}
