import { useEffect, useRef, useState } from "react";

export function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="user-dropdown" ref={ref}>
      <button type="button" className="user-trigger" onClick={() => setOpen((value) => !value)} aria-haspopup="menu" aria-expanded={open}>
        <span className="user-avatar">AG</span>
        <span>
          <strong>ATMURA Guest</strong>
          <small>Talaba</small>
        </span>
      </button>
      {open ? (
        <div className="dropdown-menu" role="menu">
          <a href="/profile" role="menuitem">Profile</a>
          <a href="/notifications" role="menuitem">Notifications</a>
          <button type="button" role="menuitem">Chiqish</button>
        </div>
      ) : null}
    </div>
  );
}
