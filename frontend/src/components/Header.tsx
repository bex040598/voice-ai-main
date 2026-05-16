import { navItems } from "../data/mockData";
import { UserDropdown } from "./UserDropdown";

export function Header({
  onMenu
}: {
  onMenu: () => void;
}) {
  return (
    <header className="app-header">
      <div className="brand-block">
        <button type="button" className="icon-button mobile-only" onClick={onMenu} aria-label="Menyuni ochish">
          ☰
        </button>
        <a href="/" className="brand-link">
          <span className="brand-mark">AT</span>
          <span>
            <strong>ATMU Smart UniLibrary</strong>
            <small>Premium academic platform</small>
          </span>
        </a>
      </div>
      <nav className="top-nav" aria-label="Asosiy menyu">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-tools">
        <button type="button" className="icon-button" aria-label="Qidiruv">⌕</button>
        <button type="button" className="icon-button" aria-label="Bildirishnomalar">🔔</button>
        <div className="language-switch" aria-label="Til tanlash">
          <button type="button">UZ</button>
          <button type="button">RU</button>
          <button type="button">EN</button>
          <button type="button">TR</button>
        </div>
        <UserDropdown />
      </div>
    </header>
  );
}
