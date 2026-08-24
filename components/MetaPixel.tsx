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
  const [measurementEnabled, setMeasurementEnabled] = useState(false);

  useEffect(() => {
    const initialize = window.setTimeout(() => {
      setConsent(readConsent());
      setReady(true);
    }, 0);

    const openSettings = () => {
      setMeasurementEnabled(readConsent() === "granted");
      setSettingsOpen(true);
    };
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
      {settingsOpen ? (
        <div className="meta-consent-settings">
          <div className="meta-consent-copy">
            <h2 id="meta-consent-title">Dostosuj pliki cookie</h2>
            <p>
              Niezbędne pliki cookie i pamięć przeglądarki umożliwiają podstawowe działanie strony.
              Dodatkowy pomiar uruchomimy wyłącznie wtedy, gdy go włączysz.
            </p>
          </div>
          <div className="meta-consent-option" aria-disabled="true">
            <span>
              <strong>Niezbędne</strong>
              <small>Zawsze aktywne</small>
            </span>
            <span className="meta-consent-required">Włączone</span>
          </div>
          <label className="meta-consent-option">
            <span>
              <strong>Pomiar i promocja inicjatywy</strong>
              <small>Pomagają sprawdzać skuteczność strony i docierać do innych mieszkańców.</small>
            </span>
            <input
              type="checkbox"
              checked={measurementEnabled}
              onChange={(event) => setMeasurementEnabled(event.target.checked)}
            />
          </label>
          <div className="meta-consent-settings-footer">
            <Link href="/polityka-prywatnosci">Dowiedz się więcej</Link>
            <button
              className="button meta-consent-save"
              type="button"
              onClick={() => saveConsent(measurementEnabled ? "granted" : "denied")}
            >
              Zapisz wybór
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="meta-consent-copy">
            <h2 id="meta-consent-title">Pomóż nam dotrzeć do innych mieszkańców</h2>
            <p>
              Za Twoją zgodą użyjemy dodatkowych plików cookie, aby mierzyć skuteczność strony i
              docierać z informacją o inicjatywie do innych osób, którym również przeszkadza hałas.
              Nie przekazujemy danych wpisanych w formularzu. Będziemy bardzo wdzięczni za Twoje
              wsparcie. <Link href="/polityka-prywatnosci">Dowiedz się więcej</Link>.
            </p>
          </div>
          <div className="meta-consent-actions">
            <button
              className="button meta-consent-customize"
              type="button"
              onClick={() => {
                setMeasurementEnabled(false);
                setSettingsOpen(true);
              }}
            >
              Dostosuj
            </button>
            <button className="button meta-consent-accept" type="button" onClick={() => saveConsent("granted")}>
              Akceptuję
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
