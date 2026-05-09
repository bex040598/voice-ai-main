import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { createResource, deleteResource, getResources } from "../../features/resources/resources.service";
import { mockSubjects } from "../../data/mockAcademic";
import type { Resource } from "../../types";

export const ResourcesPage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");

  useEffect(() => {
    void getResources().then(setResources);
  }, []);

  const addResource = async () => {
    const resource = await createResource({
      title,
      type,
      fileUrl: "https://example.com/new-resource",
      subjectId: mockSubjects[0].id,
      createdBy: mockSubjects[0].teacherId
    });
    setResources((state) => [resource, ...state]);
    setTitle("");
  };

  const removeResource = async (id: string) => {
    await deleteResource(id);
    setResources((state) => state.filter((resource) => resource.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Resources"
        title="Elektron resurs konstruktori"
        description="Teacher va admin foydalanuvchilar PDF, video, slide yoki boshqa media resurslarni qo'shishi va boshqarishi mumkin."
      />

      <Card>
        <div className="grid gap-3 md:grid-cols-[1fr_180px_200px]">
          <Input placeholder="Resurs sarlavhasi" value={title} onChange={(event) => setTitle(event.target.value)} />
          <select
            className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-navy-900 outline-none"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="slide">Slide</option>
          </select>
          <Button onClick={() => void addResource()}>
            <Plus className="h-4 w-4" />
            Qo'shish
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-navy-900">{resource.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {resource.type} | subject: {resource.subjectId}
                </p>
              </div>
              <button className="rounded-full bg-rose-50 p-2 text-rose-600" onClick={() => void removeResource(resource.id)} type="button">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
