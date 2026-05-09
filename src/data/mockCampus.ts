import type { Building, Floor, GraphEdge, GraphNode, NfcTag, Room } from "../types";

export const mockBuildings: Building[] = [
  {
    id: "building-a",
    name: "Asosiy O'quv Bino",
    description: "Registrator, dekanat, ma'ruza zallari va MultimediaLab joylashgan markaziy korpus."
  },
  {
    id: "building-b",
    name: "Innovation Center",
    description: "Startaplar, amaliy laboratoriyalar va AI seminar xonalari."
  },
  {
    id: "building-c",
    name: "Library Hub",
    description: "Kutubxona, coworking zona va virtual rektor qabulxonasi uchun media zona."
  }
];

export const mockFloors: Floor[] = [
  { id: "floor-a1", buildingId: "building-a", level: 1, width: 1080, height: 680 },
  { id: "floor-a2", buildingId: "building-a", level: 2, width: 1080, height: 680 },
  { id: "floor-b3", buildingId: "building-b", level: 3, width: 920, height: 540 },
  { id: "floor-c2", buildingId: "building-c", level: 2, width: 900, height: 520 }
];

export const mockGraphNodes: GraphNode[] = [
  { id: "entrance-1", buildingId: "building-a", floorId: "floor-a1", label: "Main Entrance", x: 90, y: 330, z: 0, type: "entrance" },
  { id: "lobby-a1", buildingId: "building-a", floorId: "floor-a1", label: "Lobby", x: 190, y: 330, z: 0, type: "corridor" },
  { id: "west-corridor-a1", buildingId: "building-a", floorId: "floor-a1", label: "West Corridor", x: 290, y: 290, z: 0, type: "corridor" },
  { id: "east-corridor-a1", buildingId: "building-a", floorId: "floor-a1", label: "East Corridor", x: 420, y: 355, z: 0, type: "corridor" },
  { id: "stairs-a1", buildingId: "building-a", floorId: "floor-a1", label: "Stairs 1F", x: 540, y: 290, z: 0, type: "stairs" },
  { id: "lift-a1", buildingId: "building-a", floorId: "floor-a1", label: "Lift 1F", x: 540, y: 390, z: 0, type: "lift" },
  { id: "info-desk-a1", buildingId: "building-a", floorId: "floor-a1", label: "Info Desk", x: 230, y: 380, z: 0, type: "service" },
  { id: "hall-a1", buildingId: "building-a", floorId: "floor-a1", label: "Central Hall", x: 330, y: 360, z: 0, type: "corridor" },
  { id: "lab-wing-a1", buildingId: "building-a", floorId: "floor-a1", label: "Lab Wing", x: 640, y: 320, z: 0, type: "corridor" },
  { id: "registrar-node", buildingId: "building-a", floorId: "floor-a1", label: "Registrar", x: 350, y: 210, z: 0, type: "office" },
  { id: "dean-node", buildingId: "building-a", floorId: "floor-a1", label: "Dean Office", x: 420, y: 460, z: 0, type: "office" },
  { id: "multimedia-lab-node", buildingId: "building-a", floorId: "floor-a1", label: "MultimediaLab", x: 670, y: 250, z: 0, type: "room" },
  { id: "command-room-node", buildingId: "building-a", floorId: "floor-a1", label: "Command Room", x: 705, y: 410, z: 0, type: "service" },
  { id: "stairs-a2", buildingId: "building-a", floorId: "floor-a2", label: "Stairs 2F", x: 540, y: 290, z: 1, type: "stairs" },
  { id: "lift-a2", buildingId: "building-a", floorId: "floor-a2", label: "Lift 2F", x: 540, y: 390, z: 1, type: "lift" },
  { id: "north-corridor-a2", buildingId: "building-a", floorId: "floor-a2", label: "North Corridor", x: 380, y: 230, z: 1, type: "corridor" },
  { id: "south-corridor-a2", buildingId: "building-a", floorId: "floor-a2", label: "South Corridor", x: 420, y: 450, z: 1, type: "corridor" },
  { id: "east-wing-a2", buildingId: "building-a", floorId: "floor-a2", label: "East Wing", x: 625, y: 235, z: 1, type: "corridor" },
  { id: "media-wing-a2", buildingId: "building-a", floorId: "floor-a2", label: "Media Wing", x: 655, y: 430, z: 1, type: "corridor" },
  { id: "room-215-node", buildingId: "building-a", floorId: "floor-a2", label: "Room 215", x: 710, y: 230, z: 1, type: "room" },
  { id: "teacher-lounge-node", buildingId: "building-a", floorId: "floor-a2", label: "Teacher Lounge", x: 720, y: 440, z: 1, type: "office" },
  { id: "innovation-entrance", buildingId: "building-b", floorId: "floor-b3", label: "Innovation Entrance", x: 140, y: 270, z: 2, type: "entrance" },
  { id: "innovation-hall-b3", buildingId: "building-b", floorId: "floor-b3", label: "Innovation Hall", x: 300, y: 270, z: 2, type: "corridor" },
  { id: "innovation-lab-b3", buildingId: "building-b", floorId: "floor-b3", label: "Prototype Lab", x: 420, y: 190, z: 2, type: "room" },
  { id: "innovation-lift-b3", buildingId: "building-b", floorId: "floor-b3", label: "Lift 3F", x: 430, y: 350, z: 2, type: "lift" },
  { id: "room-301-node", buildingId: "building-b", floorId: "floor-b3", label: "Room 301", x: 560, y: 270, z: 2, type: "room" },
  { id: "innovation-conference-b3", buildingId: "building-b", floorId: "floor-b3", label: "Conference Pod", x: 690, y: 270, z: 2, type: "office" },
  { id: "library-entry-node", buildingId: "building-c", floorId: "floor-c2", label: "Library Entry", x: 120, y: 260, z: 1, type: "entrance" },
  { id: "library-corridor-node", buildingId: "building-c", floorId: "floor-c2", label: "Library Corridor", x: 280, y: 260, z: 1, type: "corridor" },
  { id: "library-hall-node", buildingId: "building-c", floorId: "floor-c2", label: "Library Main Hall", x: 520, y: 260, z: 1, type: "room" },
  { id: "archive-node", buildingId: "building-c", floorId: "floor-c2", label: "Archive Wing", x: 650, y: 190, z: 1, type: "room" },
  { id: "cowork-node", buildingId: "building-c", floorId: "floor-c2", label: "Cowork Space", x: 670, y: 340, z: 1, type: "service" }
];

