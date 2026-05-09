import { create } from "zustand";
import type { AssistantMessage, Role, RouteResponse, User } from "../types";
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
  assistantOpen: boolean;
  activeRoute: RouteResponse | null;
  assistantMessages: AssistantMessage[];
  toasts: ToastState[];
  setCurrentUser: (user: User) => void;
  setCurrentRole: (role: Role) => void;
  toggleAssistant: () => void;
  pushAssistantMessage: (message: AssistantMessage) => void;
  setActiveRoute: (route: RouteResponse | null) => void;
  pushToast: (toast: Omit<ToastState, "id">) => void;
  dismissToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: defaultUser,
  currentRole: defaultUser.role,
  assistantOpen: false,
  activeRoute: null,
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
  toggleAssistant: () => set((state) => ({ assistantOpen: !state.assistantOpen })),
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
