import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { parseExactCount, supabaseAdminFetch } from "@/lib/supabase-admin";
import { parseSupporterPayload } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function GET() {
  try {
    const count = await getCount("status=eq.approved");

    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const input = await request.json();
    const payload = parseSupporterPayload(input);

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
        privacy_version: "2026-08-03-v1",
        status: "pending",
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
      message: "Dziękujemy. Zgłoszenie zapisano i po weryfikacji zostanie doliczone do licznika."
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nie udało się zapisać zgłoszenia.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
