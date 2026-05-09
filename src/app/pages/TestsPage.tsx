import { CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { getQuestionsByTest, getTests, submitTest } from "../../features/tests/tests.service";
import { useAppStore } from "../../store/useAppStore";
import type { Question, Test, TestResult } from "../../types";

export const TestsPage = () => {
  const currentUser = useAppStore((state) => state.currentUser);
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    void getTests().then((items) => {
      setTests(items);
      setSelectedTest(items[0] ?? null);
      setQuestions(items[0] ? getQuestionsByTest(items[0].id) : []);
    });
  }, []);

  const chooseTest = (test: Test) => {
    setSelectedTest(test);
    setQuestions(getQuestionsByTest(test.id));
    setAnswers({});
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedTest) {
      return;
    }
    const nextResult = await submitTest({
      testId: selectedTest.id,
      studentId: currentUser.id,
      answers
    });
    setResult(nextResult);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Tests & assessment"
        title="Test ishlash va baholash interfeysi"
        description="Talabalar test topshirishi, o'qituvchilar test yaratishi va AI orqali kelajakda savollar generatsiya qilinishi mumkin bo'lgan modul."
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Mavjud testlar</p>
          <div className="mt-4 space-y-3">
            {tests.map((test) => (
              <button
                key={test.id}
                className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 text-left transition hover:border-cyan-300"
                onClick={() => chooseTest(test)}
                type="button"
              >
                <p className="text-sm font-semibold text-navy-900">{test.title}</p>
                <p className="text-xs text-slate-500">{test.subjectId}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-cyan-600" />
            <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">
              {selectedTest?.title ?? "Test tanlang"}
            </p>
          </div>

          <div className="space-y-5">
            {questions.map((question) => (
              <div key={question.id} className="rounded-[24px] border border-slate-200 bg-white/70 p-4">
                <p className="text-sm font-semibold text-navy-900">{question.text}</p>
                <div className="mt-3 grid gap-2">
                  {question.options.map((option) => (
                    <label key={option} className="flex items-center gap-3 rounded-2xl border border-slate-100 px-3 py-2 text-sm">
                      <input
                        checked={answers[question.id] === option}
                        name={question.id}
                        onChange={() => setAnswers((state) => ({ ...state, [question.id]: option }))}
                        type="radio"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button onClick={() => void handleSubmit()}>Testni topshirish</Button>
            {result ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Natija: {result.score}
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
};
