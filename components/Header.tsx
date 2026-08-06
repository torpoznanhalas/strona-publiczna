"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "tor-poznan-theme";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("theme-change", callback);
  return () => window.removeEventListener("theme-change", callback);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerThemeSnapshot() {
  return false;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const closeMenu = () => setOpen(false);

  const toggleTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event("theme-change"));
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          className="brand"
          href="/#strona-glowna"
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
          <Link href="/#strona-glowna" onClick={closeMenu}>
            Start
          </Link>
          <Link href="/#nagrania" onClick={closeMenu}>
            Nagrania hałasu
          </Link>
          <Link href="/#postulaty" onClick={closeMenu}>
            Postulaty
          </Link>
          <Link href="/fakty" onClick={closeMenu}>
            Aktualności
          </Link>
          <Link href="/historia" onClick={closeMenu}>
            Historia Toru
          </Link>
          <Link href="/zdrowie" onClick={closeMenu}>
            Zdrowie
          </Link>
          <Link href="/kontakt" onClick={closeMenu}>
            Kontakt
          </Link>
          <Link className="nav-mobile-join" href="/#poparcie" onClick={closeMenu}>
            Dołącz się
          </Link>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          aria-label={darkMode ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
          aria-pressed={darkMode}
          title={darkMode ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
          onClick={toggleTheme}
        >
          <svg className="theme-toggle-half-sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
            <path className="theme-toggle-shade" d="M12 8a4 4 0 0 0 0 8Z" />
          </svg>
        </button>
        <Link className="header-join" href="/#poparcie" onClick={closeMenu}>
          Dołącz się
        </Link>
      </div>
    </header>
  );
}
