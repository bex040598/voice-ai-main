import { mockNfcTags } from "./mockCampus";

export { mockNfcTags };

export const mockNfcScanHistory = [
  { id: "scan-1", code: "NFC-ENTRANCE-1", resolvedAt: "10:04", zone: "Asosiy kirish" },
  { id: "scan-2", code: "NFC-1F-REGISTRAR", resolvedAt: "10:11", zone: "Registrator" },
  { id: "scan-3", code: "NFC-2F-LIBRARY", resolvedAt: "10:18", zone: "Kutubxona" },
  { id: "scan-4", code: "NFC-3F-DEAN", resolvedAt: "10:26", zone: "Dekanat hududi" },
  { id: "scan-5", code: "NFC-LAB-AI", resolvedAt: "10:37", zone: "AI laboratoriya" }
];
