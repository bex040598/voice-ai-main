import type { TeacherSchedule } from "../types";
import { mockTeacherProfiles, mockUsers } from "./mockUsers";

const teacherNames = mockUsers.filter((user) => user.role === "teacher");

export const mockTeacherDirectory = teacherNames.map((teacher, index) => ({
  id: teacher.id,
  fullName: teacher.fullName,
  department: mockTeacherProfiles[index]?.department ?? "AI Lab",
  officeRoom: mockTeacherProfiles[index]?.officeRoom ?? "201",
  aliases: [
    teacher.fullName.toLowerCase(),
    teacher.fullName.replace(/'/g, "").toLowerCase(),
    teacher.fullName.split(" ")[0].toLowerCase()
  ]
}));

export const mockTeacherSchedules: TeacherSchedule[] = [
  {
    id: "schedule-1",
    teacherId: "teacher-1",
    subject: "AI Navigation Systems",
    roomId: "room-301",
    weekday: "Shanba",
    startTime: "10:30",
    endTime: "12:00"
  },
  {
    id: "schedule-2",
    teacherId: "teacher-2",
    subject: "Pedagogik dizayn",
    roomId: "room-214",
    weekday: "Shanba",
    startTime: "15:00",
    endTime: "16:00"
  },
  {
    id: "schedule-3",
    teacherId: "teacher-3",
    subject: "Data Science",
    roomId: "room-206",
    weekday: "Dushanba",
    startTime: "09:00",
    endTime: "10:20"
  },
  {
    id: "schedule-4",
    teacherId: "teacher-4",
    subject: "Office workflow",
    roomId: "room-104",
    weekday: "Seshanba",
    startTime: "11:00",
    endTime: "12:20"
  },
  {
    id: "schedule-5",
    teacherId: "teacher-5",
    subject: "Robotics Studio",
    roomId: "room-303",
    weekday: "Chorshanba",
    startTime: "13:00",
    endTime: "15:00"
  },
  {
    id: "schedule-6",
    teacherId: "teacher-6",
    subject: "Creative Multimedia",
    roomId: "room-106",
    weekday: "Payshanba",
    startTime: "08:30",
    endTime: "10:00"
  },
  {
    id: "schedule-7",
    teacherId: "teacher-7",
    subject: "System Monitoring",
    roomId: "room-107",
    weekday: "Juma",
    startTime: "14:00",
    endTime: "15:20"
  },
  {
    id: "schedule-8",
    teacherId: "teacher-8",
    subject: "Digital Portfolio",
    roomId: "room-lib-02",
    weekday: "Juma",
    startTime: "10:00",
    endTime: "11:20"
  },
  {
    id: "schedule-9",
    teacherId: "teacher-9",
    subject: "Project Management",
    roomId: "room-212",
    weekday: "Payshanba",
    startTime: "16:00",
    endTime: "17:30"
  },
  {
    id: "schedule-10",
    teacherId: "teacher-10",
    subject: "Library Media Literacy",
    roomId: "room-lib-01",
    weekday: "Seshanba",
    startTime: "09:30",
    endTime: "11:00"
  }
];
