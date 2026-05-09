import { cn } from "../../lib/utils";

interface TabsProps<T extends string> {
  items: Array<{ id: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}

export const Tabs = <T extends string>({ items, value, onChange }: TabsProps<T>) => (
  <div className="inline-flex rounded-2xl border border-white/10 bg-white/8 p-1 shadow-panel">
    {items.map((item) => (
      <button
        key={item.id}
        className={cn(
          "rounded-2xl px-4 py-2 text-sm font-semibold transition",
          value === item.id
            ? "bg-[linear-gradient(135deg,rgba(0,212,255,0.92),rgba(124,58,237,0.88))] text-white shadow-glow"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        )}
        onClick={() => onChange(item.id)}
        type="button"
      >
        {item.label}
      </button>
    ))}
  </div>
);
