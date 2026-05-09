import { FolderKanban, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { PageIntro } from "../../components/dashboard/PageIntro";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { addPortfolioItem, getPortfolioItems, getPortfolios } from "../../features/portfolio/portfolio.service";
import type { Portfolio, PortfolioItem } from "../../types";

export const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selected, setSelected] = useState<Portfolio | null>(null);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    void getPortfolios().then((result) => {
      setPortfolios(result);
      setSelected(result[0] ?? null);
      if (result[0]) {
        void getPortfolioItems(result[0].id).then(setItems);
      }
    });
  }, []);

  const selectPortfolio = async (portfolio: Portfolio) => {
    setSelected(portfolio);
    const nextItems = await getPortfolioItems(portfolio.id);
    setItems(nextItems);
  };

  const addItem = async () => {
    if (!selected) {
      return;
    }
    const item = await addPortfolioItem({
      portfolioId: selected.id,
      fileUrl: "https://example.com/uploaded-work",
      type: "project",
      description
    });
    setItems((state) => [item, ...state]);
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Portfolio"
        title="Talaba portfolio moduli"
        description="Multimedia ishlari, loyiha fayllari, case-study va video ishlar portfolioda ko'rinadi va teacher monitoring uchun tayyor holatda saqlanadi."
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <FolderKanban className="h-5 w-5 text-cyan-600" />
            <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">Portfolios</p>
          </div>
          <div className="space-y-3">
            {portfolios.map((portfolio) => (
              <button
                key={portfolio.id}
                className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 text-left transition hover:border-cyan-300"
                onClick={() => void selectPortfolio(portfolio)}
                type="button"
              >
                <p className="text-sm font-semibold text-navy-900">{portfolio.title}</p>
                <p className="text-xs text-slate-500">{portfolio.description}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-['Space_Grotesk'] text-xl font-bold text-navy-900">
                {selected?.title ?? "Portfolio tanlang"}
              </p>
              <p className="text-sm text-slate-500">{selected?.description}</p>
            </div>
          </div>

          <div className="mb-4 flex gap-3">
            <Input placeholder="Yangi item tavsifi" value={description} onChange={(event) => setDescription(event.target.value)} />
            <Button onClick={() => void addItem()}>
              <Plus className="h-4 w-4" />
              Qo'shish
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-slate-200 bg-white/70 p-4">
                <p className="text-sm font-semibold text-navy-900">{item.type}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
