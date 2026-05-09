import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/http.types.js";

const secret = process.env.JWT_SECRET ?? "atmura-demo-secret";

export const signJwt = (payload: JwtPayload): string =>
  jwt.sign(payload, secret, { expiresIn: "7d" });

export const verifyJwt = (token: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload;
