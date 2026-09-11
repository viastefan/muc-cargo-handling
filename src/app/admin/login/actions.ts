"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  MASTER_EMAIL,
  ROOT_UID,
  adminConfigured,
  clearLoginAttempts,
  createSessionToken,
  loginBlockedFor,
  registerFailedLogin,
  sessionCookieOptions,
  verifyMasterPassword,
} from "@/lib/admin-auth";
import { authenticate, touchLogin } from "@/lib/admin-users";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!adminConfigured) {
    return { error: "Admin-Zugang ist nicht konfiguriert (ADMIN_PASSWORD fehlt)." };
  }

  const h = await headers();
  const ip =
    (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "unknown").trim();

  const blockedMs = loginBlockedFor(ip);
  if (blockedMs > 0) {
    return {
      error: `Zu viele Fehlversuche. Bitte in ${Math.ceil(blockedMs / 1000)} s erneut versuchen.`,
    };
  }

  // Leeres Feld fällt auf den Master-Zugang zurück. Das Formular verlangt eine
  // E-Mail; der Rückfall existiert nur, damit ein Aussperren unmöglich ist.
  const emailRaw = String(formData.get("email") ?? "").trim().toLowerCase();
  const email = emailRaw || MASTER_EMAIL;
  const password = String(formData.get("password") ?? "");

  // Bremse gegen Online-Brute-Force
  await new Promise((resolve) => setTimeout(resolve, 250));

  let uid: string | null = null;
  let target = "/admin";

  // 1. Master-/Notfall-Login
  if (email === MASTER_EMAIL && verifyMasterPassword(password)) {
    uid = ROOT_UID;
  } else if (email !== MASTER_EMAIL) {
    // 2. Regulärer Benutzer
    const user = await authenticate(email, password);
    if (user) {
      uid = user.id;
      await touchLogin(user.id);
      if (user.mustChangePw) target = "/admin/konto?first=1";
    }
  }

  if (!uid) {
    registerFailedLogin(ip);
    return { error: "E-Mail oder Passwort ist nicht korrekt." };
  }

  clearLoginAttempts(ip);
  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(uid), sessionCookieOptions);
  redirect(target);
}
