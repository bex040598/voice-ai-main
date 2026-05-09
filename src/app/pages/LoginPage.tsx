import { LockKeyhole, Mail, UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { mockUsers } from "../../data/mockUsers";
import { login } from "../../features/auth/auth.service";
import { useAppStore } from "../../store/useAppStore";

export const LoginPage = () => {
  const navigate = useNavigate();
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);
  const pushToast = useAppStore((state) => state.pushToast);
  const [email, setEmail] = useState("bexzod@atmura.uz");
  const [password, setPassword] = useState("demo12345");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await login(email, password);
      window.localStorage.setItem("atmura-token", response.token);
      setCurrentUser(response.user);
      pushToast({ title: "Tizimga muvaffaqiyatli kirdingiz.", tone: "success" });
      navigate("/dashboard");
    } catch (error) {
      pushToast({
        title: error instanceof Error ? error.message : "Login amalga oshmadi.",
        tone: "warning"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageIntro
        eyebrow="Autentifikatsiya"
        title="ATMURA platformasiga kirish"
        description="Demo foydalanuvchilar orqali guest, student, teacher, admin va super admin dashboardlarini ko'rishingiz mumkin."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Card className="bg-navy-900 text-white">
          <p className="font-['Space_Grotesk'] text-2xl font-bold">Demo accounts</p>
          <div className="mt-5 space-y-3 text-sm text-white/80">
            {mockUsers
              .filter((user) => user.role !== "guest")
              .slice(0, 5)
              .map((user) => (
                <button
                  key={user.id}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left"
                  onClick={() => {
                    setEmail(user.email);
                    setPassword(user.passwordHash);
                  }}
                  type="button"
                >
                  <div>
                    <p className="font-semibold text-white">{user.fullName}</p>
                    <p className="text-xs text-white/60">{user.email}</p>
                  </div>
                  <UserRoundCheck className="h-4 w-4 text-cyan-300" />
                </button>
              ))}
          </div>
        </Card>

        <Card>
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-600" />
                Email
              </span>
              <Input value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-cyan-600" />
                Parol
              </span>
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>

            <Button className="mt-2" fullWidth disabled={loading} onClick={() => void handleLogin()}>
              {loading ? "Kirilmoqda..." : "Kirish"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
