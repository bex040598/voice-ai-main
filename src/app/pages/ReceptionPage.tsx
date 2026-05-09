import { useEffect, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { ReceptionForm } from "../../components/forms/ReceptionForm";
import { Card } from "../../components/ui/Card";
import { getReceptionRequests, updateReceptionStatus } from "../../features/reception/reception.service";
import type { ReceptionRequest } from "../../types";

export const ReceptionPage = () => {
  const [requests, setRequests] = useState<ReceptionRequest[]>([]);

  useEffect(() => {
    void getReceptionRequests().then(setRequests);
  }, []);

  const patchStatus = async (id: string, status: ReceptionRequest["status"]) => {
    const updated = await updateReceptionStatus(id, status);
    setRequests((state) => state.map((request) => (request.id === id ? updated : request)));
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Virtual reception"
        title="Virtual rektor qabulxonasi"
        description="Ariza, taklif, shikoyat va qabul vaqtlarini qabul qilish, status bo'yicha monitoring va admin ko'rinishi uchun tayyor modul."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <ReceptionForm />
        <Card>
          <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Murojaatlar</p>
          <div className="mt-4 space-y-3">
            {requests.map((request) => (
              <div key={request.id} className="rounded-[24px] border border-slate-200 bg-white/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{request.fullName}</p>
                    <p className="text-xs text-slate-500">{request.type}</p>
                  </div>
                  <select
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-navy-900"
                    value={request.status}
                    onChange={(event) => void patchStatus(request.id, event.target.value as ReceptionRequest["status"])}
                  >
                    <option value="new">new</option>
                    <option value="in_review">in_review</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                    <option value="completed">completed</option>
                  </select>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{request.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
