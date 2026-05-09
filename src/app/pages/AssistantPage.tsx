import type { LucideIcon } from "lucide-react";
import { Bot, Lightbulb, Route, Sparkles, UserRoundSearch } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { queryAssistant } from "../../features/assistant/assistant.service";
import { findRoute } from "../../features/routing/routing.service";
import { useAppStore } from "../../store/useAppStore";

export const AssistantPage = () => {
  const pushAssistantMessage = useAppStore((state) => state.pushAssistantMessage);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const setAvatarMode = useAppStore((state) => state.setAvatarMode);
  const [query, setQuery] = useState("G'olib Rashidovich qayerda dars beradi?");
  const [answer, setAnswer] = useState("");

  const handleAsk = async (prompt: string) => {
    setAvatarMode("thinking");
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
      setAvatarMode("pointing");
      return;
    }

    setAvatarMode("speaking");
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
        title="ATMURA multimodal campus assistant"
        description="Assistant xonalar, o'qituvchilar, dekanat, kutubxona va boshqa xizmatlarni fuzzy search, schedule lookup va routing bilan birlashtiradi."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <Card className="bg-[linear-gradient(180deg,rgba(6,20,38,0.94),rgba(11,45,91,0.88))]">
          <div className="mb-4 flex items-center gap-3">
            <Bot className="h-5 w-5 text-cyan-300" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Assistant query</p>
              <p className="text-sm text-white/55">Teacher, room yoki xizmat haqida savol bering.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} />
            <Button onClick={() => void handleAsk(query)}>So'rash</Button>
          </div>

          <div className="mt-4 rounded-[24px] border border-cyan-400/18 bg-cyan-500/10 p-5">
            <p className="text-sm leading-7 text-white/72">{answer || "Javob shu yerda ko'rinadi."}</p>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Quick prompts</p>
            <Badge tone="info">Campus-ready</Badge>
          </div>
          <div className="space-y-3">
            {quickPrompts.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-left transition hover:border-cyan-300/35 hover:bg-white/8"
                onClick={() => void handleAsk(label)}
                type="button"
              >
                <Icon className="h-4 w-4 text-cyan-300" />
                <span className="text-sm font-semibold text-white">{label}</span>
                <Sparkles className="ml-auto h-4 w-4 text-white/35" />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
