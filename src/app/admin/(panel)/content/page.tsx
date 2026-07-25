import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { loadCms } from "@/lib/cms/store.server";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const data = await loadCms();
  return (
    <AdminShell title="Seiten-Texte">
      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Site Content</h2>
        </div>
        <div className="admin-panel__body">
          <ContentEditor initial={data.siteContent} />
        </div>
      </section>
    </AdminShell>
  );
}
