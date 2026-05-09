import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockRooms } from "../../data/mockCampus";
import { fuzzySearch } from "../../lib/algorithms/fuzzySearch";
import { Modal } from "./Modal";
import { Input } from "./Input";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onOpenRequest?: () => void;
}

const shortcuts = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Campus map", path: "/campus-map" },
  { label: "Face greeting", path: "/face-greeting" },
  { label: "Voice emotion", path: "/voice-emotion" },
  { label: "Monitoring", path: "/monitoring" }
];

export const CommandPalette = ({ open, onClose, onOpenRequest }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!open) {
          setQuery("");
          onOpenRequest?.();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenRequest]);

  const suggestions = !query.trim()
    ? []
    : fuzzySearch(
        query,
        mockRooms.map((room) => ({
          ...room,
          aliases: [room.description, room.type]
        })),
        6
      );

  return (
    <Modal open={open} onClose={onClose} title="ATMURA Command Palette">
      <div className="space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
          <Input
            autoFocus
            className="pl-10"
            placeholder="Xona, modul yoki xizmat nomini yozing..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {!query.trim() ? (
          <div className="grid gap-3 md:grid-cols-2">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut.path}
                className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-left transition hover:border-cyan-300/40 hover:bg-white/10"
                onClick={() => {
                  navigate(shortcut.path);
                  onClose();
                }}
                type="button"
              >
                <p className="text-sm font-semibold text-white">{shortcut.label}</p>
                <p className="mt-1 text-xs text-white/45">{shortcut.path}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.target.id}
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-left transition hover:border-cyan-300/40 hover:bg-white/10"
                onClick={() => {
                  navigate("/campus-map");
                  onClose();
                }}
                type="button"
              >
                <p className="text-sm font-semibold text-white">{suggestion.target.name}</p>
                <p className="mt-1 text-xs text-white/45">
                  Match: {suggestion.matchedBy} | Floor: {suggestion.target.floorId}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
