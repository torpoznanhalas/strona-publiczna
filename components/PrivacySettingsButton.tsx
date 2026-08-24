"use client";

import { META_CONSENT_OPEN_EVENT } from "@/components/MetaPixel";

export function PrivacySettingsButton() {
  return (
    <button
      className="footer-privacy-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(META_CONSENT_OPEN_EVENT))}
    >
      Ustawienia prywatności
    </button>
  );
}
