import { db } from "../../database/mockDb.js";

export const nfcService = {
  resolve(code: string) {
    const tag = db.nfcTags.find((item) => item.code.toLowerCase() === code.toLowerCase());
    if (!tag) {
      throw new Error("NFC tag not found");
    }

    return {
      tag,
      message: `Siz ${tag.description} hududidasiz. Yaqin joylar: ${tag.nearbyRooms.join(", ")}.`
    };
  }
};
