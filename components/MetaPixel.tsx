"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const META_PIXEL_ID = "1779803609690116";
const META_CONSENT_KEY = "tor-poznan-meta-consent";
export const META_CONSENT_OPEN_EVENT = "tor-poznan-open-meta-consent";

type Consent = "granted" | "denied";
type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  queue: unknown[][];
  version?: string;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

function readConsent(): Consent | null {
  const value = window.localStorage.getItem(META_CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function loadMetaPixel() {
  if (window.fbq) return;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  }) as MetaPixelFunction;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
}

function removeMetaCookies() {
  for (const name of ["_fbp", "_fbc"]) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  }
}

export function trackMetaLead() {
  if (typeof window === "undefined" || readConsent() !== "granted" || !window.fbq) return;

  window.fbq("track", "Lead", {
    content_category: "support",
    content_name: "lista_wsparcia"
  });
}

export function MetaPixel() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const initialize = window.setTimeout(() => {
      setConsent(readConsent());
      setReady(true);
    }, 0);

    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(META_CONSENT_OPEN_EVENT, openSettings);
    return () => {
      window.clearTimeout(initialize);
      window.removeEventListener(META_CONSENT_OPEN_EVENT, openSettings);
    };
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;

    loadMetaPixel();
    window.fbq?.("consent", "grant");
    window.fbq?.("track", "PageView");
  }, [consent, pathname]);

  const saveConsent = (value: Consent) => {
    window.localStorage.setItem(META_CONSENT_KEY, value);
    setConsent(value);
    setSettingsOpen(false);

    if (value === "denied") {
      window.fbq?.("consent", "revoke");
      removeMetaCookies();
    }
  };

  if (!ready || (consent !== null && !settingsOpen)) return null;

  return (
    <aside className="meta-consent" role="dialog" aria-modal="true" aria-labelledby="meta-consent-title">
      <div className="meta-consent-copy">
        <h2 id="meta-consent-title">Czy zgadzasz się na pomiar Meta?</h2>
        <p>
          Po Twojej zgodzie uruchomimy Piksel Meta, aby mierzyć odwiedziny i skuteczne zapisy na
          listę wsparcia. Nie przekazujemy Meta danych wpisanych w formularzu. Więcej informacji
          znajdziesz w <Link href="/polityka-prywatnosci">polityce prywatności</Link>.
        </p>
      </div>
      <div className="meta-consent-actions">
        <button className="button button-ghost" type="button" onClick={() => saveConsent("denied")}>
          Nie zgadzam się
        </button>
        <button className="button button-accent" type="button" onClick={() => saveConsent("granted")}>
          Zgadzam się
        </button>
      </div>
    </aside>
  );
}
