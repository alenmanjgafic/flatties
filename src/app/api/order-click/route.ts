import { NextResponse } from "next/server";
import { appendClick, readStats, VALID_PLATFORMS } from "@/lib/order-stats";

export async function POST(request: Request) {
  let platform: unknown;
  try {
    platform = (await request.json()).platform;
  } catch {
    // fällt unten in die Validierung
  }

  if (typeof platform !== "string" || !VALID_PLATFORMS.has(platform)) {
    return NextResponse.json({ error: "invalid platform" }, { status: 400 });
  }

  await appendClick(platform);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json(await readStats());
}