const distance = (from: string, to: string): number => {
  const first = mockGraphNodes.find((node) => node.id === from);
  const second = mockGraphNodes.find((node) => node.id === to);

  if (!first || !second) {
    return 0;
  }

  const floorPenalty = Math.abs(first.z - second.z) * 24;
  return Math.round(Math.hypot(first.x - second.x, first.y - second.y) / 10 + floorPenalty);
};

const pair = (
  fromNodeId: string,
  toNodeId: string,
  type: GraphEdge["type"],
  accessible = true
): GraphEdge[] => [
  {
    id: `${fromNodeId}-${toNodeId}`,
    fromNodeId,
    toNodeId,
    weight: distance(fromNodeId, toNodeId),
    type,
    accessible
  },
  {
    id: `${toNodeId}-${fromNodeId}`,
    fromNodeId: toNodeId,
    toNodeId: fromNodeId,
    weight: distance(fromNodeId, toNodeId),
    type,
    accessible
  }
];

export const mockGraphEdges: GraphEdge[] = [
  ...pair("entrance-1", "lobby-a1", "corridor"),
  ...pair("lobby-a1", "west-corridor-a1", "corridor"),
  ...pair("lobby-a1", "east-corridor-a1", "corridor"),
  ...pair("lobby-a1", "info-desk-a1", "corridor"),
  ...pair("east-corridor-a1", "hall-a1", "corridor"),
  ...pair("hall-a1", "west-corridor-a1", "corridor"),
  ...pair("west-corridor-a1", "registrar-node", "corridor"),
  ...pair("east-corridor-a1", "dean-node", "corridor"),
  ...pair("east-corridor-a1", "stairs-a1", "corridor"),
  ...pair("east-corridor-a1", "lift-a1", "corridor"),
  ...pair("stairs-a1", "lab-wing-a1", "corridor"),
  ...pair("lab-wing-a1", "command-room-node", "corridor"),
  ...pair("stairs-a1", "stairs-a2", "stairs", false),
  ...pair("lift-a1", "lift-a2", "lift"),
  ...pair("stairs-a2", "north-corridor-a2", "corridor"),
  ...pair("lift-a2", "south-corridor-a2", "corridor"),
  ...pair("north-corridor-a2", "south-corridor-a2", "corridor"),
  ...pair("north-corridor-a2", "east-wing-a2", "corridor"),
  ...pair("south-corridor-a2", "media-wing-a2", "corridor"),
  ...pair("north-corridor-a2", "room-215-node", "corridor"),
  ...pair("east-wing-a2", "room-215-node", "corridor"),
  ...pair("south-corridor-a2", "teacher-lounge-node", "corridor"),
  ...pair("media-wing-a2", "teacher-lounge-node", "corridor"),
  ...pair("stairs-a1", "multimedia-lab-node", "corridor"),
  ...pair("lift-a1", "command-room-node", "corridor"),
  ...pair("entrance-1", "innovation-entrance", "outdoor"),
  ...pair("entrance-1", "library-entry-node", "outdoor"),
  ...pair("innovation-entrance", "innovation-hall-b3", "corridor"),
  ...pair("innovation-hall-b3", "innovation-lab-b3", "corridor"),
  ...pair("innovation-hall-b3", "innovation-lift-b3", "corridor"),
  ...pair("innovation-entrance", "room-301-node", "corridor"),
  ...pair("innovation-lift-b3", "room-301-node", "corridor"),
  ...pair("room-301-node", "innovation-conference-b3", "corridor"),
  ...pair("library-entry-node", "library-corridor-node", "corridor"),
  ...pair("library-corridor-node", "library-hall-node", "corridor"),
  ...pair("library-hall-node", "archive-node", "corridor"),
  ...pair("library-hall-node", "cowork-node", "corridor")
];

