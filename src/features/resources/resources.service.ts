import { apiRequest } from "../../lib/api";
import { mockResources } from "../../data/mockAcademic";
import type { Resource } from "../../types";

export const getResources = async (): Promise<Resource[]> =>
  apiRequest<Resource[]>("/api/resources", {
    fallback: async () => mockResources
  });

export const createResource = async (
  payload: Omit<Resource, "id">
): Promise<Resource> =>
  apiRequest<Resource>("/api/resources", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      const resource: Resource = { ...payload, id: `resource-${mockResources.length + 1}` };
      mockResources.unshift(resource);
      return resource;
    }
  });

export const deleteResource = async (id: string): Promise<{ success: boolean }> =>
  apiRequest<{ success: boolean }>(`/api/resources/${id}`, {
    method: "DELETE",
    fallback: async () => {
      const index = mockResources.findIndex((resource) => resource.id === id);
      if (index >= 0) {
        mockResources.splice(index, 1);
      }
      return { success: true };
    }
  });
