import { Camera, Crosshair, Navigation, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useAppStore } from "../../store/useAppStore";

export const ArGuidePage = () => {
  const activeRoute = useAppStore((state) => state.activeRoute);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = activeRoute?.steps ?? [
    "To'g'riga 12 metr yuring",
    "Chapga buriling",
    "Zinapoyadan 2-qavatga chiqing",
    "215-xona o'ng tomonda"
  ];

  const currentStep = steps[stepIndex] ?? steps[0];
  const distance = useMemo(() => {
    if (!activeRoute) {
      return 12;
    }

    return Math.max(4, Math.round(activeRoute.distance / Math.max(1, steps.length - stepIndex)));
  }, [activeRoute, stepIndex, steps.length]);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="AR route guidance"
        title="Telefon kamerasi ustidagi professional AR overlay demo"
        description="Kamera-like full screen panel, overlay strelkalar, next-step card, distance counter va floor indicator keyingi WebAR integratsiya uchun tayyor holatda."
        action={
          <Button onClick={() => setCameraEnabled((value) => !value)}>
            <Camera className="h-4 w-4" />
            {cameraEnabled ? "Kamerani o'chirish" : "Kamera ruxsati"}
          </Button>
        }
      />

      <Card className="overflow-hidden bg-[linear-gradient(180deg,rgba(6,20,38,0.96),rgba(11,45,91,0.9))]" strong>
        <div className="relative h-[720px] rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.16),transparent_32%),linear-gradient(180deg,#071124_0%,#0B2D5B_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(12,31,57,0.25)_100%)]" />
          <div className="absolute inset-0 atmura-noise opacity-20" />

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full border border-cyan-400/16" />
              <div className="absolute -inset-14 rounded-full border border-white/10" />
              <div className="rounded-full bg-cyan-500/14 p-8 shadow-glow">
                <Navigation className="h-28 w-28 -rotate-12 text-cyan-300" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-1 w-20 atmura-route-line rounded-full" />
              <div className="rounded-full border border-cyan-400/25 bg-cyan-500/12 px-3 py-1 text-xs text-cyan-100">
                {distance} m
              </div>
              <div className="h-1 w-20 atmura-route-line rounded-full" />
            </div>
          </div>

          <div className="absolute left-6 top-6 flex items-center gap-3">
            <Badge tone={cameraEnabled ? "success" : "warning"}>
              {cameraEnabled ? "Camera ready" : "Permission pending"}
            </Badge>
            <Badge tone="info">Floor 2</Badge>
          </div>

          <div className="absolute inset-x-0 top-20 flex justify-center">
            <div className="rounded-full border border-white/10 bg-[rgba(6,20,38,0.72)] px-4 py-2 text-sm text-white/68 backdrop-blur-md">
              Destination: 215-xona
            </div>
          </div>

          <div className="absolute bottom-6 left-6 max-w-sm rounded-[28px] border border-white/10 bg-[rgba(6,20,38,0.88)] p-5 shadow-glass backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Current step</p>
            <p className="mt-3 font-['Space_Grotesk'] text-2xl font-bold text-white">{currentStep}</p>
            <p className="mt-2 text-sm text-white/55">Distance indicator: {distance} metr | Recenter va next-step boshqaruvlari faol.</p>
          </div>

          <div className="absolute bottom-6 right-6 flex flex-col gap-3">
            <Button variant="secondary" onClick={() => setStepIndex(0)}>
              <RotateCcw className="h-4 w-4" />
              Recenter
            </Button>
            <Button
              onClick={() => setStepIndex((value) => (value + 1 >= steps.length ? 0 : value + 1))}
            >
              <Crosshair className="h-4 w-4" />
              Next step
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
