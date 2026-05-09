import { Heart, Moon, Smile, Sparkles, Volume2, Waypoints } from "lucide-react";
import { AvatarCanvas } from "../../components/avatar/AvatarCanvas";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useAppStore } from "../../store/useAppStore";
import type { AvatarMode } from "../../types";

const controlButtons: Array<{ mode: AvatarMode; label: string; icon: typeof Sparkles }> = [
  { mode: "greeting", label: "Greet", icon: Sparkles },
  { mode: "speaking", label: "Speak", icon: Volume2 },
  { mode: "thinking", label: "Think", icon: Sparkles },
  { mode: "pointing", label: "Point Route", icon: Waypoints },
  { mode: "happy", label: "Happy", icon: Smile },
  { mode: "neutral", label: "Neutral", icon: Heart },
  { mode: "listening", label: "Listening", icon: Volume2 },
  { mode: "sleep", label: "Sleep", icon: Moon }
];

const statusMessages: Record<AvatarMode, string> = {
  idle: "ATMURA hozir kutish rejimida.",
  greeting: "ATMURA foydalanuvchini salomlashish ssenariysida kutib olmoqda.",
  speaking: "ATMURA javobni 3D avatar orqali taqdim etmoqda.",
  thinking: "ATMURA javob tayyorlamoqda va so'rovni tahlil qilmoqda.",
  pointing: "ATMURA yo'lni ko'rsatmoqda va route bo'yicha ishora bermoqda.",
  happy: "ATMURA iliq, do'stona javob kayfiyatiga o'tdi.",
  neutral: "ATMURA barqaror, professional holatda ishlamoqda.",
  listening: "ATMURA hozir tinglamoqda...",
  sleep: "ATMURA quvvat tejash holatida."
};

export const AvatarPage = () => {
  const avatarMode = useAppStore((state) => state.avatarMode);
  const setAvatarMode = useAppStore((state) => state.setAvatarMode);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="3D avatar module"
        title="Premium hologram assistant boshqaruvi"
        description="ATMURA avatari greeting, listening, thinking, speaking va direction pointing holatlariga o'ta oladi. HDR fayl ishlatilmaydi, faqat xavfsiz light va glow qatlamlari bilan ishlaydi."
      />

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <Card className="bg-[linear-gradient(135deg,rgba(6,20,38,0.96),rgba(11,45,91,0.92))]">
          <AvatarCanvas mode={avatarMode} speaking={avatarMode === "speaking"} />
        </Card>
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">Avatar holati</p>
              <p className="text-sm text-white/55">Holatni almashtiring va sahnadagi o'zgarishni ko'ring.</p>
            </div>
            <Badge tone="info">{avatarMode}</Badge>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {controlButtons.map((control) => (
              <Button
                key={control.mode}
                variant={avatarMode === control.mode ? "primary" : "secondary"}
                onClick={() => setAvatarMode(control.mode)}
              >
                <control.icon className="h-4 w-4" />
                {control.label}
              </Button>
            ))}
          </div>

          <div className="mt-5 rounded-[26px] border border-cyan-400/18 bg-cyan-500/10 p-4">
            <p className="text-sm leading-7 text-white/74">{statusMessages[avatarMode]}</p>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              "Eye blink, eyebrow motion va idle breathing aktiv.",
              "Mouse pointer bo'yicha bosh va qarash yo'nalishi moslashadi.",
              "Speaking va pointing holatlarida emissive glow kuchayadi."
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/62">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
