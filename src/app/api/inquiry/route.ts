import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Anfragen gehen per Mail an info@flatties.ch (Gmail-SMTP, optional Resend).
// Zusätzlich lokales Datei-Log als Backup — bewusst NICHT im Vercel Blob,
// da Blob-URLs technisch öffentlich sind und Anfragen persönliche Daten
// enthalten. Schlägt beides fehl, antwortet die Route mit Fehler, damit
// das Formular den Nutzer informiert statt die Anfrage zu verlieren.
const LOG_FILE = path.join(process.cwd(), "data", "inquiries.jsonl");

const CONTACT_EMAIL = "info@flatties.ch";
const SUBJECT = "Anfrage Flatties.ch";
const VALID_TYPES = new Set(["kooperation", "influencer", "sonstiges"]);
const TYPE_LABELS: Record<string, string> = {
  kooperation: "Kooperation / Franchise",
  influencer: "Influencer / UGC",
  sonstiges: "Sonstiges",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Formular-Mindestausfüllzeit: schneller schafft es nur ein Bot.
const MIN_FORM_AGE_MS = 3000;

// Rate-Limit pro IP, in-memory. Auf Serverless gilt das nur pro warmer
// Instanz — als Burst-Bremse reicht das, echte Nutzer erreichen das Limit nie.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const rateLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateLog.set(ip, hits);
  if (rateLog.size > 10_000) {
    for (const [key, times] of rateLog) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) rateLog.delete(key);
    }
  }
  return hits.length > RATE_MAX;
}

// Nur Anfragen von der eigenen Seite: Browser senden bei fetch-POSTs immer
// einen Origin-Header; er muss zum angefragten Host passen (wie bei Next.js
// Server Actions). Direkte Skript-Aufrufe ohne Origin fliegen ebenfalls raus.
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return host !== null && new URL(origin).host === host.split(",")[0].trim();
  } catch {
    return false;
  }
}

type Inquiry = {
  ts: string;
  name: string;
  email: string;
  type: string;
  message: string;
};

function inquiryText(entry: Inquiry): string {
  return [
    `Neue Anfrage über flatties.ch`,
    ``,
    `Typ: ${TYPE_LABELS[entry.type]}`,
    `Name: ${entry.name}`,
    `E-Mail: ${entry.email}`,
    `Zeit: ${entry.ts}`,
    ``,
    `Nachricht:`,
    entry.message,
  ].join("\n");
}

// Versand über das bestehende Google-Postfach (App-Passwort nötig):
// SMTP_USER=info@flatties.ch, SMTP_PASS=<16-stelliges App-Passwort>
async function sendViaSmtp(entry: Inquiry): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_PORT ?? "465") === "465",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM ?? `Flatties Website <${user}>`,
    to: CONTACT_EMAIL,
    replyTo: entry.email,
    subject: SUBJECT,
    text: inquiryText(entry),
  });
  return true;
}

// Optionaler Fallback über Resend (transaktionaler Provider)
async function sendViaResend(entry: Inquiry): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? "Flatties Website <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      reply_to: entry.email,
      subject: SUBJECT,
      text: inquiryText(entry),
    }),
  });
  if (!res.ok) {
    console.error("inquiry mail (resend) failed:", res.status, await res.text());
  }
  return res.ok;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown")
    .split(",")[0]
    .trim();
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    // fällt unten in die Validierung
  }

  const { name, email, type, message, website, formAge } = body;

  // Honeypot und Zeitfalle: echte Nutzer füllen das unsichtbare Feld nie aus
  // und brauchen länger als ein paar Sekunden. Bots bekommen ein stilles "ok",
  // damit sie nichts zum Anpassen lernen.
  if (
    (typeof website === "string" && website.trim()) ||
    typeof formAge !== "number" ||
    formAge < MIN_FORM_AGE_MS
  ) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 200 ||
    typeof email !== "string" ||
    !EMAIL_RE.test(email) ||
    email.length > 320 ||
    typeof type !== "string" ||
    !VALID_TYPES.has(type) ||
    typeof message !== "string" ||
    message.trim().length < 5 ||
    message.length > 4000
  ) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const entry: Inquiry = {
    ts: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    type,
    message: message.trim(),
  };

  let logged = false;
  try {
    await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
    await fs.appendFile(LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
    logged = true;
  } catch {
    // read-only Dateisystem (z. B. Vercel) — Mail ist dann der Speicherweg
  }

  let mailed = false;
  try {
    mailed = (await sendViaSmtp(entry)) || (await sendViaResend(entry));
  } catch (err) {
    console.error("inquiry mail failed:", err);
  }

  if (!logged && !mailed) {
    return NextResponse.json({ error: "delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, mailed });
}
