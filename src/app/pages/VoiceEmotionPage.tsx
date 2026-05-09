import { Mic, MicOff, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { processVoiceEmotion } from "../../features/voiceEmotion/voiceEmotion.service";
import type { VoiceEmotionResult } from "../../types";

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

export const VoiceEmotionPage = () => {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("Men 215-xonani qidiryapman, tezroq ayting");
  const [result, setResult] = useState<VoiceEmotionResult | null>(null);

  const toggleRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "uz-UZ";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const text = event.results[0]?.[0]?.transcript ?? "";
        setTranscript(text);
        void processVoiceEmotion(text).then(setResult);
        setListening(false);
      };
      recognitionRef.current = recognition;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    recognitionRef.current.start();
    setListening(true);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Voice emotion"
        title="Ovozli savol va emotion-aware response"
        description="Speech-to-text orqali matn olinadi, keyin demo classifier shoshilish, chalkashish, xursandlik yoki neytral holatni topadi va javob ohangini moslashtiradi."
        action={
          <Button variant={listening ? "danger" : "primary"} onClick={toggleRecognition}>
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {listening ? "To'xtatish" : "Record"}
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <label className="text-sm font-medium text-slate-600">Transcript</label>
          <Input className="mt-2" value={transcript} onChange={(event) => setTranscript(event.target.value)} />
          <div className="mt-4">
            <Button onClick={() => void processVoiceEmotion(transcript).then(setResult)}>
              <Sparkles className="h-4 w-4" />
              Emotionni tahlil qilish
            </Button>
          </div>
        </Card>

        <Card>
          <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Natija</p>
          {result ? (
            <div className="mt-4 space-y-4">
              <div className="rounded-[24px] bg-cyan-50 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-700">Emotion</p>
                <p className="mt-2 text-2xl font-bold text-navy-900">{result.emotion}</p>
              </div>
              <p className="text-sm leading-7 text-slate-600">{result.response}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-slate-500">Voice analysis natijasi shu yerda chiqadi.</p>
          )}
        </Card>
      </div>
    </div>
  );
};
