import { Paperclip } from "lucide-react";
import { useState } from "react";
import { createReceptionRequest } from "../../features/reception/reception.service";
import { useAppStore } from "../../store/useAppStore";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input, Textarea } from "../ui/Input";

export const ReceptionForm = () => {
  const pushToast = useAppStore((state) => state.pushToast);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<"application" | "suggestion" | "complaint" | "appointment">("application");
  const [message, setMessage] = useState("");
  const [mockFile, setMockFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      pushToast({ title: "Barcha maydonlarni to'ldiring.", tone: "warning" });
      return;
    }

    setLoading(true);
    try {
      const request = await createReceptionRequest({ fullName, phone, type, message });
      setFullName("");
      setPhone("");
      setMessage("");
      setMockFile(null);
      pushToast({ title: `Murojaat yuborildi. ID: ${request.id}`, tone: "success" });
    } catch (error) {
      pushToast({
        title: error instanceof Error ? error.message : "Murojaat yuborilmadi.",
        tone: "warning"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-['Space_Grotesk'] text-2xl font-bold text-white">Virtual Rektor Qabulxona</p>
          <p className="mt-2 text-sm text-white/55">Ariza, taklif, shikoyat yoki qabul band qilish uchun rasmiy forma.</p>
        </div>
        <Badge tone="info">Trusted channel</Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="Ism familiya" value={fullName} onChange={(event) => setFullName(event.target.value)} />
        <Input placeholder="Telefon raqam" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </div>

      <select
        className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none"
        value={type}
        onChange={(event) => setType(event.target.value as typeof type)}
      >
        <option value="application">Ariza</option>
        <option value="suggestion">Taklif</option>
        <option value="complaint">Shikoyat</option>
        <option value="appointment">Qabulga yozilish</option>
      </select>

      <Textarea placeholder="Murojaat matni" value={message} onChange={(event) => setMessage(event.target.value)} />

      <button
        className="flex w-full items-center justify-between rounded-2xl border border-dashed border-white/14 bg-white/6 px-4 py-4 text-left"
        onClick={() => setMockFile("murojaat-ilova.pdf")}
        type="button"
      >
        <div className="flex items-center gap-3">
          <Paperclip className="h-4 w-4 text-cyan-300" />
          <div>
            <p className="text-sm font-semibold text-white">Fayl biriktirish</p>
            <p className="text-xs text-white/45">Demo rejimda biriktirilgan fayl holati ko'rsatiladi.</p>
          </div>
        </div>
        {mockFile ? <Badge tone="success">{mockFile}</Badge> : <Badge tone="warning">Mock</Badge>}
      </button>

      <Button fullWidth onClick={() => void handleSubmit()} disabled={loading}>
        {loading ? "Yuborilmoqda..." : "Murojaat yuborish"}
      </Button>
    </Card>
  );
};
