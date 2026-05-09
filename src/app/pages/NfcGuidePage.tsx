import { Radio, ScanLine, Smartphone, Waypoints } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { mockNfcScanHistory, mockNfcTags } from "../../data/mockNfc";
import { resolveNfcTag, type NfcResolveResult } from "../../features/nfc/nfc.service";
import { findRoute } from "../../features/routing/routing.service";
import { useAppStore } from "../../store/useAppStore";

export const NfcGuidePage = () => {
  const setActiveRoute = useAppStore((state) => state.setActiveRoute);
  const pushToast = useAppStore((state) => state.pushToast);
  const [code, setCode] = useState("NFC-2F-LIBRARY");
  const [result, setResult] = useState<NfcResolveResult | null>(null);
  const [history, setHistory] = useState(mockNfcScanHistory);

  const handleResolve = async () => {
    try {
      const next = await resolveNfcTag(code);
      setResult(next);
      setHistory((state) => [
        {
          id: `scan-${Date.now()}`,
          code: next.tag.code,
          resolvedAt: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
          zone: next.tag.description
        },
        ...state
      ].slice(0, 6));
      pushToast({ title: `${next.tag.code} muvaffaqiyatli resolve qilindi.`, tone: "success" });
    } catch (error) {
      pushToast({ title: error instanceof Error ? error.message : "NFC kod topilmadi.", tone: "warning" });
    }
  };

  const routeFromLocation = async () => {
    if (!result) {
      pushToast({ title: "Avval NFC nuqtani resolve qiling.", tone: "warning" });
      return;
    }

    const route = await findRoute({ fromNodeId: result.tag.nodeId, toRoomId: "room-215", algorithm: "astar" });
    setActiveRoute(route);
    pushToast({ title: "NFC joylashuvidan 215-xonaga route hisoblandi.", tone: "success" });
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="NFC touch-to-guide"
        title="Futuristik NFC terminal va touch-to-guide ssenariysi"
        description="Universitet nuqtalariga biriktirilgan NFC teglar foydalanuvchining joriy joylashuvini aniqlaydi, yaqin xonalarni ko'rsatadi va shu nuqtadan route yaratadi."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="bg-[linear-gradient(180deg,rgba(6,20,38,0.94),rgba(11,45,91,0.88))]">
          <div className="mb-6 flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-cyan-300" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-white">NFC terminal</p>
              <p className="text-sm text-white/55">Kodni kiriting yoki demo scan ni ishga tushiring.</p>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.84fr_1.16fr]">
            <div className="flex items-center justify-center">
              <div className="relative flex h-60 w-36 items-center justify-center rounded-[36px] border border-white/10 bg-white/6">
                <div className="absolute left-1/2 top-5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/20" />
                <div className="absolute inset-x-6 top-16 h-28 rounded-[28px] border border-cyan-400/20 bg-cyan-500/10" />
                <div className="absolute inset-x-10 top-24 h-12 rounded-full border border-cyan-400/28" />
                <div className="absolute inset-x-6 bottom-12 h-1 atmura-route-line rounded-full" />
                <div className="rounded-full bg-cyan-500/20 p-4 shadow-glow">
                  <ScanLine className="h-10 w-10 text-cyan-300" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.26em] text-white/40">NFC code input</label>
                <Input value={code} onChange={(event) => setCode(event.target.value)} />
                <div className="flex flex-wrap gap-2">
                  {mockNfcTags.slice(0, 5).map((tag) => (
                    <button
                      key={tag.id}
                      className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs text-white/60 transition hover:bg-white/12"
                      onClick={() => setCode(tag.code)}
                      type="button"
                    >
                      {tag.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={() => void handleResolve()}>Scan simulation</Button>
                <Button variant="secondary" onClick={() => void routeFromLocation()}>
                  <Waypoints className="h-4 w-4" />
                  Route from this location
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Resolved location</p>
                <p className="text-sm text-white/55">NFC tag bo'yicha aniqlangan joylashuv.</p>
              </div>
              <Badge tone={result ? "success" : "warning"}>{result ? "Resolved" : "Pending"}</Badge>
            </div>
            {result ? (
              <div className="space-y-4">
                <div className="rounded-[26px] border border-cyan-400/18 bg-cyan-500/10 p-4">
                  <p className="text-sm leading-7 text-white/74">{result.message}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/40">Nearby rooms</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.tag.nearbyRooms.map((room) => (
                        <Badge key={room} tone="info">
                          {room}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/40">Emergency info</p>
                    <p className="mt-3 text-sm leading-6 text-white/64">{result.tag.emergencyInfo}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-7 text-white/55">NFC result shu yerda ko'rinadi.</p>
            )}
          </Card>

          <Card>
            <div className="mb-4 flex items-center gap-3">
              <Radio className="h-5 w-5 text-cyan-300" />
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Recent scans</p>
                <p className="text-sm text-white/55">So'nggi resolve qilingan NFC kodlar.</p>
              </div>
            </div>
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.code}</p>
                      <p className="text-xs text-white/45">{item.zone}</p>
                    </div>
                    <Badge tone="info">{item.resolvedAt}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
