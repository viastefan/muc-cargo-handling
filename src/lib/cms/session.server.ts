import "server-only";

import { cookies } from "next/headers";
import { newId, signPayload, verifyPassword, createPasswordRecord } from "./crypto.server";
import { loadCms, saveCms } from "./store.server";

const COOKIE_NAME = "muc_admin_session";
const MAX_AGE_SEC = 60 * 60 * 12; // 12 hours

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.CONTACT_WEBHOOK_URL ||
    "muc-cargo-admin-dev-secret-change-me"
  );
}

type SessionPayload = {
  sid: string;
  exp: number;
};

function encodeSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = signPayload(body, sessionSecret());
  return `${body}.${sig}`;
}

function decodeSession(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = signPayload(body, sessionSecret());
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createAdminSession() {
  const token = encodeSession({
    sid: newId("sess"),
    exp: Date.now() + MAX_AGE_SEC * 1000,
  });
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return Boolean(decodeSession(jar.get(COOKIE_NAME)?.value));
}

export async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    throw new Error("UNAUTHORIZED");
  }
}

export async function attemptLogin(password: string) {
  const data = await loadCms();
  const { auth } = data;
  const valid = verifyPassword(password, auth.passwordSalt, auth.passwordHash, auth.iterations);
  if (!valid) return { ok: false as const, error: "Passwort ungültig." };
  await createAdminSession();
  return { ok: true as const };
}

export async function changeAdminPassword(currentPassword: string, nextPassword: string) {
  await requireAdmin();
  const data = await loadCms();
  const valid = verifyPassword(
    currentPassword,
    data.auth.passwordSalt,
    data.auth.passwordHash,
    data.auth.iterations,
  );
  if (!valid) return { ok: false as const, error: "Aktuelles Passwort ist falsch." };
  if (nextPassword.length < 8) {
    return { ok: false as const, error: "Neues Passwort: mindestens 8 Zeichen." };
  }

  const record = createPasswordRecord(nextPassword, data.auth.iterations || 120_000);
  const result = await saveCms((draft) => {
    draft.auth.passwordSalt = record.salt;
    draft.auth.passwordHash = record.hash;
    draft.auth.iterations = record.iterations;
    draft.auth.updatedAt = new Date().toISOString();
  }, "change-password");

  if (!result.ok) return { ok: false as const, error: result.error || "Speichern fehlgeschlagen." };
  return { ok: true as const };
}
