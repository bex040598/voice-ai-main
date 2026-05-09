import { apiRequest } from "../../lib/api";
import { mockNfcTags, mockRooms } from "../../data/mockCampus";
import type { NfcTag } from "../../types";

export interface NfcResolveResult {
  tag: NfcTag;
  message: string;
}

export const resolveNfcTag = async (code: string): Promise<NfcResolveResult> =>
  apiRequest<NfcResolveResult>("/api/nfc/resolve", {
    method: "POST",
    body: JSON.stringify({ code }),
    fallback: async () => {
      const tag = mockNfcTags.find((item) => item.code.toLowerCase() === code.toLowerCase());

      if (!tag) {
        throw new Error("NFC teg topilmadi.");
      }

      const nearby = tag.nearbyRooms
        .map((roomName) => mockRooms.find((room) => room.name.includes(roomName))?.name ?? roomName)
        .join(", ");

      return {
        tag,
        message: `Siz ${tag.floorId.replace("floor-", "").toUpperCase()} hududidasiz. Yaqin joylar: ${nearby}. ${tag.description} bo'yicha yo'nalish tayyor.`
      };
    }
  });
