"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useState, useSyncExternalStore } from "react";
import { SupporterCounter } from "@/components/SupporterCounter";
import { siteFeatures } from "@/lib/site-features";

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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const closeMenu = () => setOpen(false);

  const handleSupportClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    if (window.location.pathname !== "/") return;

    const target = document.getElementById("poparcie");
    if (!target) return;

    event.preventDefault();
    if (window.location.hash !== "#poparcie") {
      window.history.pushState(null, "", "#poparcie");
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event("theme-change"));
  };

  if (pathname === "/poprzyj") {
    return (
      <header className="header support-landing-site-header">
        <div className="container support-landing-header-inner">
          <Link className="brand" href="/" aria-label="Hałas z Toru Poznań — strona główna">
            <Image
              className="brand-logo"
              src="/logo-transparent.png"
              width={46}
              height={46}
              alt=""
              priority
              unoptimized
            />
            <span>Hałas z Toru Poznań</span>
          </Link>
          <Link className="support-landing-back" href="/">
            ← Wróć do strony głównej
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      {siteFeatures.showPromoBar && (
        <div className="promo-bar">
          <Link href="/#poparcie" onClick={handleSupportClick}>
            <span className="promo-bar-message">
              <strong><SupporterCounter /></strong> mieszkańców już poparło apel
            </span>
            <span className="promo-bar-action">Dołącz</span>
          </Link>
        </div>
      )}
      <div className="container header-inner">
        <Link
          className="brand"
          href="/#strona-glowna"
          aria-label="Hałas z Toru Poznań — strona główna"
          onClick={closeMenu}
        >
          <Image
            className="brand-logo"
            src="/logo-transparent.png"
            width={46}
            height={46}
            alt=""
            priority
            unoptimized
          />
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
          <Link href="/fakty" onClick={closeMenu}>
            Aktualności
          </Link>
          <Link href="/historia" onClick={closeMenu}>
            Historia Toru Poznań
          </Link>
          <Link href="/zdrowie" onClick={closeMenu}>
            Zdrowie
          </Link>
          <Link href="/#postulaty" onClick={closeMenu}>
            Postulaty
          </Link>
          <Link href="/kontakt" onClick={closeMenu}>
            Kontakt
          </Link>
          <Link className="nav-mobile-join" href="/#poparcie" onClick={handleSupportClick}>
            Poprzyj apel
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
        <Link className="header-join" href="/#poparcie" onClick={handleSupportClick}>
          Poprzyj apel
        </Link>
      </div>
    </header>
  );
}
