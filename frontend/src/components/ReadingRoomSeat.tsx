export function ReadingRoomSeat({
  id,
  state,
  selected,
  onClick
}: {
  id: string;
  state: "available" | "booked" | "disabled";
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`seat seat-${selected ? "selected" : state}`}
      onClick={onClick}
      disabled={state === "disabled" || state === "booked"}
      aria-label={`Joy ${id} holati ${selected ? "selected" : state}`}
    >
      <span>{id}</span>
      <small>{selected ? "Tanlandi" : state}</small>
    </button>
  );
}
