"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-session";
import { changeOwnPassword } from "@/lib/admin-users";

export type KontoState = { error?: string; ok?: boolean };

export async function changePasswordAction(
  _prev: KontoState,
  formData: FormData,
): Promise<KontoState> {
  const principal = await requireAdmin();
  if (principal.isRoot) {
    return { error: "Der Master-Zugang hat kein Konto-Passwort (nur ADMIN_PASSWORD)." };
  }

  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!current) return { error: "Bitte das aktuelle Passwort eingeben." };
  if (next.length < 10) return { error: "Mindestens 10 Zeichen." };
  if (next !== confirm) return { error: "Die Passwörter stimmen nicht überein." };

  const result = await changeOwnPassword(principal.uid, current, next);
  if (result === "wrong-current") {
    return { error: "Das aktuelle Passwort ist nicht korrekt." };
  }
  if (result !== "ok") return { error: "Speichern fehlgeschlagen." };

  redirect("/admin?pw=1");
}
