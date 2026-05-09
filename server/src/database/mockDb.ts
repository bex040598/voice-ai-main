import { hashPassword } from "../common/utils/hash.utils.js";
import type {
  AuditLog,
  Building,
  Floor,
  GraphEdge,
  GraphNode,
  MonitoringStats,
  NfcTag,
  Portfolio,
  PortfolioItem,
  Question,
  ReceptionRequest,
  Resource,
  Room,
  StudentProfile,
  Subject,
  TeacherProfile,
  TeacherSchedule,
  Test,
  TestResult,
  User
} from "../common/types/domain.types.js";

const passwordHash = hashPassword("demo12345");
const now = "2026-05-09T09:00:00.000Z";

export const db: {
  users: User[];
  studentProfiles: StudentProfile[];
  teacherProfiles: TeacherProfile[];
  buildings: Building[];
  floors: Floor[];
  rooms: Room[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  nfcTags: NfcTag[];
  teacherSchedules: TeacherSchedule[];
  subjects: Subject[];
  resources: Resource[];
  tests: Test[];
  questions: Question[];
  testResults: TestResult[];
  portfolios: Portfolio[];
  portfolioItems: PortfolioItem[];
  receptionRequests: ReceptionRequest[];
  notifications: { id: string; userId: string; title: string; message: string; isRead: boolean }[];
  auditLogs: AuditLog[];
  monitoringStats: MonitoringStats;
  activityFeed: string[];
} = {
  users: [
    {
      id: "guest-demo",
      fullName: "ATMURA Guest",
      email: "guest@atmura.uz",
      passwordHash,
      role: "guest",
      avatarUrl: "",
      faceId: "face-guest-demo",
      telegramId: null,
      createdAt: now
    },
    ...Array.from({ length: 10 }, (_, index) => ({
      id: `student-${index + 1}`,
      fullName: [
        "Bexzod Karimov",
        "Madina Ergasheva",
        "Jasur Qodirov",
        "Nilufar Olimova",
        "Aziza Bozorova",
        "Shahzod Qosimov",
        "Dilshoda Ahmedova",
        "Abror Jo'rayev",
        "Sardor Nurmatov",
        "Mohira Tursunova"
      ][index],
      email: [
        "bexzod",
        "madina",
        "jasur",
        "nilufar",
        "aziza",
        "shahzod",
        "dilshoda",
        "abror",
        "sardor",
        "mohira"
      ][index] + "@atmura.uz",
      passwordHash,
      role: "student" as const,
      avatarUrl: "",
      faceId: `face-student-${index + 1}`,
      telegramId: `10020${index + 1}`,
      createdAt: now
    })),
    ...Array.from({ length: 10 }, (_, index) => ({
      id: `teacher-${index + 1}`,
      fullName: [
        "G'olib Rashidovich",
        "Nodira Xolmatova",
        "Rustam Tursunov",
        "Dilbar Ismoilova",
        "Azimjon Saidov",
        "Malika Sobirova",
        "Sherzod Mahmudov",
        "Farida To'xtayeva",
        "Kamoliddin Ubaydullayev",
        "Lola Ermatova"
      ][index],
      email: `teacher${index + 1}@atmura.uz`,
      passwordHash,
      role: "teacher" as const,
      avatarUrl: "",
      faceId: `face-teacher-${index + 1}`,
      telegramId: `20030${index + 1}`,
      createdAt: now
    })),
    {
      id: "admin-1",
      fullName: "Sardor Adminov",
      email: "admin@atmura.uz",
      passwordHash,
      role: "admin",
      avatarUrl: "",
      faceId: "face-admin-1",
      telegramId: "9980001",
      createdAt: now
    },
    {
      id: "super-admin-1",
      fullName: "Saida SuperAdmin",
      email: "superadmin@atmura.uz",
      passwordHash,
      role: "super_admin",
      avatarUrl: "",
      faceId: "face-super-admin-1",
      telegramId: "9980002",
      createdAt: now
    }
  ],
  studentProfiles: Array.from({ length: 10 }, (_, index) => ({
    id: `student-profile-${index + 1}`,
    userId: `student-${index + 1}`,
    group: ["SE-201", "SE-201", "AI-301", "MM-101", "CS-401"][index % 5],
    faculty: ["Dasturiy injiniring", "Sun'iy intellekt", "Multimedia", "Computer Science"][index % 4],
    course: (index % 4) + 1,
    rating: 80 + (index % 5) * 3
  })),
  teacherProfiles: Array.from({ length: 10 }, (_, index) => ({
    id: `teacher-profile-${index + 1}`,
    userId: `teacher-${index + 1}`,
    department: ["AI Lab", "Matematika", "Multimedia", "Registrar", "Robototexnika"][index % 5],
    position: index < 4 ? "Professor" : "Dotsent",
    officeRoom: ["201", "204", "215", "301", "Library Hub"][index % 5]
  })),
  buildings: [
    { id: "building-a", name: "Asosiy O'quv Bino", description: "Markaziy korpus" },
    { id: "building-b", name: "Innovation Center", description: "AI va startup markazi" },
    { id: "building-c", name: "Library Hub", description: "Kutubxona va coworking markazi" }
  ],
  floors: [
    { id: "floor-a1", buildingId: "building-a", level: 1, width: 1080, height: 680 },
    { id: "floor-a2", buildingId: "building-a", level: 2, width: 1080, height: 680 },
    { id: "floor-b3", buildingId: "building-b", level: 3, width: 920, height: 540 },
    { id: "floor-c2", buildingId: "building-c", level: 2, width: 900, height: 520 }
  ],
  rooms: [],
  graphNodes: [],
  graphEdges: [],
  nfcTags: [],
  teacherSchedules: [],
  subjects: [],
  resources: [],
  tests: [],
  questions: [],
  testResults: [
    {
      id: "result-1",
      testId: "test-1",
      studentId: "student-1",
      score: 86,
      startedAt: "2026-05-09T07:00:00.000Z",
      finishedAt: "2026-05-09T07:20:00.000Z"
    }
  ],
  portfolios: [
    {
      id: "portfolio-1",
      studentId: "student-1",
      title: "Campus AI Portfolio",
      description: "AR routing, AI assistant va dashboard ishlarining to'plami."
    },
    {
      id: "portfolio-2",
      studentId: "student-3",
      title: "Media Lab Collection",
      description: "Video, poster va 3D interaktiv amaliy ishlar."
    }
  ],
  portfolioItems: [
    {
      id: "portfolio-item-1",
      portfolioId: "portfolio-1",
      fileUrl: "https://example.com/portfolio/campus-ai.mp4",
      type: "video",
      description: "Route animation demo"
    }
  ],
  receptionRequests: [
    {
      id: "reception-1",
      fullName: "Malika Raximova",
      phone: "+998901234567",
      type: "suggestion",
      message: "Kutubxona ish vaqtini uzaytirish bo'yicha taklif.",
      status: "in_review",
      createdAt: "2026-05-08T11:00:00.000Z"
    }
  ],
  notifications: [
    {
      id: "notif-1",
      userId: "student-1",
      title: "Bugungi dars",
      message: "Sun'iy intellekt laboratoriyasi 10:30 da boshlanadi.",
      isRead: false
    }
  ],
  auditLogs: [
    {
      id: "audit-1",
      userId: "admin-1",
      action: "updated campus graph",
      entity: "GraphEdge",
      createdAt: "2026-05-08T10:20:00.000Z"
    }
  ],
  monitoringStats: {
    todayVisitors: 182,
    routeRequests: 416,
    activeUsers: 68,
    topSearchedRooms: [
      { name: "215-Xona", count: 49 },
      { name: "Kutubxona", count: 32 },
      { name: "301-AI Masterclass Hall", count: 27 }
    ],
    teacherSearchCount: 58,
    nfcScanCount: 94,
    receptionRequests: 16,
    testSubmissions: 73,
    systemHealth: {
      api: 97,
      socket: 95,
      database: 99,
      aiBridge: 91
    }
  },
  activityFeed: [
    "Talaba Bexzod 215-xona uchun route so'radi",
    "Teacher Nodira Xolmatova yangi test yaratdi",
    "Admin campus graph tugunlarini yangiladi"
  ]
};

db.graphNodes = [
  { id: "entrance-1", buildingId: "building-a", floorId: "floor-a1", label: "Main Entrance", x: 90, y: 330, z: 0, type: "entrance" },
  { id: "lobby-a1", buildingId: "building-a", floorId: "floor-a1", label: "Lobby", x: 190, y: 330, z: 0, type: "corridor" },
  { id: "west-corridor-a1", buildingId: "building-a", floorId: "floor-a1", label: "West Corridor", x: 290, y: 290, z: 0, type: "corridor" },
  { id: "east-corridor-a1", buildingId: "building-a", floorId: "floor-a1", label: "East Corridor", x: 420, y: 355, z: 0, type: "corridor" },
  { id: "stairs-a1", buildingId: "building-a", floorId: "floor-a1", label: "Stairs 1F", x: 540, y: 290, z: 0, type: "stairs" },
  { id: "lift-a1", buildingId: "building-a", floorId: "floor-a1", label: "Lift 1F", x: 540, y: 390, z: 0, type: "lift" },
  { id: "registrar-node", buildingId: "building-a", floorId: "floor-a1", label: "Registrar", x: 350, y: 210, z: 0, type: "office" },
  { id: "dean-node", buildingId: "building-a", floorId: "floor-a1", label: "Dean Office", x: 420, y: 460, z: 0, type: "office" },
  { id: "multimedia-lab-node", buildingId: "building-a", floorId: "floor-a1", label: "MultimediaLab", x: 670, y: 250, z: 0, type: "room" },
  { id: "command-room-node", buildingId: "building-a", floorId: "floor-a1", label: "Command Room", x: 705, y: 410, z: 0, type: "service" },
  { id: "stairs-a2", buildingId: "building-a", floorId: "floor-a2", label: "Stairs 2F", x: 540, y: 290, z: 1, type: "stairs" },
  { id: "lift-a2", buildingId: "building-a", floorId: "floor-a2", label: "Lift 2F", x: 540, y: 390, z: 1, type: "lift" },
  { id: "north-corridor-a2", buildingId: "building-a", floorId: "floor-a2", label: "North Corridor", x: 380, y: 230, z: 1, type: "corridor" },
  { id: "south-corridor-a2", buildingId: "building-a", floorId: "floor-a2", label: "South Corridor", x: 420, y: 450, z: 1, type: "corridor" },
  { id: "room-215-node", buildingId: "building-a", floorId: "floor-a2", label: "Room 215", x: 710, y: 230, z: 1, type: "room" },
  { id: "teacher-lounge-node", buildingId: "building-a", floorId: "floor-a2", label: "Teacher Lounge", x: 720, y: 440, z: 1, type: "office" },
  { id: "innovation-entrance", buildingId: "building-b", floorId: "floor-b3", label: "Innovation Entrance", x: 140, y: 270, z: 2, type: "entrance" },
  { id: "room-301-node", buildingId: "building-b", floorId: "floor-b3", label: "Room 301", x: 560, y: 270, z: 2, type: "room" },
  { id: "library-entry-node", buildingId: "building-c", floorId: "floor-c2", label: "Library Entry", x: 120, y: 260, z: 1, type: "entrance" },
  { id: "library-hall-node", buildingId: "building-c", floorId: "floor-c2", label: "Library Main Hall", x: 520, y: 260, z: 1, type: "room" }
];

const nodeDistance = (fromNodeId: string, toNodeId: string): number => {
  const from = db.graphNodes.find((node) => node.id === fromNodeId);
  const to = db.graphNodes.find((node) => node.id === toNodeId);
  if (!from || !to) {
    return 0;
  }
  return Math.round(Math.hypot(from.x - to.x, from.y - to.y) / 10 + Math.abs(from.z - to.z) * 24);
};

const createBidirectionalEdge = (
  fromNodeId: string,
  toNodeId: string,
  type: GraphEdge["type"],
  accessible = true
): GraphEdge[] => [
  {
    id: `${fromNodeId}-${toNodeId}`,
    fromNodeId,
    toNodeId,
    weight: nodeDistance(fromNodeId, toNodeId),
    type,
    accessible
  },
  {
    id: `${toNodeId}-${fromNodeId}`,
    fromNodeId: toNodeId,
    toNodeId: fromNodeId,
    weight: nodeDistance(fromNodeId, toNodeId),
    type,
    accessible
  }
];

db.graphEdges = [
  ...createBidirectionalEdge("entrance-1", "lobby-a1", "corridor"),
  ...createBidirectionalEdge("lobby-a1", "west-corridor-a1", "corridor"),
  ...createBidirectionalEdge("lobby-a1", "east-corridor-a1", "corridor"),
  ...createBidirectionalEdge("west-corridor-a1", "registrar-node", "corridor"),
  ...createBidirectionalEdge("east-corridor-a1", "dean-node", "corridor"),
  ...createBidirectionalEdge("east-corridor-a1", "stairs-a1", "corridor"),
  ...createBidirectionalEdge("east-corridor-a1", "lift-a1", "corridor"),
  ...createBidirectionalEdge("stairs-a1", "stairs-a2", "stairs", false),
  ...createBidirectionalEdge("lift-a1", "lift-a2", "lift"),
  ...createBidirectionalEdge("stairs-a2", "north-corridor-a2", "corridor"),
  ...createBidirectionalEdge("lift-a2", "south-corridor-a2", "corridor"),
  ...createBidirectionalEdge("north-corridor-a2", "south-corridor-a2", "corridor"),
  ...createBidirectionalEdge("north-corridor-a2", "room-215-node", "corridor"),
  ...createBidirectionalEdge("south-corridor-a2", "teacher-lounge-node", "corridor"),
  ...createBidirectionalEdge("stairs-a1", "multimedia-lab-node", "corridor"),
  ...createBidirectionalEdge("lift-a1", "command-room-node", "corridor"),
  ...createBidirectionalEdge("entrance-1", "innovation-entrance", "outdoor"),
  ...createBidirectionalEdge("entrance-1", "library-entry-node", "outdoor"),
  ...createBidirectionalEdge("innovation-entrance", "room-301-node", "corridor"),
  ...createBidirectionalEdge("library-entry-node", "library-hall-node", "corridor")
];

db.rooms = [
  { id: "room-101", buildingId: "building-a", floorId: "floor-a1", name: "101-Ma'ruza zali", type: "lecture", nodeId: "west-corridor-a1", description: "Darslar uchun auditoriya." },
  { id: "room-102", buildingId: "building-a", floorId: "floor-a1", name: "102-Seminar xonasi", type: "seminar", nodeId: "west-corridor-a1", description: "Seminar va uchrashuvlar." },
  { id: "room-103", buildingId: "building-a", floorId: "floor-a1", name: "103-Kafedra xonasi", type: "department", nodeId: "west-corridor-a1", description: "Kafedra idorasi." },
  { id: "room-104", buildingId: "building-a", floorId: "floor-a1", name: "104-Ro'yxatdan o'tish markazi", type: "service", nodeId: "registrar-node", description: "Registrar markazi." },
  { id: "room-105", buildingId: "building-a", floorId: "floor-a1", name: "105-Dekanat honasi", type: "office", nodeId: "dean-node", description: "Dekan qabulxonasi." },
  { id: "room-106", buildingId: "building-a", floorId: "floor-a1", name: "106-MultimediaLab", type: "lab", nodeId: "multimedia-lab-node", description: "Media tajriba laboratoriyasi." },
  { id: "room-107", buildingId: "building-a", floorId: "floor-a1", name: "107-Command room", type: "service", nodeId: "command-room-node", description: "Boshqaruv markazi." },
  { id: "room-108", buildingId: "building-a", floorId: "floor-a1", name: "108-AI laboratoriya", type: "lab", nodeId: "multimedia-lab-node", description: "AI amaliy ishlar zonasi." },
  { id: "room-109", buildingId: "building-a", floorId: "floor-a1", name: "109-Qabul markazi", type: "service", nodeId: "lobby-a1", description: "Talabalar va mehmonlar qabul nuqtasi." },
  { id: "room-110", buildingId: "building-a", floorId: "floor-a1", name: "110-Rektor qabulxonasi", type: "office", nodeId: "dean-node", description: "Rektor qabul hududi." },
  { id: "room-201", buildingId: "building-a", floorId: "floor-a2", name: "201-O'qituvchilar xonasi", type: "office", nodeId: "teacher-lounge-node", description: "Teacher lounge." },
  { id: "room-202", buildingId: "building-a", floorId: "floor-a2", name: "202-Metodik xona", type: "office", nodeId: "south-corridor-a2", description: "Metodik bo'lim." },
  { id: "room-203", buildingId: "building-a", floorId: "floor-a2", name: "203-Department office", type: "office", nodeId: "south-corridor-a2", description: "Department office." },
  { id: "room-204", buildingId: "building-a", floorId: "floor-a2", name: "204-Seminar studio", type: "seminar", nodeId: "south-corridor-a2", description: "Seminar studio." },
  { id: "room-205", buildingId: "building-a", floorId: "floor-a2", name: "205-AR lab", type: "lab", nodeId: "north-corridor-a2", description: "AR laboratoriya." },
  { id: "room-206", buildingId: "building-a", floorId: "floor-a2", name: "206-Data science room", type: "lab", nodeId: "north-corridor-a2", description: "Data science room." },
  { id: "room-207", buildingId: "building-a", floorId: "floor-a2", name: "207-Startup office", type: "office", nodeId: "south-corridor-a2", description: "Startup support office." },
  { id: "room-208", buildingId: "building-a", floorId: "floor-a2", name: "208-Lab support", type: "service", nodeId: "south-corridor-a2", description: "Lab support zone." },
  { id: "room-209", buildingId: "building-a", floorId: "floor-a2", name: "209-Media room", type: "lab", nodeId: "north-corridor-a2", description: "Media room." },
  { id: "room-210", buildingId: "building-a", floorId: "floor-a2", name: "210-Creative suite", type: "lab", nodeId: "north-corridor-a2", description: "Creative suite." },
  { id: "room-211", buildingId: "building-a", floorId: "floor-a2", name: "211-Mentor room", type: "office", nodeId: "teacher-lounge-node", description: "Mentor room." },
  { id: "room-212", buildingId: "building-a", floorId: "floor-a2", name: "212-Project room", type: "seminar", nodeId: "teacher-lounge-node", description: "Project room." },
  { id: "room-213", buildingId: "building-a", floorId: "floor-a2", name: "213-Digital studio", type: "lab", nodeId: "north-corridor-a2", description: "Digital studio." },
  { id: "room-214", buildingId: "building-a", floorId: "floor-a2", name: "214-Conference room", type: "office", nodeId: "teacher-lounge-node", description: "Conference room." },
  { id: "room-215", buildingId: "building-a", floorId: "floor-a2", name: "215-Xona", type: "classroom", nodeId: "room-215-node", description: "Ko'p qidiriladigan auditoriya." },
  { id: "room-301", buildingId: "building-b", floorId: "floor-b3", name: "301-AI Masterclass Hall", type: "lecture", nodeId: "room-301-node", description: "Innovation Center hall." },
  { id: "room-302", buildingId: "building-b", floorId: "floor-b3", name: "302-Startup pod", type: "seminar", nodeId: "room-301-node", description: "Startup pod." },
  { id: "room-303", buildingId: "building-b", floorId: "floor-b3", name: "303-Robototexnika lab", type: "lab", nodeId: "room-301-node", description: "Robotics lab." },
  { id: "room-lib-01", buildingId: "building-c", floorId: "floor-c2", name: "Kutubxona", type: "library", nodeId: "library-hall-node", description: "Main library hall." },
  { id: "room-lib-02", buildingId: "building-c", floorId: "floor-c2", name: "Media Archive", type: "resource", nodeId: "library-hall-node", description: "Digital media archive." }
];

db.nfcTags = [
  { id: "nfc-1", code: "NFC-1F-ENTRANCE", nodeId: "entrance-1", description: "Asosiy kirish", buildingId: "building-a", floorId: "floor-a1", nearbyRooms: ["Qabul markazi", "Registrar"], emergencyInfo: "Chiqish eshigi oldinda." },
  { id: "nfc-2", code: "NFC-1F-REGISTRAR", nodeId: "registrar-node", description: "Registrator hududi", buildingId: "building-a", floorId: "floor-a1", nearbyRooms: ["Registrar", "Seminar xona"], emergencyInfo: "Lobby tomonga qayting." },
  { id: "nfc-3", code: "NFC-1F-LAB", nodeId: "multimedia-lab-node", description: "MultimediaLab yo'lagi", buildingId: "building-a", floorId: "floor-a1", nearbyRooms: ["MultimediaLab", "Command room"], emergencyInfo: "Uskuna xavfsizligiga rioya qiling." },
  { id: "nfc-4", code: "NFC-2F-HALL", nodeId: "north-corridor-a2", description: "2-qavat shimoliy yo'lak", buildingId: "building-a", floorId: "floor-a2", nearbyRooms: ["205-AR lab", "215-Xona"], emergencyInfo: "Zina chap tomonda." },
  { id: "nfc-5", code: "NFC-2F-LIBRARY", nodeId: "library-hall-node", description: "Kutubxona markaziy zona", buildingId: "building-c", floorId: "floor-c2", nearbyRooms: ["Kutubxona", "Media Archive"], emergencyInfo: "Chiqish kirish tomonda." },
  { id: "nfc-6", code: "NFC-3F-INNOVATION", nodeId: "innovation-entrance", description: "Innovation Center kirish qismi", buildingId: "building-b", floorId: "floor-b3", nearbyRooms: ["301-AI Masterclass Hall"], emergencyInfo: "Lift markaziy yo'lakda." },
  { id: "nfc-7", code: "NFC-2F-TEACHER", nodeId: "teacher-lounge-node", description: "O'qituvchilar xonasi oldi", buildingId: "building-a", floorId: "floor-a2", nearbyRooms: ["201-O'qituvchilar xonasi", "214-Conference room"], emergencyInfo: "Yo'lakni bo'sh saqlang." },
  { id: "nfc-8", code: "NFC-1F-RECEPTION", nodeId: "dean-node", description: "Qabul zona", buildingId: "building-a", floorId: "floor-a1", nearbyRooms: ["Dekanat", "Rektor qabulxonasi"], emergencyInfo: "Orqada favqulodda chiqish mavjud." }
];

db.subjects = [
  { id: "subject-1", title: "AI Navigation", description: "Routing va graph tahlili", teacherId: "teacher-1" },
  { id: "subject-2", title: "Multimedia Storytelling", description: "Interaktiv media", teacherId: "teacher-6" },
  { id: "subject-3", title: "Digital Portfolio", description: "Portfolio dizayni", teacherId: "teacher-8" },
  { id: "subject-4", title: "Robotics Studio", description: "Robototexnika va sensorlar", teacherId: "teacher-5" },
  { id: "subject-5", title: "Academic Monitoring", description: "Monitoring va analytics", teacherId: "teacher-7" }
];

db.teacherSchedules = [
  { id: "schedule-1", teacherId: "teacher-1", subject: "AI Navigation Systems", roomId: "room-301", weekday: "Shanba", startTime: "10:30", endTime: "12:00" },
  { id: "schedule-2", teacherId: "teacher-2", subject: "Pedagogik dizayn", roomId: "room-214", weekday: "Shanba", startTime: "15:00", endTime: "16:00" },
  { id: "schedule-3", teacherId: "teacher-3", subject: "Data Science", roomId: "room-206", weekday: "Dushanba", startTime: "09:00", endTime: "10:20" },
  { id: "schedule-4", teacherId: "teacher-4", subject: "Office workflow", roomId: "room-104", weekday: "Seshanba", startTime: "11:00", endTime: "12:20" },
  { id: "schedule-5", teacherId: "teacher-5", subject: "Robotics Studio", roomId: "room-303", weekday: "Chorshanba", startTime: "13:00", endTime: "15:00" },
  { id: "schedule-6", teacherId: "teacher-6", subject: "Creative Multimedia", roomId: "room-106", weekday: "Payshanba", startTime: "08:30", endTime: "10:00" },
  { id: "schedule-7", teacherId: "teacher-7", subject: "System Monitoring", roomId: "room-107", weekday: "Juma", startTime: "14:00", endTime: "15:20" },
  { id: "schedule-8", teacherId: "teacher-8", subject: "Digital Portfolio", roomId: "room-lib-02", weekday: "Juma", startTime: "10:00", endTime: "11:20" },
  { id: "schedule-9", teacherId: "teacher-9", subject: "Project Management", roomId: "room-212", weekday: "Payshanba", startTime: "16:00", endTime: "17:30" },
  { id: "schedule-10", teacherId: "teacher-10", subject: "Library Media Literacy", roomId: "room-lib-01", weekday: "Seshanba", startTime: "09:30", endTime: "11:00" }
];

db.resources = Array.from({ length: 20 }, (_, index) => ({
  id: `resource-${index + 1}`,
  title: `Resurs ${index + 1}`,
  type: index % 3 === 0 ? "video" : index % 3 === 1 ? "pdf" : "slide",
  fileUrl: `https://example.com/resources/${index + 1}`,
  subjectId: db.subjects[index % db.subjects.length].id,
  createdBy: db.subjects[index % db.subjects.length].teacherId
}));

db.tests = Array.from({ length: 5 }, (_, index) => ({
  id: `test-${index + 1}`,
  title: `${db.subjects[index].title} nazorat testi`,
  subjectId: db.subjects[index].id,
  createdBy: db.subjects[index].teacherId
}));

db.questions = db.tests.flatMap((test) => [
  {
    id: `${test.id}-q1`,
    testId: test.id,
    text: `${test.title}: routing algoritmida eng qisqa yo'lni qaysi yondashuv topadi?`,
    options: ["Dijkstra", "Bubble Sort", "Quickselect", "Binary Heap"],
    correctAnswer: "Dijkstra"
  },
  {
    id: `${test.id}-q2`,
    testId: test.id,
    text: `${test.title}: fuzzy search uchun qaysi metrika ishlatiladi?`,
    options: ["Cosine only", "Levenshtein", "CRC32", "B-Tree"],
    correctAnswer: "Levenshtein"
  },
  {
    id: `${test.id}-q3`,
    testId: test.id,
    text: `${test.title}: monitoring panelida real-time update uchun nima kerak?`,
    options: ["WebSocket", "SMTP", "FTP", "OCR"],
    correctAnswer: "WebSocket"
  }
]);

export const appendAuditLog = (userId: string, action: string, entity: string): void => {
  db.auditLogs.unshift({
    id: `audit-${db.auditLogs.length + 1}`,
    userId,
    action,
    entity,
    createdAt: new Date().toISOString()
  });
};
