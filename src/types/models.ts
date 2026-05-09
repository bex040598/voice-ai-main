export type Role = "guest" | "student" | "teacher" | "admin" | "super_admin";

export type Emotion = "confused" | "hurry" | "happy" | "neutral" | "angry" | "shy";
export type ThemeMode = "aurora" | "clear";
export type LanguageCode = "uz" | "en";
export type ServiceStatus = "online" | "active" | "demo" | "ready" | "warning" | "offline";
export type ActivityType =
  | "face"
  | "route"
  | "nfc"
  | "voice"
  | "teacher"
  | "telegram"
  | "reception"
  | "system";
export type AvatarMode =
  | "idle"
  | "greeting"
  | "speaking"
  | "thinking"
  | "pointing"
  | "happy"
  | "neutral"
  | "listening"
  | "sleep";

export type GraphNodeType =
  | "entrance"
  | "corridor"
  | "stairs"
  | "lift"
  | "room"
  | "office"
  | "service"
  | "nfc";

export type EdgeType = "corridor" | "stairs" | "lift" | "outdoor";

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
  mapImage?: string;
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
  type: GraphNodeType;
}

export interface GraphEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  weight: number;
  type: EdgeType;
  accessible: boolean;
}

export interface NfcTag {
  id: string;
  code: string;
  nodeId: string;
  description: string;
  buildingId: string;
  floorId: string;
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

export interface Resource {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  subjectId: string;
  createdBy: string;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  teacherId: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  content: string;
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

export interface RouteRequest {
  fromNodeId: string;
  toRoomId: string;
  algorithm: "dijkstra" | "astar";
}

export interface RouteSegment {
  fromNodeId: string;
  toNodeId: string;
  type: EdgeType;
  distance: number;
}

export interface RouteResponse {
  distance: number;
  estimatedTime: string;
  steps: string[];
  path: string[];
  segments: RouteSegment[];
}

export interface FaceGreetingResult {
  recognizedUser?: User | null;
  greeting: string;
  confidence: number;
}

export interface VoiceEmotionResult {
  transcript: string;
  emotion: Emotion;
  response: string;
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
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

export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  change: number;
  hint: string;
  tone?: "cyan" | "violet" | "emerald" | "navy" | "amber";
  series: number[];
}

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  badge?: string;
}

export interface SystemService {
  id: string;
  name: string;
  status: ServiceStatus;
  description: string;
  latency: string;
}

export interface ChartPoint {
  label: string;
  routeRequests: number;
  voiceQueries: number;
  faceGreetings: number;
  nfcScans: number;
  telegramMessages: number;
  arSessions: number;
}

export interface HeatmapPoint {
  id: string;
  day: string;
  slot: string;
  value: number;
}

export interface TeacherRanking {
  id: string;
  fullName: string;
  searches: number;
  department: string;
}

export interface SystemLog {
  id: string;
  level: "info" | "warning" | "error";
  message: string;
  createdAt: string;
}

export interface SearchSuggestion<T = string> {
  score: number;
  normalizedQuery: string;
  target: T;
  matchedBy: "alias" | "phonetic" | "levenshtein" | "exact";
}

export interface NavigationInstruction {
  text: string;
  distance: number;
}
