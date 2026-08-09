import { NextResponse } from "next/server";
import {
  TIKTOK_SCOPES,
  siteBaseUrl,
  tiktokApiConfigured,
} from "@/lib/tiktok-auth";

// Startet den einmaligen OAuth-Flow, um den Restaurant-Account zu verbinden.
// Mit TIKTOK_CONNECT_KEY geschützt, damit niemand Fremdes einen anderen
// TikTok-Account mit der Website verknüpfen kann.

export async function GET(request: Request) {
  const url = new URL(request.url);
  const adminKey = process.env.TIKTOK_CONNECT_KEY;
  if (!adminKey || url.searchParams.get("key") !== adminKey) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  if (!tiktokApiConfigured()) {
    return NextResponse.json(
      { error: "TIKTOK_CLIENT_KEY/SECRET fehlen" },
      { status: 500 }
    );
  }

  const state = crypto.randomUUID();
  const redirectUri = `${siteBaseUrl(request)}/api/tiktok/callback`;

  const authorize = new URL("https://www.tiktok.com/v2/auth/authorize/");
  authorize.searchParams.set("client_key", process.env.TIKTOK_CLIENT_KEY!);
  authorize.searchParams.set("scope", TIKTOK_SCOPES);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("redirect_uri", redirectUri);
  authorize.searchParams.set("state", state);

  const res = NextResponse.redirect(authorize);
  // CSRF-Schutz: state muss im Callback wieder ankommen
  res.cookies.set("tiktok_oauth_state", state, {
    httpOnly: true,
    secure: !redirectUri.startsWith("http://localhost"),
    sameSite: "lax",
    maxAge: 600,
    path: "/api/tiktok",
  });
  return res;
}
