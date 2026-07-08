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
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    // fällt unten in die Validierung
  }

  const { name, email, type, message, website } = body;

  // Honeypot: echte Nutzer füllen das unsichtbare Feld nie aus
  if (typeof website === "string" && website.trim()) {
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
    message.length > 5000
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
