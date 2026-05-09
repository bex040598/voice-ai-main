import type { Request, Response } from "express";
import { nfcResolveSchema } from "./nfc.types.js";
import { nfcService } from "./nfc.service.js";

export const nfcController = {
  resolve(request: Request, response: Response) {
    const { code } = nfcResolveSchema.parse(request.body);
    response.json(nfcService.resolve(code));
  }
};
