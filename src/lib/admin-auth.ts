import { createHmac, timingSafeEqual, randomBytes, createHash } from "node:crypto";

/**
 * Session- und Login-Grundlagen fürs Admin-Panel.
 *
 *   ADMIN_PASSWORD        – Master-/Notfall-Passwort. Loggt als „Administrator"
 *                           ein, auch ohne angelegte Benutzer. Pflicht.
 *   ADMIN_EMAIL           – E-Mail des Master-Logins
 *                           (Default: "admin@muc-cargo.de").
 *   ADMIN_SESSION_SECRET  – HMAC-Schlüssel fürs Session-Cookie. Fehlt er, wird
 *                           er aus ADMIN_PASSWORD abgeleitet.
 *
 * Reguläre Benutzer kommen aus der Tabelle `admin_users` (siehe admin-users.ts).
 * Das Cookie speichert nur { uid, exp } + Signatur.
 */

export const ADMIN_COOKIE = "muc_admin";
export const ROOT_UID = "root";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
// 12+ wie in docs/BACKEND-SETUP.md dokumentiert — ein kuerzeres Passwort
// schwaecht auch den Session-Signierschluessel, der ohne eigenes
// ADMIN_SESSION_SECRET daraus abgeleitet wird (siehe secret() unten).
export const adminConfigured = ADMIN_PASSWORD.length >= 12;
/**
 * Adresse des Master-/Notfallzugangs. Bewusst eine echte E-Mail-Adresse, damit
 * der Login wie ein normaler Konto-Login aussieht und keine Sonderregel braucht.
 */
export const MASTER_EMAIL = (
  process.env.ADMIN_EMAIL?.trim() || "admin@muc-cargo.de"
).toLowerCase();

function secret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim();
  if (explicit && explicit.length >= 16) return explicit;
  return createHash("sha256").update(`muc-admin::${ADMIN_PASSWORD}`).digest("hex");
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, Buffer.alloc(bufA.length));
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/** Master-/Notfall-Passwort prüfen (timing-sicher). */
export function verifyMasterPassword(input: string): boolean {
  if (!adminConfigured) return false;
  return safeEqual(input, ADMIN_PASSWORD);
}

/**
 * Session-Token für eine Benutzer-ID (oder ROOT_UID) erzeugen. Trägt die
 * token_version zum Ausstellungszeitpunkt mit — admin-session.ts vergleicht
 * sie bei jedem Request gegen den aktuellen Stand in admin_users und
 * verwirft das Token bei Abweichung. Das ist der einzige Weg, ein einmal
 * ausgestelltes, sonst zustandsloses Token vor Ablauf zu widerrufen (Login
 * nach Passwortwechsel, "Auf allen anderen Geräten abmelden").
 */
export function createSessionToken(uid: string, tokenVersion: number): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const nonce = randomBytes(9).toString("base64url");
  const cleanUid = uid.replace(/[^A-Za-z0-9-]/g, "").slice(0, 40) || ROOT_UID;
  const version = Number.isFinite(tokenVersion) ? Math.trunc(tokenVersion) : 0;
  const payload = `${exp}.${cleanUid}.${version}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export type SessionPayload = { uid: string; tokenVersion: number };

/** Cookie-Inhalt lesen (Signatur + Ablauf geprüft), sonst null. */
export function readSessionPayload(token: string | undefined | null): SessionPayload | null {
  if (!token || !adminConfigured) return null;
  const parts = token.split(".");
  if (parts.length !== 5) return null;
  const [exp, uid, version, nonce, mac] = parts;
  const payload = `${exp}.${uid}.${version}.${nonce}`;
  if (!safeEqual(mac, sign(payload))) return null;
  const expiry = Number(exp);
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return null;
  const tokenVersion = Number(version);
  if (!Number.isFinite(tokenVersion)) return null;
  return { uid, tokenVersion };
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: Math.floor(SESSION_TTL_MS / 1000),
};

/* ── Brute-Force-Bremse pro IP+Kennung ──────────────────────────────────── */

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
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of attempts) {
      if (entry.blockedUntil < now && entry.count < MAX_ATTEMPTS) attempts.delete(key);
    }
  }, 10 * 60_000).unref?.();
}
