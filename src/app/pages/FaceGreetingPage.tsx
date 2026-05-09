import { Camera, ScanFace, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { identifyFaceMock } from "../../features/faceGreeting/faceGreeting.service";
import { useAppStore } from "../../store/useAppStore";
import type { FaceGreetingResult } from "../../types";

export const FaceGreetingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const pushToast = useAppStore((state) => state.pushToast);
  const setAvatarMode = useAppStore((state) => state.setAvatarMode);
  const [cameraReady, setCameraReady] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<FaceGreetingResult | null>(null);
  const [recent, setRecent] = useState<FaceGreetingResult[]>([]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraReady(true);
      pushToast({ title: "Kamera preview faollashtirildi.", tone: "success" });
    } catch {
      setCameraReady(false);
      pushToast({ title: "Kamera ruxsati olinmadi, mock preview ishlatiladi.", tone: "warning" });
    }
  };

  const identify = async () => {
    setScanning(true);
    setAvatarMode("greeting");
    window.setTimeout(() => setAvatarMode("neutral"), 1800);
    const next = await identifyFaceMock();
    setResult(next);
    setRecent((state) => [next, ...state].slice(0, 4));
    setScanning(false);
  };

  const confidence = useMemo(() => Math.round((result?.confidence ?? 0) * 100), [result]);
  const accessTone = result?.recognizedUser ? "success" : "warning";

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Face greeting terminal"
        title="AI camera terminal orqali foydalanuvchini kutib olish"
        description="Kamera preview, scanning overlay, confidence indikator va role-aware salomlashuv ssenariylari real terminal uslubida ko'rsatiladi."
        action={
          <Button onClick={() => void enableCamera()}>
            <Camera className="h-4 w-4" />
            Start Camera
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <Card className="overflow-hidden bg-[linear-gradient(180deg,rgba(6,20,38,0.94),rgba(11,45,91,0.88))]">
          <div className="relative aspect-video rounded-[30px] border border-white/10 bg-[#04101f]">
            <video ref={videoRef} className="h-full w-full rounded-[30px] object-cover opacity-85" muted playsInline />
            {!cameraReady ? (
              <div className="absolute inset-0 flex items-center justify-center text-white/58">
                Kamera preview yoki mock scanning frame shu yerda ko'rinadi
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-48 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-cyan-400/50" />
              <div className="absolute left-[calc(50%-88px)] top-[calc(50%-104px)] h-8 w-8 border-l-2 border-t-2 border-cyan-300" />
              <div className="absolute right-[calc(50%-88px)] top-[calc(50%-104px)] h-8 w-8 border-r-2 border-t-2 border-cyan-300" />
              <div className="absolute bottom-[calc(50%-104px)] left-[calc(50%-88px)] h-8 w-8 border-b-2 border-l-2 border-cyan-300" />
              <div className="absolute bottom-[calc(50%-104px)] right-[calc(50%-88px)] h-8 w-8 border-b-2 border-r-2 border-cyan-300" />
              {scanning ? <div className="absolute left-[calc(50%-80px)] top-1/2 h-px w-40 bg-cyan-300 shadow-[0_0_24px_rgba(0,212,255,0.65)]" /> : null}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[22px] border border-white/10 bg-[rgba(6,20,38,0.75)] px-4 py-3 text-sm text-white/70 backdrop-blur-md">
              <span>{scanning ? "Scanning..." : "Ready for identification"}</span>
              <Badge tone={cameraReady ? "success" : "warning"}>{cameraReady ? "Camera ready" : "Mock frame"}</Badge>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => void identify()}>
              <ScanFace className="h-4 w-4" />
              Identify Face
            </Button>
            <Badge tone="info">Demo mode</Badge>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Recognized user</p>
                <p className="text-sm text-white/55">Greeting output va access holati.</p>
              </div>
              <Badge tone={accessTone}>{result?.recognizedUser ? "Access granted" : "Guest mode"}</Badge>
            </div>

            {result ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/8">
                    <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.12)" strokeWidth="8" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="#00d4ff"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${confidence * 2.64} 264`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="relative text-lg font-bold text-white">{confidence}%</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{result.recognizedUser?.fullName ?? "Unknown Guest"}</p>
                    <p className="text-sm text-white/50">
                      {result.recognizedUser?.role ? `Role: ${result.recognizedUser.role}` : "Tizim mehmon rejimini ishga tushirdi."}
                    </p>
                  </div>
                </div>
                <div className="rounded-[24px] border border-cyan-400/18 bg-cyan-500/10 p-4">
                  <p className="text-sm leading-7 text-white/76">{result.greeting}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-7 text-white/55">"Identify Face" bosilgandan keyin greeting va confidence natijasi shu yerda chiqadi.</p>
            )}
          </Card>

          <Card>
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-cyan-300" />
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Recent recognitions</p>
                <p className="text-sm text-white/55">So'nggi tanilgan foydalanuvchilar oqimi.</p>
              </div>
            </div>
            <div className="space-y-3">
              {recent.length > 0 ? (
                recent.map((item) => (
                  <div key={`${item.greeting}-${item.confidence}`} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                          <UserRound className="h-4 w-4 text-cyan-200" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.recognizedUser?.fullName ?? "Unknown Guest"}</p>
                          <p className="text-xs text-white/45">Ishonchlilik {Math.round(item.confidence * 100)}%</p>
                        </div>
                      </div>
                      <Badge tone={item.recognizedUser ? "success" : "warning"}>
                        {item.recognizedUser ? "Known" : "Guest"}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/55">Hali tanishlar tarixi mavjud emas.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
