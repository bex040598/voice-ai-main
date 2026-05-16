import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import "./styles.css";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const CatalogPage = lazy(() => import("./pages/CatalogPage").then((module) => ({ default: module.CatalogPage })));
const DepartmentsPage = lazy(() => import("./pages/DepartmentsPage").then((module) => ({ default: module.DepartmentsPage })));
const DepartmentLibraryPage = lazy(() => import("./pages/DepartmentLibraryPage").then((module) => ({ default: module.DepartmentLibraryPage })));
const AssistantPage = lazy(() => import("./pages/AssistantPage").then((module) => ({ default: module.AssistantPage })));
const ReadingRoomPage = lazy(() => import("./pages/ReadingRoomPage").then((module) => ({ default: module.ReadingRoomPage })));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage").then((module) => ({ default: module.NotificationsPage })));
const RegisterPage = lazy(() => import("./pages/RegisterPage").then((module) => ({ default: module.RegisterPage })));
const ProfilePage = lazy(() => import("./pages/ProfilePage").then((module) => ({ default: module.ProfilePage })));
const AdminPage = lazy(() => import("./pages/AdminPage").then((module) => ({ default: module.AdminPage })));
const UploadPage = lazy(() => import("./pages/UploadPage").then((module) => ({ default: module.UploadPage })));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="loading-screen">
            <LoadingSkeleton />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <AppShell>
                <HomePage />
              </AppShell>
            }
          />
          <Route
            path="/catalog"
            element={
              <AppShell>
                <CatalogPage />
              </AppShell>
            }
          />
          <Route
            path="/departments"
            element={
              <AppShell>
                <DepartmentsPage />
              </AppShell>
            }
          />
          <Route
            path="/departments/:departmentId"
            element={
              <AppShell>
                <DepartmentLibraryPage />
              </AppShell>
            }
          />
          <Route
            path="/ai-search"
            element={
              <AppShell>
                <AssistantPage />
              </AppShell>
            }
          />
          <Route
            path="/assistant"
            element={<Navigate to="/ai-search" replace />}
          />
          <Route
            path="/reading-room"
            element={
              <AppShell>
                <ReadingRoomPage />
              </AppShell>
            }
          />
          <Route
            path="/notifications"
            element={
              <AppShell>
                <NotificationsPage />
              </AppShell>
            }
          />
          <Route
            path="/register"
            element={
              <AppShell>
                <RegisterPage />
              </AppShell>
            }
          />
          <Route
            path="/profile"
            element={
              <AppShell>
                <ProfilePage />
              </AppShell>
            }
          />
          <Route
            path="/admin"
            element={
              <AppShell>
                <AdminPage />
              </AppShell>
            }
          />
          <Route
            path="/upload"
            element={
              <AppShell>
                <UploadPage />
              </AppShell>
            }
          />
          <Route path="/campus-map" element={<Navigate to="/reading-room" replace />} />
          <Route path="/reception" element={<Navigate to="/notifications" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
