import { MessageSquare, Mic, Send, Sparkles, Waypoints, X } from "lucide-react";
import { useState } from "react";
import { queryAssistant } from "../../features/assistant/assistant.service";
import { findRoute } from "../../features/routing/routing.service";
import { useAppStore } from "../../store/useAppStore";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";

const suggestedPrompts = [
  "215-xonaga yo'l ko'rsat",
  "G'olib Rashidovich qayerda?",
  "Kutubxona qayerda?",
  "Rektor qabuliga yozilmoqchiman"
];

export const AssistantDock = () => {
  const assistantOpen = useAppStore((state) => state.assistantOpen);
  const setAssistantOpen = useAppStore((state) => state.setAssistantOpen);
  const messages = useAppStore((state) => state.assistantMessages);
  const pushAssistantMessage = useAppStore((state) => state.pushAssistantMessage);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const setAvatarMode = useAppStore((state) => state.setAvatarMode);
  const pushToast = useAppStore((state) => state.pushToast);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVoiceDemo = async () => {
    const transcript = input.trim() || "Kutubxona qayerda?";
    pushToast({ title: "Ovozli demo ishga tushdi.", tone: "info" });
    await handleAsk(transcript);
  };

  const handleAsk = async (message: string) => {
    if (!message.trim()) {
      return;
    }

    const clean = message.trim();
    setLoading(true);
    setAvatarMode("listening");
    pushAssistantMessage({
      id: `message-${Date.now()}`,
      role: "user",
      text: clean,
      createdAt: new Date().toISOString()
    });
    setInput("");

    try {
      const result = await queryAssistant(clean);
      setAvatarMode("thinking");

      if (result.suggestedRoomId) {
        const route = await findRoute({
          fromNodeId: "entrance-1",
          toRoomId: result.suggestedRoomId,
          algorithm: "astar"
        });
        setActiveRoute(route);
        setAvatarMode("pointing");
      }

      pushAssistantMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: result.answer,
        createdAt: new Date().toISOString()
      });
      setAvatarMode("speaking");
    } catch (error) {
      setAvatarMode("neutral");
      pushToast({
        title: error instanceof Error ? error.message : "Assistant so'rovi muvaffaqiyatsiz tugadi.",
        tone: "warning"
      });
    } finally {
      window.setTimeout(() => setAvatarMode("idle"), 1600);
      setLoading(false);
    }
  };

  if (!assistantOpen) {
    return (
      <button
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-cyan-400/25 bg-[rgba(6,20,38,0.94)] px-5 py-4 text-sm font-semibold text-white shadow-glow backdrop-blur-xl"
        onClick={() => setAssistantOpen(true)}
        type="button"
      >
        <Sparkles className="h-4 w-4 text-cyan-300" />
        ATMURA Assistant
        <Badge tone="info">Live</Badge>
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-40 flex h-[560px] w-[380px] flex-col overflow-hidden" strong>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-['Space_Grotesk'] text-lg font-bold text-white">ATMURA Assistant</p>
          <p className="text-xs text-white/45">Route, teacher, reception va campus xizmatlari</p>
        </div>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/65"
          onClick={() => setAssistantOpen(false)}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4 rounded-[24px] border border-cyan-400/16 bg-cyan-500/10 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <p className="text-sm font-semibold text-white">Suggested prompts</p>
          </div>
          <Badge tone="violet">Emotion-aware</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs text-white/70 transition hover:bg-white/12"
              onClick={() => void handleAsk(prompt)}
              type="button"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="atmura-scrollbar flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "assistant"
                ? "mr-10 rounded-[28px] border border-cyan-400/12 bg-cyan-500/10 p-4"
                : "ml-10 rounded-[28px] border border-white/10 bg-white/10 p-4 text-white"
            }
          >
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-white/60">
              {message.role === "assistant" ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                  ATMURA
                </>
              ) : (
                <>
                  <MessageSquare className="h-3.5 w-3.5" />
                  Siz
                </>
              )}
            </div>
            <p className="text-sm leading-6 text-white/78">{message.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Masalan: 215-xonani topib ber"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void handleAsk(input);
              }
            }}
          />
          <button
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/65"
            onClick={() => void handleVoiceDemo()}
            type="button"
          >
            <Mic className="h-4 w-4" />
          </button>
          <Button disabled={loading} onClick={() => void handleAsk(input)}>
            {loading ? <Waypoints className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-white/40">ATMURA sizning savolingizni tahlil qilmoqda va kerak bo'lsa route ni avtomatik hisoblaydi.</p>
      </div>
    </Card>
  );
};
