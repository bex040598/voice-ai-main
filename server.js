import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 10000);
const jwtSecret = process.env.JWT_SECRET || "render-demo-secret";
const uploadsDir = path.join(__dirname, "uploads");
const distDir = path.join(__dirname, "dist");

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => callback(null, uploadsDir),
  filename: (_request, file, callback) => callback(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`)
});

const upload = multer({ storage });

const seedTimestamp = "2026-05-09T07:00:00.000Z";

const db = {
  users: [
    { id: 1, fullName: "Platform Admin", email: "admin@multimedialab.uz", password: "admin123", role: "admin", createdAt: seedTimestamp },
    { id: 2, fullName: "Dilshod Karimov", email: "teacher@multimedialab.uz", password: "teacher123", role: "teacher", createdAt: seedTimestamp },
    { id: 3, fullName: "Aziza Student", email: "student@multimedialab.uz", password: "student123", role: "student", createdAt: seedTimestamp }
  ],
  subjects: [
    { id: 1, title: "Multimedia Dizayn", description: "Grafika, storyboard va media kompozitsiya asoslari.", teacherId: 2 },
    { id: 2, title: "Veb Animatsiya", description: "HTML5 Canvas va interaktiv animatsiya loyihalari.", teacherId: 2 }
  ],
  topics: [
    { id: 1, subjectId: 1, title: "Storyboard asoslari", description: "Kadrlar ketma-ketligi va loyiha modeli." },
    { id: 2, subjectId: 1, title: "Elektron resurs strukturalari", description: "Resurs sahifalari, navigatsiya va kontent bloklari." },
    { id: 3, subjectId: 2, title: "Canvas animatsiyasi", description: "HTML5 Canvas orqali oddiy animatsiya yaratish." }
  ],
  assignments: [
    {
      id: 1,
      subjectId: 1,
      topicId: 1,
      title: "Storyboard taqdimoti",
      description: "6 ta kadrdan iborat qisqa multimedia loyiha storyboardini tayyorlang.",
      deadline: "2026-05-20T18:00:00.000Z",
      createdBy: 2
    },
    {
      id: 2,
      subjectId: 2,
      topicId: 3,
      title: "Canvas animatsiya amaliyoti",
      description: "Canvas orqali oddiy harakatlanuvchi sahna yarating va loyiha faylini yuklang.",
      deadline: "2026-05-24T18:00:00.000Z",
      createdBy: 2
    }
  ],
  submissions: [
    {
      id: 1,
      assignmentId: 1,
      studentId: 3,
      fileUrl: "/uploads/demo-storyboard.txt",
      comment: "Storyboard konsepti va kadr tavsiflari yuklandi.",
      status: "review",
      createdAt: seedTimestamp
    }
  ],
  grades: [
    {
      id: 1,
      submissionId: 1,
      teacherId: 2,
      grade: 91,
      feedback: "Vizual ketma-ketlik yaxshi, matn qismini yanada ixchamlashtiring.",
      createdAt: seedTimestamp
    }
  ],
  resources: [
    {
      id: 1,
      title: "Interaktiv dars moduli",
      description: "Talabalar uchun elektron resurs namunasi.",
      type: "html5",
      fileUrl: "",
      createdBy: 2,
      createdAt: seedTimestamp,
      content: "<section><h2>Storyboard</h2><p>Asosiy kadrlarga sharh yozing.</p></section>"
    },
    {
      id: 2,
      title: "Video tahlil checklist",
      description: "Multimedia ishlarda sifat nazorati checklisti.",
      type: "document",
      fileUrl: "/uploads/demo-checklist.txt",
      createdBy: 2,
      createdAt: seedTimestamp,
      content: ""
    }
  ],
  tests: [
    { id: 1, subjectId: 1, title: "Storyboard va multimedia nazariyasi", createdBy: 2 }
  ],
  questions: [
    {
      id: 1,
      testId: 1,
      questionText: "Storyboardning asosiy vazifasi nima?",
      optionA: "Kadrlar ketma-ketligini rejalashtirish",
      optionB: "Faqat rang tanlash",
      optionC: "Audio fayl siqish",
      optionD: "Server yukini kamaytirish",
      correctAnswer: "A"
    },
    {
      id: 2,
      testId: 1,
      questionText: "Elektron resursda foydalanuvchi tajribasi uchun muhim omil qaysi?",
      optionA: "Navigatsiya tushunarliligi",
      optionB: "Tasodifiy ranglar",
      optionC: "Cheksiz matn bloklari",
      optionD: "Faqat bitta media turi",
      correctAnswer: "A"
    }
  ],
  test_results: [
    { id: 1, testId: 1, studentId: 3, score: 85, createdAt: seedTimestamp }
  ],
  portfolios: [
    { id: 1, studentId: 3, title: "Aziza Student portfeli", description: "Amaliy topshiriqlar va elektron resurslar to'plami." }
  ],
  portfolio_items: [
    { id: 1, portfolioId: 1, resourceId: 1, submissionId: null },
    { id: 2, portfolioId: 1, resourceId: null, submissionId: 1 }
  ],
  notifications: [
    { id: 1, userId: 3, title: "Baholash yangilandi", message: "Storyboard topshirig'ingiz uchun 91 ball va izoh qo'shildi.", isRead: false, createdAt: seedTimestamp },
    { id: 2, userId: 2, title: "Yangi topshiriq yuborildi", message: "Talaba storyboard topshirig'i bo'yicha yangi submission yubordi.", isRead: false, createdAt: seedTimestamp },
    { id: 3, userId: 1, title: "Tizim tayyor", message: "Demo foydalanuvchilar va test ma'lumotlari yaratildi.", isRead: false, createdAt: seedTimestamp }
  ],
  activity_logs: [
    { id: 1, userId: 3, action: "Storyboard topshirig'ini yukladi", createdAt: seedTimestamp },
    { id: 2, userId: 2, action: "Storyboard topshirig'ini baholadi", createdAt: seedTimestamp },
    { id: 3, userId: 1, action: "Tizim monitoringini tekshirdi", createdAt: seedTimestamp }
  ]
};

function nextId(collection) {
  return collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
}

function now() {
  return new Date().toISOString();
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function signToken(user) {
  return jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: "7d" });
}

function requireAuth(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    response.status(401).json({ message: "Autentifikatsiya talab qilinadi." });
    return;
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, jwtSecret);
    const user = db.users.find((item) => item.id === decoded.userId);

    if (!user) {
      response.status(401).json({ message: "Foydalanuvchi topilmadi." });
      return;
    }

    request.user = user;
    next();
  } catch (_error) {
    response.status(401).json({ message: "Token yaroqsiz." });
  }
}

function allowRoles(...roles) {
  return (request, response, next) => {
    if (!request.user || !roles.includes(request.user.role)) {
      response.status(403).json({ message: "Ruxsat yetarli emas." });
      return;
    }

    next();
  };
}

function addNotification(userId, title, message) {
  db.notifications.unshift({
    id: nextId(db.notifications),
    userId,
    title,
    message,
    isRead: false,
    createdAt: now()
  });
}

function logActivity(userId, action) {
  db.activity_logs.unshift({
    id: nextId(db.activity_logs),
    userId,
    action,
    createdAt: now()
  });
}

function assignmentViewFor(user) {
  return db.assignments.map((assignment) => {
    const subject = db.subjects.find((item) => item.id === assignment.subjectId);
    const topic = db.topics.find((item) => item.id === assignment.topicId);
    const submission = user.role === "student"
      ? db.submissions.find((item) => item.assignmentId === assignment.id && item.studentId === user.id)
      : null;
    const grade = submission ? db.grades.find((item) => item.submissionId === submission.id) : null;

    if (user.role === "teacher" && assignment.createdBy !== user.id) {
      return null;
    }

    return {
      ...assignment,
      subjectTitle: subject?.title || "",
      topicTitle: topic?.title || "",
      submissionId: submission?.id ?? null,
      submissionStatus: submission?.status ?? null,
      grade: grade?.grade ?? null
    };
  }).filter(Boolean);
}

function getOverview(user) {
  const visibleNotifications = user.role === "admin"
    ? db.notifications
    : db.notifications.filter((item) => item.userId === user.id);
  const visibleGrades = user.role === "student"
    ? db.grades.filter((grade) => {
        const submission = db.submissions.find((item) => item.id === grade.submissionId);
        return submission?.studentId === user.id;
      })
    : db.grades;
  const average = visibleGrades.length
    ? Math.round(visibleGrades.reduce((sum, item) => sum + item.grade, 0) / visibleGrades.length)
    : 0;

  return {
    counts: {
      users: db.users.length,
      subjects: db.subjects.length,
      assignments: db.assignments.length,
      submissions: db.submissions.length,
      resources: db.resources.length,
      tests: db.tests.length,
      notifications: visibleNotifications.filter((item) => !item.isRead).length
    },
    gradeAverage: average,
    roleDistribution: ["student", "teacher", "admin"].map((role) => ({
      label: role,
      value: db.users.filter((userItem) => userItem.role === role).length
    })),
    recentActivity: db.activity_logs.slice(0, 8).map((item) => ({
      ...item,
      fullName: db.users.find((userItem) => userItem.id === item.userId)?.fullName || ""
    })),
    recentResults: db.test_results.slice(0, 6).map((item) => ({
      ...item,
      fullName: db.users.find((userItem) => userItem.id === item.studentId)?.fullName || "",
      title: db.tests.find((test) => test.id === item.testId)?.title || ""
    }))
  };
}

app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));
app.use(express.static(distDir));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/auth/login", (request, response) => {
  const { email, password } = request.body;
  const user = db.users.find((item) => item.email === email && item.password === password);

  if (!user) {
    response.status(401).json({ message: "Email yoki parol noto'g'ri." });
    return;
  }

  logActivity(user.id, "Tizimga kirdi");
  response.json({
    user: sanitizeUser(user),
    token: signToken(user)
  });
});

app.post("/api/auth/register", (request, response) => {
  const { fullName, email, password, role = "student" } = request.body;

  if (db.users.some((item) => item.email === email)) {
    response.status(409).json({ message: "Bu email allaqachon mavjud." });
    return;
  }

  const user = {
    id: nextId(db.users),
    fullName,
    email,
    password,
    role: role === "teacher" ? "teacher" : "student",
    createdAt: now()
  };

  db.users.push(user);

  if (user.role === "student") {
    db.portfolios.push({
      id: nextId(db.portfolios),
      studentId: user.id,
      title: `${user.fullName} portfeli`,
      description: "Shaxsiy portfolio va multimedia ishlar to'plami."
    });
  }

  addNotification(user.id, "Xush kelibsiz", "MultimediaLab platformasiga muvaffaqiyatli ro'yxatdan o'tdingiz.");
  response.status(201).json({
    user: sanitizeUser(user),
    token: signToken(user)
  });
});

app.get("/api/auth/me", requireAuth, (request, response) => {
  response.json(sanitizeUser(request.user));
});

app.get("/api/subjects", requireAuth, (_request, response) => {
  response.json(
    db.subjects.map((subject) => ({
      ...subject,
      teacherName: db.users.find((user) => user.id === subject.teacherId)?.fullName || "",
      topicCount: db.topics.filter((topic) => topic.subjectId === subject.id).length,
      topics: db.topics.filter((topic) => topic.subjectId === subject.id)
    }))
  );
});

app.post("/api/subjects", requireAuth, allowRoles("teacher", "admin"), (request, response) => {
  const subject = {
    id: nextId(db.subjects),
    title: request.body.title,
    description: request.body.description,
    teacherId: Number(request.body.teacherId)
  };
  db.subjects.push(subject);
  logActivity(request.user.id, `Fan yaratdi: ${subject.title}`);
  response.status(201).json(subject);
});

app.post("/api/subjects/:subjectId/topics", requireAuth, allowRoles("teacher", "admin"), (request, response) => {
  const topic = {
    id: nextId(db.topics),
    subjectId: Number(request.params.subjectId),
    title: request.body.title,
    description: request.body.description
  };
  db.topics.push(topic);
  logActivity(request.user.id, `Mavzu yaratdi: ${topic.title}`);
  response.status(201).json(topic);
});

app.get("/api/subjects/topics/:id", requireAuth, (request, response) => {
  const topic = db.topics.find((item) => item.id === Number(request.params.id));

  if (!topic) {
    response.status(404).json({ message: "Mavzu topilmadi." });
    return;
  }

  const subject = db.subjects.find((item) => item.id === topic.subjectId);
  response.json({
    ...topic,
    subjectTitle: subject?.title || "",
    subjectDescription: subject?.description || "",
    assignments: db.assignments
      .filter((assignment) => assignment.topicId === topic.id)
      .map((assignment) => ({
        ...assignment,
        teacherName: db.users.find((item) => item.id === assignment.createdBy)?.fullName || ""
      }))
  });
});

app.get("/api/assignments", requireAuth, (request, response) => {
  response.json(assignmentViewFor(request.user));
});

app.post("/api/assignments", requireAuth, allowRoles("teacher", "admin"), (request, response) => {
  const assignment = {
    id: nextId(db.assignments),
    subjectId: Number(request.body.subjectId),
    topicId: Number(request.body.topicId),
    title: request.body.title,
    description: request.body.description,
    deadline: request.body.deadline,
    createdBy: request.user.id
  };
  db.assignments.push(assignment);
  logActivity(request.user.id, `Topshiriq yaratdi: ${assignment.title}`);
  response.status(201).json(assignment);
});

app.get("/api/assignments/:id", requireAuth, (request, response) => {
  const assignment = db.assignments.find((item) => item.id === Number(request.params.id));

  if (!assignment) {
    response.status(404).json({ message: "Topshiriq topilmadi." });
    return;
  }

  const subject = db.subjects.find((item) => item.id === assignment.subjectId);
  const topic = db.topics.find((item) => item.id === assignment.topicId);
  const teacher = db.users.find((item) => item.id === assignment.createdBy);
  const submissions = db.submissions
    .filter((item) => item.assignmentId === assignment.id && (request.user.role !== "student" || item.studentId === request.user.id))
    .map((submission) => {
      const student = db.users.find((item) => item.id === submission.studentId);
      const grade = db.grades.find((item) => item.submissionId === submission.id);
      return {
        ...submission,
        studentName: student?.fullName || "",
        grade: grade?.grade ?? null,
        feedback: grade?.feedback ?? null
      };
    });

  response.json({
    ...assignment,
    subjectTitle: subject?.title || "",
    topicTitle: topic?.title || "",
    teacherName: teacher?.fullName || "",
    submissions
  });
});

app.get("/api/submissions", requireAuth, (request, response) => {
  const rows = db.submissions
    .filter((submission) => {
      if (request.user.role === "student") {
        return submission.studentId === request.user.id;
      }

      if (request.user.role === "teacher") {
        const assignment = db.assignments.find((item) => item.id === submission.assignmentId);
        return assignment?.createdBy === request.user.id;
      }

      return true;
    })
    .map((submission) => {
      const assignment = db.assignments.find((item) => item.id === submission.assignmentId);
      const student = db.users.find((item) => item.id === submission.studentId);
      const grade = db.grades.find((item) => item.submissionId === submission.id);
      return {
        ...submission,
        assignmentTitle: assignment?.title || "",
        studentName: student?.fullName || "",
        studentId: submission.studentId,
        grade: grade?.grade ?? null,
        feedback: grade?.feedback ?? null
      };
    });

  response.json(rows);
});

app.post("/api/submissions", requireAuth, allowRoles("student"), upload.single("file"), (request, response) => {
  const assignment = db.assignments.find((item) => item.id === Number(request.body.assignmentId));

  if (!assignment) {
    response.status(404).json({ message: "Topshiriq topilmadi." });
    return;
  }

  const submission = {
    id: nextId(db.submissions),
    assignmentId: Number(request.body.assignmentId),
    studentId: request.user.id,
    fileUrl: request.file ? `/uploads/${request.file.filename}` : "",
    comment: request.body.comment || "",
    status: "submitted",
    createdAt: now()
  };

  db.submissions.unshift(submission);
  addNotification(assignment.createdBy, "Yangi submission", `${request.user.fullName} yangi ish yubordi.`);
  logActivity(request.user.id, `Submission yubordi: ${assignment.title}`);
  response.status(201).json(submission);
});

app.post("/api/submissions/:id/grade", requireAuth, allowRoles("teacher", "admin"), (request, response) => {
  const submission = db.submissions.find((item) => item.id === Number(request.params.id));

  if (!submission) {
    response.status(404).json({ message: "Submission topilmadi." });
    return;
  }

  let grade = db.grades.find((item) => item.submissionId === submission.id);

  if (grade) {
    grade.grade = Number(request.body.grade);
    grade.feedback = request.body.feedback;
    grade.createdAt = now();
  } else {
    grade = {
      id: nextId(db.grades),
      submissionId: submission.id,
      teacherId: request.user.id,
      grade: Number(request.body.grade),
      feedback: request.body.feedback,
      createdAt: now()
    };
    db.grades.unshift(grade);
  }

  submission.status = "graded";

  const assignment = db.assignments.find((item) => item.id === submission.assignmentId);
  addNotification(submission.studentId, "Ishingiz baholandi", `"${assignment?.title || "Topshiriq"}" uchun ${grade.grade} ball qo'yildi.`);
  logActivity(request.user.id, `Submission baholadi: ${assignment?.title || submission.id}`);

  const portfolio = db.portfolios.find((item) => item.studentId === submission.studentId);
  if (portfolio && !db.portfolio_items.some((item) => item.portfolioId === portfolio.id && item.submissionId === submission.id)) {
    db.portfolio_items.unshift({
      id: nextId(db.portfolio_items),
      portfolioId: portfolio.id,
      resourceId: null,
      submissionId: submission.id
    });
  }

  response.json({
    ...submission,
    grade: grade.grade,
    feedback: grade.feedback
  });
});

