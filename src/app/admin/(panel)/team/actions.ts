"use server";

import { revalidatePath } from "next/cache";
import { requireAdminRole } from "@/lib/admin-session";
import {
  createUser,
  getUserById,
  resetUserPassword,
  setUserActive,
} from "@/lib/admin-users";

export type TeamState = {
  error?: string;
  /** Frisch erzeugtes Einmal-Passwort — nur zur einmaligen Anzeige. */
  credentials?: { email: string; password: string; label: string };
};

/** Benutzer anlegen oder Passwort zurücksetzen (Ergebnis via useActionState). */
export async function teamAction(
  _prev: TeamState,
  formData: FormData,
): Promise<TeamState> {
  await requireAdminRole();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "create") {
    const result = await createUser({
      email: String(formData.get("email") ?? ""),
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? "member") === "admin" ? "admin" : "member",
    });
    if ("error" in result) return { error: result.error };
    revalidatePath("/admin/team");
    return {
      credentials: {
        email: result.user.email,
        password: result.tempPassword,
        label: `Benutzer „${result.user.name}" angelegt`,
      },
    };
  }

  if (intent === "reset") {
    const id = String(formData.get("id") ?? "");
    const user = await getUserById(id);
    if (!user) return { error: "Benutzer nicht gefunden." };
    const result = await resetUserPassword(id);
    if (!result) return { error: "Zurücksetzen fehlgeschlagen." };
    revalidatePath("/admin/team");
    return {
      credentials: {
        email: user.email,
        password: result.tempPassword,
        label: `Neues Passwort für „${user.name}"`,
      },
    };
  }

  return { error: "Unbekannter Vorgang." };
}

/** Benutzer (de)aktivieren — kein Geheimnis, einfache Form-Action. */
export async function toggleUserAction(formData: FormData): Promise<void> {
  await requireAdminRole();
  const id = String(formData.get("id") ?? "");
  const user = await getUserById(id);
  if (!user) return;
  await setUserActive(id, !user.active);
  revalidatePath("/admin/team");
}