const baseRoomDescriptions = [
  "Darslar, uchrashuvlar va ma'muriy xizmatlar uchun mo'ljallangan xona.",
  "Talabalar va mehmonlar uchun muhim xizmatlar nuqtasi.",
  "Multimedia va AI tajribalarini bajarish uchun jihozlangan zona."
];

export const mockRooms: Room[] = [
  { id: "room-101", buildingId: "building-a", floorId: "floor-a1", name: "101-Ma'ruza zali", type: "lecture", nodeId: "west-corridor-a1", description: baseRoomDescriptions[0] },
  { id: "room-102", buildingId: "building-a", floorId: "floor-a1", name: "102-Seminar xonasi", type: "seminar", nodeId: "west-corridor-a1", description: baseRoomDescriptions[0] },
  { id: "room-103", buildingId: "building-a", floorId: "floor-a1", name: "103-Kafedra xonasi", type: "department", nodeId: "west-corridor-a1", description: baseRoomDescriptions[1] },
  { id: "room-104", buildingId: "building-a", floorId: "floor-a1", name: "104-Ro'yxatdan o'tish markazi", type: "service", nodeId: "registrar-node", description: "Registrar va talabalar hujjatlari bilan ishlash markazi." },
  { id: "room-105", buildingId: "building-a", floorId: "floor-a1", name: "105-Dekanat honasi", type: "office", nodeId: "dean-node", description: "Fakultet dekanati va qabul xonasi." },
  { id: "room-106", buildingId: "building-a", floorId: "floor-a1", name: "106-MultimediaLab", type: "lab", nodeId: "multimedia-lab-node", description: baseRoomDescriptions[2] },
  { id: "room-107", buildingId: "building-a", floorId: "floor-a1", name: "107-Command room", type: "service", nodeId: "command-room-node", description: "Monitoring va komanda markazi." },
  { id: "room-108", buildingId: "building-a", floorId: "floor-a1", name: "108-AI laboratoriya", type: "lab", nodeId: "multimedia-lab-node", description: baseRoomDescriptions[2] },
  { id: "room-109", buildingId: "building-a", floorId: "floor-a1", name: "109-Qabul markazi", type: "service", nodeId: "lobby-a1", description: baseRoomDescriptions[1] },
  { id: "room-110", buildingId: "building-a", floorId: "floor-a1", name: "110-Rektor qabulxonasi", type: "office", nodeId: "dean-node", description: "Virtual rektor qabulxonasi uchun fiziki analog nuqta." },
  { id: "room-111", buildingId: "building-a", floorId: "floor-a1", name: "111-Ma'lumot markazi", type: "service", nodeId: "info-desk-a1", description: "Kampus mehmonlari uchun birinchi yordam va navigatsiya punkti." },
  { id: "room-112", buildingId: "building-a", floorId: "floor-a1", name: "112-VR tajriba zonasi", type: "lab", nodeId: "lab-wing-a1", description: "Immersive media va AR/VR tajribalar uchun ajratilgan zona." },
  { id: "room-201", buildingId: "building-a", floorId: "floor-a2", name: "201-O'qituvchilar xonasi", type: "office", nodeId: "teacher-lounge-node", description: baseRoomDescriptions[1] },
  { id: "room-202", buildingId: "building-a", floorId: "floor-a2", name: "202-Metodik xona", type: "office", nodeId: "south-corridor-a2", description: baseRoomDescriptions[1] },
  { id: "room-203", buildingId: "building-a", floorId: "floor-a2", name: "203-Department office", type: "office", nodeId: "south-corridor-a2", description: baseRoomDescriptions[1] },
  { id: "room-204", buildingId: "building-a", floorId: "floor-a2", name: "204-Seminar studio", type: "seminar", nodeId: "south-corridor-a2", description: baseRoomDescriptions[0] },
  { id: "room-205", buildingId: "building-a", floorId: "floor-a2", name: "205-AR lab", type: "lab", nodeId: "north-corridor-a2", description: baseRoomDescriptions[2] },
  { id: "room-206", buildingId: "building-a", floorId: "floor-a2", name: "206-Data science room", type: "lab", nodeId: "north-corridor-a2", description: baseRoomDescriptions[2] },
  { id: "room-207", buildingId: "building-a", floorId: "floor-a2", name: "207-Startup office", type: "office", nodeId: "south-corridor-a2", description: baseRoomDescriptions[1] },
  { id: "room-208", buildingId: "building-a", floorId: "floor-a2", name: "208-Lab support", type: "service", nodeId: "south-corridor-a2", description: baseRoomDescriptions[1] },
  { id: "room-209", buildingId: "building-a", floorId: "floor-a2", name: "209-Media room", type: "lab", nodeId: "north-corridor-a2", description: baseRoomDescriptions[2] },
  { id: "room-210", buildingId: "building-a", floorId: "floor-a2", name: "210-Creative suite", type: "lab", nodeId: "north-corridor-a2", description: baseRoomDescriptions[2] },
  { id: "room-211", buildingId: "building-a", floorId: "floor-a2", name: "211-Mentor room", type: "office", nodeId: "teacher-lounge-node", description: baseRoomDescriptions[1] },
  { id: "room-212", buildingId: "building-a", floorId: "floor-a2", name: "212-Project room", type: "seminar", nodeId: "teacher-lounge-node", description: baseRoomDescriptions[0] },
  { id: "room-213", buildingId: "building-a", floorId: "floor-a2", name: "213-Digital studio", type: "lab", nodeId: "north-corridor-a2", description: baseRoomDescriptions[2] },
  { id: "room-214", buildingId: "building-a", floorId: "floor-a2", name: "214-Conference room", type: "office", nodeId: "teacher-lounge-node", description: baseRoomDescriptions[1] },
  { id: "room-215", buildingId: "building-a", floorId: "floor-a2", name: "215-Xona", type: "classroom", nodeId: "room-215-node", description: "Talabalar tomonidan tez-tez qidiriladigan auditoriya." },
  { id: "room-216", buildingId: "building-a", floorId: "floor-a2", name: "216-Immersive studio", type: "lab", nodeId: "media-wing-a2", description: "XR va media production uchun premium studio." },
  { id: "room-217", buildingId: "building-a", floorId: "floor-a2", name: "217-Professor lounge", type: "office", nodeId: "media-wing-a2", description: "Professor-o'qituvchilar uchrashuvlari uchun yopiq zona." },
  { id: "room-301", buildingId: "building-b", floorId: "floor-b3", name: "301-AI Masterclass Hall", type: "lecture", nodeId: "room-301-node", description: "Innovation Center ichidagi asosiy seminar auditoriya." },
  { id: "room-302", buildingId: "building-b", floorId: "floor-b3", name: "302-Startup pod", type: "seminar", nodeId: "room-301-node", description: baseRoomDescriptions[0] },
  { id: "room-303", buildingId: "building-b", floorId: "floor-b3", name: "303-Robototexnika lab", type: "lab", nodeId: "room-301-node", description: baseRoomDescriptions[2] },
  { id: "room-304", buildingId: "building-b", floorId: "floor-b3", name: "304-Prototype workshop", type: "lab", nodeId: "innovation-lab-b3", description: "Tezkor prototiplash va IoT qurilmalar yig'ish maydoni." },
  { id: "room-305", buildingId: "building-b", floorId: "floor-b3", name: "305-Investor briefing room", type: "office", nodeId: "innovation-conference-b3", description: "Startap taqdimotlari va uchrashuvlar uchun xona." },
  { id: "room-lib-01", buildingId: "building-c", floorId: "floor-c2", name: "Kutubxona", type: "library", nodeId: "library-hall-node", description: "Elektron resurslar, coworking va sokin o'qish zonasi." },
  { id: "room-lib-02", buildingId: "building-c", floorId: "floor-c2", name: "Media Archive", type: "resource", nodeId: "archive-node", description: "Raqamli media, video va dars materiallari saqlanadi." },
  { id: "room-lib-03", buildingId: "building-c", floorId: "floor-c2", name: "Cowork Gallery", type: "resource", nodeId: "cowork-node", description: "Talaba jamoalari va mentor sessiyalari uchun ochiq maydon." }
];

