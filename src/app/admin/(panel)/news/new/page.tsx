import { AdminShell } from "@/components/admin/AdminShell";
import { NewsEditor } from "@/components/admin/NewsEditor";

export const dynamic = "force-dynamic";

export default function AdminNewsNewPage() {
  return (
    <AdminShell title="Neue News">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Beitrag anlegen</h2>
        </div>
        <div className="admin-panel__body">
          <NewsEditor />
        </div>
      </section>
    </AdminShell>
  );
}
