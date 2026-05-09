import { create } from "zustand";
import type {
  AssistantMessage,
  AvatarMode,
  LanguageCode,
  Role,
  RouteResponse,
  ThemeMode,
  User
} from "../types";
import { mockUsers } from "../data/mockUsers";

const defaultUser = mockUsers.find((user) => user.role === "guest") ?? mockUsers[0];

interface ToastState {
  id: string;
  title: string;
  tone: "info" | "success" | "warning";
}

interface AppState {
  currentUser: User;
  currentRole: Role;
  theme: ThemeMode;
  language: LanguageCode;
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  assistantOpen: boolean;
  activeRoute: RouteResponse | null;
  avatarMode: AvatarMode;
  assistantMessages: AssistantMessage[];
  toasts: ToastState[];
  setCurrentUser: (user: User) => void;
  setCurrentRole: (role: Role) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setLanguage: (language: LanguageCode) => void;
  toggleSidebar: () => void;
  setSidebarMobileOpen: (open: boolean) => void;
  toggleSidebarMobile: () => void;
  setAssistantOpen: (open: boolean) => void;
  toggleAssistant: () => void;
  setAvatarMode: (mode: AvatarMode) => void;
  pushAssistantMessage: (message: AssistantMessage) => void;
  setActiveRoute: (route: RouteResponse | null) => void;
  pushToast: (toast: Omit<ToastState, "id">) => void;
  dismissToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: defaultUser,
  currentRole: defaultUser.role,
  theme: "aurora",
  language: "uz",
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  assistantOpen: false,
  activeRoute: null,
  avatarMode: "idle",
  assistantMessages: [
    {
      id: "assistant-welcome",
      role: "assistant",
      text: "Assalomu alaykum! Men ATMURA, kampus bo'ylab yo'l topish va resurslarga kirishda yordam beraman.",
      createdAt: new Date().toISOString()
    }
  ],
  toasts: [],
  setCurrentUser: (currentUser) => set({ currentUser, currentRole: currentUser.role }),
  setCurrentRole: (currentRole) =>
    set((state) => ({
      currentRole,
      currentUser:
        mockUsers.find((user) => user.role === currentRole) ??
        state.currentUser
    })),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "aurora" ? "clear" : "aurora" })),
  setLanguage: (language) => set({ language }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarMobileOpen: (sidebarMobileOpen) => set({ sidebarMobileOpen }),
  toggleSidebarMobile: () => set((state) => ({ sidebarMobileOpen: !state.sidebarMobileOpen })),
  setAssistantOpen: (assistantOpen) => set({ assistantOpen }),
  toggleAssistant: () => set((state) => ({ assistantOpen: !state.assistantOpen })),
  setAvatarMode: (avatarMode) => set({ avatarMode }),
  pushAssistantMessage: (message) =>
    set((state) => ({ assistantMessages: [...state.assistantMessages, message] })),
  setActiveRoute: (activeRoute) => set({ activeRoute }),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: `${Date.now()}-${state.toasts.length + 1}`, ...toast }
      ]
    })),
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
}));
