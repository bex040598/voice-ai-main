import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AppErrorBoundary } from "./components/error/AppErrorBoundary";
import { ErrorFallback } from "./components/error/ErrorFallback";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppErrorBoundary fallback={<ErrorFallback />}>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  </React.StrictMode>
);
