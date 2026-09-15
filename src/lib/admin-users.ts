import {
  randomBytes,
  randomInt,
  scrypt as scryptCb,
  timingSafeEqual,
  type BinaryLike,
  type ScryptOptions,
} from "node:crypto";

/**
 * Verwaltung der Panel-Benutzer (`admin_users`-Tabelle). Zugriff über
 * PostgREST mit dem Service-Role-Key. Passwörter als scrypt-Hash
 * (`<salt-hex>:<hash-hex>`), N=2^15.
 */

const SCRYPT_KEYLEN = 64;
const SCRYPT_OPTS: ScryptOptions = { N: 2 ** 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

function scrypt(password: BinaryLike, salt: BinaryLike, keylen: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCb(password, salt, keylen, SCRYPT_OPTS, (err, derived) =>
      err ? reject(err) : resolve(derived as Buffer),
    );
  });
}

const RAW_URL = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "") ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
export const adminUsersStorageReady = Boolean(RAW_URL && SERVICE_KEY);
const REST = `${RAW_URL}/rest/v1`;

export type AdminRole = "admin" | "member";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  mustChangePw: boolean;
  tokenVersion: number;
};

type Row = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: AdminRole;
  active: boolean;
  created_at: string;
  last_login_at: string | null;
  must_change_pw: boolean;
  token_version: number;
};

function toUser(r: Row): AdminUser {
  return {
    id: r.id,
    email: r.email,
    name: r.name,
    role: r.role,
    active: r.active,
    createdAt: r.created_at,
    lastLoginAt: r.last_login_at,
    mustChangePw: r.must_change_pw,
    // Fehlt die Spalte (Migration 0004 noch nicht gelaufen), faellt der Wert
    // auf 0 zurueck — Widerruf ist dann noch nicht moeglich, aber bestehende
    // Anmeldungen brechen dadurch nicht, statt jede Sitzung sofort fuer
    // ungueltig zu erklaeren.
    tokenVersion: r.token_version ?? 0,
  };
}

async function rest(path: string, init: RequestInit & { prefer?: string } = {}) {
  const { prefer, headers, ...rest } = init;
  const res = await fetch(`${REST}${path}`, {
    ...rest,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    throw new Error(`supabase ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
  }
  return res;
}

/* ── Passwort-Hashing ──────────────────────────────────────────────────── */

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = await scrypt(password, salt, SCRYPT_KEYLEN);
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  try {
    const derived = await scrypt(password, Buffer.from(saltHex, "hex"), SCRYPT_KEYLEN);
    const expected = Buffer.from(hashHex, "hex");
    return derived.length === expected.length && timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

/** Lesbares Einmal-Passwort für neu angelegte Benutzer. */
export function generatePassword(): string {
  // 4 Blöcke à 4 Zeichen, ohne verwechselbare Zeichen. randomInt statt
  // Math.random() — Kryptozufall wie bei jedem anderen Secret hier
  // (Salts, Session-Nonces), nicht der vorhersagbare PRNG von Math.random().
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = () =>
    Array.from({ length: 4 }, () => alphabet[randomInt(alphabet.length)]).join("");
  return `${pick()}-${pick()}-${pick()}`;
}

/* ── CRUD ─────────────────────────────────────────────────────────────── */

export async function listUsers(): Promise<AdminUser[]> {
  if (!adminUsersStorageReady) return [];
  try {
    const res = await rest("/admin_users?select=*&order=created_at.asc");
    return ((await res.json()) as Row[]).map(toUser);
  } catch (error) {
    console.error("[admin-users] list failed", error);
    return [];
  }
}

/**
 * Benutzer-IDs landen als Filter direkt in der PostgREST-Abfrage. Nur
 * UUID-Zeichen zulassen, damit sich niemand über die ID zusätzliche
 * Query-Parameter einschleusen kann — auch dann nicht, wenn ein künftiger
 * Aufrufer die Prüfung davor vergisst.
 */
function isValidUserId(id: string): boolean {
  return /^[0-9a-f-]{10,64}$/i.test(id);
}

export async function getUserById(id: string): Promise<AdminUser | null> {
  if (!adminUsersStorageReady || !isValidUserId(id)) return null;
  try {
    const res = await rest(`/admin_users?select=*&id=eq.${id}&limit=1`);
    const rows = (await res.json()) as Row[];
    return rows[0] ? toUser(rows[0]) : null;
  } catch {
    return null;
  }
}

/** Wie getUserById, liefert aber die Rohzeile inklusive Passwort-Hash. */
async function getRowById(id: string): Promise<Row | null> {
  if (!adminUsersStorageReady || !isValidUserId(id)) return null;
  try {
    const res = await rest(`/admin_users?select=*&id=eq.${id}&limit=1`);
    const rows = (await res.json()) as Row[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

async function getRowByEmail(email: string): Promise<Row | null> {
  const clean = email.toLowerCase().replace(/[(),"'\\]/g, "");
  const res = await rest(
    `/admin_users?select=*&email=eq.${encodeURIComponent(clean)}&limit=1`,
  );
  const rows = (await res.json()) as Row[];
  return rows[0] ?? null;
}

/**
 * Fester Dummy-Hash, gegen den ein Passwort geprüft wird, wenn es gar keinen
 * echten gibt — die scrypt-Kosten fallen trotzdem an, damit die Antwortzeit
 * nicht verrät, ob ein Benutzer/eine Rolle existiert.
 */
const DUMMY_HASH = `${"0".repeat(32)}:${"0".repeat(128)}`;

/** Zahlt dieselben scrypt-Kosten wie eine echte Prüfung, ohne einen echten
 *  Hash zu benötigen — für Aufrufer, die selbst entscheiden, ob überhaupt
 *  über authenticate() geprüft wird (z. B. der Master-Login-Zweig). */
export async function dummyPasswordCost(password: string): Promise<void> {
  await verifyPassword(password, DUMMY_HASH);
}

/** Login-Prüfung. Liefert den Benutzer bei korrektem Passwort und aktiv. */
export async function authenticate(
  email: string,
  password: string,
): Promise<AdminUser | null> {
  if (!adminUsersStorageReady) return null;
  try {
    const row = await getRowByEmail(email);
    if (!row || !row.active) {
      // Dummy-Hash prüfen, damit die Antwortzeit nicht verrät, ob es den
      // Benutzer gibt.
      await dummyPasswordCost(password);
      return null;
    }
    if (!(await verifyPassword(password, row.password_hash))) return null;
    return toUser(row);
  } catch (error) {
    console.error("[admin-users] authenticate failed", error);
    return null;
  }
}

export async function touchLogin(id: string): Promise<void> {
  if (!adminUsersStorageReady) return;
  try {
    await rest(`/admin_users?id=eq.${id}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({ last_login_at: new Date().toISOString() }),
    });
  } catch {
    /* nicht kritisch */
  }
}

