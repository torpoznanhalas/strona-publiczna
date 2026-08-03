"use client";

import { FormEvent, useState } from "react";

const initialState = {
  firstName: "",
  lastInitial: "",
  city: "",
  postalCode: "",
  email: "",
  adult: false,
  privacy: false,
  publicDisplay: true,
  website: ""
};

export function SupportForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const update = (name: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/supporters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Nie udało się zapisać poparcia.");
      }

      setStatus("success");
      setMessage(
        data.message ||
          "Dziękujemy. Zgłoszenie zostało zapisane i po weryfikacji zostanie doliczone do licznika."
      );
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.");
    }
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
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
            onChange={(event) => update("postalCode", event.target.value)}
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
          type="checkbox"
          checked={form.adult}
          onChange={(event) => update("adult", event.target.checked)}
          required
        />
        <span>Oświadczam, że mam ukończone 18 lat.</span>
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={form.privacy}
          onChange={(event) => update("privacy", event.target.checked)}
          required
        />
        <span>
          Popieram żądanie, aby Tor Poznań działał z poszanowaniem norm hałasu i praw mieszkańców.
          Akceptuję przetwarzanie danych w celu obsługi listy poparcia zgodnie z polityką prywatności.
        </span>
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={form.publicDisplay}
          onChange={(event) => update("publicDisplay", event.target.checked)}
        />
        <span>
          Zgadzam się na publiczne pokazanie zapisu w formie: imię, pierwsza litera nazwiska i
          miejscowość. Adres e-mail i kod pocztowy pozostaną niepubliczne.
        </span>
      </label>

      <p className="form-note">
        Administratorem danych jest Stowarzyszenie Mieszkańców Ławica-Bajkowe, ul. Juliana
        Tuwima 64, 60-195 Poznań, nr w ewidencji 583. Poparcie można wycofać, pisząc na
        halastorpoznan@gmail.com.
      </p>

      {status === "success" && <p className="form-status success">{message}</p>}
      {status === "error" && <p className="form-status error">{message}</p>}

      <button className="button button-accent" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Zapisuję…" : "Popieram — zapisz mój głos"}
      </button>
    </form>
  );
}
