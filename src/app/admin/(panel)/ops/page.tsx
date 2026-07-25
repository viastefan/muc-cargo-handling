import { AdminShell } from "@/components/admin/AdminShell";
import { OpsEditor } from "@/components/admin/OpsEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminOpsPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Ops-Status">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Betriebsstatus</h2>
        </div>
        <div className="admin-panel__body">
          <OpsEditor initial={data.opsStatus} />
        </div>
      </section>
    </AdminShell>
  );
}
