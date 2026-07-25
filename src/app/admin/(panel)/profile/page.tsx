import { AdminShell } from "@/components/admin/AdminShell";
import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const data = await loadCms();
  return (
    <AdminShell title="Business-Profil">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Firmendaten</h2>
        </div>
        <div className="admin-panel__body">
          <ProfileEditor initial={data.businessProfile} />
        </div>
      </section>
    </AdminShell>
  );
}