export async function createUser(input: {
  email: string;
  name: string;
  role: AdminRole;
}): Promise<{ user: AdminUser; tempPassword: string } | { error: string }> {
  if (!adminUsersStorageReady) return { error: "Kein Speicher verbunden." };
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim().slice(0, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: "Ungültige E-Mail." };
  if (!name) return { error: "Name fehlt." };

  try {
    if (await getRowByEmail(email)) return { error: "E-Mail ist bereits vergeben." };
    const tempPassword = generatePassword();
    const password_hash = await hashPassword(tempPassword);
    const res = await rest("/admin_users", {
      method: "POST",
      prefer: "return=representation",
      body: JSON.stringify({
        email,
        name,
        role: input.role === "admin" ? "admin" : "member",
        password_hash,
        must_change_pw: true,
      }),
    });
    const rows = (await res.json()) as Row[];
    return { user: toUser(rows[0]), tempPassword };
  } catch (error) {
    console.error("[admin-users] create failed", error);
    return { error: "Anlegen fehlgeschlagen." };
  }
}

export async function setUserActive(id: string, active: boolean): Promise<boolean> {
  if (!adminUsersStorageReady || !isValidUserId(id)) return false;
  try {
    await rest(`/admin_users?id=eq.${id}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({ active }),
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Neue token_version — jeder Aufruf erzeugt einen frischen, garantiert
 * höheren Wert (Zeitstempel statt Zähler): kein vorheriges Lesen nötig, und
 * jedes vor diesem Moment ausgestellte Sitzungs-Token wird beim nächsten
 * Request ungültig (admin-session.ts vergleicht den im Token stehenden Wert
 * mit dem hier gespeicherten).
 */
export async function resetUserPassword(
  id: string,
): Promise<{ tempPassword: string } | null> {
  if (!adminUsersStorageReady || !isValidUserId(id)) return null;
  try {
    const tempPassword = generatePassword();
    await rest(`/admin_users?id=eq.${id}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({
        password_hash: await hashPassword(tempPassword),
        must_change_pw: true,
        token_version: Date.now(),
      }),
    });
    return { tempPassword };
  } catch {
    return null;
  }
}

/**
 * Passwortwechsel verlangt das aktuelle Passwort. Sonst koennte jeder, der
 * kurz an einem angemeldeten Geraet sitzt, das Konto uebernehmen und den
 * rechtmaessigen Nutzer aussperren.
 */
export async function changeOwnPassword(
  id: string,
  current: string,
  next: string,
): Promise<
  { ok: true; tokenVersion: number } | { ok: false; reason: "wrong-current" | "failed" }
> {
  if (!adminUsersStorageReady || !isValidUserId(id) || next.length < 8) {
    return { ok: false, reason: "failed" };
  }

  const row = await getRowById(id);
  if (!row) return { ok: false, reason: "failed" };
  if (!(await verifyPassword(current, row.password_hash))) {
    return { ok: false, reason: "wrong-current" };
  }

  const tokenVersion = await writeNewPassword(id, next);
  return tokenVersion !== null ? { ok: true, tokenVersion } : { ok: false, reason: "failed" };
}

/** Setzt ein neues Passwort und liefert die neue token_version zurück, damit
 *  der Aufrufer die eigene, gerade genutzte Sitzung darauf ummünzen kann —
 *  sonst wäre man nach dem eigenen Passwortwechsel sofort ausgeloggt. */
async function writeNewPassword(id: string, next: string): Promise<number | null> {
  if (!adminUsersStorageReady || !isValidUserId(id)) return null;
  const tokenVersion = Date.now();
  try {
    await rest(`/admin_users?id=eq.${id}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({
        password_hash: await hashPassword(next),
        must_change_pw: false,
        token_version: tokenVersion,
      }),
    });
    return tokenVersion;
  } catch {
    return null;
  }
}

/**
 * "Auf allen anderen Geräten abmelden" — entwertet jedes bestehende Token
 * dieses Benutzers ohne das Passwort zu ändern. Aufrufer muss die eigene
 * Sitzung mit der zurückgegebenen Version neu ausstellen, sonst meldet sie
 * sich selbst mit ab.
 */
export async function bumpTokenVersion(id: string): Promise<number | null> {
  if (!adminUsersStorageReady || !isValidUserId(id)) return null;
  const tokenVersion = Date.now();
  try {
    await rest(`/admin_users?id=eq.${id}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({ token_version: tokenVersion }),
    });
    return tokenVersion;
  } catch {
    return null;
  }
}
