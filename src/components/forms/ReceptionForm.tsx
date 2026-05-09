import { useState } from "react";
import { createReceptionRequest } from "../../features/reception/reception.service";
import { useAppStore } from "../../store/useAppStore";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input, Textarea } from "../ui/Input";

export const ReceptionForm = () => {
  const pushToast = useAppStore((state) => state.pushToast);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<"application" | "suggestion" | "complaint" | "appointment">("application");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await createReceptionRequest({ fullName, phone, type, message });
      setFullName("");
      setPhone("");
      setMessage("");
      pushToast({ title: "Murojaat muvaffaqiyatli yuborildi.", tone: "success" });
    } catch (error) {
      pushToast({
        title: error instanceof Error ? error.message : "Murojaat yuborilmadi.",
        tone: "warning"
      });
    }
  };

  return (
    <Card>
      <div className="mb-4">
        <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Virtual Rektor Qabulxona</p>
        <p className="text-sm text-slate-500">Ariza, taklif, shikoyat yoki qabul band qilish uchun forma</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="To'liq ism" value={fullName} onChange={(event) => setFullName(event.target.value)} />
        <Input placeholder="Telefon raqam" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </div>

      <select
        className="mt-3 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-navy-900 outline-none"
        value={type}
        onChange={(event) => setType(event.target.value as typeof type)}
      >
        <option value="application">Ariza</option>
        <option value="suggestion">Taklif</option>
        <option value="complaint">Shikoyat</option>
        <option value="appointment">Qabul vaqti</option>
      </select>

      <div className="mt-3">
        <Textarea
          placeholder="Murojaat matni"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <div className="mt-4">
        <Button fullWidth onClick={() => void handleSubmit()}>
          Murojaat yuborish
        </Button>
      </div>
    </Card>
  );
};
