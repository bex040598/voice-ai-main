import { apiRequest } from "../../lib/api";
import { mockReceptionRequests } from "../../data/mockAcademic";
import type { ReceptionRequest } from "../../types";

export const createReceptionRequest = async (
  payload: Omit<ReceptionRequest, "id" | "status" | "createdAt">
): Promise<ReceptionRequest> =>
  apiRequest<ReceptionRequest>("/api/reception/request", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      const request: ReceptionRequest = {
        ...payload,
        id: `reception-${mockReceptionRequests.length + 1}`,
        status: "new",
        createdAt: new Date().toISOString()
      };
      mockReceptionRequests.unshift(request);
      return request;
    }
  });

export const getReceptionRequests = async (): Promise<ReceptionRequest[]> =>
  apiRequest<ReceptionRequest[]>("/api/reception/requests", {
    fallback: async () => mockReceptionRequests
  });

export const updateReceptionStatus = async (
  id: string,
  status: ReceptionRequest["status"]
): Promise<ReceptionRequest> =>
  apiRequest<ReceptionRequest>(`/api/reception/requests/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    fallback: async () => {
      const request = mockReceptionRequests.find((item) => item.id === id);
      if (!request) {
        throw new Error("Murojaat topilmadi.");
      }
      request.status = status;
      return request;
    }
  });
