import { createHmac, timingSafeEqual, randomBytes, createHash } from "node:crypto";

/**
 * Minimaler, abhängigkeitsfreier Session-Schutz für das Admin-Panel.
 *
 *   ADMIN_PASSWORD         – Pflicht. Ohne diesen Wert ist /admin komplett gesperrt.
 *   ADMIN_SESSION_SECRET   – HMAC-Schlüssel für das Session-Cookie. Fehlt er,
 *                            wird er aus dem Passwort abgeleitet (funktioniert,
 *                            invalidiert Sessions aber bei Passwortwechsel).
 *
 * Das Cookie enthält nur einen Ablaufzeitpunkt + Signatur — keine
 * personenbezogenen Daten, kein Passwort.
 */

export const ADMIN_COOKIE = "muc_admin";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 Stunden

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
export const adminConfigured = ADMIN_PASSWORD.length >= 8;

function secret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim();
  if (explicit && explicit.length >= 16) return explicit;
  return createHash("sha256")
    .update(`muc-admin::${ADMIN_PASSWORD}`)
    .digest("hex");
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // trotzdem einen Vergleich fahren, um Timing-Leaks zu vermeiden
    timingSafeEqual(bufA, Buffer.alloc(bufA.length));
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/** Timing-sicherer Passwortvergleich. */
export function verifyPassword(input: string): boolean {
  if (!adminConfigured) return false;
  return safeEqual(input, ADMIN_PASSWORD);
}

/** Neues Session-Token erzeugen (Wert fürs Cookie). */
export function createSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const nonce = randomBytes(9).toString("base64url");
  const payload = `${exp}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

/** Session-Token prüfen (Signatur + Ablauf). */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !adminConfigured) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [exp, nonce, mac] = parts;
  const payload = `${exp}.${nonce}`;
  if (!safeEqual(mac, sign(payload))) return false;
  const expiry = Number(exp);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: Math.floor(SESSION_TTL_MS / 1000),
};

/* ----------------------------------------------- Brute-Force-Bremse (IP) --- */

type Attempt = { count: number; blockedUntil: number };
const attempts = new Map<string, Attempt>();
const MAX_ATTEMPTS = 6;
const BASE_BLOCK_MS = 60_000;

export function loginBlockedFor(key: string): number {
  const entry = attempts.get(key);
  if (!entry) return 0;
  const remaining = entry.blockedUntil - Date.now();
  return remaining > 0 ? remaining : 0;
}

export function registerFailedLogin(key: string): void {
  const entry = attempts.get(key) ?? { count: 0, blockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    const over = entry.count - MAX_ATTEMPTS;
    entry.blockedUntil = Date.now() + BASE_BLOCK_MS * Math.pow(2, Math.min(over, 5));
  }
  attempts.set(key, entry);
}

export function clearLoginAttempts(key: string): void {
  attempts.delete(key);
}

if (attempts.size === 0) {
  // periodisches Aufräumen alter Einträge (verhindert unbegrenztes Wachstum)
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of attempts) {
      if (entry.blockedUntil < now && entry.count < MAX_ATTEMPTS) attempts.delete(key);
    }
  }, 10 * 60_000).unref?.();
}
