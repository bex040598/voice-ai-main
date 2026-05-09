import { Camera, ScanFace, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { identifyFaceMock } from "../../features/faceGreeting/faceGreeting.service";
import type { FaceGreetingResult } from "../../types";

export const FaceGreetingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [result, setResult] = useState<FaceGreetingResult | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const enableCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
    setCameraReady(true);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Face greeting"
        title="Kamera orqali foydalanuvchini kutib olish"
        description="Demo rejimda brauzer kamerasi preview ko'rsatiladi va identify tugmasi random student, teacher yoki unknown guest natijasini qaytaradi."
        action={
          <Button onClick={() => void enableCamera()}>
            <Camera className="h-4 w-4" />
            Kamerani yoqish
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden">
          <div className="relative aspect-video rounded-[28px] bg-navy-900">
            <video ref={videoRef} className="h-full w-full rounded-[28px] object-cover" muted playsInline />
            {!cameraReady ? (
              <div className="absolute inset-0 flex items-center justify-center text-white/80">
                Kamera preview shu yerda ko'rinadi
              </div>
            ) : null}
          </div>
          <div className="mt-4">
            <Button onClick={() => void identifyFaceMock().then(setResult)}>
              <ScanFace className="h-4 w-4" />
              Mock identify
            </Button>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <UserRound className="h-5 w-5 text-cyan-600" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Greeting output</p>
              <p className="text-sm text-slate-500">Role-aware salomlashuv holati</p>
            </div>
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="rounded-[24px] bg-cyan-50 p-5">
                <p className="text-sm leading-7 text-slate-700">{result.greeting}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-4">
                <p className="text-sm font-semibold text-navy-900">
                  {result.recognizedUser?.fullName ?? "Unknown visitor"}
                </p>
                <p className="text-xs text-slate-500">
                  Confidence: {(result.confidence * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-slate-500">
              "Mock identify" bosilgandan keyin salomlashuv va foydalanuvchi holati shu yerda chiqadi.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};
