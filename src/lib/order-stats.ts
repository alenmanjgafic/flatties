import { appendLog, readLog } from "@/lib/log-store";

// Klick-Statistik für die Bestell-Buttons — Speicherung über log-store
// (lokal als Datei, auf Vercel via Blob).
const LOG_NAME = "order-clicks.jsonl";

export const VALID_PLATFORMS = new Set(["ubereats", "justeat"]);

export async function appendClick(platform: string): Promise<void> {
  await appendLog(LOG_NAME, { platform, ts: new Date().toISOString() });
}

export type OrderClickStats = {
  total: number;
  byPlatform: Record<string, number>;
  byDay: { day: string; ubereats: number; justeat: number; total: number }[];
  firstClick: string | null;
  lastClick: string | null;
};

export async function readStats(): Promise<OrderClickStats> {
  const raw = await readLog(LOG_NAME);

  const byPlatform: Record<string, number> = { ubereats: 0, justeat: 0 };
  const byDayMap = new Map<string, { ubereats: number; justeat: number }>();
  let firstClick: string | null = null;
  let lastClick: string | null = null;
  let total = 0;

  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const { platform, ts } = JSON.parse(line);
      if (!VALID_PLATFORMS.has(platform)) continue;
      total++;
      byPlatform[platform] = (byPlatform[platform] ?? 0) + 1;
      const day = String(ts).slice(0, 10);
      const entry = byDayMap.get(day) ?? { ubereats: 0, justeat: 0 };
      entry[platform as "ubereats" | "justeat"]++;
      byDayMap.set(day, entry);
      if (!firstClick || ts < firstClick) firstClick = ts;
      if (!lastClick || ts > lastClick) lastClick = ts;
    } catch {
      continue;
    }
  }

  const byDay = [...byDayMap.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([day, counts]) => ({
      day,
      ...counts,
      total: counts.ubereats + counts.justeat,
    }));

  return { total, byPlatform, byDay, firstClick, lastClick };
}
