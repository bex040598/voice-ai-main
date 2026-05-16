import { NavLink } from "react-router-dom";
import { navItems } from "../data/mockData";

export function Sidebar({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <aside className={`app-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-section">
          <span className="sidebar-title">Portal</span>
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className="sidebar-link" onClick={onClose}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/notifications" className="sidebar-link" onClick={onClose}>
            Notifications
          </NavLink>
          <NavLink to="/register" className="sidebar-link" onClick={onClose}>
            Register
          </NavLink>
          <NavLink to="/profile" className="sidebar-link" onClick={onClose}>
            Profile
          </NavLink>
        </div>
      </aside>
      {open ? <button type="button" className="sidebar-overlay" aria-label="Yon panelni yopish" onClick={onClose} /> : null}
    </>
  );
}