app.get("/api/resources", requireAuth, (_request, response) => {
  response.json(
    db.resources.map((resource) => ({
      ...resource,
      authorName: db.users.find((item) => item.id === resource.createdBy)?.fullName || ""
    }))
  );
});

app.post("/api/resources", requireAuth, upload.single("file"), (request, response) => {
  const resource = {
    id: nextId(db.resources),
    title: request.body.title,
    description: request.body.description,
    type: request.body.type,
    fileUrl: request.file ? `/uploads/${request.file.filename}` : request.body.fileUrl || "",
    createdBy: request.user.id,
    createdAt: now(),
    content: request.body.content || ""
  };
  db.resources.unshift(resource);
  logActivity(request.user.id, `Resurs yaratdi: ${resource.title}`);
  response.status(201).json(resource);
});

app.get("/api/tests", requireAuth, (request, response) => {
  const rows = db.tests.map((test) => {
    const subject = db.subjects.find((item) => item.id === test.subjectId);
    const creator = db.users.find((item) => item.id === test.createdBy);
    const latest = db.test_results.find((item) => item.testId === test.id && item.studentId === request.user.id);
    return {
      ...test,
      subjectTitle: subject?.title || "",
      creatorName: creator?.fullName || "",
      latestScore: request.user.role === "student" ? latest?.score ?? null : null,
      completedAt: request.user.role === "student" ? latest?.createdAt ?? null : null
    };
  });

  response.json(rows);
});

