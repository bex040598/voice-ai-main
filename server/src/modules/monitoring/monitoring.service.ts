import { db } from "../../database/mockDb.js";
import { createMonitoringPdfBuffer } from "../../common/utils/pdf.utils.js";

export const monitoringService = {
  stats() {
    return db.monitoringStats;
  },

  activity() {
    return db.activityFeed;
  },

  pdf() {
    return createMonitoringPdfBuffer(db.monitoringStats);
  }
};
