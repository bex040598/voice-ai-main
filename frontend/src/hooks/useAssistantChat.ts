import { useCallback, useEffect, useMemo, useState } from "react";
import { fallbackToLocalAssistantEngine, sendToExternalBot } from "../lib/api/atmuAiAdapter";
import { detectEmotion } from "../lib/assistant/emotionDetector";
import type {
  AssistantAction,
  AssistantReply,
  ChatMessage,
  ExternalBotStatus
} from "../lib/assistant/assistantTypes";

const STORAGE_KEY = "atmu-assistant-history";

function buildMessage(message: Omit<ChatMessage, "id" | "timestamp">): ChatMessage {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...message
  };
}

export function useAssistantChat({
  autoSpeak,
  speak,
  externalBotStatus
}: {
  autoSpeak: boolean;
  speak: (text: string) => void;
  externalBotStatus: ExternalBotStatus;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const persisted = window.localStorage.getItem(STORAGE_KEY);
    if (persisted) {
      try {
        return JSON.parse(persisted) as ChatMessage[];
      } catch {
        return [];
      }
    }

    return [
      buildMessage({
        role: "assistant",
        text:
          "Assalomu alaykum. Men ATMURA Uzbek Voice AI Assistantman. Xonalar, o'qituvchilar, kutubxona, qabulxona va kampus bo'yicha yordam bera olaman.",
        intent: "general"
      })
    ];
  });
  const [isThinking, setIsThinking] = useState(false);
  const [lastReply, setLastReply] = useState<AssistantReply | null>(null);
  const [routePreview, setRoutePreview] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const sendMessage = useCallback(
    async (input: string) => {
      const message = input.trim();
      if (!message) return;

      const emotionInfo = detectEmotion(message);
      const userMessage = buildMessage({
        role: "user",
        text: message,
        emotion: emotionInfo.emotion
      });

      setMessages((current) => [...current, userMessage]);
      setIsThinking(true);
      setError("");

      const delay = 600 + Math.round(Math.random() * 600);
      await new Promise((resolve) => window.setTimeout(resolve, delay));

      try {
        const localCandidate = await fallbackToLocalAssistantEngine(message);
        const reply =
          localCandidate.intent === "general" && externalBotStatus === "online"
            ? await sendToExternalBot(message)
            : localCandidate;

        const assistantMessage = buildMessage({
          role: "assistant",
          text: reply.text,
          emotion: emotionInfo.emotion,
          intent: reply.intent,
          actions: reply.actions
        });

        setMessages((current) => [...current, assistantMessage]);
        setLastReply(reply);

        if (autoSpeak) {
          speak(reply.text);
        }
      } catch {
        const fallbackReply = await fallbackToLocalAssistantEngine(message);
        const assistantMessage = buildMessage({
          role: "assistant",
          text: fallbackReply.text,
          emotion: emotionInfo.emotion,
          intent: fallbackReply.intent,
          actions: fallbackReply.actions
        });

        setMessages((current) => [...current, assistantMessage]);
        setLastReply(fallbackReply);
        setError("External bot ulanmaganligi sabab local assistant engine ishlatildi.");
        if (autoSpeak) {
          speak(fallbackReply.text);
        }
      } finally {
        setIsThinking(false);
      }
    },
    [autoSpeak, externalBotStatus, speak]
  );

  const clearChat = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setMessages([
      buildMessage({
        role: "assistant",
        text:
          "Chat tozalandi. Yangi savol bilan davom etishingiz mumkin.",
        intent: "general"
      })
    ]);
    setLastReply(null);
    setRoutePreview("");
  }, []);

  const handleAction = useCallback(
    async (action: AssistantAction, messageText: string, navigate: (href: string) => void) => {
      if (action.type === "route") {
        const location = String(action.payload?.location || "marshrut");
        setRoutePreview(`${location} uchun marshrut tayyorlandi.`);
        setToastMessage(`${location} uchun marshrut tayyorlandi`);
        return;
      }

      if (action.type === "navigate") {
        const href = String(action.payload?.href || "/assistant");
        navigate(href);
        return;
      }

      if (action.type === "telegram") {
        setToastMessage("Yo'nalish Telegramga yuborildi");
        return;
      }

      if (action.type === "copy") {
        await navigator.clipboard.writeText(messageText);
        setToastMessage("Javob clipboardga ko'chirildi");
        return;
      }

      if (action.type === "speak") {
        speak(messageText);
      }
    },
    [speak]
  );

  const suggestedPrompts = useMemo(
    () => [
      "215-xonaga qanday boraman?",
      "Kutubxona qayerda joylashgan?",
      "G'olib Rashidovich qayerda dars beradi?",
      "Rektor qabuliga qanday yozilaman?",
      "NFC orqali joylashuvni qanday aniqlayman?",
      "Menga yo'lni ovoz bilan tushuntir",
      "Bugungi dars jadvalimni ko'rsat",
      "Men adashib qoldim, yordam bering"
    ],
    []
  );

  return {
    messages,
    isThinking,
    sendMessage,
    clearChat,
    handleAction,
    suggestedPrompts,
    lastReply,
    routePreview,
    toastMessage,
    error
  };
}
