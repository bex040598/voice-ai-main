import type {
  MonitoringStats,
  Portfolio,
  PortfolioItem,
  Question,
  ReceptionRequest,
  Resource,
  Subject,
  Test,
  TestResult,
  Topic
} from "../types";

export const mockSubjects: Subject[] = [
  {
    id: "subject-1",
    title: "AI Navigation",
    description: "Kampus routing, graph va fazoviy tahlil asoslari.",
    teacherId: "teacher-1"
  },
  {
    id: "subject-2",
    title: "Multimedia Storytelling",
    description: "Interaktiv kontent va video tajribalarini yaratish.",
    teacherId: "teacher-6"
  },
  {
    id: "subject-3",
    title: "Digital Portfolio",
    description: "Portfolio dizayni va professional taqdimot.",
    teacherId: "teacher-8"
  },
  {
    id: "subject-4",
    title: "Robotics Studio",
    description: "Sensorlar, gesture va prototiplash modullari.",
    teacherId: "teacher-5"
  },
  {
    id: "subject-5",
    title: "Academic Monitoring",
    description: "Dashboard, audit va analytics ishlovlari.",
    teacherId: "teacher-7"
  }
];

export const mockTopics: Topic[] = mockSubjects.flatMap((subject, index) => [
  {
    id: `topic-${index + 1}-1`,
    subjectId: subject.id,
    title: `${subject.title} - 1-hafta`,
    content: `${subject.title} bo'yicha birinchi modul materiallari va laboratoriya ko'rsatmasi.`
  },
  {
    id: `topic-${index + 1}-2`,
    subjectId: subject.id,
    title: `${subject.title} - 2-hafta`,
    content: `${subject.title} bo'yicha ikkinchi modul, case-study va mini test materiallari.`
  }
]);

export const mockResources: Resource[] = Array.from({ length: 20 }, (_, index) => ({
  id: `resource-${index + 1}`,
  title: `Resurs ${index + 1}`,
  type: index % 3 === 0 ? "video" : index % 3 === 1 ? "pdf" : "slide",
  fileUrl: `https://example.com/resources/${index + 1}`,
  subjectId: mockSubjects[index % mockSubjects.length].id,
  createdBy: mockSubjects[index % mockSubjects.length].teacherId
}));

export const mockTests: Test[] = Array.from({ length: 5 }, (_, index) => ({
  id: `test-${index + 1}`,
  title: `${mockSubjects[index].title} nazorat testi`,
  subjectId: mockSubjects[index].id,
  createdBy: mockSubjects[index].teacherId
}));

export const mockQuestions: Question[] = mockTests.flatMap((test, index) => [
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

export const mockTestResults: TestResult[] = [
  {
    id: "result-1",
    testId: "test-1",
    studentId: "student-1",
    score: 86,
    startedAt: "2026-05-09T07:00:00.000Z",
    finishedAt: "2026-05-09T07:20:00.000Z"
  },
  {
    id: "result-2",
    testId: "test-2",
    studentId: "student-2",
    score: 92,
    startedAt: "2026-05-09T08:00:00.000Z",
    finishedAt: "2026-05-09T08:18:00.000Z"
  }
];

export const mockPortfolios: Portfolio[] = [
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
];

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-item-1",
    portfolioId: "portfolio-1",
    fileUrl: "https://example.com/portfolio/campus-ai.mp4",
    type: "video",
    description: "Route animation demo"
  },
  {
    id: "portfolio-item-2",
    portfolioId: "portfolio-1",
    fileUrl: "https://example.com/portfolio/interface.pdf",
    type: "pdf",
    description: "ATMURA UI case study"
  },
  {
    id: "portfolio-item-3",
    portfolioId: "portfolio-2",
    fileUrl: "https://example.com/portfolio/lab-model.glb",
    type: "3d",
    description: "Virtual lab scene"
  }
];

