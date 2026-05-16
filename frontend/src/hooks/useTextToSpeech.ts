import { useCallback, useEffect, useMemo, useState } from "react";

function chooseBestVoice(voices: SpeechSynthesisVoice[]) {
  const lowerIncludes = (value: string, query: string) => value.toLowerCase().includes(query);
  return (
    voices.find((voice) => lowerIncludes(voice.lang, "uz") || lowerIncludes(voice.name, "uzbek")) ||
    voices.find((voice) => lowerIncludes(voice.lang, "ru")) ||
    voices.find((voice) => lowerIncludes(voice.lang, "en")) ||
    voices[0] ||
    null
  );
}

export function useTextToSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [rate, setRate] = useState(0.98);
  const [pitch, setPitch] = useState(1);

  const isSupported = useMemo(() => typeof window !== "undefined" && "speechSynthesis" in window, []);

  useEffect(() => {
    if (!isSupported) {
      setError("Bu brauzer text-to-speech funksiyasini qo'llab-quvvatlamaydi.");
      return;
    }

    const load = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      setSelectedVoice((previous) => previous ?? chooseBestVoice(list));
    };

    load();
    window.speechSynthesis.onvoiceschanged = load;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) {
        setError("TTS mavjud emas. Matnli javob ko'rsatildi.");
        return;
      }

      stop();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice?.lang || "en-US";
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.onstart = () => {
        setError("");
        setIsSpeaking(true);
      };
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setError("TTS ovozi ishga tushmadi. Browser audio sozlamasini tekshiring.");
        setIsSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, pitch, rate, selectedVoice, stop]
  );

  const pause = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.pause();
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.resume();
    }
  }, [isSupported]);

  return {
    voices,
    selectedVoice,
    setSelectedVoice,
    isSpeaking,
    isSupported,
    error,
    rate,
    setRate,
    pitch,
    setPitch,
    speak,
    stop,
    pause,
    resume
  };
}
