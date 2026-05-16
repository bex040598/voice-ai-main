export function Tabs({
  items,
  active,
  onChange
}: {
  items: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="tabs" role="tablist" aria-label="Filter tablari">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={active === item}
          className={`tab-button ${active === item ? "active" : ""}`}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
