import { MASTER_EMAIL } from "@/lib/admin-auth";
import { requireAdminRole } from "@/lib/admin-session";
import { adminUsersStorageReady, listUsers } from "@/lib/admin-users";
import { TeamManager } from "./TeamManager";

export default async function TeamPage() {
  await requireAdminRole();
  const users = await listUsers();

  return (
    <>
      <h1 className="admin-page-title">Team</h1>

      {!adminUsersStorageReady ? (
        <p className="admin-error">
          Kein Datenspeicher verbunden — Benutzerverwaltung erst nach dem
          Supabase-Setup verfügbar.
        </p>
      ) : (
        <>
          <p className="admin-hint" style={{ marginTop: 0, marginBottom: "1.25rem", maxWidth: "42rem" }}>
            Team-Mitglieder melden sich mit <strong>E-Mail + persönlichem Passwort</strong>{" "}
            an. Der <strong>Master-Zugang</strong> (<code>{MASTER_EMAIL}</code>) funktioniert
            immer als Notfall-Login und zum Anlegen des ersten Benutzers.
          </p>
          <TeamManager users={users} />
        </>
      )}
    </>
  );
}
