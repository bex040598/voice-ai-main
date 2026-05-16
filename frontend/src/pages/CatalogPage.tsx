import { useMemo, useState } from "react";
import { BookCard } from "../components/BookCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { PageHeader } from "../components/PageHeader";
import { SearchPanel } from "../components/SearchPanel";
import { books } from "../data/mockData";

export function CatalogPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => books.filter((book) => `${book.title} ${book.author} ${book.department}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="page-stack">
      <PageHeader title="Catalog" description="Elektron katalog, filtrlar, band qilish va resurslarga tezkor kirish." />
      <SearchPanel title="Universal search" description="Kitob, muallif, kafedra yoki kalit so'z bo'yicha qidiring." value={query} onChange={setQuery} actionLabel="Qidirish" onSubmit={() => undefined} />
      <div className="content-with-sidebar">
        <FilterSidebar />
        <section className="grid card-grid two">
          {filtered.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </section>
      </div>
      <div className="pagination-row">
        <button type="button" className="ghost-button">Oldingi</button>
        <span className="meta-inline">1 / 8 sahifa</span>
        <button type="button" className="ghost-button">Keyingi</button>
      </div>
    </div>
  );
}
