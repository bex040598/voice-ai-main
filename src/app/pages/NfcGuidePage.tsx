import { Radio, ScanLine } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { resolveNfcTag, type NfcResolveResult } from "../../features/nfc/nfc.service";

export const NfcGuidePage = () => {
  const [code, setCode] = useState("NFC-2F-LIBRARY");
  const [result, setResult] = useState<NfcResolveResult | null>(null);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="NFC / RFID"
        title="Touch-to-guide demo"
        description="Universitetning turli nuqtalariga biriktirilgan NFC teglar foydalanuvchining joriy joyini tez aniqlash va yaqin obyektlarni ko'rsatish uchun ishlatiladi."
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <ScanLine className="h-5 w-5 text-cyan-600" />
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">NFC input</p>
              <p className="text-sm text-slate-500">Masalan: NFC-2F-LIBRARY</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Input value={code} onChange={(event) => setCode(event.target.value)} />
            <Button onClick={() => void resolveNfcTag(code).then(setResult)}>Resolve</Button>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <Radio className="h-5 w-5 text-cyan-600" />
            <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Guide output</p>
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-[24px] bg-cyan-50 p-4">
                <p className="text-sm leading-7 text-slate-700">{result.message}</p>
              </div>
              <p className="text-xs text-slate-500">{result.tag.emergencyInfo}</p>
            </div>
          ) : (
            <p className="text-sm leading-7 text-slate-500">NFC result shu yerda ko'rinadi.</p>
          )}
        </Card>
      </div>
    </div>
  );
};
