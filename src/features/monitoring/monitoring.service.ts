import jsPDF from "jspdf";
import { apiBaseUrl, apiRequest, isMockMode } from "../../lib/api";
import { mockActivityFeed, mockMonitoringStats } from "../../data/mockAcademic";
import type { MonitoringStats } from "../../types";

export const getMonitoringStats = async (): Promise<MonitoringStats> =>
  apiRequest<MonitoringStats>("/api/monitoring/stats", {
    fallback: async () => mockMonitoringStats
  });

export const getMonitoringActivity = async (): Promise<string[]> =>
  apiRequest<string[]>("/api/monitoring/activity", {
    fallback: async () => mockActivityFeed
  });

export const generateMonitoringReport = async (): Promise<void> => {
  if (!isMockMode) {
    window.open(`${apiBaseUrl}/api/reports/pdf`, "_blank");
    return;
  }

  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.text("ATMURA Monitoring Report", 14, 18);
  pdf.setFontSize(11);
  pdf.text(`Visitors today: ${mockMonitoringStats.todayVisitors}`, 14, 34);
  pdf.text(`Route requests: ${mockMonitoringStats.routeRequests}`, 14, 42);
  pdf.text(`Active users: ${mockMonitoringStats.activeUsers}`, 14, 50);
  pdf.text(`NFC scans: ${mockMonitoringStats.nfcScanCount}`, 14, 58);
  pdf.text(`Teacher searches: ${mockMonitoringStats.teacherSearchCount}`, 14, 66);
  pdf.text("Top searched rooms:", 14, 78);
  mockMonitoringStats.topSearchedRooms.forEach((room, index) => {
    pdf.text(`- ${room.name}: ${room.count}`, 18, 88 + index * 8);
  });
  pdf.save("atmura-monitoring-report.pdf");
};
