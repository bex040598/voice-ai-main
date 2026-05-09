import { KeyRound, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";

export const SettingsPage = () => (
  <div className="space-y-6">
    <PageIntro
      eyebrow="Settings"
      title="Tizim sozlamalari va integratsiyalar"
      description="AI adapter, Telegram bot, role permission va monitoring threshold kabi sozlamalarni kelajakda real backend bilan osongina boshqarish uchun tayyor strukturaviy sahifa."
    />

    <div className="grid gap-6 xl:grid-cols-3">
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <KeyRound className="h-5 w-5 text-cyan-600" />
          <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">API keys</p>
        </div>
        <Input defaultValue="sk-demo-openai-adapter" />
        <Button className="mt-4" variant="secondary">
          Yangilash
        </Button>
      </Card>

      <Card>
        <div className="mb-4 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-cyan-600" />
          <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">AI module</p>
        </div>
        <Input defaultValue="assistant-mock-adapter" />
        <Button className="mt-4" variant="secondary">
          Saqlash
        </Button>
      </Card>

      <Card>
        <div className="mb-4 flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-cyan-600" />
          <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Permissions</p>
        </div>
        <Input defaultValue="student, teacher, admin, super_admin" />
        <Button className="mt-4" variant="secondary">
          Update RBAC
        </Button>
      </Card>
    </div>

    <Card>
      <div className="mb-4 flex items-center gap-3">
        <SlidersHorizontal className="h-5 w-5 text-cyan-600" />
        <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Operational toggles</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {["Enable socket events", "Enable face adapter", "Enable Telegram notifications"].map((item) => (
          <label key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 text-sm text-navy-900">
            {item}
            <input defaultChecked type="checkbox" />
          </label>
        ))}
      </div>
    </Card>
  </div>
);
