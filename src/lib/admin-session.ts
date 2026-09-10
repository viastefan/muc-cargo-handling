import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken, adminConfigured } from "@/lib/admin-auth";

/** True, wenn ein gültiges Admin-Session-Cookie vorliegt. */
export async function hasAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/**
 * In geschützten Server-Komponenten / Server-Actions aufrufen. Leitet ohne
 * gültige Session auf /admin/login um. Ist gar kein `ADMIN_PASSWORD` gesetzt,
 * wird das Panel komplett gesperrt.
 */
export async function requireAdmin(): Promise<void> {
  if (!adminConfigured) redirect("/admin/login?config=1");
  if (!(await hasAdminSession())) redirect("/admin/login");
}
