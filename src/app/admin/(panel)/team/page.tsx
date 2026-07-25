import { AdminShell } from "@/components/admin/AdminShell";
import { TeamEditor } from "@/components/admin/TeamEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Team / Ansprechpartner">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Team</h2>
        </div>
        <div className="admin-panel__body">
          <TeamEditor initial={data.team} />
        </div>
      </section>
    </AdminShell>
  );
}