export const mockNfcTags: NfcTag[] = [
  {
    id: "nfc-1",
    code: "NFC-ENTRANCE-1",
    nodeId: "entrance-1",
    description: "Asosiy kirish eshigi",
    buildingId: "building-a",
    floorId: "floor-a1",
    nearbyRooms: ["Qabul markazi", "Registrar", "101-Ma'ruza zali"],
    emergencyInfo: "Favqulodda holatda chiqish eshigi to'g'ri oldinda."
  },
  {
    id: "nfc-2",
    code: "NFC-1F-REGISTRAR",
    nodeId: "registrar-node",
    description: "Registrator hududi",
    buildingId: "building-a",
    floorId: "floor-a1",
    nearbyRooms: ["Registrar", "103-Kafedra xonasi", "102-Seminar xonasi"],
    emergencyInfo: "Evakuatsiya uchun lobby tomonga qayting."
  },
  {
    id: "nfc-3",
    code: "NFC-LAB-AI",
    nodeId: "multimedia-lab-node",
    description: "MultimediaLab yo'lagi",
    buildingId: "building-a",
    floorId: "floor-a1",
    nearbyRooms: ["MultimediaLab", "AI laboratoriya", "Command room"],
    emergencyInfo: "Lab hududida uskuna xavfsizligi ko'rsatmalariga rioya qiling."
  },
  {
    id: "nfc-4",
    code: "NFC-2F-HALL",
    nodeId: "north-corridor-a2",
    description: "2-qavat shimoliy yo'lak",
    buildingId: "building-a",
    floorId: "floor-a2",
    nearbyRooms: ["205-AR lab", "206-Data science room", "215-Xona"],
    emergencyInfo: "Favqulodda holatda zina tuguni chap tomonda."
  },
  {
    id: "nfc-5",
    code: "NFC-2F-LIBRARY",
    nodeId: "library-hall-node",
    description: "Kutubxona markaziy zona",
    buildingId: "building-c",
    floorId: "floor-c2",
    nearbyRooms: ["Kutubxona", "Media Archive", "Coworking desk"],
    emergencyInfo: "Kutubxona chiqishi kirish tomonda."
  },
  {
    id: "nfc-6",
    code: "NFC-3F-DEAN",
    nodeId: "innovation-entrance",
    description: "Innovation Center kirish qismi",
    buildingId: "building-b",
    floorId: "floor-b3",
    nearbyRooms: ["301-AI Masterclass Hall", "302-Startup pod"],
    emergencyInfo: "Lift yo'li markaziy yo'lak orqali belgilanadi."
  },
  {
    id: "nfc-7",
    code: "NFC-2F-TEACHER",
    nodeId: "teacher-lounge-node",
    description: "O'qituvchilar xonasi oldi",
    buildingId: "building-a",
    floorId: "floor-a2",
    nearbyRooms: ["201-O'qituvchilar xonasi", "214-Conference room"],
    emergencyInfo: "Yig'ilish paytida yo'lakni bo'sh saqlang."
  },
  {
    id: "nfc-8",
    code: "NFC-1F-RECEPTION",
    nodeId: "dean-node",
    description: "Rektor/dekan qabul zonasi",
    buildingId: "building-a",
    floorId: "floor-a1",
    nearbyRooms: ["Dekanat honasi", "Rektor qabulxonasi"],
    emergencyInfo: "Qabul zonasi orqasida favqulodda chiqish mavjud."
  }
];
