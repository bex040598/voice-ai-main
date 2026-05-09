import { db } from "../../database/mockDb.js";
import type { UpdateUserInput } from "./users.types.js";

export const usersService = {
  list() {
    return db.users;
  },

  getById(id: string) {
    return db.users.find((user) => user.id === id) ?? null;
  },

  update(id: string, input: UpdateUserInput) {
    const user = db.users.find((candidate) => candidate.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, input);
    return user;
  },

  delete(id: string) {
    const index = db.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    db.users.splice(index, 1);
    return { success: true };
  }
};
