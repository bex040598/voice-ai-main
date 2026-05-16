export const navItems = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Departments", href: "/departments" },
  { label: "AI Search", href: "/ai-search" },
  { label: "Reading Room", href: "/reading-room" },
  { label: "Upload", href: "/upload" },
  { label: "Admin", href: "/admin" }
] as const;

export const stats = [
  { label: "Elektron resurslar", value: "42,860", detail: "11% o'sish", tone: "primary" },
  { label: "Faol talabalar", value: "8,240", detail: "Bugun 612 online", tone: "info" },
  { label: "AI tavsiyalar", value: "1,204", detail: "So'nggi 24 soat", tone: "success" },
  { label: "O'quv zali bandlik", value: "74%", detail: "18 ta joy bo'sh", tone: "warning" }
] as const;

export const books = [
  {
    id: "bk-1",
    title: "Sun'iy intellekt asoslari",
    author: "Sh. Rasulov",
    department: "Axborot tizimlari",
    availability: "Mavjud",
    type: "PDF",
    year: 2025
  },
  {
    id: "bk-2",
    title: "Ma'lumotlar bazasi injiniringi",
    author: "N. Jo'rayev",
    department: "Dasturiy injiniring",
    availability: "Band qilingan",
    type: "ePub",
    year: 2024
  },
  {
    id: "bk-3",
    title: "Biznes analitika va menejment",
    author: "M. Karimova",
    department: "Menejment",
    availability: "Mavjud",
    type: "PDF",
    year: 2026
  },
  {
    id: "bk-4",
    title: "Axborot xavfsizligi praktikumi",
    author: "B. Qodirov",
    department: "Kiberxavfsizlik",
    availability: "Cheklangan",
    type: "Video",
    year: 2025
  }
];

export const departments = [
  {
    id: "software",
    title: "Dasturiy injiniring",
    faculty: "AT va dasturiy mahsulotlar",
    resources: 368,
    subjects: 27,
    teachers: 19,
    updatedAt: "2 soat oldin"
  },
  {
    id: "management",
    title: "Menejment va marketing",
    faculty: "Biznes boshqaruvi",
    resources: 241,
    subjects: 18,
    teachers: 14,
    updatedAt: "Bugun"
  },
  {
    id: "cyber",
    title: "Kiberxavfsizlik",
    faculty: "Raqamli xavfsizlik",
    resources: 194,
    subjects: 16,
    teachers: 11,
    updatedAt: "Kecha"
  }
];

export const resources = [
  { title: "Machine Learning amaliy qo'llanma", category: "Darslik", audience: "3-kurs", freshness: "Yangi" },
  { title: "Axborot xavfsizligi laboratoriya to'plami", category: "Lab", audience: "2-kurs", freshness: "Mashhur" },
  { title: "Menejment case study banki", category: "Case", audience: "4-kurs", freshness: "Yangilangan" }
];

export const notifications = [
  { title: "Yangi resurs qo'shildi", body: "Sun'iy intellekt asoslari 2026 nashri katalogga joylandi.", time: "5 daqiqa oldin", unread: true, kind: "info" },
  { title: "Band qilingan joy tasdiqlandi", body: "O'quv zali A-12 joyi 16-may, 15:00 ga bron qilindi.", time: "25 daqiqa oldin", unread: true, kind: "success" },
  { title: "Upload tekshiruvi kutilmoqda", body: "Kafedra resursi admin ko'rib chiqishi uchun yuborildi.", time: "Kecha", unread: false, kind: "warning" }
] as const;

export const suggestedPrompts = [
  "215-xonaga qanday boraman?",
  "Kutubxona qayerda joylashgan?",
  "G'olib Rashidovich qayerda dars beradi?",
  "Rektor qabuliga qanday yozilaman?",
  "NFC orqali joylashuvni qanday aniqlayman?",
  "Menga yo'lni ovoz bilan tushuntir",
  "Bugungi dars jadvalimni ko'rsat",
  "Men adashib qoldim, yordam bering"
];
