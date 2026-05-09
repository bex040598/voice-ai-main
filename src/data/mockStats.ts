import type {
  ActivityEvent,
  ChartPoint,
  DashboardMetric,
  HeatmapPoint,
  SystemLog,
  SystemService,
  TeacherRanking
} from "../types";

export const mockDashboardMetrics: DashboardMetric[] = [
  { id: "visitors", label: "Today Visitors", value: 1284, change: 12.4, hint: "Kampus kirishlari va mehmon oqimi", tone: "cyan", series: [46, 58, 62, 74, 82, 91, 96] },
  { id: "routes", label: "Route Requests", value: 842, change: 18.2, hint: "Dijkstra va A* yo'nalish so'rovlari", tone: "violet", series: [24, 34, 39, 44, 48, 53, 60] },
  { id: "students", label: "Active Students", value: 468, change: 9.8, hint: "Shaxsiy kabinet va test oqimlari", tone: "emerald", series: [40, 44, 51, 58, 62, 69, 72] },
  { id: "teacher-search", label: "Teacher Searches", value: 203, change: 6.2, hint: "Ask-any-teacher qidiruvlari", tone: "amber", series: [12, 16, 18, 20, 22, 25, 28] },
  { id: "nfc", label: "NFC Scans", value: 176, change: 14.1, hint: "Touch-to-guide terminal faolligi", tone: "cyan", series: [9, 12, 16, 18, 22, 24, 27] },
  { id: "voice", label: "Voice Queries", value: 229, change: 11.6, hint: "Ovozli so'rov va hissiy tahlillar", tone: "violet", series: [11, 15, 21, 27, 29, 33, 37] },
  { id: "face", label: "Face Greetings", value: 317, change: 8.9, hint: "Kamera asosidagi kutib olishlar", tone: "emerald", series: [19, 24, 28, 30, 35, 42, 47] },
  { id: "ar", label: "AR Sessions", value: 94, change: 22.8, hint: "AR guide demo ochilishlari", tone: "amber", series: [4, 7, 9, 11, 13, 16, 18] },
  { id: "reception", label: "Reception Requests", value: 31, change: 5.1, hint: "Rektor qabulxonasi murojaatlari", tone: "cyan", series: [1, 3, 4, 5, 5, 6, 7] },
  { id: "telegram", label: "Telegram Messages", value: 147, change: 17.3, hint: "Bot orqali yuborilgan route va xabarlar", tone: "violet", series: [8, 10, 13, 17, 21, 23, 25] }
];

export const mockMonitoringSeries: ChartPoint[] = [
  { label: "08:00", routeRequests: 32, voiceQueries: 12, faceGreetings: 24, nfcScans: 18, telegramMessages: 9, arSessions: 4 },
  { label: "09:00", routeRequests: 54, voiceQueries: 22, faceGreetings: 39, nfcScans: 26, telegramMessages: 14, arSessions: 6 },
  { label: "10:00", routeRequests: 61, voiceQueries: 29, faceGreetings: 51, nfcScans: 31, telegramMessages: 18, arSessions: 9 },
  { label: "11:00", routeRequests: 74, voiceQueries: 34, faceGreetings: 58, nfcScans: 37, telegramMessages: 24, arSessions: 11 },
  { label: "12:00", routeRequests: 69, voiceQueries: 27, faceGreetings: 48, nfcScans: 29, telegramMessages: 21, arSessions: 10 },
  { label: "13:00", routeRequests: 77, voiceQueries: 36, faceGreetings: 55, nfcScans: 33, telegramMessages: 26, arSessions: 13 },
  { label: "14:00", routeRequests: 88, voiceQueries: 41, faceGreetings: 63, nfcScans: 38, telegramMessages: 29, arSessions: 16 },
  { label: "15:00", routeRequests: 97, voiceQueries: 47, faceGreetings: 71, nfcScans: 46, telegramMessages: 34, arSessions: 18 }
];

