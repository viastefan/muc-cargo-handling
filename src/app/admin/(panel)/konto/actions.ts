"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/admin-auth";
import { requireAdmin } from "@/lib/admin-session";
import { bumpTokenVersion, changeOwnPassword } from "@/lib/admin-users";

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
  if (!result.ok) {
    return {
      error:
        result.reason === "wrong-current"
          ? "Das aktuelle Passwort ist nicht korrekt."
          : "Speichern fehlgeschlagen.",
    };
  }

  // Der Passwortwechsel entwertet auch das eigene, gerade genutzte Cookie
  // (gleiche token_version-Pruefung wie bei jeder anderen Sitzung) — hier
  // sofort neu ausstellen, sonst waere man augenblicklich ausgeloggt.
  const store = await cookies();
  store.set(
    ADMIN_COOKIE,
    createSessionToken(principal.uid, result.tokenVersion),
    sessionCookieOptions,
  );
  redirect("/admin?pw=1");
}

/**
 * Beendet jede andere aktive Anmeldung dieses Benutzers (verlorenes Handy,
 * verkaufter Laptop) ohne das Passwort zu ändern. Dieses Gerät bleibt
 * angemeldet — die eigene Sitzung wird mit der neuen token_version sofort
 * neu ausgestellt.
 */
export async function logoutEverywhereAction(): Promise<void> {
  const principal = await requireAdmin();
  if (principal.isRoot) redirect("/admin/konto");

  const tokenVersion = await bumpTokenVersion(principal.uid);
  if (tokenVersion === null) redirect("/admin/konto?loggedOutElsewhere=0");

  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(principal.uid, tokenVersion), sessionCookieOptions);
  redirect("/admin/konto?loggedOutElsewhere=1");
}
