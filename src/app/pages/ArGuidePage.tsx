import { Camera, Navigation } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useAppStore } from "../../store/useAppStore";

export const ArGuidePage = () => {
  const activeRoute = useAppStore((state) => state.activeRoute);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="AR guide demo"
        title="WebAR marshrut overlay"
        description="Bu sahifa AR.js yoki keyingi WebAR integratsiya uchun tayyor strukturani ko'rsatadi: kamera ruxsati, overlay arrow, next-step card va distance counter."
        action={
          <Button onClick={() => setCameraEnabled((value) => !value)}>
            <Camera className="h-4 w-4" />
            {cameraEnabled ? "Kamerani o'chirish" : "Kamera ruxsati"}
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <div className="relative h-[560px] rounded-[30px] bg-[radial-gradient(circle_at_top,_rgba(15,184,222,0.18),_transparent_32%),linear-gradient(180deg,_#dbeafe_0%,_#94a3b8_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(12,31,57,0.1)_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center">
              <div className="absolute h-40 w-40 rounded-full border border-cyan-300/50" />
              <div className="absolute h-28 w-28 rounded-full border border-cyan-400/70" />
              <div className="rounded-full bg-cyan-500/20 p-6">
                <Navigation className="h-20 w-20 -rotate-12 text-cyan-500" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 max-w-sm rounded-[26px] bg-white/92 p-5 shadow-panel">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-700">Next step</p>
            <p className="mt-3 font-['Space_Grotesk'] text-xl font-bold text-navy-900">
              {activeRoute?.steps[0] ?? "Kamerani yoqing va route tanlang"}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Distance: {activeRoute?.distance ?? 0} m | Status: {cameraEnabled ? "Camera ready" : "Permission pending"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
