import type {
  AuditLog,
  Notification,
  StudentProfile,
  TeacherProfile,
  User
} from "../types";

const now = "2026-05-09T09:00:00.000Z";

const guestUsers: User[] = [
  {
    id: "guest-demo",
    fullName: "ATMURA Guest",
    email: "guest@atmura.uz",
    passwordHash: "demo12345",
    role: "guest",
    avatarUrl: "",
    faceId: "face-guest-demo",
    telegramId: null,
    createdAt: now
  }
];

const studentSeed: Array<[string, string, string, string, number, number]> = [
  ["Bexzod Karimov", "bexzod", "SE-201", "Dasturiy injiniring", 2, 92],
  ["Madina Ergasheva", "madina", "SE-201", "Dasturiy injiniring", 2, 88],
  ["Jasur Qodirov", "jasur", "AI-301", "Sun'iy intellekt", 3, 90],
  ["Nilufar Olimova", "nilufar", "MM-101", "Multimedia", 1, 85],
  ["Aziza Bozorova", "aziza", "CS-401", "Computer Science", 4, 94],
  ["Shahzod Qosimov", "shahzod", "CS-401", "Computer Science", 4, 87],
  ["Dilshoda Ahmedova", "dilshoda", "AI-301", "Sun'iy intellekt", 3, 91],
  ["Abror Jo'rayev", "abror", "MM-101", "Multimedia", 1, 79],
  ["Sardor Nurmatov", "sardor", "SE-201", "Dasturiy injiniring", 2, 86],
  ["Mohira Tursunova", "mohira", "AI-301", "Sun'iy intellekt", 3, 93]
];

const studentUsers: User[] = studentSeed.map(([fullName, slug], index) => ({
  id: `student-${index + 1}`,
  fullName,
  email: `${slug}@atmura.uz`,
  passwordHash: "demo12345",
  role: "student" as const,
  avatarUrl: "",
  faceId: `face-student-${index + 1}`,
  telegramId: `10020${index + 1}`,
  createdAt: now
}));

const teacherUsers: User[] = [
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
].map((fullName, index) => ({
  id: `teacher-${index + 1}`,
  fullName,
  email: `teacher${index + 1}@atmura.uz`,
  passwordHash: "demo12345",
  role: "teacher" as const,
  avatarUrl: "",
  faceId: `face-teacher-${index + 1}`,
  telegramId: `20030${index + 1}`,
  createdAt: now
}));

const adminUsers: User[] = [
  {
    id: "admin-1",
    fullName: "Sardor Adminov",
    email: "admin@atmura.uz",
    passwordHash: "demo12345",
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
    passwordHash: "demo12345",
    role: "super_admin",
    avatarUrl: "",
    faceId: "face-super-admin-1",
    telegramId: "9980002",
    createdAt: now
  }
];

export const mockUsers: User[] = [...guestUsers, ...studentUsers, ...teacherUsers, ...adminUsers];

export const mockStudentProfiles: StudentProfile[] = studentUsers.map((user, index) => ({
  id: `student-profile-${index + 1}`,
  userId: user.id,
  group: studentSeed[index][2],
  faculty: studentSeed[index][3],
  course: studentSeed[index][4],
  rating: studentSeed[index][5]
}));

export const mockTeacherProfiles: TeacherProfile[] = teacherUsers.map((user, index) => ({
  id: `teacher-profile-${index + 1}`,
  userId: user.id,
  department: ["AI Lab", "Matematika", "Multimedia", "Registrar", "Robototexnika"][index % 5],
  position: index < 3 ? "Professor" : index < 7 ? "Dotsent" : "Katta o'qituvchi",
  officeRoom: ["201", "204", "215", "301", "Library Hub"][index % 5]
}));

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "student-1",
    title: "Bugungi dars",
    message: "Sun'iy intellekt laboratoriyasi 10:30 da boshlanadi.",
    isRead: false
  },
  {
    id: "notif-2",
    userId: "teacher-2",
    title: "Yig'ilish eslatmasi",
    message: "3-qavat metodik kengash yig'ilishi 15:00 da.",
    isRead: false
  },
  {
    id: "notif-3",
    userId: "admin-1",
    title: "NFC sync",
    message: "8 ta NFC nuqta muvaffaqiyatli yangilandi.",
    isRead: true
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "audit-1",
    userId: "admin-1",
    action: "updated campus graph",
    entity: "GraphEdge",
    createdAt: "2026-05-08T10:20:00.000Z"
  },
  {
    id: "audit-2",
    userId: "super-admin-1",
    action: "rotated ai adapter token",
    entity: "Settings",
    createdAt: "2026-05-08T12:45:00.000Z"
  },
  {
    id: "audit-3",
    userId: "teacher-1",
    action: "created test",
    entity: "Test",
    createdAt: "2026-05-09T07:20:00.000Z"
  }
];
