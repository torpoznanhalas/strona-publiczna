import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { parseExactCount, supabaseAdminFetch } from "@/lib/supabase-admin";
import { parseSupporterPayload } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PUBLIC_POSTAL_CODE_PRIVACY_VERSION = "2026-08-04-v2";
const ACTIVE_STATUS_FILTER = "status=in.(approved,pending)";
const LOCAL_PREVIEW_MODE = process.env.LOCAL_PREVIEW_MODE === "true";
const LOCAL_PREVIEW_COUNT = 128;
const LOCAL_PREVIEW_MESSAGE =
  "Tryb lokalnego podglądu — zgłoszenie nie zostało zapisane";
const PUBLIC_CACHE_CONTROL =
  "public, max-age=30, s-maxage=30, stale-while-revalidate=60";

const LOCAL_PREVIEW_FIRST_NAMES = [
  "Anna",
  "Marek",
  "Joanna",
  "Piotr",
  "Katarzyna",
  "Tomasz",
  "Agnieszka",
  "Michał",
  "Monika",
  "Paweł",
  "Ewa",
  "Jakub"
];

const LOCAL_PREVIEW_PLACES = [
  { city: "Poznań", postalCode: "60-186" },
  { city: "Przeźmierowo", postalCode: "62-081" },
  { city: "Poznań", postalCode: "60-189" },
  { city: "Baranowo", postalCode: "62-081" },
  { city: "Poznań", postalCode: "60-185" },
  { city: "Skórzewo", postalCode: "60-185" },
  { city: "Poznań", postalCode: "60-175" },
  { city: "Wysogotowo", postalCode: "62-081" }
];

const LOCAL_PREVIEW_SUPPORTERS = Array.from(
  { length: LOCAL_PREVIEW_COUNT },
  (_, index) => {
    const place = LOCAL_PREVIEW_PLACES[index % LOCAL_PREVIEW_PLACES.length];
    const joinedAt = new Date(Date.UTC(2026, 7, 5, 10, 0));
    joinedAt.setUTCDate(joinedAt.getUTCDate() - index);

    return {
      firstName:
        LOCAL_PREVIEW_FIRST_NAMES[index % LOCAL_PREVIEW_FIRST_NAMES.length],
      lastInitial: String.fromCharCode(65 + ((index * 7) % 26)),
      city: place.city,
      postalCode: place.postalCode,
      createdAt: joinedAt.toISOString()
    };
  }
);

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT || "development-only-change-me";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", token);
  formData.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
    cache: "no-store"
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function getCount(query: string) {
  const response = await supabaseAdminFetch(`/supporters?select=id&${query}&limit=1`, {
    method: "GET",
    headers: {
      Prefer: "count=exact",
      Range: "0-0"
    }
  });

  if (!response.ok) {
    throw new Error(`Błąd bazy danych: ${response.status}`);
  }

  return parseExactCount(response);
}

type PublicSupporterRow = {
  first_name?: unknown;
  last_initial?: unknown;
  city?: unknown;
  postal_code?: unknown;
  created_at?: unknown;
  privacy_version?: unknown;
};

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

