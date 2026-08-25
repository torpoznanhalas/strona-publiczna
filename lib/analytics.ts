export const FUNNEL_EVENT_NAMES = [
  "page_view",
  "landing_page_view",
  "support_form_view",
  "support_section_view",
  "support_form_start",
  "support_form_success"
] as const;

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content"
] as const;

export type FunnelEventName = (typeof FUNNEL_EVENT_NAMES)[number];
export type UtmKey = (typeof UTM_KEYS)[number];
export type Attribution = Partial<Record<UtmKey, string>>;

export type AnalyticsContext = {
  sessionId: string;
  pagePath: string;
  attribution: Attribution;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function clean(value: unknown, maxLength: number) {
  return String(value ?? "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, maxLength);
}

export function parseAttribution(input: unknown): Attribution {
  const data = (input ?? {}) as Record<string, unknown>;
  const attribution: Attribution = {};

  for (const key of UTM_KEYS) {
    const value = clean(data[key], 200);
    if (value) attribution[key] = value;
  }

  return attribution;
}

export function parseAnalyticsContext(input: unknown): AnalyticsContext | null {
  const data = (input ?? {}) as Record<string, unknown>;
  const sessionId = clean(data.sessionId, 36);
  const rawPagePath = clean(data.pagePath, 200);
  const pagePath = rawPagePath || "/";

  if (!UUID_PATTERN.test(sessionId) || !/^\/[A-Za-z0-9/_-]*$/.test(pagePath)) return null;

  return {
    sessionId,
    pagePath,
    attribution: parseAttribution(data.attribution)
  };
}

export function parseFunnelEventName(input: unknown): FunnelEventName {
  const eventName = clean(input, 40) as FunnelEventName;

  if (!FUNNEL_EVENT_NAMES.includes(eventName)) {
    throw new Error("Nieznane zdarzenie analityczne.");
  }

  return eventName;
}

export function toAnalyticsRow(
  eventName: FunnelEventName,
  context: AnalyticsContext
) {
  return {
    session_id: context.sessionId,
    event_name: eventName,
    page_path: context.pagePath,
    utm_source: context.attribution.utm_source || null,
    utm_medium: context.attribution.utm_medium || null,
    utm_campaign: context.attribution.utm_campaign || null,
    utm_content: context.attribution.utm_content || null
  };
}
