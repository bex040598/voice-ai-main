import type { Emotion } from "../../common/types/domain.types.js";

const keywordMap: Array<{ emotion: Emotion; keywords: string[] }> = [
  { emotion: "hurry", keywords: ["tez", "shoshilyapman", "tezroq"] },
  { emotion: "confused", keywords: ["tushunmadim", "qayerda", "topolmadim"] },
  { emotion: "happy", keywords: ["rahmat", "zo'r", "ajoyib"] },
  { emotion: "angry", keywords: ["nega", "muammo", "ishlamadi"] },
  { emotion: "shy", keywords: ["bilmasam", "uyalyapman", "xijolat"] }
];

export const voiceService = {
  classify(transcript: string) {
    const normalized = transcript.toLowerCase();
    const emotion =
      keywordMap.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)))?.emotion ??
      "neutral";

    const response =
      emotion === "hurry"
        ? "Eng yaqin marshrut tayyor. 2 daqiqa ichida yetasiz."
        : emotion === "confused" || emotion === "shy"
          ? "Xotirjam bo'ling, men sizga bosqichma-bosqich yo'l ko'rsataman."
          : emotion === "happy"
            ? "Zo'r! Siz uchun qulay yo'lni topdim."
            : emotion === "angry"
              ? "Muammoni tushundim, yo'lni qayta hisoblayman."
              : `So'rov qabul qilindi: "${transcript}".`;

    return { transcript, emotion, response };
  }
};
