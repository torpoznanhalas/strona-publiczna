function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    throw new Error("Brakuje konfiguracji Supabase w zmiennych środowiskowych.");
  }

  return {
    baseUrl: `${url.replace(/\/$/, "")}/rest/v1`,
    secretKey
  };
}

export async function supabaseAdminFetch(
  path: string,
  init: RequestInit = {}
) {
  const { baseUrl, secretKey } = getConfig();
  const headers = new Headers(init.headers);

  headers.set("apikey", secretKey);
  headers.set("Content-Type", "application/json");

  if (!secretKey.startsWith("sb_secret_")) {
    headers.set("Authorization", `Bearer ${secretKey}`);
  }

  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    cache: "no-store"
  });
}

export function parseExactCount(response: Response) {
  const contentRange = response.headers.get("content-range");

  if (!contentRange) return 0;

  const total = contentRange.split("/")[1];

  return total && total !== "*" ? Number(total) || 0 : 0;
}
