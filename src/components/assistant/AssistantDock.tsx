import { MessageSquare, Send, Sparkles, Waypoints } from "lucide-react";
import { useState } from "react";
import { queryAssistant } from "../../features/assistant/assistant.service";
import { findRoute } from "../../features/routing/routing.service";
import { useAppStore } from "../../store/useAppStore";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";

export const AssistantDock = () => {
  const assistantOpen = useAppStore((state) => state.assistantOpen);
  const toggleAssistant = useAppStore((state) => state.toggleAssistant);
  const messages = useAppStore((state) => state.assistantMessages);
  const pushAssistantMessage = useAppStore((state) => state.pushAssistantMessage);
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const pushToast = useAppStore((state) => state.pushToast);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) {
      return;
    }

    const message = input.trim();
    setLoading(true);
    pushAssistantMessage({
      id: `message-${Date.now()}`,
      role: "user",
      text: message,
      createdAt: new Date().toISOString()
    });
    setInput("");

    try {
      const result = await queryAssistant(message);

      if (result.suggestedRoomId) {
        const route = await findRoute({
          fromNodeId: "entrance-1",
          toRoomId: result.suggestedRoomId,
          algorithm: "astar"
        });
        setActiveRoute(route);
      }

      pushAssistantMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: result.answer,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      pushToast({
        title: error instanceof Error ? error.message : "Assistant so'rovi muvaffaqiyatsiz tugadi.",
        tone: "warning"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!assistantOpen) {
    return (
      <button
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-navy-900 px-5 py-4 text-sm font-semibold text-white shadow-panel"
        onClick={toggleAssistant}
        type="button"
      >
        <Sparkles className="h-4 w-4 text-cyan-300" />
        ATMURA Assistant
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-40 flex h-[520px] w-[360px] flex-col overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-['Space_Grotesk'] text-lg font-bold text-navy-900">ATMURA Assistant</p>
          <p className="text-xs text-slate-500">Route, teacher, NFC va kampus xizmatlari</p>
        </div>
        <button className="rounded-full bg-slate-100 px-3 py-1 text-xs" onClick={toggleAssistant} type="button">
          Yopish
        </button>
      </div>

      <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "assistant" ? "mr-10 rounded-3xl bg-cyan-50 p-3" : "ml-10 rounded-3xl bg-navy-900 p-3 text-white"}
          >
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold">
              {message.role === "assistant" ? <Sparkles className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />}
              {message.role === "assistant" ? "ATMURA" : "Siz"}
            </div>
            <p className="text-sm leading-6">{message.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Input
          placeholder="Masalan: 215-xonani topib ber"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void handleSubmit();
            }
          }}
        />
        <Button disabled={loading} onClick={() => void handleSubmit()}>
          {loading ? <Waypoints className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
};
