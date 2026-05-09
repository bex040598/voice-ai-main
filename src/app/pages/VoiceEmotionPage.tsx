import { Mic, MicOff, Sparkles } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { processVoiceEmotion } from "../../features/voiceEmotion/voiceEmotion.service";
import type { Emotion, VoiceEmotionResult } from "../../types";

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

const emotionMessages: Record<Emotion, string> = {
  neutral: "ATMURA professional va vazmin uslubda javob beradi.",
  happy: "ATMURA do'stona va iliq ohangda javobni taqdim etadi.",
  confused: "ATMURA bosqichma-bosqich va tushunarli yo'riqnoma beradi.",
  hurry: "ATMURA qisqa, aniq va tezkor ko'rsatma beradi.",
  angry: "ATMURA muammoni darhol tan olib, eng qisqa yechimni taklif qiladi.",
  shy: "ATMURA yumshoq, sokin va qo'llab-quvvatlovchi tilda gapiradi."
};

export const VoiceEmotionPage = () => {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("Men 215-xonani qidiryapman, tezroq ayting");
  const [result, setResult] = useState<VoiceEmotionResult | null>(null);
  const [history, setHistory] = useState<VoiceEmotionResult[]>([]);

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
        void processVoiceEmotion(text).then((next) => {
          setResult(next);
          setHistory((state) => [next, ...state].slice(0, 6));
        });
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

  const analyze = async () => {
    const next = await processVoiceEmotion(transcript);
    setResult(next);
    setHistory((state) => [next, ...state].slice(0, 6));
  };

  const radarData = useMemo(() => {
    const emotion = result?.emotion ?? "neutral";
    const weight = {
      happy: emotion === "happy" ? 92 : 32,
      neutral: emotion === "neutral" ? 90 : 44,
      confused: emotion === "confused" ? 88 : 28,
      hurry: emotion === "hurry" ? 91 : 24,
      angry: emotion === "angry" ? 89 : 20,
      shy: emotion === "shy" ? 86 : 26
    };

    return Object.entries(weight).map(([name, value]) => ({ name, value }));
  }, [result]);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Voice emotion lab"
        title="Ovoz ohangini tahlil qiluvchi AI voice terminal"
        description="Speech-to-text, demo emotion classifier, waveform va tone adaptation natijalari premium laboratoriya interfeysida ko'rsatiladi."
        action={
          <Button variant={listening ? "danger" : "primary"} onClick={toggleRecognition}>
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {listening ? "To'xtatish" : "Record"}
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Card className="bg-[linear-gradient(180deg,rgba(6,20,38,0.94),rgba(11,45,91,0.88))]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">Voice input</p>
                <p className="text-sm text-white/55">Katta microphone tugmasi va jonli waveform.</p>
              </div>
              <Badge tone={listening ? "warning" : "success"}>{listening ? "Listening" : "Standby"}</Badge>
            </div>

            <div className="flex flex-col items-center">
              <button
                className={`relative flex h-32 w-32 items-center justify-center rounded-full border transition ${
                  listening
                    ? "border-cyan-300/60 bg-cyan-500/16 shadow-glow"
                    : "border-white/10 bg-white/8"
                }`}
                onClick={toggleRecognition}
                type="button"
              >
                <div className={`absolute inset-0 rounded-full ${listening ? "animate-ping bg-cyan-400/14" : ""}`} />
                {listening ? <MicOff className="h-10 w-10 text-cyan-200" /> : <Mic className="h-10 w-10 text-white" />}
              </button>

              <div className="mt-8 flex h-16 items-end gap-2">
                {Array.from({ length: 18 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-2 rounded-full bg-[linear-gradient(180deg,#00d4ff,#7c3aed)] transition-all"
                    style={{ height: `${listening ? 22 + ((index * 13) % 36) : 12 + (index % 4) * 6}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <label className="text-xs uppercase tracking-[0.28em] text-white/40">Transcript panel</label>
              <Input value={transcript} onChange={(event) => setTranscript(event.target.value)} />
              <Button fullWidth onClick={() => void analyze()}>
                <Sparkles className="h-4 w-4" />
                Emotionni tahlil qilish
              </Button>
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Emotion history</p>
                <p className="text-sm text-white/55">So'nggi tahlillar bo'yicha qisqa jurnal.</p>
              </div>
              <Badge tone="violet">{history.length} ta</Badge>
            </div>
            <div className="space-y-3">
              {history.length > 0 ? (
                history.map((item, index) => (
                  <div key={`${item.transcript}-${index}`} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{item.emotion}</p>
                      <Badge tone={item.emotion === "happy" ? "success" : item.emotion === "hurry" ? "warning" : "info"}>
                        detected
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/58">{item.transcript}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/55">Tahlil natijalari shu yerda jamlanadi.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Emotion radar</p>
                <p className="text-sm text-white/55">Tizimning joriy ehtimollik profil ko'rinishi.</p>
              </div>
              <Badge tone="info">{result?.emotion ?? "neutral"}</Badge>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.14)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.62)", fontSize: 12 }} />
                  <Radar dataKey="value" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.28} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Tone adaptation result</p>
            {result ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-[24px] border border-cyan-400/18 bg-cyan-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Emotion</p>
                  <p className="mt-3 text-3xl font-bold capitalize text-white">{result.emotion}</p>
                  <p className="mt-2 text-sm text-white/58">{emotionMessages[result.emotion]}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                  <p className="text-sm leading-7 text-white/72">{result.response}</p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-white/55">Voice analysis natijasi shu yerda chiqadi.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
