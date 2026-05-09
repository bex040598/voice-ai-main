import { apiRequest } from "../../lib/api";
import { mockPortfolioItems, mockPortfolios } from "../../data/mockAcademic";
import type { Portfolio, PortfolioItem } from "../../types";

export const getPortfolios = async (): Promise<Portfolio[]> =>
  apiRequest<Portfolio[]>("/api/portfolio", {
    fallback: async () => mockPortfolios
  });

export const getPortfolioItems = async (portfolioId: string): Promise<PortfolioItem[]> =>
  apiRequest<PortfolioItem[]>(`/api/portfolio/${portfolioId}/items`, {
    fallback: async () => mockPortfolioItems.filter((item) => item.portfolioId === portfolioId)
  });

export const addPortfolioItem = async (
  payload: Omit<PortfolioItem, "id">
): Promise<PortfolioItem> =>
  apiRequest<PortfolioItem>("/api/portfolio/items", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      const item: PortfolioItem = {
        ...payload,
        id: `portfolio-item-${mockPortfolioItems.length + 1}`
      };
      mockPortfolioItems.unshift(item);
      return item;
    }
  });
