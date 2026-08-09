import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { exchangeAuthCode, siteBaseUrl } from "@/lib/tiktok-auth";

// OAuth-Callback: TikTok leitet nach der Zustimmung hierher zurück.
// Tauscht den Code gegen Tokens und speichert sie in der Storage-Schicht.

export async function GET(request: Request) {
  const url = new URL(request.url);
  const base = siteBaseUrl(request);

  const error = url.searchParams.get("error");
  if (error) {
    return NextResponse.redirect(`${base}/?tiktok=abgelehnt`);
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = request.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)tiktok_oauth_state=([^;]+)/)?.[1];

  if (!code || !state || !cookieState || state !== cookieState) {
    return NextResponse.json({ error: "invalid state" }, { status: 400 });
  }

  const ok = await exchangeAuthCode(code, `${base}/api/tiktok/callback`);
  if (!ok) {
    return NextResponse.json({ error: "token exchange failed" }, { status: 502 });
  }

  // Startseite neu bauen, damit die Videos sofort aus der API kommen
  revalidatePath("/");

  const res = NextResponse.redirect(`${base}/?tiktok=verbunden`);
  res.cookies.delete("tiktok_oauth_state");
  return res;
}