app.get("/api/tests/:id", requireAuth, (request, response) => {
  const test = db.tests.find((item) => item.id === Number(request.params.id));

  if (!test) {
    response.status(404).json({ message: "Test topilmadi." });
    return;
  }

  const subject = db.subjects.find((item) => item.id === test.subjectId);
  response.json({
    ...test,
    subjectTitle: subject?.title || "",
    questions: db.questions.filter((item) => item.testId === test.id)
  });
});

app.post("/api/tests", requireAuth, allowRoles("teacher", "admin"), (request, response) => {
  const test = {
    id: nextId(db.tests),
    subjectId: Number(request.body.subjectId),
    title: request.body.title,
    createdBy: request.user.id
  };

  db.tests.unshift(test);

  for (const question of request.body.questions || []) {
    db.questions.push({
      id: nextId(db.questions),
      testId: test.id,
      questionText: question.questionText,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer
    });
  }

  logActivity(request.user.id, `Test yaratdi: ${test.title}`);
  response.status(201).json({
    ...test,
    questions: db.questions.filter((item) => item.testId === test.id)
  });
});

app.post("/api/tests/:id/submit", requireAuth, allowRoles("student"), (request, response) => {
  const testId = Number(request.params.id);
  const questions = db.questions.filter((item) => item.testId === testId);
  let correct = 0;

  for (const question of questions) {
    if (request.body.answers?.[question.id] === question.correctAnswer) {
      correct += 1;
    }
  }

  const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  db.test_results.unshift({
    id: nextId(db.test_results),
    testId,
    studentId: request.user.id,
    score,
    createdAt: now()
  });

  const test = db.tests.find((item) => item.id === testId);
  if (test) {
    addNotification(test.createdBy, "Yangi test natijasi", `${request.user.fullName} "${test.title}" testini ${score} ball bilan yakunladi.`);
  }
  logActivity(request.user.id, `Test topshirdi: ${test?.title || testId}`);
  response.json({ score, total: questions.length, correct });
});

