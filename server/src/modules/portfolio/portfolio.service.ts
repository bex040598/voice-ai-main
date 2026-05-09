import { appendAuditLog, db } from "../../database/mockDb.js";

export const portfolioService = {
  list() {
    return db.portfolios;
  },

  listItems(portfolioId: string) {
    return db.portfolioItems.filter((item) => item.portfolioId === portfolioId);
  },

  addItem(input: {
    portfolioId: string;
    fileUrl: string;
    type: string;
    description: string;
  }) {
    const item = {
      id: `portfolio-item-${db.portfolioItems.length + 1}`,
      ...input
    };
    db.portfolioItems.unshift(item);
    appendAuditLog("student-1", "uploaded portfolio item", "PortfolioItem");
    return item;
  }
};
