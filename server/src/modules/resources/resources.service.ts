import { appendAuditLog, db } from "../../database/mockDb.js";

export const resourcesService = {
  create(input: {
    title: string;
    type: string;
    fileUrl: string;
    subjectId: string;
    createdBy: string;
  }) {
    const resource = {
      id: `resource-${db.resources.length + 1}`,
      ...input
    };
    db.resources.unshift(resource);
    appendAuditLog(input.createdBy, "created resource", "Resource");
    return resource;
  },

  list() {
    return db.resources;
  },

  remove(id: string) {
    const index = db.resources.findIndex((resource) => resource.id === id);
    if (index === -1) {
      throw new Error("Resource not found");
    }
    db.resources.splice(index, 1);
    return { success: true };
  }
};