app.get("/api/portfolio", requireAuth, (request, response) => {
  const requestedId = Number(request.query.studentId || request.user.id);
  const studentId = request.user.role === "student" ? request.user.id : requestedId;
  const portfolio = db.portfolios.find((item) => item.studentId === studentId);

  if (!portfolio) {
    response.status(404).json({ message: "Portfolio topilmadi." });
    return;
  }

  response.json({
    ...portfolio,
    studentName: db.users.find((item) => item.id === portfolio.studentId)?.fullName || "",
    items: db.portfolio_items
      .filter((item) => item.portfolioId === portfolio.id)
      .map((item) => {
        const resource = db.resources.find((resourceItem) => resourceItem.id === item.resourceId);
        const submission = db.submissions.find((submissionItem) => submissionItem.id === item.submissionId);
        return {
          id: item.id,
          resourceTitle: resource?.title || null,
          resourceType: resource?.type || null,
          resourceFileUrl: resource?.fileUrl || null,
          submissionFileUrl: submission?.fileUrl || null,
          submissionComment: submission?.comment || null
        };
      })
  });
});

app.get("/api/notifications", requireAuth, (request, response) => {
  const rows = (request.user.role === "admin" ? db.notifications : db.notifications.filter((item) => item.userId === request.user.id))
    .map((item) => ({
      ...item,
      fullName: db.users.find((user) => user.id === item.userId)?.fullName || ""
    }));
  response.json(rows);
});

