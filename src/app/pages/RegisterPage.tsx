import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { register } from "../../features/auth/auth.service";
import { useAppStore } from "../../store/useAppStore";
import type { Role } from "../../types";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);
  const pushToast = useAppStore((state) => state.pushToast);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("demo12345");
  const [role, setRole] = useState<Role>("student");

  const handleRegister = async () => {
    try {
      const response = await register({ fullName, email, password, role });
      window.localStorage.setItem("atmura-token", response.token);
      setCurrentUser(response.user);
      pushToast({ title: "Ro'yxatdan o'tish yakunlandi.", tone: "success" });
      navigate("/dashboard");
    } catch (error) {
      pushToast({
        title: error instanceof Error ? error.message : "Register amalga oshmadi.",
        tone: "warning"
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageIntro
        eyebrow="Yangi foydalanuvchi"
        title="ATMURA uchun demo ro'yxatdan o'tish"
        description="MVP rejimda student, teacher yoki guest akkaunt yaratib, tegishli dashboardlarni tekshirishingiz mumkin."
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="To'liq ism" value={fullName} onChange={(event) => setFullName(event.target.value)} />
          <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input type="password" placeholder="Parol" value={password} onChange={(event) => setPassword(event.target.value)} />
          <select
            className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-navy-900 outline-none"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
          >
            <option value="guest">Guest</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="mt-5">
          <Button onClick={() => void handleRegister()}>Ro'yxatdan o'tish</Button>
        </div>
      </Card>
    </div>
  );
};
