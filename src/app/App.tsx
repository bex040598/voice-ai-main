import { useEffect } from "react";
import { AppShell } from "../components/layout/AppShell";
import { mockUsers } from "../data/mockUsers";
import { getCurrentUser } from "../features/auth/auth.service";
import { useAppStore } from "../store/useAppStore";
import { Outlet } from "react-router-dom";

export const App = () => {
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  useEffect(() => {
    const token = window.localStorage.getItem("atmura-token");

    if (!token) {
      const guest = mockUsers.find((user) => user.role === "guest");
      if (guest) {
        setCurrentUser(guest);
      }
      return;
    }

    void getCurrentUser(token).then((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, [setCurrentUser]);

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};