app.patch("/api/notifications/:id/read", requireAuth, (request, response) => {
  const notification = db.notifications.find((item) => item.id === Number(request.params.id));

  if (!notification) {
    response.status(404).json({ message: "Bildirishnoma topilmadi." });
    return;
  }

  if (request.user.role !== "admin" && notification.userId !== request.user.id) {
    response.status(403).json({ message: "Ruxsat yetarli emas." });
    return;
  }

  notification.isRead = true;
  response.json(notification);
});

app.post("/api/notifications", requireAuth, allowRoles("admin"), (request, response) => {
  const roles = request.body.targetRole === "all"
    ? ["student", "teacher", "admin"]
    : [request.body.targetRole];

  for (const role of roles) {
    db.users.filter((user) => user.role === role).forEach((user) => {
      addNotification(user.id, request.body.title, request.body.message);
    });
  }

  response.status(201).json({ success: true, delivery: "mock-service" });
});

app.get("/api/admin/users", requireAuth, allowRoles("admin"), (_request, response) => {
  response.json(db.users.map(sanitizeUser));
});

app.get("/api/admin/summary", requireAuth, allowRoles("admin"), (_request, response) => {
  response.json({
    system: {
      fileCount: fs.readdirSync(uploadsDir).length,
      totalBytes: fs.readdirSync(uploadsDir).reduce((sum, fileName) => sum + fs.statSync(path.join(uploadsDir, fileName)).size, 0)
    },
    latestUsers: db.users.slice().sort((a, b) => b.id - a.id).slice(0, 5).map(sanitizeUser)
  });
});

