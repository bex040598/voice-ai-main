import type { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RoleDashboardPage } from "./pages/RoleDashboardPage";
import { CampusMapPage } from "./pages/CampusMapPage";
import { RouteGuidePage } from "./pages/RouteGuidePage";
import { ArGuidePage } from "./pages/ArGuidePage";
import { AssistantPage } from "./pages/AssistantPage";
import { FaceGreetingPage } from "./pages/FaceGreetingPage";
import { VoiceEmotionPage } from "./pages/VoiceEmotionPage";
import { AvatarPage } from "./pages/AvatarPage";
import { NfcGuidePage } from "./pages/NfcGuidePage";
import { TeachersPage } from "./pages/TeachersPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { TestsPage } from "./pages/TestsPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ReceptionPage } from "./pages/ReceptionPage";
import { MonitoringPage } from "./pages/MonitoringPage";
import { SettingsPage } from "./pages/SettingsPage";
import { RouteErrorPage } from "../components/error/RouteErrorPage";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useAppStore } from "../store/useAppStore";
import type { Role } from "../types";

const AccessDenied = ({ targetRole }: { targetRole: Role }) => (
  <Card className="mx-auto max-w-xl text-center">
    <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">Access denied</p>
    <p className="mt-3 text-sm leading-7 text-white/62">
      Bu sahifaga kirish uchun {targetRole} roliga ega foydalanuvchi kerak.
    </p>
    <div className="mt-5">
      <Button onClick={() => window.history.back()}>Orqaga qaytish</Button>
    </div>
  </Card>
);

const RoleGate = ({
  allow,
  targetRole,
  children
}: {
  allow: Role[];
  targetRole: Role;
  children: ReactElement;
}) => {
  const currentRole = useAppStore((state) => state.currentRole);
  return allow.includes(currentRole) ? children : <AccessDenied targetRole={targetRole} />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "dashboard/guest", element: <RoleDashboardPage role="guest" /> },
      {
        path: "dashboard/student",
        element: (
          <RoleGate allow={["student", "super_admin"]} targetRole="student">
            <RoleDashboardPage role="student" />
          </RoleGate>
        )
      },
      {
        path: "dashboard/teacher",
        element: (
          <RoleGate allow={["teacher", "super_admin"]} targetRole="teacher">
            <RoleDashboardPage role="teacher" />
          </RoleGate>
        )
      },
      {
        path: "dashboard/admin",
        element: (
          <RoleGate allow={["admin", "super_admin"]} targetRole="admin">
            <RoleDashboardPage role="admin" />
          </RoleGate>
        )
      },
      {
        path: "dashboard/super-admin",
        element: (
          <RoleGate allow={["super_admin"]} targetRole="super_admin">
            <RoleDashboardPage role="super_admin" />
          </RoleGate>
        )
      },
      { path: "campus-map", element: <CampusMapPage /> },
      { path: "route-guide", element: <RouteGuidePage /> },
      { path: "ar-guide", element: <ArGuidePage /> },
      { path: "assistant", element: <AssistantPage /> },
      { path: "face-greeting", element: <FaceGreetingPage /> },
      { path: "voice-emotion", element: <VoiceEmotionPage /> },
      { path: "avatar", element: <AvatarPage /> },
      { path: "nfc-guide", element: <NfcGuidePage /> },
      { path: "teachers", element: <TeachersPage /> },
      { path: "resources", element: <ResourcesPage /> },
      { path: "tests", element: <TestsPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "reception", element: <ReceptionPage /> },
      { path: "monitoring", element: <MonitoringPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);