export const mockActivityEvents: ActivityEvent[] = [
  { id: "activity-1", type: "face", title: "Yuz tanildi", description: "Bexzod Karimov 94% ishonchlilik bilan tanildi.", timestamp: "10:04", badge: "Student" },
  { id: "activity-2", type: "route", title: "Yo'nalish hisoblandi", description: "215-xonaga marshrut Dijkstra algoritmi orqali hisoblandi.", timestamp: "10:06", badge: "A*" },
  { id: "activity-3", type: "nfc", title: "NFC skan qilindi", description: "NFC-2F-LIBRARY kodi kutubxona yo'lagiga muvaffaqiyatli bog'landi.", timestamp: "10:08", badge: "NFC" },
  { id: "activity-4", type: "voice", title: "Voice query", description: "\"Kutubxona qayerda?\" so'rovi confused holatda qayd etildi.", timestamp: "10:10", badge: "Emotion" },
  { id: "activity-5", type: "teacher", title: "Teacher search", description: "G'olib Rashidovich bo'yicha schedule natijasi chiqarildi.", timestamp: "10:13", badge: "Schedule" },
  { id: "activity-6", type: "telegram", title: "Telegram xabari yuborildi", description: "Route karta va bosqichlar Telegram botga jo'natildi.", timestamp: "10:15", badge: "Bot" },
  { id: "activity-7", type: "reception", title: "Murojaat yaratildi", description: "Virtual rektor qabulxonasiga yangi appointment so'rovi tushdi.", timestamp: "10:18", badge: "New" },
  { id: "activity-8", type: "system", title: "Socket update", description: "Realtime monitoring panelga yangi statistika jo'natildi.", timestamp: "10:20", badge: "Live" },
  { id: "activity-9", type: "route", title: "Qavatlar oralig'i yo'li", description: "Lift orqali 1-qavatdan 2-qavatga o'tish bo'yicha marshrut yangilandi.", timestamp: "10:23", badge: "Lift" },
  { id: "activity-10", type: "face", title: "Unknown guest", description: "Tizim noma'lum mehmonni xush kelibsiz ssenariysi bilan kutib oldi.", timestamp: "10:26", badge: "Guest" },
  { id: "activity-11", type: "voice", title: "Tone adaptation", description: "Ovoz ohangiga qarab javob uslubi moslashtirildi.", timestamp: "10:29", badge: "Adaptive" },
  { id: "activity-12", type: "nfc", title: "Emergency hint", description: "NFC-3F-DEAN nuqtasi uchun favqulodda chiqish ma'lumoti ko'rsatildi.", timestamp: "10:32", badge: "Safety" },
  { id: "activity-13", type: "teacher", title: "Department filter", description: "Multimedia kafedrasi bo'yicha 4 ta o'qituvchi natijasi topildi.", timestamp: "10:34", badge: "Filter" },
  { id: "activity-14", type: "telegram", title: "QR link generated", description: "Telegram ulash uchun yangi bog'lash sessiyasi yaratildi.", timestamp: "10:36", badge: "Link" },
  { id: "activity-15", type: "system", title: "Render server active", description: "Live servis sog'lom javob qaytarmoqda va API faol ishlamoqda.", timestamp: "10:40", badge: "Healthy" }
];

export const mockSystemServices: SystemService[] = [
  { id: "service-1", name: "AI Assistant", status: "online", description: "Natural query va context routing faol.", latency: "132 ms" },
  { id: "service-2", name: "Voice Service", status: "active", description: "Speech-to-text va tone adaption demo ishlamoqda.", latency: "88 ms" },
  { id: "service-3", name: "Face Engine", status: "demo", description: "Mock identification va greeting ssenariylari tayyor.", latency: "64 ms" },
  { id: "service-4", name: "NFC Service", status: "ready", description: "Tag resolve va location binding muvaffaqiyatli.", latency: "53 ms" },
  { id: "service-5", name: "Telegram Bot", status: "active", description: "Route xabarlari mock / live adapterga tayyor.", latency: "91 ms" },
  { id: "service-6", name: "Database", status: "online", description: "Mock cache va API fallback qatlamlari sog'lom.", latency: "39 ms" },
  { id: "service-7", name: "Render Server", status: "online", description: "Production web service health check'dan o'tgan.", latency: "147 ms" }
];

export const mockTeacherRanking: TeacherRanking[] = [
  { id: "rank-1", fullName: "G'olib Rashidovich", searches: 62, department: "AI Lab" },
  { id: "rank-2", fullName: "Nodira Xolmatova", searches: 51, department: "Matematika" },
  { id: "rank-3", fullName: "Malika Sobirova", searches: 39, department: "Multimedia" },
  { id: "rank-4", fullName: "Farida To'xtayeva", searches: 31, department: "Digital Portfolio" },
  { id: "rank-5", fullName: "Sherzod Mahmudov", searches: 28, department: "Monitoring" }
];

export const mockHeatmap: HeatmapPoint[] = "Du,Se,Cho,Pa,Ju,Sh".split(",").flatMap((day) =>
  ["08", "10", "12", "14", "16", "18"].map((slot, index) => ({
    id: `${day}-${slot}`,
    day,
    slot,
    value: Math.min(100, 18 + (day.charCodeAt(0) % 10) * 5 + index * 11)
  }))
);

export const mockSystemLogs: SystemLog[] = [
  { id: "log-1", level: "info", message: "Socket broadcast queue successfully flushed.", createdAt: "10:12:04" },
  { id: "log-2", level: "warning", message: "Telegram adapter demo mode is enabled for one session.", createdAt: "10:16:20" },
  { id: "log-3", level: "info", message: "Face greeting confidence model returned a stable score window.", createdAt: "10:19:41" },
  { id: "log-4", level: "error", message: "AR calibration drift detected and was reset automatically.", createdAt: "10:27:55" },
  { id: "log-5", level: "info", message: "Route engine switched to nearest-node snapping fallback.", createdAt: "10:31:09" }
];
