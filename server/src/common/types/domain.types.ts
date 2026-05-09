export type Role = "guest" | "student" | "teacher" | "admin" | "super_admin";

export type Emotion = "confused" | "hurry" | "happy" | "neutral" | "angry" | "shy";

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: Role;
  avatarUrl?: string;
  faceId?: string | null;
  telegramId?: string | null;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  group: string;
  faculty: string;
  course: number;
  rating: number;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  department: string;
  position: string;
  officeRoom: string;
}

export interface Building {
  id: string;
  name: string;
  description: string;
}

export interface Floor {
  id: string;
  buildingId: string;
  level: number;
  width: number;
  height: number;
}

export interface Room {
  id: string;
  buildingId: string;
  floorId: string;
  name: string;
  type: string;
  nodeId: string;
  description: string;
}

export interface GraphNode {
  id: string;
  buildingId: string;
  floorId: string;
  label: string;
  x: number;
  y: number;
  z: number;
  type: string;
}

export interface GraphEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  weight: number;
  type: "corridor" | "stairs" | "lift" | "outdoor";
  accessible: boolean;
}

export interface NfcTag {
  id: string;
  code: string;
  nodeId: string;
  buildingId: string;
  floorId: string;
  description: string;
  nearbyRooms: string[];
  emergencyInfo: string;
}

export interface TeacherSchedule {
  id: string;
  teacherId: string;
  subject: string;
  roomId: string;
  weekday: string;
  startTime: string;
  endTime: string;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  teacherId: string;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  subjectId: string;
  createdBy: string;
}

export interface Test {
  id: string;
  title: string;
  subjectId: string;
  createdBy: string;
}

export interface Question {
  id: string;
  testId: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface TestResult {
  id: string;
  testId: string;
  studentId: string;
  score: number;
  startedAt: string;
  finishedAt: string;
}

export interface Portfolio {
  id: string;
  studentId: string;
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  portfolioId: string;
  fileUrl: string;
  type: string;
  description: string;
}

export interface ReceptionRequest {
  id: string;
  fullName: string;
  phone: string;
  type: "application" | "suggestion" | "complaint" | "appointment";
  message: string;
  status: "new" | "in_review" | "accepted" | "rejected" | "completed";
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  createdAt: string;
}

export interface MonitoringStats {
  todayVisitors: number;
  routeRequests: number;
  activeUsers: number;
  topSearchedRooms: { name: string; count: number }[];
  teacherSearchCount: number;
  nfcScanCount: number;
  receptionRequests: number;
  testSubmissions: number;
  systemHealth: {
    api: number;
    socket: number;
    database: number;
    aiBridge: number;
  };
}
