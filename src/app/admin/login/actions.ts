"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  adminConfigured,
  clearLoginAttempts,
  createSessionToken,
  loginBlockedFor,
  registerFailedLogin,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/admin-auth";

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

  const password = String(formData.get("password") ?? "");
  // Kleine künstliche Verzögerung — bremst Online-Brute-Force zusätzlich.
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (!verifyPassword(password)) {
    registerFailedLogin(ip);
    return { error: "Passwort ist nicht korrekt." };
  }

  clearLoginAttempts(ip);
  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions);
  redirect("/admin");
}