app.get("/api/profile", requireAuth, (request, response) => {
  response.json(sanitizeUser(request.user));
});

app.put("/api/profile", requireAuth, (request, response) => {
  request.user.fullName = request.body.fullName;
  request.user.email = request.body.email;
  response.json(sanitizeUser(request.user));
});

app.get("/api/analytics", requireAuth, (request, response) => {
  response.json(getOverview(request.user));
});

app.get("/api/analytics/report", requireAuth, (request, response) => {
  const overview = getOverview(request.user);
  const doc = new PDFDocument({ margin: 36 });
  response.setHeader("Content-Type", "application/pdf");
  response.setHeader("Content-Disposition", "attachment; filename=multimedialab-report.pdf");

  doc.pipe(response);
  doc.fontSize(20).text("MultimediaLab Hisobot", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Foydalanuvchi: ${request.user.fullName}`);
  doc.text(`Rol: ${request.user.role}`);
  doc.text(`Sana: ${new Date().toLocaleString("uz-UZ")}`);
  doc.moveDown();
  doc.fontSize(15).text("Asosiy ko'rsatkichlar");
  doc.fontSize(12).text(`Fanlar: ${overview.counts.subjects}`);
  doc.text(`Topshiriqlar: ${overview.counts.assignments}`);
  doc.text(`Submissionlar: ${overview.counts.submissions}`);
  doc.text(`Resurslar: ${overview.counts.resources}`);
  doc.text(`Testlar: ${overview.counts.tests}`);
  doc.text(`O'rtacha baho: ${overview.gradeAverage}`);
  doc.moveDown();
  doc.fontSize(15).text("So'nggi faoliyatlar");
  overview.recentActivity.forEach((item) => doc.fontSize(11).text(`- ${item.fullName}: ${item.action}`));
  doc.end();
});

app.get("*", (_request, response) => {
  response.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Render-ready server listening on 0.0.0.0:${port}`);
});
