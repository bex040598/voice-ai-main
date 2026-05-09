import clsx, { type ClassValue } from "clsx";
import type { Role } from "../types";

export const cn = (...classes: ClassValue[]): string => clsx(classes);

export const roleLabel: Record<Role, string> = {
  guest: "Mehmon",
  student: "Talaba",
  teacher: "O'qituvchi",
  admin: "Admin",
  super_admin: "Super Admin"
};

export const formatRole = (role: Role): string => roleLabel[role];

export const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("uz-UZ", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));

export const createInitials = (value: string): string =>
  value
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