export const mockReceptionRequests: ReceptionRequest[] = [
  {
    id: "reception-1",
    fullName: "Malika Raximova",
    phone: "+998901234567",
    type: "suggestion",
    message: "Kutubxona ish vaqtini uzaytirish bo'yicha taklif.",
    status: "in_review",
    createdAt: "2026-05-08T11:00:00.000Z"
  },
  {
    id: "reception-2",
    fullName: "Akmal Zokirov",
    phone: "+998909998877",
    type: "appointment",
    message: "Rektor qabuliga 12-may kuni yozilmoqchiman.",
    status: "new",
    createdAt: "2026-05-09T06:50:00.000Z"
  },
  {
    id: "reception-3",
    fullName: "Oybek Rasulov",
    phone: "+998901112233",
    type: "application",
    message: "AI laboratoriya uchun qo'shimcha jihozlar masalasida ariza qoldiraman.",
    status: "completed",
    createdAt: "2026-05-07T09:12:00.000Z"
  },
  {
    id: "reception-4",
    fullName: "Maftuna Yo'ldosheva",
    phone: "+998901113344",
    type: "complaint",
    message: "2-qavatdagi Wi-Fi sifati bo'yicha shikoyat yuboraman.",
    status: "accepted",
    createdAt: "2026-05-07T12:30:00.000Z"
  },
  {
    id: "reception-5",
    fullName: "Bekzod Erkinov",
    phone: "+998901114455",
    type: "suggestion",
    message: "Voice assistantga inglizcha interfeys qo'shish bo'yicha taklif bor.",
    status: "in_review",
    createdAt: "2026-05-08T08:45:00.000Z"
  },
  {
    id: "reception-6",
    fullName: "Sitora Xasanova",
    phone: "+998901115566",
    type: "appointment",
    message: "Rektor bilan grant loyihasi bo'yicha qisqa uchrashuv so'rayman.",
    status: "new",
    createdAt: "2026-05-08T15:20:00.000Z"
  },
  {
    id: "reception-7",
    fullName: "Diyorbek Aliyev",
    phone: "+998901116677",
    type: "application",
    message: "AR guide sinovini kengaytirish uchun ruxsat so'rayman.",
    status: "accepted",
    createdAt: "2026-05-09T07:04:00.000Z"
  },
  {
    id: "reception-8",
    fullName: "Zarnigor Eshonqulova",
    phone: "+998901117788",
    type: "suggestion",
    message: "Kutubxona NFC punktlari sonini ko'paytirish taklif qilinadi.",
    status: "completed",
    createdAt: "2026-05-09T07:40:00.000Z"
  },
  {
    id: "reception-9",
    fullName: "Mirjalol Hakimov",
    phone: "+998901118899",
    type: "complaint",
    message: "Command room yonidagi monitorlar ishlamay qolgan.",
    status: "rejected",
    createdAt: "2026-05-09T08:10:00.000Z"
  },
  {
    id: "reception-10",
    fullName: "Sevinch Ruzmetova",
    phone: "+998901119900",
    type: "appointment",
    message: "Dekanat bilan individual o'quv reja masalasi yuzasidan qabul so'rayman.",
    status: "in_review",
    createdAt: "2026-05-09T08:24:00.000Z"
  }
];

export const mockMonitoringStats: MonitoringStats = {
  todayVisitors: 1284,
  routeRequests: 842,
  activeUsers: 468,
  topSearchedRooms: [
    { name: "215-Xona", count: 94 },
    { name: "Kutubxona", count: 78 },
    { name: "301-AI Masterclass Hall", count: 64 },
    { name: "Rektor qabulxonasi", count: 41 },
    { name: "MultimediaLab", count: 38 }
  ],
  teacherSearchCount: 203,
  nfcScanCount: 176,
  receptionRequests: 31,
  testSubmissions: 173,
  systemHealth: {
    api: 99,
    socket: 97,
    database: 99,
    aiBridge: 96
  }
};

export const mockActivityFeed = [
  "Talaba Bexzod 215-xona uchun route so'radi",
  "Teacher Nodira Xolmatova yangi test yaratdi",
  "Admin campus graph tugunlarini yangiladi",
  "Guest foydalanuvchi NFC-2F-LIBRARY tegini scan qildi",
  "Monitoring paneliga PDF hisobot yaratildi"
];