async function getPublicSupporters(limit: number, offset: number) {
  const response = await supabaseAdminFetch(
    `/supporters?select=first_name,last_initial,city,postal_code,created_at,privacy_version&${ACTIVE_STATUS_FILTER}&public_display_consent=eq.true&order=created_at.desc&offset=${offset}&limit=${limit}`,
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error(`Błąd bazy danych: ${response.status}`);
  }

  const rows = (await response.json()) as PublicSupporterRow[];
  return rows
    .map((row) => {
      const privacyVersion = String(row.privacy_version ?? "");
      const canShowPostalCode =
        privacyVersion === PUBLIC_POSTAL_CODE_PRIVACY_VERSION;
      return {
        firstName: String(row.first_name ?? "").trim().slice(0, 80),
        lastInitial: String(row.last_initial ?? "").trim().slice(0, 1).toUpperCase(),
        city: String(row.city ?? "").trim().slice(0, 100),
        postalCode: canShowPostalCode
          ? String(row.postal_code ?? "").trim().slice(0, 6)
          : "",
        createdAt: String(row.created_at ?? "")
      };
    })
    .filter(
      (row) =>
        row.firstName.length >= 2 &&
        row.lastInitial.length === 1 &&
        row.city.length >= 2 &&
        row.createdAt
    );
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const limit = Math.min(
      Math.max(parsePositiveInteger(requestUrl.searchParams.get("limit"), 8), 1),
      100
    );
    const offset = parsePositiveInteger(requestUrl.searchParams.get("offset"), 0);

    if (LOCAL_PREVIEW_MODE) {
      const supporters = LOCAL_PREVIEW_SUPPORTERS.slice(offset, offset + limit);

      return NextResponse.json(
        {
          count: LOCAL_PREVIEW_COUNT,
          publicCount: LOCAL_PREVIEW_COUNT,
          supporters,
          hasMore: offset + supporters.length < LOCAL_PREVIEW_COUNT
        },
        { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL } }
      );
    }

    const [count, publicCount, supporters] = await Promise.all([
      getCount(ACTIVE_STATUS_FILTER),
      getCount(`${ACTIVE_STATUS_FILTER}&public_display_consent=eq.true`),
      getPublicSupporters(limit, offset).catch(() => [])
    ]);

    return NextResponse.json(
      {
        count,
        publicCount,
        supporters,
        hasMore: offset + supporters.length < publicCount
      },
      { headers: { "Cache-Control": PUBLIC_CACHE_CONTROL } }
    );
  } catch {
    return NextResponse.json(
      {
        count: 0,
        publicCount: 0,
        supporters: [],
        hasMore: false
      },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const input = await request.json();
    const payload = parseSupporterPayload(input);

    if (LOCAL_PREVIEW_MODE) {
      return NextResponse.json({ message: LOCAL_PREVIEW_MESSAGE });
    }

    // Niewidoczne pole wypełniają zwykle automaty. Człowiek go nie widzi.
    if (payload.website) {
      return NextResponse.json({ message: "Zgłoszenie zostało przyjęte." }, { status: 200 });
    }

    const ip = getClientIp(request);
    const ipHash = hashIp(ip);
    if (!(await verifyTurnstile(payload.turnstileToken, ip))) {
      return NextResponse.json(
        { message: "Nie udało się potwierdzić, że zgłoszenie pochodzi od człowieka." },
        { status: 400 }
      );
    }

    const fifteenMinutesAgo = encodeURIComponent(new Date(Date.now() - 15 * 60 * 1000).toISOString());
    const recentCount = await getCount(
      `ip_hash=eq.${encodeURIComponent(ipHash)}&created_at=gte.${fifteenMinutesAgo}`
    );
    if (recentCount >= 3) {
      return NextResponse.json(
        { message: "Z tego połączenia wysłano zbyt wiele zgłoszeń. Spróbuj później." },
        { status: 429 }
      );
    }

    const response = await supabaseAdminFetch("/supporters", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        first_name: payload.firstName,
        last_initial: payload.lastInitial,
        city: payload.city,
        postal_code: payload.postalCode || null,
        email: payload.email,
        adult_confirmed: payload.adult,
        public_display_consent: payload.publicDisplay,
        privacy_version: PUBLIC_POSTAL_CODE_PRIVACY_VERSION,
        status: "approved",
        ip_hash: ipHash,
        user_agent: request.headers.get("user-agent")?.slice(0, 500) || null
      })
    });

    if (response.status === 409) {
      return NextResponse.json(
        { message: "Ten adres e-mail znajduje się już na liście poparcia." },
        { status: 409 }
      );
    }

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || "Nie udało się zapisać zgłoszenia.");
    }

    return NextResponse.json({
      message: "Dziękujemy. Twój głos został zapisany i od razu pojawił się na liście poparcia."
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nie udało się zapisać zgłoszenia.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
