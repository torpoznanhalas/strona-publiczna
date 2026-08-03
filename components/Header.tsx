import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Tor Poznań Hałas — strona główna">
          <span className="brand-mark">●</span>
          <span>TOR POZNAŃ: HAŁAS</span>
        </Link>

        <nav className="nav" aria-label="Główna nawigacja">
          <Link href="/#fakty">Fakty</Link>
          <Link href="/#nagrania">Nagrania</Link>
          <Link href="/media">Dla mediów</Link>
          <Link href="/#poparcie">Poprzyj</Link>
        </nav>
      </div>
    </header>
  );
}
