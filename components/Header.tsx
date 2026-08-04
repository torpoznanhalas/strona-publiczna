"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Tor Poznań hałasuje — strona główna" onClick={closeMenu}>
          <span className="brand-mark">●</span>
          <span>TOR POZNAŃ HAŁASUJE</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-navigation" className={`nav${open ? " nav-open" : ""}`} aria-label="Główna nawigacja">
          <Link href="/#mechanizm" onClick={closeMenu}>Fakty</Link>
          <Link href="/#nagrania" onClick={closeMenu}>Nagrania</Link>
          <Link href="/media" onClick={closeMenu}>Dla mediów</Link>
          <Link href="/#poparcie" onClick={closeMenu}>Poprzyj</Link>
        </nav>
      </div>
    </header>
  );
}
