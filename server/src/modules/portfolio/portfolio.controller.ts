import type { Request, Response } from "express";
import { createPortfolioItemSchema } from "./portfolio.types.js";
import { portfolioService } from "./portfolio.service.js";

export const portfolioController = {
  list(_request: Request, response: Response) {
    response.json(portfolioService.list());
  },

  listItems(request: Request, response: Response) {
    response.json(portfolioService.listItems(String(request.params.id)));
  },

  addItem(request: Request, response: Response) {
    response.status(201).json(portfolioService.addItem(createPortfolioItemSchema.parse(request.body)));
  }
};
