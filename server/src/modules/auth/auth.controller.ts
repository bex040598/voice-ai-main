import type { Response } from "express";
import type { AuthedRequest } from "../../common/types/http.types.js";
import { loginSchema, registerSchema } from "./auth.types.js";
import { authService } from "./auth.service.js";

export const authController = {
  register(request: AuthedRequest, response: Response) {
    const input = registerSchema.parse(request.body);
    response.status(201).json(authService.register(input));
  },

  login(request: AuthedRequest, response: Response) {
    const input = loginSchema.parse(request.body);
    response.json(authService.login(input));
  },

  me(request: AuthedRequest, response: Response) {
    const user = request.auth ? authService.getMe(request.auth.sub) : null;
    response.json(user);
  }
};
