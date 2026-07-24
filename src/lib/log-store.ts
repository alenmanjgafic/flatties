import { promises as fs } from "fs";
import path from "path";

// JSONL-Logs (Bestell-Klicks, Anfragen) mit zwei Speicher-Backends:
// - Lokal / eigener Server: Datei unter data/ (wie bisher)
// - Vercel (read-only Dateisystem): Vercel Blob. Neue Stores verbinden sich
//   über BLOB_STORE_ID + OIDC-Laufzeit-Token, klassische über
//   BLOB_READ_WRITE_TOKEN — das SDK wählt selbst, wir prüfen nur, ob
//   überhaupt ein Store verbunden ist.
//   Der Store ist privat (Default neuer Stores): Logs sind nicht über eine
//   öffentliche URL erreichbar, gelesen wird über get() mit Auth.

const DATA_DIR = path.join(process.cwd(), "data");

function blobEnabled(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID
  );
}

export async function readLog(name: string): Promise<string> {
  if (blobEnabled()) {
    const { get } = await import("@vercel/blob");
    const result = await get(`logs/${name}`, {
      access: "private",
      useCache: false,
    });
    if (!result?.stream) return "";
    return new Response(result.stream).text();
  }

  try {
    return await fs.readFile(path.join(DATA_DIR, name), "utf8");
  } catch {
    return "";
  }
}

/**
 * Hängt einen Eintrag als JSON-Zeile an das Log an.
 * Gibt true zurück, wenn der Eintrag gespeichert wurde.
 */
export async function appendLog(name: string, entry: object): Promise<boolean> {
  const line = JSON.stringify(entry) + "\n";

  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    const existing = await readLog(name);
    await put(`logs/${name}`, existing + line, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/jsonl",
    });
    return true;
  }

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(path.join(DATA_DIR, name), line, "utf8");
    return true;
  } catch (err) {
    // z. B. read-only Dateisystem auf Serverless ohne Blob-Token
    console.error("appendLog failed:", err);
    return false;
  }
}
