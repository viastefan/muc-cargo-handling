import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  ROOT_UID,
  adminConfigured,
  readSessionUid,
} from "@/lib/admin-auth";
import { getUserById } from "@/lib/admin-users";

export type Principal = {
  uid: string;
  name: string;
  email: string | null;
  role: "admin" | "member";
  isRoot: boolean;
  mustChangePw: boolean;
};

const ROOT_PRINCIPAL: Principal = {
  uid: ROOT_UID,
  name: "Administrator",
  email: null,
  role: "admin",
  isRoot: true,
  mustChangePw: false,
};

/** Aktuell angemeldeter Principal oder null. */
export async function readPrincipal(): Promise<Principal | null> {
  const store = await cookies();
  const uid = readSessionUid(store.get(ADMIN_COOKIE)?.value);
  if (!uid) return null;
  if (uid === ROOT_UID) return ROOT_PRINCIPAL;

  const user = await getUserById(uid);
  if (!user || !user.active) return null;
  return {
    uid: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isRoot: false,
    mustChangePw: user.mustChangePw,
  };
}

export async function hasAdminSession(): Promise<boolean> {
  return (await readPrincipal()) !== null;
}

/**
 * In geschützten Server-Komponenten / Server-Actions aufrufen. Leitet ohne
 * gültige Session auf /admin/login um und liefert sonst den Principal.
 */
export async function requireAdmin(): Promise<Principal> {
  if (!adminConfigured) redirect("/admin/login?config=1");
  const principal = await readPrincipal();
  if (!principal) redirect("/admin/login");
  return principal;
}

/** Wie requireAdmin, verlangt aber die Admin-Rolle (Team-Verwaltung). */
export async function requireAdminRole(): Promise<Principal> {
  const principal = await requireAdmin();
  if (principal.role !== "admin") redirect("/admin");
  return principal;
}
