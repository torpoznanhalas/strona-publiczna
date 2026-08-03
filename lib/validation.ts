export type SupporterPayload = {
  firstName: string;
  lastInitial: string;
  city: string;
  postalCode?: string;
  email: string;
  adult: boolean;
  privacy: boolean;
  publicDisplay: boolean;
  website?: string;
  turnstileToken?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postalCodePattern = /^\d{2}-\d{3}$/;
const letterPattern = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]$/;

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export function parseSupporterPayload(input: unknown): SupporterPayload {
  const data = (input ?? {}) as Record<string, unknown>;

  const payload: SupporterPayload = {
    firstName: clean(data.firstName, 80),
    lastInitial: clean(data.lastInitial, 1).toUpperCase(),
    city: clean(data.city, 100),
    postalCode: clean(data.postalCode, 6),
    email: clean(data.email, 254).toLowerCase(),
    adult: data.adult === true,
    privacy: data.privacy === true,
    publicDisplay: data.publicDisplay === true,
    website: clean(data.website, 160),
    turnstileToken: clean(data.turnstileToken, 2048)
  };

  if (payload.firstName.length < 2) {
    throw new Error("Podaj imię.");
  }

  if (!letterPattern.test(payload.lastInitial)) {
    throw new Error("Podaj pierwszą literę nazwiska.");
  }

  if (payload.city.length < 2) {
    throw new Error("Podaj miejscowość.");
  }

  if (payload.postalCode && !postalCodePattern.test(payload.postalCode)) {
    throw new Error("Kod pocztowy powinien mieć format 00-000.");
  }

  if (!emailPattern.test(payload.email)) {
    throw new Error("Podaj poprawny adres e-mail.");
  }

  if (!payload.adult) {
    throw new Error("Poparcie mogą złożyć osoby pełnoletnie.");
  }

  if (!payload.privacy) {
    throw new Error("Zaakceptuj zasady przetwarzania danych.");
  }

  return payload;
}
