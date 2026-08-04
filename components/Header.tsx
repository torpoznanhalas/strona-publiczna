"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Hałas z Toru Poznań — strona główna"
          onClick={closeMenu}
        >
          <span className="brand-mark">●</span>
          <span>Hałas z Toru Poznań</span>
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
        <nav
          id="main-navigation"
          className={`nav${open ? " nav-open" : ""}`}
          aria-label="Główna nawigacja"
        >
          <Link href="/" onClick={closeMenu}>
            Strona główna
          </Link>
          <Link href="/fakty" onClick={closeMenu}>
            Fakty
          </Link>
          <Link href="/#nagrania" onClick={closeMenu}>
            Nagrania
          </Link>
          <Link href="/historia" onClick={closeMenu}>
            Historia Toru
          </Link>
          <Link href="/kontakt" onClick={closeMenu}>
            Kontakt
          </Link>
          <Link className="nav-mobile-join" href="/#poparcie" onClick={closeMenu}>
            Dołącz się
          </Link>
        </nav>
        <Link className="header-join" href="/#poparcie" onClick={closeMenu}>
          Dołącz się
        </Link>
      </div>
    </header>
  );
}
