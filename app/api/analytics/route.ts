import { NextResponse } from "next/server";
import {
  parseAnalyticsContext,
  parseFunnelEventName,
  toAnalyticsRow
} from "@/lib/analytics";
import { supabaseAdminFetch } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const LOCAL_PREVIEW_MODE = process.env.LOCAL_PREVIEW_MODE === "true";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as Record<string, unknown>;
    const eventName = parseFunnelEventName(input.eventName);
    const context = parseAnalyticsContext(input);

    if (eventName === "support_form_success") {
      return NextResponse.json(
        { message: "Zdarzenie sukcesu zapisuje wyłącznie formularz po stronie serwera." },
        { status: 400 }
      );
    }

    if (!context) {
      return NextResponse.json({ message: "Nieprawidłowa sesja analityczna." }, { status: 400 });
    }

    if (LOCAL_PREVIEW_MODE) {
      return new NextResponse(null, {
        status: 204,
        headers: { "Cache-Control": "no-store" }
      });
    }

    const response = await supabaseAdminFetch("/support_funnel_events", {
      method: "POST",
      headers: {
        Prefer: "resolution=ignore-duplicates,return=minimal"
      },
      body: JSON.stringify(toAnalyticsRow(eventName, context))
    });

    if (!response.ok && response.status !== 409) {
      throw new Error(`Błąd zapisu analityki: ${response.status}`);
    }

    return new NextResponse(null, {
      status: 204,
      headers: { "Cache-Control": "no-store" }
    });
  } catch {
    return NextResponse.json(
      { message: "Nie udało się zapisać zdarzenia analitycznego." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
