"use client";

import {
  AnalyticsContext,
  Attribution,
  FunnelEventName,
  UTM_KEYS
} from "@/lib/analytics";

const ATTRIBUTION_STORAGE_KEY = "tor-poznan-attribution";
const SESSION_ID_STORAGE_KEY = "tor-poznan-analytics-session";
const EVENT_STORAGE_PREFIX = "tor-poznan-event:";

let memorySessionId = "";
let memoryAttribution: Attribution = {};
const pendingEvents = new Set<string>();
const completedEvents = new Set<string>();

function readSessionStorage(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionStorage(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Analityka nadal działa w pamięci, gdy sessionStorage jest zablokowane.
  }
}

function getSessionId() {
  const stored = readSessionStorage(SESSION_ID_STORAGE_KEY);
  if (stored) return stored;
  if (memorySessionId) return memorySessionId;

  memorySessionId = window.crypto.randomUUID();
  writeSessionStorage(SESSION_ID_STORAGE_KEY, memorySessionId);
  return memorySessionId;
}

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const urlAttribution: Attribution = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim().slice(0, 200);
    if (value) urlAttribution[key] = value;
  }

  const stored = readSessionStorage(ATTRIBUTION_STORAGE_KEY);

  if (stored) {
    try {
      memoryAttribution = JSON.parse(stored) as Attribution;
      if (
        Object.keys(memoryAttribution).length === 0 &&
        Object.keys(urlAttribution).length > 0
      ) {
        memoryAttribution = urlAttribution;
        writeSessionStorage(ATTRIBUTION_STORAGE_KEY, JSON.stringify(urlAttribution));
      }
      return memoryAttribution;
    } catch {
      // Uszkodzony wpis zastępujemy poprawną atrybucją z bieżącego adresu.
    }
  }

  memoryAttribution = urlAttribution;
  writeSessionStorage(ATTRIBUTION_STORAGE_KEY, JSON.stringify(urlAttribution));
  return urlAttribution;
}

export function getAnalyticsContext(): AnalyticsContext {
  return {
    sessionId: getSessionId(),
    pagePath: window.location.pathname || "/",
    attribution: captureAttribution()
  };
}

function wasEventCompleted(eventKey: string) {
  return (
    completedEvents.has(eventKey) ||
    readSessionStorage(`${EVENT_STORAGE_PREFIX}${eventKey}`) === "1"
  );
}

export async function trackFunnelEvent(eventName: FunnelEventName) {
  const context = getAnalyticsContext();
  const eventKey = `${context.pagePath}:${eventName}`;
  if (wasEventCompleted(eventKey) || pendingEvents.has(eventKey)) return true;

  pendingEvents.add(eventKey);

  try {
    const response = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName, ...context }),
      cache: "no-store",
      keepalive: true
    });

    if (!response.ok) return false;

    completedEvents.add(eventKey);
    writeSessionStorage(`${EVENT_STORAGE_PREFIX}${eventKey}`, "1");
    return true;
  } catch {
    return false;
  } finally {
    pendingEvents.delete(eventKey);
  }
}
