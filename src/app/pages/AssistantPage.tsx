import type { LucideIcon } from "lucide-react";
import { Bot, Lightbulb, Route, UserRoundSearch } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { queryAssistant } from "../../features/assistant/assistant.service";
import { findRoute } from "../../features/routing/routing.service";
import { useAppStore } from "../../store/useAppStore";

export const AssistantPage = () => {
  const pushAssistantMessage = useAppStore((state) => state.pushAssistantMessage);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const [query, setQuery] = useState("G'olib Rashidovich qayerda dars beradi?");
  const [answer, setAnswer] = useState("");

  const handleAsk = async (prompt: string) => {
    const result = await queryAssistant(prompt);
    setAnswer(result.answer);
    pushAssistantMessage({
      id: `assistant-page-${Date.now()}`,
      role: "assistant",
      text: result.answer,
      createdAt: new Date().toISOString()
    });

    if (result.suggestedRoomId) {
      const route = await findRoute({
        fromNodeId: "entrance-1",
        toRoomId: result.suggestedRoomId,
        algorithm: "astar"
      });
      setActiveRoute(route);
    }
  };

  const quickPrompts: Array<{ label: string; icon: LucideIcon }> = [
    { label: "215-xonani topib ber", icon: Route },
    { label: "G'olib Rashidovich qayerda dars beradi?", icon: UserRoundSearch },
    { label: "Kutubxona qayerda?", icon: Lightbulb }
  ];

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="AI assistant"
        title="ATMURA multimodal assistant"
        description="Assistant xonalar, o'qituvchilar, dekanat, kutubxona va boshqa xizmatlarni fuzzy search, schedule lookup va routing bilan birlashtiradi."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <Bot className="h-5 w-5 text-cyan-600" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Assistant query</p>
              <p className="text-sm text-slate-500">Teacher, room yoki xizmat haqida savol bering</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} />
            <Button onClick={() => void handleAsk(query)}>So'rash</Button>
          </div>

          <div className="mt-4 rounded-[24px] bg-cyan-50 p-5">
            <p className="text-sm leading-7 text-slate-700">{answer || "Javob shu yerda ko'rinadi."}</p>
          </div>
        </Card>

        <Card>
          <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Quick prompts</p>
          <div className="mt-4 space-y-3">
            {quickPrompts.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 text-left transition hover:border-cyan-300"
                onClick={() => void handleAsk(label)}
                type="button"
              >
                <Icon className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-semibold text-navy-900">{label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
