import { KeyRound, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";

export const SettingsPage = () => {
  const pushToast = useAppStore((state) => state.pushToast);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Settings"
        title="Tizim sozlamalari va integratsiyalar"
        description="AI adapter, Telegram bot, role permission va monitoring threshold kabi sozlamalarni kelajakda real backend bilan osongina boshqarish uchun tayyor strukturaviy sahifa."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-cyan-300" />
              <p className="font-['Space_Grotesk'] text-xl font-bold text-white">API keys</p>
            </div>
            <Badge tone="warning">Sensitive</Badge>
          </div>
          <Input defaultValue="sk-demo-openai-adapter" />
          <Button className="mt-4" variant="secondary" onClick={() => pushToast({ title: "API key yangilandi.", tone: "success" })}>
            Yangilash
          </Button>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            <p className="font-['Space_Grotesk'] text-xl font-bold text-white">AI module</p>
          </div>
          <Input defaultValue="assistant-mock-adapter" />
          <Button className="mt-4" variant="secondary" onClick={() => pushToast({ title: "AI modul sozlamasi saqlandi.", tone: "info" })}>
            Saqlash
          </Button>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-cyan-300" />
            <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Permissions</p>
          </div>
          <Input defaultValue="student, teacher, admin, super_admin" />
          <Button className="mt-4" variant="secondary" onClick={() => pushToast({ title: "RBAC yangilandi.", tone: "success" })}>
            Update RBAC
          </Button>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-cyan-300" />
          <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Operational toggles</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Enable socket events", "Enable face adapter", "Enable Telegram notifications"].map((item) => (
            <button key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/72" type="button">
              {item}
              <input defaultChecked type="checkbox" />
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
