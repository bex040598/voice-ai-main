import { appendAuditLog, db } from "../../database/mockDb.js";

export const receptionService = {
  create(input: {
    fullName: string;
    phone: string;
    type: "application" | "suggestion" | "complaint" | "appointment";
    message: string;
  }) {
    const request = {
      id: `reception-${db.receptionRequests.length + 1}`,
      ...input,
      status: "new" as const,
      createdAt: new Date().toISOString()
    };
    db.receptionRequests.unshift(request);
    appendAuditLog("guest-demo", "created reception request", "ReceptionRequest");
    return request;
  },

  list() {
    return db.receptionRequests;
  },

  updateStatus(id: string, status: "new" | "in_review" | "accepted" | "rejected" | "completed") {
    const request = db.receptionRequests.find((item) => item.id === id);
    if (!request) {
      throw new Error("Reception request not found");
    }
    request.status = status;
    appendAuditLog("admin-1", "updated reception status", "ReceptionRequest");
    return request;
  }
};
