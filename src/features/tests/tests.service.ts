import { apiRequest } from "../../lib/api";
import { mockQuestions, mockTestResults, mockTests } from "../../data/mockAcademic";
import type { Question, Test, TestResult } from "../../types";

export const getTests = async (): Promise<Test[]> =>
  apiRequest<Test[]>("/api/tests", {
    fallback: async () => mockTests
  });

export const createTest = async (payload: Omit<Test, "id">): Promise<Test> =>
  apiRequest<Test>("/api/tests", {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      const test: Test = { ...payload, id: `test-${mockTests.length + 1}` };
      mockTests.unshift(test);
      return test;
    }
  });

export const getQuestionsByTest = (testId: string): Question[] =>
  mockQuestions.filter((question) => question.testId === testId);

export const submitTest = async (payload: {
  testId: string;
  studentId: string;
  answers: Record<string, string>;
}): Promise<TestResult> =>
  apiRequest<TestResult>(`/api/tests/${payload.testId}/submit`, {
    method: "POST",
    body: JSON.stringify(payload),
    fallback: async () => {
      const questions = getQuestionsByTest(payload.testId);
      const correct = questions.filter(
        (question) => payload.answers[question.id] === question.correctAnswer
      ).length;
      const score = Math.round((correct / Math.max(questions.length, 1)) * 100);
      const result: TestResult = {
        id: `result-${mockTestResults.length + 1}`,
        testId: payload.testId,
        studentId: payload.studentId,
        score,
        startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        finishedAt: new Date().toISOString()
      };
      mockTestResults.unshift(result);
      return result;
    }
  });
