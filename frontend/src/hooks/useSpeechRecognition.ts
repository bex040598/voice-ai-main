import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PermissionState = "unknown" | "granted" | "denied" | "prompt" | "unsupported";

type RecognitionResultPiece = {
  transcript: string;
};

type RecognitionResult = {
  isFinal: boolean;
  0: RecognitionResultPiece;
};

type RecognitionResultListLike = {
  length: number;
  [index: number]: RecognitionResult;
};

type RecognitionEventLike = {
  resultIndex: number;
  results: RecognitionResultListLike;
};

type RecognitionErrorEventLike = {
  error: string;
};

type RecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: RecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type RecognitionConstructor = new () => RecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  }
}

export function useSpeechRecognition() {
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [permissionState, setPermissionState] = useState<PermissionState>("unknown");
  const [error, setError] = useState("");

  const RecognitionCtor = useMemo(
    () => window.SpeechRecognition || window.webkitSpeechRecognition || null,
    []
  );
  const isSupported = Boolean(RecognitionCtor);

  useEffect(() => {
    if (!RecognitionCtor) {
      setPermissionState("unsupported");
      return;
    }

    const recognition = new RecognitionCtor();
    recognition.lang = "uz-UZ";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setError("");
      setIsListening(true);
    };

    recognition.onresult = (event: RecognitionEventLike) => {
      let interim = "";
      let final = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const piece = event.results[index][0]?.transcript?.trim() ?? "";
        if (event.results[index].isFinal) {
          final += `${piece} `;
        } else {
          interim += `${piece} `;
        }
      }

      const normalizedFinal = final.trim();
      const normalizedInterim = interim.trim();

      if (normalizedFinal) {
        setFinalTranscript(normalizedFinal);
        setTranscript(normalizedFinal);
      }

      setInterimTranscript(normalizedInterim);
      if (normalizedInterim) {
        setTranscript(normalizedInterim);
      }
    };

    recognition.onerror = (event: RecognitionErrorEventLike) => {
      const message =
        event.error === "not-allowed"
          ? "Mikrofon ruxsati berilmadi."
          : event.error === "language-not-supported"
            ? "uz-UZ qo'llanmadi. Fallback tilga o'ting yoki matn kiriting."
            : `Speech recognition xatosi: ${event.error}`;

      setError(message);
      setPermissionState(event.error === "not-allowed" ? "denied" : permissionState);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [RecognitionCtor, permissionState]);

  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      setError("Bu brauzer speech recognition funksiyasini qo'llab-quvvatlamaydi. Matn orqali savol yuboring.");
      return;
    }

    try {
      if (navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setPermissionState("granted");
      } else {
        setPermissionState("prompt");
      }

      setTranscript("");
      setInterimTranscript("");
      setFinalTranscript("");
      setError("");
      recognitionRef.current.lang = "uz-UZ";
      recognitionRef.current.start();
    } catch {
      setPermissionState("denied");
      setError("Mikrofon ruxsati berilmadi. Matnli rejimdan foydalaning.");
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setFinalTranscript("");
  }, []);

  return {
    transcript,
    interimTranscript,
    finalTranscript,
    isListening,
    isSupported,
    permissionState,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
}
