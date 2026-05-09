import { apiRequest } from "../../lib/api";
import { mockUsers } from "../../data/mockUsers";
import type { Role, User } from "../../types";

export interface AuthResponse {
  token: string;
  user: User;
}

const createToken = (user: User): string =>
  btoa(
    JSON.stringify({
      sub: user.id,
      role: user.role,
      email: user.email
    })
  );

export const login = async (email: string, password: string): Promise<AuthResponse> =>
  apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    fallback: async () => {
      const user = mockUsers.find(
        (candidate) => candidate.email.toLowerCase() === email.toLowerCase() && candidate.passwordHash === password
      );

      if (!user) {
        throw new Error("Email yoki parol noto'g'ri.");
      }

      return {
        token: createToken(user),
        user
      };
    }
  });

export const register = async (payload: {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}): Promise<AuthResponse> =>
  apiRequest<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      const user: User = {
        id: `user-${mockUsers.length + 1}`,
        fullName: payload.fullName,
        email: payload.email,
        passwordHash: payload.password,
        role: payload.role,
        avatarUrl: "",
        faceId: null,
        telegramId: null,
        createdAt: new Date().toISOString()
      };

      mockUsers.push(user);

      return {
        token: createToken(user),
        user
      };
    }
  });

export const getCurrentUser = async (token: string): Promise<User | null> =>
  apiRequest<User | null>("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
    fallback: async () => {
      try {
        const parsed = JSON.parse(atob(token)) as { sub: string };
        return mockUsers.find((user) => user.id === parsed.sub) ?? null;
      } catch {
        return null;
      }
    }
  });
