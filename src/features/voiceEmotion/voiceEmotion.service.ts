import { apiRequest } from "../../lib/api";
import type { Emotion, VoiceEmotionResult } from "../../types";

const keywordTable: Array<{ emotion: Emotion; keywords: string[] }> = [
  { emotion: "hurry", keywords: ["tez", "shoshilyapman", "shoshildim", "tezroq"] },
  { emotion: "confused", keywords: ["tushunmadim", "qayerda", "qani", "topolmadim"] },
  { emotion: "happy", keywords: ["rahmat", "zo'r", "ajoyib", "super"] },
  { emotion: "angry", keywords: ["nega", "muammo", "ishlamadi", "asab"] },
  { emotion: "shy", keywords: ["bilmasam", "uyalyapman", "xijolat", "sekin"] }
];

export const detectEmotion = (transcript: string): Emotion => {
  const normalized = transcript.toLowerCase();
  const matched = keywordTable.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword))
  );
  return matched?.emotion ?? "neutral";
};

export const emotionResponseTone = (emotion: Emotion, transcript: string): string => {
  const shortAnswer = "Eng yaqin marshrut tayyor. 2 daqiqa ichida manzilga yetasiz.";
  const calmAnswer =
    "Xotirjam bo'ling, sizga bosqichma-bosqich yo'l ko'rsataman. Birinchi navbatda lobby tomonga yuring.";
  const friendlyAnswer =
    "Zo'r! Siz uchun qulay yo'lni topdim, xohlasangiz xaritada ham ko'rsatib beraman.";
  const directAnswer =
    "Muammoni tushundim. Yo'lni qayta hisoblayapman va eng qisqa variantni ko'rsataman.";

  if (emotion === "hurry") {
    return shortAnswer;
  }

  if (emotion === "shy" || emotion === "confused") {
    return calmAnswer;
  }

  if (emotion === "happy") {
    return friendlyAnswer;
  }

  if (emotion === "angry") {
    return directAnswer;
  }

  return `Sizning so'rovingiz qabul qilindi: "${transcript}". Xarita va assistant paneli orqali davom etamiz.`;
};

export const processVoiceEmotion = async (transcript: string): Promise<VoiceEmotionResult> =>
  apiRequest<VoiceEmotionResult>("/api/assistant/emotion", {
    method: "POST",
    body: JSON.stringify({ transcript }),
    fallback: async () => {
      const emotion = detectEmotion(transcript);
      return {
        transcript,
        emotion,
        response: emotionResponseTone(emotion, transcript)
      };
    }
  });
