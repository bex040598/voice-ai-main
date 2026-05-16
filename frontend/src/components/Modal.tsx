import type { ReactNode } from "react";

export function Modal({
  open,
  title,
  children,
  onClose
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Yopish">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
