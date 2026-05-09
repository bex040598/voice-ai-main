import PDFDocument from "pdfkit";
import type { MonitoringStats } from "../types/domain.types.js";

export const createMonitoringPdfBuffer = async (stats: MonitoringStats): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const document = new PDFDocument({ margin: 40 });
    const chunks: Buffer[] = [];

    document.on("data", (chunk) => chunks.push(chunk as Buffer));
    document.on("end", () => resolve(Buffer.concat(chunks)));
    document.on("error", reject);

    document.fontSize(20).text("ATMURA Monitoring Report");
    document.moveDown();
    document.fontSize(12).text(`Visitors today: ${stats.todayVisitors}`);
    document.text(`Route requests: ${stats.routeRequests}`);
    document.text(`Active users: ${stats.activeUsers}`);
    document.text(`Teacher searches: ${stats.teacherSearchCount}`);
    document.text(`NFC scan count: ${stats.nfcScanCount}`);
    document.text(`Reception requests: ${stats.receptionRequests}`);
    document.text(`Test submissions: ${stats.testSubmissions}`);
    document.moveDown();
    document.text("Top searched rooms:");
    stats.topSearchedRooms.forEach((room) => {
      document.text(`- ${room.name}: ${room.count}`);
    });
    document.end();
  });
