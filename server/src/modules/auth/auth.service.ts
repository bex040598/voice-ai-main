import { db } from "../../database/mockDb.js";
import { comparePassword, hashPassword } from "../../common/utils/hash.utils.js";
import { signJwt } from "../../common/utils/jwt.utils.js";
import type { JwtPayload } from "../../common/types/http.types.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";

export const authService = {
  register(input: RegisterInput) {
    const exists = db.users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());
    if (exists) {
      throw new Error("User already exists");
    }

    const user = {
      id: `user-${db.users.length + 1}`,
      fullName: input.fullName,
      email: input.email,
      passwordHash: hashPassword(input.password),
      role: input.role,
      avatarUrl: "",
      faceId: null,
      telegramId: null,
      createdAt: new Date().toISOString()
    };

    db.users.push(user);
    const payload: JwtPayload = { sub: user.id, role: user.role, email: user.email };
    return { user, token: signJwt(payload) };
  },

  login(input: LoginInput) {
    const user = db.users.find((candidate) => candidate.email.toLowerCase() === input.email.toLowerCase());
    if (!user || !comparePassword(input.password, user.passwordHash)) {
      throw new Error("Invalid credentials");
    }

    const payload: JwtPayload = { sub: user.id, role: user.role, email: user.email };
    return { user, token: signJwt(payload) };
  },

  getMe(userId: string) {
    return db.users.find((user) => user.id === userId) ?? null;
  }
};
