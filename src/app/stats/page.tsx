import type { Metadata } from "next";
import { readStats } from "@/lib/order-stats";

export const metadata: Metadata = {
  title: "Flatties — Bestell-Statistik",
  robots: { index: false, follow: false },
};

// Liest bei jedem Aufruf die Log-Datei — nie statisch cachen
export const dynamic = "force-dynamic";

const PLATFORM_LABELS: Record<string, string> = {
  ubereats: "Uber Eats",
  justeat: "Just Eat",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function StatsPage() {
  const stats = await readStats();

  return (
    <main className="min-h-screen bg-asphalt text-cream px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-flame text-sm uppercase tracking-widest font-bold mb-2">
          Flatties Intern
        </p>
        <h1 className="text-4xl font-bold mb-10">Bestell-Klicks</h1>

        {/* Summen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-cream/5 border border-cream/15 rounded-2xl p-6">
            <p className="text-cream/60 text-xs uppercase tracking-widest font-bold mb-1">
              Total
            </p>
            <p className="text-5xl font-bold text-flame">{stats.total}</p>
          </div>
          {Object.entries(PLATFORM_LABELS).map(([id, label]) => (
            <div key={id} className="bg-cream/5 border border-cream/15 rounded-2xl p-6">
              <p className="text-cream/60 text-xs uppercase tracking-widest font-bold mb-1">
                {label}
              </p>
              <p className="text-5xl font-bold">{stats.byPlatform[id] ?? 0}</p>
            </div>
          ))}
        </div>

        {/* Zeitraum */}
        <div className="text-cream/60 text-sm mb-10 space-y-1">
          <p>Erster Klick: {formatDate(stats.firstClick)}</p>
          <p>Letzter Klick: {formatDate(stats.lastClick)}</p>
        </div>

        {/* Pro Tag */}
        <h2 className="text-xl font-bold mb-4">Klicks pro Tag</h2>
        {stats.byDay.length === 0 ? (
          <p className="text-cream/60">
            Noch keine Klicks erfasst. Sobald jemand auf der Website
            &laquo;Jetzt Bestellen&raquo; nutzt, erscheinen die Zahlen hier.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-cream/20 text-cream/60 text-xs uppercase tracking-widest">
                  <th className="py-3 pr-4 font-bold">Datum</th>
                  <th className="py-3 pr-4 font-bold">Uber Eats</th>
                  <th className="py-3 pr-4 font-bold">Just Eat</th>
                  <th className="py-3 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.byDay.map((d) => (
                  <tr key={d.day} className="border-b border-cream/10">
                    <td className="py-3 pr-4 font-mono text-sm">{d.day}</td>
                    <td className="py-3 pr-4">{d.ubereats}</td>
                    <td className="py-3 pr-4">{d.justeat}</td>
                    <td className="py-3 font-bold text-flame">{d.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-cream/40 text-xs mt-12">
          Datenquelle: <code>data/order-clicks.jsonl</code> — jede Zeile ist ein
          Klick auf einen Bestell-Link (Plattform + Zeitstempel). Keine
          personenbezogenen Daten.
        </p>
      </div>
    </main>
  );
}
