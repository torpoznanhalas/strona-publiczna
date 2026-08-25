"use client";

import Link from "next/link";
import { FormEvent, SyntheticEvent, useState } from "react";
import { getAnalyticsContext, trackFunnelEvent } from "@/lib/client-analytics";

const initialState = {
  firstName: "",
  lastInitial: "",
  city: "",
  postalCode: "",
  email: "",
  adult: false,
  privacy: true,
  publicDisplay: true,
  website: ""
};

type SupportFormProps = {
  variant?: "default" | "landing";
};

function formatPostalCode(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 5);
  return digits.length > 2 ? `${digits.slice(0, 2)}-${digits.slice(2)}` : digits;
}

export function SupportForm({ variant = "default" }: SupportFormProps) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [recordSaved, setRecordSaved] = useState(false);
  const isLanding = variant === "landing";

  const update = (name: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const trackStart = (event: SyntheticEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.name === "website") return;
    void trackFunnelEvent("support_form_start");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setRecordSaved(false);

    try {
      const response = await fetch("/api/supporters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...getAnalyticsContext() })
      });
      const data = (await response.json()) as { message?: string; saved?: boolean };

      if (!response.ok) {
        throw new Error(data.message || "Nie udało się zapisać poparcia.");
      }

      setStatus("success");
      setRecordSaved(data.saved === true);
      setMessage(
        data.message ||
          "Dziękujemy. Zgłoszenie zostało zapisane i czeka na zatwierdzenie."
      );
      setForm(initialState);
      if (data.saved) window.dispatchEvent(new Event("supporter-added"));
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.");
    }
  };

  if (isLanding && status === "success" && recordSaved) {
    return (
      <section className="form support-form-success-state" role="status" aria-live="polite">
        <p className="eyebrow">Głos zapisany</p>
        <h3>Dziękujemy za poparcie!</h3>
        <p>
          Twoje zgłoszenie zostało zapisane i czeka na zatwierdzenie. Im więcej mieszkańców
          poprze wspólne postulaty, tym mocniejszy będzie ich głos w rozmowach o przyszłości
          Toru Poznań.
        </p>
        <Link className="button button-ghost" href="/">
          Poznaj fakty i nagrania →
        </Link>
      </section>
    );
  }

  return (
    <form
      className="form"
      onSubmit={submit}
      onFocusCapture={trackStart}
      onInputCapture={trackStart}
      noValidate
    >
      <div className="form-quick-info">
        <strong>Zapis zajmuje około 30 sekund.</strong>
        {isLanding ? (
          <>
            <span>Twój adres e-mail nie jest publicznie widoczny.</span>
            <span>
              Po zatwierdzeniu mogą być pokazane: imię, pierwsza litera nazwiska, miejscowość,
              pełny kod pocztowy — jeśli go podasz — oraz data dołączenia.
            </span>
          </>
        ) : null}
      </div>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="firstName">Imię</label>
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            required
            maxLength={80}
          />
        </div>
        <div className="field">
          <label htmlFor="lastInitial">Pierwsza litera nazwiska</label>
          <input
            id="lastInitial"
            name="lastInitial"
            value={form.lastInitial}
            onChange={(event) => update("lastInitial", event.target.value.slice(0, 1))}
            required
            maxLength={1}
            aria-describedby="lastInitialHelp"
          />
          <span className="sr-only" id="lastInitialHelp">
            Wpisz tylko jedną literę.
          </span>
        </div>
      </div>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="city">Miejscowość</label>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            value={form.city}
            onChange={(event) => update("city", event.target.value)}
            required
            maxLength={100}
          />
        </div>
        <div className="field">
          <label htmlFor="postalCode">Kod pocztowy (opcjonalnie)</label>
          <input
            id="postalCode"
            name="postalCode"
            autoComplete="postal-code"
            inputMode="numeric"
            placeholder="00-000"
            value={form.postalCode}
            onChange={(event) => update("postalCode", formatPostalCode(event.target.value))}
            maxLength={6}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">E-mail — nie będzie publiczny</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          required
          maxLength={254}
        />
      </div>

      <div className="field" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website">Strona internetowa</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <label className="checkbox">
        <input
          name="privacy"
          type="checkbox"
          checked={form.privacy}
          onChange={(event) => update("privacy", event.target.checked)}
          required
        />
        <span>
          <b>Popieram postulaty mieszkańców, dotyczące przestrzegania prawa do ciszy i wypoczynku.</b>
          Akceptuję przetwarzanie danych w celu obsługi listy poparcia zgodnie z polityką prywatności.
        </span>
      </label>

      <label className="checkbox">
        <input
          name="publicDisplay"
          type="checkbox"
          checked={form.publicDisplay}
          onChange={(event) => update("publicDisplay", event.target.checked)}
          required
        />
        <span>
          Zgadzam się na publiczne pokazanie zapisu w formie: imię, pierwsza litera nazwiska,
          miejscowość, pełny kod pocztowy — jeśli został podany — oraz data dołączenia.
          Adres e-mail pozostanie niepubliczny.
        </span>
      </label>

      <label className="checkbox">
        <input
          name="adult"
          type="checkbox"
          checked={form.adult}
          onChange={(event) => update("adult", event.target.checked)}
          required
        />
        <span>Oświadczam, że mam ukończone 18 lat.</span>
      </label>

      <p className="form-note">
        Administratorem danych jest Stowarzyszenie Mieszkańców Ławica-Bajkowe, nr w ewidencji
        583. Poparcie można wycofać, pisząc na halastorpoznan@gmail.com. Szczegóły znajdziesz w{" "}
        <Link href="/polityka-prywatnosci">polityce prywatności</Link>.
      </p>

      {status === "success" && <p className="form-status success">{message}</p>}
      {status === "error" && <p className="form-status error">{message}</p>}

      <button className="button button-accent" type="submit" disabled={status === "loading"}>
        {status === "loading"
          ? "Zapisuję…"
          : isLanding
            ? "Popieram te postulaty"
            : "Popieram — zapisz mój głos"}
      </button>
    </form>
  );
}
