import { cn } from "../../lib/utils";

interface TabsProps<T extends string> {
  items: Array<{ id: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}

export const Tabs = <T extends string>({ items, value, onChange }: TabsProps<T>) => (
  <div className="inline-flex rounded-2xl bg-white/60 p-1 shadow-panel">
    {items.map((item) => (
      <button
        key={item.id}
        className={cn(
          "rounded-2xl px-4 py-2 text-sm font-semibold transition",
          value === item.id
            ? "bg-navy-900 text-white"
            : "text-slate-600 hover:bg-white/80 hover:text-navy-900"
        )}
        onClick={() => onChange(item.id)}
        type="button"
      >
        {item.label}
      </button>
    ))}
  </div>
);
