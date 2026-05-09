import { Clock3, FileStack, ShieldCheck, TimerReset } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ReceptionForm } from "../../components/forms/ReceptionForm";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Tabs } from "../../components/ui/Tabs";
import { getReceptionRequests, updateReceptionStatus } from "../../features/reception/reception.service";
import { formatDate } from "../../lib/utils";
import type { ReceptionRequest } from "../../types";

const statusTone = {
  new: "warning",
  in_review: "info",
  accepted: "success",
  rejected: "warning",
  completed: "violet"
} as const;

export const ReceptionPage = () => {
  const [requests, setRequests] = useState<ReceptionRequest[]>([]);
  const [tab, setTab] = useState<"requests" | "admin">("requests");

  useEffect(() => {
    void getReceptionRequests().then(setRequests);
  }, []);

  const patchStatus = async (id: string, status: ReceptionRequest["status"]) => {
    const updated = await updateReceptionStatus(id, status);
    setRequests((state) => state.map((request) => (request.id === id ? updated : request)));
  };

  const latestRequest = requests[0];
  const summary = useMemo(
    () => ({
      total: requests.length,
      newCount: requests.filter((request) => request.status === "new").length,
      completed: requests.filter((request) => request.status === "completed").length
    }),
    [requests]
  );

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Virtual reception"
        title="Virtual rektor qabulxonasi va murojaatlarni boshqarish markazi"
        description="Ariza, taklif, shikoyat va qabul vaqti band qilish ssenariylari rasmiy workflow, status tracker va admin boshqaruvi bilan boyitilgan."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <FileStack className="h-5 w-5 text-cyan-300" />
          <p className="mt-4 text-sm text-white/55">Jami murojaatlar</p>
          <p className="mt-2 text-4xl font-bold text-white">{summary.total}</p>
        </Card>
        <Card>
          <Clock3 className="h-5 w-5 text-cyan-300" />
          <p className="mt-4 text-sm text-white/55">Ko'rib chiqilmoqda</p>
          <p className="mt-2 text-4xl font-bold text-white">{summary.newCount}</p>
        </Card>
        <Card>
          <ShieldCheck className="h-5 w-5 text-cyan-300" />
          <p className="mt-4 text-sm text-white/55">Yakunlangan</p>
          <p className="mt-2 text-4xl font-bold text-white">{summary.completed}</p>
        </Card>
      </div>

      <Tabs
        items={[
          { id: "requests", label: "Murojaatlar" },
          { id: "admin", label: "Admin view" }
        ]}
        value={tab}
        onChange={setTab}
      />

      <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <ReceptionForm />

        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center gap-3">
              <TimerReset className="h-5 w-5 text-cyan-300" />
              <div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Status tracker</p>
                <p className="text-sm text-white/55">So'nggi murojaat bo'yicha workflow bosqichlari.</p>
              </div>
            </div>
            {latestRequest ? (
              <div className="space-y-4">
                <div className="rounded-[26px] border border-cyan-400/18 bg-cyan-500/10 p-4">
                  <p className="text-sm font-semibold text-white">{latestRequest.fullName}</p>
                  <p className="mt-2 text-sm leading-6 text-white/64">{latestRequest.message}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-5">
                  {["new", "in_review", "accepted", "rejected", "completed"].map((status, index) => (
                    <div
                      key={status}
                      className={`rounded-[24px] border px-3 py-4 text-center text-xs ${
                        latestRequest.status === status
                          ? "border-cyan-400/32 bg-cyan-500/12 text-white"
                          : index < ["new", "in_review", "accepted", "rejected", "completed"].indexOf(latestRequest.status)
                            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                            : "border-white/10 bg-white/6 text-white/45"
                      }`}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-white/55">Murojaatlar yuklanmoqda.</p>
            )}
          </Card>

          {tab === "requests" ? (
            <Card>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Request timeline</p>
              <div className="mt-4 space-y-3">
                {requests.slice(0, 6).map((request) => (
                  <div key={request.id} className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{request.fullName}</p>
                        <p className="text-xs text-white/45">{formatDate(request.createdAt)}</p>
                      </div>
                      <Badge tone={statusTone[request.status]}>{request.status}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/64">{request.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-white">Admin table</p>
              <div className="mt-4 overflow-hidden rounded-[24px] border border-white/10">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-white/8 text-white/60">
                    <tr>
                      <th className="px-4 py-3 font-medium">Ism</th>
                      <th className="px-4 py-3 font-medium">Turi</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id} className="border-t border-white/10 bg-white/4">
                        <td className="px-4 py-3 text-white">{request.fullName}</td>
                        <td className="px-4 py-3 text-white/60">{request.type}</td>
                        <td className="px-4 py-3">
                          <Badge tone={statusTone[request.status]}>{request.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs text-white outline-none"
                            value={request.status}
                            onChange={(event) => void patchStatus(request.id, event.target.value as ReceptionRequest["status"])}
                          >
                            <option value="new">new</option>
                            <option value="in_review">in_review</option>
                            <option value="accepted">accepted</option>
                            <option value="rejected">rejected</option>
                            <option value="completed">completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
