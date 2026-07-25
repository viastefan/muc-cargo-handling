import { AdminShell } from "@/components/admin/AdminShell";
import { DocumentsEditor } from "@/components/admin/DocumentsEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Dokumente">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Dokumenten-Metadaten</h2>
        </div>
        <div className="admin-panel__body">
          <DocumentsEditor initial={data.documents} />
        </div>
      </section>
    </AdminShell>
  );
}
