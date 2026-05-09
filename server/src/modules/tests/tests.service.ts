import { appendAuditLog, db } from "../../database/mockDb.js";

export const testsService = {
  create(input: {
    title: string;
    subjectId: string;
    createdBy: string;
  }) {
    const test = {
      id: `test-${db.tests.length + 1}`,
      ...input
    };
    db.tests.unshift(test);
    appendAuditLog(input.createdBy, "created test", "Test");
    return test;
  },

  list() {
    return db.tests;
  },

  submit(testId: string, input: { testId: string; studentId: string; answers: Record<string, string> }) {
    const questions = db.questions.filter((question) => question.testId === testId);
    const correct = questions.filter((question) => input.answers[question.id] === question.correctAnswer).length;
    const result = {
      id: `result-${db.testResults.length + 1}`,
      testId,
      studentId: input.studentId,
      score: Math.round((correct / Math.max(questions.length, 1)) * 100),
      startedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      finishedAt: new Date().toISOString()
    };
    db.testResults.unshift(result);
    appendAuditLog(input.studentId, "submitted test", "TestResult");
    return result;
  }
};
