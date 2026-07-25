import { AdminShell } from "@/components/admin/AdminShell";
import { ServicesEditor } from "@/components/admin/ServicesEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Services">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Service-Sektionen</h2>
        </div>
        <div className="admin-panel__body">
          <ServicesEditor initial={data.services} />
        </div>
      </section>
    </AdminShell>
  );
}
