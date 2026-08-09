// OAuth-Anbindung an die TikTok Display API (Login Kit, v2-Endpunkte).
// Der Restaurant-Account (@flatties.ch) wird einmalig über
// /api/tiktok/connect verbunden; das Token-Paar liegt in der privaten
// Storage-Schicht (lokal data/, auf Vercel privater Blob) und wird bei
// Bedarf automatisch über das Refresh-Token erneuert.

import { readState, writeState } from "./log-store";

const TOKEN_FILE = "tiktok-token.json";
const TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";

export const TIKTOK_SCOPES = "user.info.basic,video.list";

// Access-Token gilt 24h, Refresh-Token 365 Tage (rotiert bei jedem Refresh)
type StoredToken = {
  access_token: string;
  refresh_token: string;
  open_id: string;
  /** Unix-ms, ab wann das Access-Token als abgelaufen gilt */
  access_expires_at: number;
  /** Unix-ms, ab wann auch das Refresh-Token abgelaufen ist */
  refresh_expires_at: number;
};

type TokenResponse = {
  access_token?: string;
  refresh_token?: string;
  open_id?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  error?: string;
  error_description?: string;
};

/**
 * Basis-URL der Website aus dem Request ableiten — funktioniert unverändert
 * auf flatties.vercel.app, flatties.ch und localhost.
 */
export function siteBaseUrl(request: Request): string {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "flatties.vercel.app";
  const cleanHost = host.split(",")[0].trim();
  const proto = cleanHost.startsWith("localhost") ? "http" : "https";
  return `${proto}://${cleanHost}`;
}

export function tiktokApiConfigured(): boolean {
  return Boolean(
    process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET
  );
}

async function tokenRequest(
  params: Record<string, string>
): Promise<TokenResponse | null> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY ?? "",
      client_secret: process.env.TIKTOK_CLIENT_SECRET ?? "",
      ...params,
    }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => null)) as TokenResponse | null;
  if (!res.ok || !data?.access_token) {
    console.error("tiktok token request failed:", res.status, data);
    return null;
  }
  return data;
}

async function persistToken(data: TokenResponse): Promise<void> {
  const now = Date.now();
  const stored: StoredToken = {
    access_token: data.access_token!,
    refresh_token: data.refresh_token ?? "",
    open_id: data.open_id ?? "",
    // 5 Minuten Sicherheitsmarge, damit nie mit einem gerade
    // ablaufenden Token gearbeitet wird
    access_expires_at: now + ((data.expires_in ?? 86400) - 300) * 1000,
    refresh_expires_at: now + (data.refresh_expires_in ?? 31536000) * 1000,
  };
  await writeState(TOKEN_FILE, JSON.stringify(stored));
}

/** Tauscht den Authorization-Code aus dem OAuth-Callback gegen Tokens. */
export async function exchangeAuthCode(
  code: string,
  redirectUri: string
): Promise<boolean> {
  const data = await tokenRequest({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });
  if (!data) return false;
  await persistToken(data);
  return true;
}

/**
 * Liefert ein gültiges Access-Token oder null, wenn (noch) kein Account
 * verbunden ist bzw. das Refresh-Token abgelaufen ist.
 */
export async function getValidAccessToken(): Promise<string | null> {
  if (!tiktokApiConfigured()) return null;

  const raw = await readState(TOKEN_FILE).catch(() => "");
  if (!raw) return null;

  let token: StoredToken;
  try {
    token = JSON.parse(raw);
  } catch {
    return null;
  }

  const now = Date.now();
  if (token.access_token && now < token.access_expires_at) {
    return token.access_token;
  }
  if (!token.refresh_token || now >= token.refresh_expires_at) {
    console.error("tiktok: refresh token fehlt oder abgelaufen — Account neu verbinden");
    return null;
  }

  const data = await tokenRequest({
    grant_type: "refresh_token",
    refresh_token: token.refresh_token,
  });
  if (!data) return null;
  await persistToken(data);
  return data.access_token ?? null;
}
